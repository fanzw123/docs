# dw_broker_summary_visit_info  经纪人 visit 相关

## 字段
``` sql

broker_id '经纪人 id'

visit_dkl  '带看量'

visit_fq_dkl  '发起带看量'

```


## HQL

依赖
- db_sync.angejia__broker
- db_sync.angejia__visit

``` sql

--- 经纪人 visit 相关 START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_visit_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_visit_info (
  broker_id STRING,
  visit_dkl STRING,
  visit_fq_dkl STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_visit_info
SELECT
  bs.user_id AS broker_id,
  t_1.num,
  t_2.num
FROM
  db_sync.angejia__broker AS bs
-- 带看量
LEFT JOIN (
  SELECT
    s_1.broker_uid,
    COUNT(s_1.id) AS num
  FROM
    db_sync.angejia__visit AS s_1
  WHERE
    s_1.is_valid = 1
      AND
    s_1.is_buyer_denied = 0
      AND
    to_date(s_1.visit_started_at) = ${dealDate}
  GROUP BY
    s_1.broker_uid
  ) AS t_1
ON
  bs.user_id = t_1.broker_uid

-- 发起带看量
LEFT JOIN (
  SELECT
    s_2.broker_uid,
    COUNT(s_2.id) AS num
  FROM
    db_sync.angejia__visit AS s_2
  WHERE
    to_date(s_2.created_at) = ${dealDate}
  GROUP BY
    s_2.broker_uid
  ) AS t_2
ON
  bs.user_id = t_2.broker_uid
;
--- 经纪人 visit 相关 END ---

```
