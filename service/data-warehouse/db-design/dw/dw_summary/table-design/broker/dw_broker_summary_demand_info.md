# dw_broker_summary_demand_info 客户相关

## 字段
``` sql

customer_day_num  '当日录入客户数'

customer_all_sk_num '所有私客数'

customer_added_sk_num '当日新增私客量 (不包括公客拉私)'

```

## HQL

依赖
- db_sync.angejia__broker
- db_sync.angejia__demand


``` sql

--- 客户相关 START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_demand_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_demand_info (
  broker_id string,
  customer_day_num string,
  customer_all_sk_num string,
  customer_added_sk_num string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_demand_info
SELECT
  bs.user_id AS broker_id,
  t_1.num,
  t_2.num,
  t_3.num
FROM
  db_sync.angejia__broker AS bs

-- 当日录入客户数
LEFT JOIN (
  SELECT
    s_1.creator_uid,
    COUNT(s_1.buyer_uid) AS num
  FROM
    db_sync.angejia__demand AS s_1
  WHERE
    to_date(s_1.created_at) = ${dealDate}
  GROUP BY
    s_1.creator_uid
  ) AS t_1
ON
  bs.user_id = t_1.creator_uid

-- 所有私客数
LEFT JOIN (
  SELECT
    s_2.broker_uid,
    COUNT(s_2.buyer_uid) AS num
  FROM
    db_sync.angejia__demand AS s_2
  WHERE
    s_2.status = '1'
  GROUP BY
    s_2.broker_uid
  ) AS t_2
ON
  bs.user_id = t_2.broker_uid

-- 当日新增私客量（不包括公客拉私）  
LEFT JOIN (
  SELECT
    s_3.broker_uid,
    COUNT(
      DISTINCT s_3.buyer_uid
    ) AS num
  FROM
    db_sync.angejia__demand AS s_3
  WHERE
    to_date(s_3.created_at) = ${dealDate}
  AND
    to_date(s_3.binded_at) = ${dealDate}
  AND
    s_3.unbined_at = '0000-00-00 00:00:00'
  AND
    s_3.status = 1
  GROUP BY
    s_3.broker_uid
  ) AS t_3
ON
  bs.user_id = t_3.broker_uid
;
--- 客户相关 END ---


```
