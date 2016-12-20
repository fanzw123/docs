# dw_broker_summary_demand_info 客户相关

## 字段
``` sql
customer_day_num string comment '当日录入客户数',
customer_all_sk_num string comment '所有私客数',
```

## HQL

依赖
- db_sync.angejia__broker
- db_sync.angejia__demand


``` sql
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_demand_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_demand_info (
  broker_id string,
  customer_day_num string,
  customer_all_sk_num string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_demand_info
SELECT
  bs.user_id AS broker_id,
  t_1.num,
  t_2.num
FROM
  db_sync.angejia__broker AS bs
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

LEFT JOIN (
  SELECT
    s_2.broker_uid,
    COUNT(s_2.buyer_uid) AS num
  FROM
    db_sync.angejia__demand AS s_2
  GROUP BY
    s_2.broker_uid
  ) AS t_2
ON
  bs.user_id = t_2.broker_uid
;

```
