# dw_broker_summary_followup_info 跟进量信息

## 字段
``` sql

followup_fdgjl  '房东跟进量'

followup_khgjl  '经纪人客户跟进量'

followup_fygjl  '房源跟进量'

followup_fygjl_qc '房源跟进量,去重'

followup_fdgjl_distinct '房东跟进量,去重'

followup_khgjl_distinct '经纪人客户跟进量,去重'
```

## HQL

依赖
- db_sync.angejia_broker
- db_sync.angejia__commission_followup
- db_sync.angejia__buyer_followup
- db_sync.property__inventory
- db_sync.angejia__inventory_followup

``` sql

--- 跟进量信息 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_followup_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_followup_info (
  broker_id STRING,
  followup_fdgjl STRING,
  followup_khgjl STRING,
  followup_fygjl STRING,
  followup_fygjl_qc STRING,
  followup_fdgjl_distinct STRING,
  followup_khgjl_distinct STRING
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_followup_info
SELECT
  bs.user_id AS broker_id,
  -- 房东跟进量
  t_1.followup_fdgjl,
  -- 经纪人客户跟进量
  t_2.followup_khgjl,
  -- 房源跟进量
  t_3.followup_fygjl,
  -- 房源跟进量,去重
  t_4.followup_fygjl_qc,
  -- 房东跟进量,去重
  t_1.followup_fdgjl_distinct,
  -- 经纪人客户跟进量,去重
  t_2.followup_khgjl_distinct
FROM
  db_sync.angejia__broker AS bs

-- 房东跟进量
LEFT JOIN (
  SELECT
    s_1.broker_uid,
    COUNT(s_1.id) AS followup_fdgjl,
    -- 去重
    COUNT(DISTINCT(s_1.commission_id)) AS followup_fdgjl_distinct
  FROM
    db_sync.angejia__commission_followup AS s_1
  WHERE
    to_date(s_1.create_at) = ${dealDate}
  GROUP BY
    s_1.broker_uid
  ) t_1
ON
  bs.user_id = t_1.broker_uid

-- 经纪人客户跟进量
LEFT JOIN (
  SELECT
    s_2.broker_uid,
    COUNT(s_2.id) AS followup_khgjl,
    -- 去重
    COUNT(DISTINCT(s_2.buyer_uid)) AS followup_khgjl_distinct
  FROM
    db_sync.angejia__buyer_followup AS s_2
  WHERE
    to_date(s_2.create_at) = ${dealDate}
  GROUP BY
    s_2.broker_uid
  ) t_2
ON
  bs.user_id = t_2.broker_uid

-- 房源跟进量
LEFT JOIN (
  SELECT
    s_3.broker_uid,
    COUNT(s_3.id) AS followup_fygjl
  FROM
    db_sync.angejia__inventory_followup AS s_3
  WHERE
    s_3.type = 0
      AND
    to_date(s_3.create_at) = ${dealDate}
  GROUP BY
    s_3.broker_uid
  ) t_3
ON
  bs.user_id = t_3.broker_uid

-- 房源跟进量,去重
LEFT JOIN (
  SELECT
    s_4.broker_uid,
    COUNT(DISTINCT(s_4.inventory_id)) AS followup_fygjl_qc
  FROM
    db_sync.angejia__inventory_followup AS s_4
  WHERE
    s_4.type = 0
      AND
    to_date(s_4.create_at) = ${dealDate}
  GROUP BY
    s_4.broker_uid
  ) t_4
ON
  bs.user_id = t_4.broker_uid
;
--- 跟进量信息 end ---


```
