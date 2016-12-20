# dw_broker_summary_inventory_info 经纪人房源相关、实堪相关

## 字段
``` sql

inventory_all_sp_num  '总私盘房源量'

inventory_day_num '当天录入房源量'

inventory_sham_num '当日虚假房源数'

inventory_survey_num '当日实堪房源数'

inventory_all_num '所有录入房源'

inventory_survey_all_num  '所有实堪房源数'

inventory_survey_quality_day_num '当日优质实勘房源量(高清大图或精装大图)'


```

## HQL

依赖
- db_sync.angejia__broker
- db_sync.property__inventory
- db_sync.angejia__survey
- db_sync.angejia__inventory_extend

``` sql

--- 经纪人房源相关、实堪相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_inventory_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_inventory_info (
  broker_id string,
  inventory_all_sp_num string,
  inventory_day_num string,
  inventory_sham_num string,
  inventory_survey_num string,
  inventory_all_num string,
  inventory_survey_all_num string,
  inventory_survey_quality_day_num string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_inventory_info
SELECT
  bs.user_id AS broker_id,
  t_1.num,
  t_2.num,
  t_3.num,
  t_4.num,
  t_5.num,
  t_6.num,
  t_7.num
FROM
  db_sync.angejia__broker AS bs

-- 总私盘房源量
LEFT JOIN (
  SELECT
    s_1.seller_broker_uid,
    COUNT(s_1.id) AS num
  FROM
    db_sync.property__inventory AS s_1
  WHERE
    s_1.status = 2
      AND
    s_1.is_real = 1
  GROUP BY
    s_1.seller_broker_uid
  ) AS t_1
ON
  bs.user_id = t_1.seller_broker_uid

-- 当天录入房源量
LEFT JOIN (
  SELECT
    s_2.creator_uid,
    COUNT(s_2.id) AS num
  FROM
    db_sync.property__inventory AS s_2
  WHERE
    to_date(s_2.published_at) = ${dealDate}
      AND
    s_2.source IN (1,2)
      AND
    s_2.status = 2
      AND
    s_2.is_real = 1
  GROUP BY
    s_2.creator_uid
  ) AS t_2
ON
  bs.user_id = t_2.creator_uid

-- 当日虚假房源数
LEFT JOIN (
  SELECT
    s_3.creator_uid,
    COUNT(s_3.id) AS num
  FROM
    db_sync.property__inventory AS s_3
  WHERE
    s_3.is_real = 0
  AND
    to_date(s_3.updated_at) = ${dealDate}
  AND
    s_3.source = 2
  GROUP BY
    s_3.creator_uid
  ) AS t_3
ON
  bs.user_id = t_3.creator_uid

-- 当日实堪房源数
LEFT JOIN (
  SELECT
    s_4.broker_uid,
    COUNT(s_4.inventory_id) AS num
  FROM
    db_sync.angejia__survey AS s_4
  WHERE
    to_date(s_4.updated_at) = ${dealDate}
      AND
    s_4.status = 1
  GROUP BY
    s_4.broker_uid
  ) AS t_4
ON
  bs.user_id = t_4.broker_uid

-- 所有录入房源
LEFT JOIN (
  SELECT
    s_5.creator_uid,
    COUNT(s_5.id) AS num
  FROM
    db_sync.property__inventory AS s_5
  WHERE
    s_5.source IN (1,2)
      AND
    s_5.status = 2
      AND
    s_5.is_real = 1
  GROUP BY
    s_5.creator_uid
  ) AS t_5
ON
  bs.user_id = t_5.creator_uid

-- 所有实堪房源数
LEFT JOIN (
  SELECT
    s_6.broker_uid,
    COUNT(s_6.inventory_id) AS num
  FROM
    db_sync.angejia__survey AS s_6
  WHERE
    s_6.status = 1
  GROUP BY
    s_6.broker_uid
  ) AS t_6
ON
  bs.user_id = t_6.broker_uid  

-- 当日优质实勘房源量(高清大图或精装大图)
LEFT JOIN (

  SELECT
    s_2.broker_uid,
    COUNT(
      DISTINCT s_1.inventory_id
    ) as num
  FROM
    db_sync.angejia__inventory_extend s_1

  LEFT JOIN
    db_sync.angejia__survey s_2
  ON
    s_1.inventory_id = s_2.inventory_id

  WHERE
    s_1.quality_of_images >= '1'
  AND
    to_date(s_2.updated_at) = ${dealDate}
  AND
    s_2.status = '1'
  GROUP BY
    s_2.broker_uid
) AS t_7
ON
  bs.user_id = t_7.broker_uid  
;
--- 经纪人房源相关、实堪相关 end ---


```
