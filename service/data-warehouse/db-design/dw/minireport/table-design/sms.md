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

-- 拿出当天统计总数数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_sms_monitor_daily_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_sms_monitor_daily_info AS
SELECT
  sms.id,
  sms.phone,
  sms.biz_id,
  sms.content,
  sms.status,
  sms.created_at,
  sms.updated_at,
  sms.mt_msg_id,
  sms.deliver_at,
  sms.mt_stat,
  sms_send_channel.channel AS channel,
  sms_send_channel.phone AS channel_phone
FROM
  db_sync.angejia__sms AS sms

-- 短信通道，可能会发送 1 次以上。所以记录到总量里面
LEFT JOIN
  db_sync.angejia__sms_send_channel AS sms_send_channel
ON
  sms.id = sms_send_channel.sms_id
WHERE
  to_date(sms.created_at) = ${dealDate}
AND
  to_date(sms_send_channel.created_at)= ${dealDate}
;


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
  channel,
  -- 正确的短信
  '1' AS msg_type
FROM
  dw_temp_angejia.jason_sms_monitor_daily_info
WHERE
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
  bs.channel,
  -- 营销类短信
  '2' AS msg_type
FROM
  dw_temp_angejia.jason_sms_monitor_daily_info AS bs

LEFT JOIN (
  SELECT id FROM dw_temp_angejia.jason_sms_monitor_success_daily_info
) AS t_1
ON
  bs.id = t_1.id
WHERE
  t_1.id IS NULL
AND
  -- 01 通道表示营销类短信
  bs.channel = 01
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
  bs.channel,
  -- 错误的短信
  '0' AS msg_type
FROM
  dw_temp_angejia.jason_sms_monitor_daily_info AS bs
LEFT JOIN (
  SELECT id FROM dw_temp_angejia.jason_sms_monitor_success_daily_info
    UNION ALL
  SELECT id FROM dw_temp_angejia.jason_sms_monitor_EMD_daily_info
) AS t_1
ON
  bs.id = t_1.id
WHERE
  t_1.id IS NULL
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


-- 短信通道分析
  -- 00 安个家验证码通道，已改为独立通道，部分通知类短信也走该独立通道。
  COUNT(
    CASE WHEN channel = 00
      THEN 1
    END
  ) AS channel_00_total,
  COUNT(
    CASE WHEN channel = 00 AND msg_type = 1
      THEN 1
    END
  ) AS channel_00_success,

  -- 02 房源360验证码通道 （移通网络）
  COUNT(
    CASE WHEN channel = 02
      THEN 1
    END
  ) AS channel_02_total,
  COUNT(
    CASE WHEN channel = 02 AND msg_type = 1
      THEN 1
    END
  ) AS channel_02_success,

  -- 03 通知类短信通道 （移通网络）
  COUNT(
    CASE WHEN channel = 03
      THEN 1
    END
  ) AS channel_03_total,
  COUNT(
    CASE WHEN channel = 03 AND msg_type = 1
      THEN 1
    END
  ) AS channel_03_success,

  -- hx 华信科技短信验证码通达（华信科技）
  COUNT(
    CASE WHEN channel = 'hx'
      THEN 1
    END
  ) AS channel_hx_total,
  COUNT(
    CASE WHEN channel = 'hx' AND msg_type = 1
      THEN 1
    END
  ) AS channel_hx_success,


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
