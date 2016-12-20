# dw_broker_summary_service_info 经纪人服务相关

## 字段
``` sql
history_avg_pj_num '历史上累计评价平均分',

point_day_deduct_num '当天被扣服务分',

point_month_deduct_num '当月被扣服务分',

black_house_time '被关小黑屋时间',

broker_evaluate_day '经纪人服务评价量'

broker_evaluate_distinct_day '经纪人服务评价量,去重'

visit_customer_evaluate_num_day '带看客户好评量，当日'

```


## HQL

依赖
-
- db_sync.angejia__visit_review
- db_sync.angejia__broker_service_point_log
- db_sync.angejia__broker_service_action
- db_sync.angejia__broker_service_point
- db_sync.angejia__broker_black_house

``` sql

--- 经纪人服务相关 START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_service_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_service_info (
  broker_id STRING,
  history_avg_pj_num STRING,
  point_day_deduct_num STRING,
  point_month_deduct_num STRING,
  black_house_time STRING,
  broker_evaluate_day STRING,
  broker_evaluate_distinct_day STRING,
  visit_customer_evaluate_num_day STRING
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_service_info
SELECT
  bs.user_id AS broker_id,
  -- 历史上累计评价平均分
  t_1.num,
  -- 当天被扣服务分
  t_2.num,
  -- 当月被扣服务分
  t_3.num,
  -- 被关小黑屋时间
  t_4.black_house_time,
  -- 经纪人服务评价量
  t_5.evaluate_day,
  -- 经纪人服务评价量,去重
  t_5.evaluate_distinct_day,
  -- 带看客户好评量，当日
  t_6.visit_customer_evaluate_num_day
FROM
  db_sync.angejia__broker AS bs

-- 今日历史上累计评价平均分
LEFT JOIN (
  SELECT
    s_1.broker_uid,
    AVG(s_1.level) AS num
  FROM
    db_sync.angejia__visit_review AS s_1
  WHERE
    to_date(s_1.create_at) = ${dealDate}
  GROUP BY
    s_1.broker_uid
  ) AS t_1
ON
  bs.user_id = t_1.broker_uid

-- 当天被扣服务分
LEFT JOIN (
  SELECT
    s_2_3.broker_uid,
    SUM(s_2_2.point) AS num
  FROM
    db_sync.angejia__broker_service_point_log AS s_2_1

  JOIN
    db_sync.angejia__broker_service_action AS s_2_2
  ON
    s_2_2.id = s_2_1.action_id

  LEFT JOIN
    db_sync.angejia__broker_service_point s_2_3
  ON
    s_2_3.id = s_2_1.point_id

  WHERE
    to_date(s_2_1.created_at) = ${dealDate}
      AND
    s_2_1.is_valid = 1
      AND
    s_2_1.type = 2
  GROUP BY
    s_2_3.broker_uid
  ) AS t_2
ON
  bs.user_id = t_2.broker_uid

-- 当月被扣服务分
LEFT JOIN (
  SELECT
    s_3.broker_uid,
    (SUM(s_3.point)) AS num
  FROM
    db_sync.angejia__broker_service_point AS s_3
  WHERE
    s_3.month = from_unixtime(unix_timestamp(${dealDate},'yyyy-MM'),'yyyyMM')
  GROUP BY
    s_3.broker_uid
  ) AS t_3
ON
  bs.user_id = t_3.broker_uid

-- 被关小黑屋时间
LEFT JOIN (
  SELECT
    s_4.broker_uid,
    concat(s_4.start_date,' , ', s_4.end_date) as black_house_time
  FROM
    db_sync.angejia__broker_black_house AS s_4
  WHERE
    unix_timestamp(to_date(s_4.start_date),'yyyy-MM-dd') <= unix_timestamp(${dealDate},'yyyy-MM-dd')
  AND
    unix_timestamp(to_date(s_4.end_date),'yyyy-MM-dd') >= unix_timestamp(${dealDate},'yyyy-MM-dd')
  ) AS t_4
ON
  bs.user_id = t_4.broker_uid

-- 经纪人服务评价量
LEFT JOIN (
  SELECT
    s_5.broker_uid,
    -- 经纪人服务评价量
    count(s_5.member_uid) AS evaluate_day,
    -- 经纪人服务评价量，去重
    count(distinct s_5.member_uid) AS evaluate_distinct_day
  FROM
    db_sync.angejia__visit_review AS s_5
  WHERE
    s_5.type = 1
      AND
    to_date(s_5.create_at) = ${dealDate}
  GROUP BY
    s_5.broker_uid
) AS t_5
ON
  bs.user_id = t_5.broker_uid

-- 带看客户好评量，当日
LEFT JOIN (
  SELECT
    s_1.broker_uid,
    COALESCE(COUNT(s_1.id),0) AS visit_customer_evaluate_num_day
  FROM
    db_sync.angejia__visit_review AS s_1
  WHERE
    to_date(s_1.create_at) >= date_sub(${dealDate},6)  
  AND
    to_date(s_1.create_at) <= ${dealDate}
  AND
    s_1.level >= 4
  AND
    s_1.type = 1
  GROUP BY
    s_1.broker_uid
) AS t_6
ON
  bs.user_id = t_6.broker_uid
;
--- 经纪人服务相关 END ---

```
