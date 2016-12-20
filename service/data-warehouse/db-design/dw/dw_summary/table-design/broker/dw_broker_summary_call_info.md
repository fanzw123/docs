# dw_broker_summary_call_info 经纪人电话信息

## 字段
``` sql
broker_id string '经纪人 ID'
call_jt_and_wjt   '接通和未接通数',
call_jt string  '接通时长大于0数',
call_wjt string  '未接通',
call_daily_num   '每日拨出电话数',
call_daily_people_num   '每日拨出电话人,去重'
```

## HQL

依赖
- db_sync.angejia__broker
- db_sync.angejia__call_log

``` sql
--- 经纪人电话信息 start ---

DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_call_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_call_info (
  broker_id string,
  call_jt_and_wjt string,
  call_jt string,
  call_wjt string,
  call_daily_num string,
  call_daily_people_num string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_call_info
SELECT
  bs.user_id AS broker_id,
  t_1.num,
  t_2.num,
  t_3.num,
  t_4.num,
  t_5.num
FROM
  db_sync.angejia__broker AS bs

-- 接通和未接通
LEFT JOIN (
  SELECT
    s_1.called_uid,
    COUNT(s_1.id) AS num
  FROM
    db_sync.angejia__call_log AS s_1
  WHERE
    s_1.call_type = 2
      AND
    s_1.is_harass = 0
      AND
    to_date(s_1.start_at) = ${dealDate}
  GROUP BY
    s_1.called_uid
  ) AS t_1
ON
  bs.user_id = t_1.called_uid

-- 接通时长大于0
LEFT JOIN (
  SELECT
    s_2.called_uid,
    COUNT(s_2.id) AS num
  FROM
    db_sync.angejia__call_log AS s_2
  WHERE
    s_2.call_type = 2
      AND
    s_2.keep_time > 0
      AND
    s_2.is_harass = 0
      AND
    to_date(s_2.start_at) = ${dealDate}
  GROUP BY
    s_2.called_uid
  ) AS t_2
ON
  bs.user_id = t_2.called_uid

-- 未接通
LEFT JOIN (
  SELECT
    s_3.called_uid,
    COUNT(DISTINCT(s_3.caller)) AS num
  FROM
    db_sync.angejia__call_log AS s_3
  WHERE
    s_3.call_type = 2
      AND
    s_3.keep_time > 0
      AND
    s_3.is_harass = 0
      AND
    to_date(s_3.start_at) = ${dealDate}
  GROUP BY
    s_3.called_uid
  ) AS t_3
ON
  bs.user_id = t_3.called_uid

-- 每日拨出电话数
LEFT JOIN (
  SELECT
    s_4.caller_uid,
    COUNT(s_4.id) AS num
  FROM
    db_sync.angejia__call_log AS s_4
  WHERE
    s_4.call_type = 1
      AND
    to_date(s_4.start_at) = ${dealDate}
      AND
    s_4.keep_time > 0
  GROUP BY
    s_4.caller_uid
  ) AS t_4
ON
  bs.user_id = t_4.caller_uid

-- 每日拨出电话人,去重
LEFT JOIN (
  SELECT
    s_5.caller_uid,
    COUNT(DISTINCT(s_5.called)) AS num
  FROM
    db_sync.angejia__call_log AS s_5
  WHERE
    s_5.call_type = 1
      AND
    to_date(s_5.start_at) = ${dealDate}
      AND
    s_5.keep_time > 0
  GROUP BY
    s_5.caller_uid
  ) AS t_5
ON
  bs.user_id = t_5.caller_uid
;

--- 经纪人电话信息 end ---

```
