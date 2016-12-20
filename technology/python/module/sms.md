# sms 需求

- [短信接口文档](files/移通网络企业短消息平台HTTP接口说明.doc)
- [短信表文档](http://git.corp.angejia.com/service/design/wikis/data/database/sms)

```
收件人

zmhu@angejia.com
xuchen@angejia.com
benma@angejia.com
liyawang@angejia.com
dl-bi@angejia.com

```

### HQL

``` sql

-- 发送成功，有回调信息的短信
DROP TABLE IF EXISTS dw_temp_angejia.jason_sms_monitor_success_daily_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_sms_monitor_success_daily_info AS
SELECT
  id,
  phone,
  biz_id,
  content,
  status,
  created_at,
  updated_at,
  mt_msg_id,
  deliver_at,
  mt_stat,
  -- 正确的短信
  '1' AS msg_type
FROM
  db_sync.angejia__sms
WHERE
  to_date(created_at) = ${dealDate}
AND
  mt_stat IN ('DELIVRD','ET:0265')
;


-- 营销类短信，排除成功的短信
DROP TABLE IF EXISTS dw_temp_angejia.jason_sms_monitor_EMD_daily_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_sms_monitor_EMD_daily_info AS
SELECT
  bs.id,
  bs.phone,
  bs.biz_id,
  bs.content,
  bs.status,
  bs.created_at,
  bs.updated_at,
  bs.mt_msg_id,
  bs.deliver_at,
  bs.mt_stat,
  -- 营销类短信
  '2' AS msg_type
FROM
  db_sync.angejia__sms AS bs

LEFT JOIN (
  SELECT id FROM dw_temp_angejia.jason_sms_monitor_success_daily_info
) AS t_1
ON
  bs.id = t_1.id
WHERE
  t_1.id IS NULL
AND
  to_date(bs.created_at) = ${dealDate}
AND
  (bs.biz_id IN(19,14,17) AND bs.status = 2)
;


-- 非成功，非营销类短信，都是失败的
DROP TABLE IF EXISTS dw_temp_angejia.jason_sms_monitor_error_daily_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_sms_monitor_error_daily_info AS
SELECT
  bs.id,
  bs.phone,
  bs.biz_id,
  bs.content,
  bs.status,
  bs.created_at,
  bs.updated_at,
  bs.mt_msg_id,
  bs.deliver_at,
  bs.mt_stat,
  -- 错误的短信
  '0' AS msg_type
FROM
  db_sync.angejia__sms AS bs
LEFT JOIN (
  SELECT id FROM dw_temp_angejia.jason_sms_monitor_success_daily_info
    UNION ALL
  SELECT id FROM dw_temp_angejia.jason_sms_monitor_EMD_daily_info
) AS t_1
ON
  bs.id = t_1.id
WHERE
  t_1.id IS NULL
AND
  to_date(bs.created_at) = ${dealDate}
;



-- 汇总详情
DROP TABLE IF EXISTS dw_temp_angejia.jason_sms_monitor_summary_daily_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_sms_monitor_summary_daily_info AS
SELECT
  *
FROM
  dw_temp_angejia.jason_sms_monitor_success_daily_info

UNION ALL

SELECT
  *
FROM
  dw_temp_angejia.jason_sms_monitor_EMD_daily_info

UNION ALL

SELECT
  *
FROM
  dw_temp_angejia.jason_sms_monitor_error_daily_info

;


-- 分析结果
DROP TABLE IF EXISTS dw_temp_angejia.jason_sms_monitor_result_daily_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_sms_monitor_result_daily_info AS
SELECT
--- 总量
  COUNT(*) AS status_total,

--- 成功发送短信总量
  -- 成功总量
  COUNT (
    CASE WHEN msg_type = 1  
      THEN 1
    END
  ) AS confirm_send_success_num,

  -- 0 ~ 30 秒到达
  COUNT(
    CASE WHEN msg_type = 1 AND (unix_timestamp(deliver_at)-unix_timestamp(created_at) <= 30)
      THEN 1
    END
  ) AS deliver0_30,

  -- 30 秒到达
  COUNT(
    CASE WHEN msg_type = 1 AND (unix_timestamp(deliver_at)-unix_timestamp(created_at) > 30)
      THEN 1
    END
  ) AS deliver30,

  -- 60 秒到达
  COUNT(
    CASE WHEN msg_type = 1 AND (unix_timestamp(deliver_at)-unix_timestamp(created_at) > 60)
      THEN 1
    END
  ) AS deliver60,

  -- 90 秒到达
  COUNT(
    CASE WHEN msg_type = 1 AND (unix_timestamp(deliver_at)-unix_timestamp(created_at) > 90)
      THEN 1
    END
  ) AS deliver90,


--- 营销类短信
  COUNT(
    CASE WHEN msg_type = 2
      THEN 1
    END
  ) AS emd_total,


-- 失败短信分析
  -- 失败总数
  COUNT(
    CASE WHEN msg_type = 0
      THEN 1
    END
  ) AS confirm_send_failure_num,

  -- 已发送,未到达
  COUNT(
    CASE WHEN msg_type = 0 AND mt_stat = '' AND status = 2
      THEN 1
    END  
  ) AS mt_stat_and_status_2,

  -- MSISDN 号码段不存在
  COUNT(
    CASE WHEN msg_type = 0 AND mt_stat = 'ET:0201'
      THEN 1
    END  
  ) AS mt_stat_error_ET0201,

  -- 配额不足
  COUNT(
    CASE WHEN msg_type = 0 AND mt_stat = 'ET:0250'
      THEN 1
    END  
  ) AS mt_stat_error_ET0250,

  -- 其他错误
  COUNT(
    CASE WHEN msg_type = 0 AND (mt_stat NOT IN('ET:0201','ET:0250') AND status NOT IN ('1','2'))
      THEN 1
    END  
  ) AS mt_stat_error_other
FROM
  dw_temp_angejia.jason_sms_monitor_summary_daily_info;


export hive dw_temp_angejia.jason_sms_monitor_result_daily_info to mysql dw_temp_angejia.jason_sms_monitor_result_daily_info;

export hive dw_temp_angejia.jason_sms_monitor_summary_daily_info to mysql dw_temp_angejia.jason_sms_monitor_summary_daily_info;


```
