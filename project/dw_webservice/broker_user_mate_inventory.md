# 顾问智能配盘

## 一、介绍

## 二、 API

## 三、数据

``` sql

SELECT
  a.id,
  a.broker_uid AS broker_id,
  a.buyer_uid AS customer_id,
  b.user_id AS user_id,
  a.city_id,
  a.district_id AS district_ids,
  a.block_id AS block_ids,
  a.community_ids,
  -- 这里保存的是一个户型 id, 需要映射为户型
  a.bedrooms,
  -- 万为单位
  a.budget,
  -- 根据预算得出的价格段
  CASE
    WHEN budget >= 0 AND budget <= 150
      THEN 1
    WHEN budget >= 150 AND budget <= 200
      THEN 2
    WHEN budget >= 200 AND budget <= 250
      THEN 3
    WHEN budget >= 250 AND budget <= 300
      THEN 4
    WHEN budget >= 300 AND budget <= 400
      THEN 5
    WHEN budget >= 400 AND budget <= 500
      THEN 6
    WHEN budget >= 500 AND budget <= 700
      THEN 7
    WHEN budget >= 700 AND budget <= 1000
      THEN 8
    WHEN budget >= 1000  AND budget <= 100000
      THEN 9
  END AS price_tier

FROM angejia.demand AS a

-- 客户 id 与用户 id 关系表
LEFT JOIN angejia.broker_customer_bind_user AS b
  ON a.buyer_uid = b.broker_customer_id
  AND b.is_active = 1

WHERE a.status = 1
  AND a.broker_uid <> 0

ORDER BY id DESC

LIMIT 100
```
