# 经纪人行为日表关系，部署


## HQL 拼接

```
DROP TABLE IF EXISTS dw_temp_angejia.dw_app_access_log_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.dw_app_access_log_tmp(
  user_id  string,
  app_name  string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.dw_app_access_log_tmp
SELECT
  user_id,
  app_name
FROM
  dw_stage.dw_app_access_log
WHERE
    user_id != ''
  AND
    app_name IN ('a-broker','i-broker')
  AND
    p_dt = ${dealDate}
GROUP BY
  user_id,
  app_name;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__call_log_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__call_log_tmp(
  user_id  string,
  call_num  string,
  type string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__call_log_tmp
SELECT
  called_uid,
  count(id),
  '1' as type
FROM
  db_sync.angejia__call_log
WHERE
    call_type = 2
  AND
    to_date(start_at) = ${dealDate}
GROUP BY
  called_uid;

INSERT INTO TABLE
  dw_temp_angejia.angejia__call_log_tmp
SELECT
    called_uid,
    count(id),
    '2' as type
FROM
    db_sync.angejia__call_log
WHERE
    call_type = 2
AND
    keep_time > 0
AND
    to_date(start_at) = ${dealDate}
GROUP BY
    called_uid;

INSERT INTO TABLE
  dw_temp_angejia.angejia__call_log_tmp
SELECT
  called_uid,
  COUNT(DISTINCT(caller)),
  '3' as type
FROM
  db_sync.angejia__call_log
WHERE
    call_type = 2
  AND
    keep_time > 0
  AND
    to_date(start_at) = ${dealDate}
GROUP BY
  called_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__visit_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__visit_tmp(
  user_id  string,
  num  string,
  type string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__visit_tmp
SELECT
  broker_uid,
  COUNT(id),
  '1' as type
FROM
  db_sync.angejia__visit
WHERE
    is_valid = 1
  AND
    is_buyer_denied = 0
  AND
    to_date(visit_started_at) = ${dealDate}
  GROUP BY
    broker_uid;

INSERT INTO TABLE
  dw_temp_angejia.angejia__visit_tmp
SELECT
  broker_uid,
  COUNT(id),
  '2' as type
FROM
  db_sync.angejia__visit
WHERE
  to_date(created_at) = ${dealDate}
GROUP BY
  broker_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__commission_followup_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__commission_followup_tmp (
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__commission_followup_tmp
SELECT
  broker_uid,
  COUNT(id)
FROM
  db_sync.angejia__commission_followup
WHERE
  to_date(create_at) = ${dealDate}
GROUP BY
  broker_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__buyer_followup_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__buyer_followup_tmp (
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__buyer_followup_tmp
SELECT
  broker_uid,
  COUNT(id)
FROM
  db_sync.angejia__buyer_followup
WHERE
  to_date(create_at) = ${dealDate}
GROUP BY
  broker_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__inventory_followup_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__inventory_followup_tmp(
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__inventory_followup_tmp
SELECT
  broker_uid,
  COUNT(id)
FROM
  db_sync.angejia__inventory_followup
WHERE
    type = 0
  AND
    to_date(create_at) = ${dealDate}
GROUP BY
  broker_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__survey_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__survey_tmp(
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__survey_tmp
SELECT
  broker_uid,
  COUNT(inventory_id)
FROM
  db_sync.angejia__survey
WHERE
    to_date(updated_at) = ${dealDate}
  AND
    status = 1
GROUP BY
  broker_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__visit_review_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__visit_review_tmp(
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__visit_review_tmp
SELECT
  broker_uid,
  AVG(level)
FROM
  db_sync.angejia__visit_review
GROUP BY
  broker_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__broker_service_point_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__broker_service_point_tmp(
  user_id  string,
  num  string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.angejia__broker_service_point_tmp
SELECT
  broker_uid,
  (SUM(point))
FROM
  db_sync.angejia__broker_service_point
WHERE
  month = from_unixtime(unix_timestamp(${dealDate},'yyyy-MM'),'yyyyMM')
GROUP BY
  broker_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__broker_point_day_deduct_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__broker_point_day_deduct_tmp(
  user_id string,
  num string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__broker_point_day_deduct_tmp
SELECT
  d.broker_uid,
  SUM(b.point) as sum_point
FROM
  db_sync.angejia__broker_service_point_log a
JOIN
  db_sync.angejia__broker_service_action b
ON
  b.id = a.action_id
LEFT JOIN
  db_sync.angejia__broker_service_point d
ON
  d.id = a.point_id
WHERE
    to_date(a.created_at) = ${dealDate}
  AND
    a.is_valid = 1
  AND
    a.type = 2
GROUP BY
  d.broker_uid
;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__demand_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__demand_tmp(
  user_id string,
  num string,
  type string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__demand_tmp
SELECT
  creator_uid,
  COUNT(buyer_uid) as customer,
  '1' as type
FROM
  db_sync.angejia__demand
WHERE
    to_date(created_at) = ${dealDate}
GROUP BY
  creator_uid;

INSERT INTO TABLE
  dw_temp_angejia.angejia__demand_tmp
SELECT
  broker_uid,
  COUNT(buyer_uid) as customer,
  '2' as type
FROM
  db_sync.angejia__demand
GROUP BY
  broker_uid;


DROP TABLE IF EXISTS dw_temp_angejia.property__inventory_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.property__inventory_tmp(
  user_id string,
  num string,
  type string
);

INSERT INTO TABLE
  dw_temp_angejia.property__inventory_tmp
SELECT
  seller_broker_uid,
  COUNT(id),
  '1' as type
FROM
  db_sync.property__inventory
WHERE
  status = 2
GROUP BY
  seller_broker_uid;

INSERT INTO TABLE
  dw_temp_angejia.property__inventory_tmp
SELECT
  creator_uid,
  COUNT(id),
  '2' as type
FROM
  db_sync.property__inventory
WHERE
    source = 2
  AND
    status = 2
  AND
    to_date(created_at) = ${dealDate}
GROUP BY
  creator_uid;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__broker_black_house_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__broker_black_house_tmp(
  user_id string,
  start_and_end string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__broker_black_house_tmp
SELECT
  broker_uid,
  concat(start_date,' , ', end_date) as start_and_end
FROM
  db_sync.angejia__broker_black_house
WHERE
  unix_timestamp(to_date(start_date),'yyyy-MM-dd') <= unix_timestamp(${dealDate},'yyyy-MM-dd')
AND
  unix_timestamp(to_date(end_date),'yyyy-MM-dd') >= unix_timestamp(${dealDate},'yyyy-MM-dd')
;


DROP TABLE IF EXISTS dw_temp_angejia.angejia__agent_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__agent_tmp (
  user_id string,
  agent_name string,
  company_name string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__agent_tmp
SELECT
  bs.user_id,
  agent.name as agent_name,
  company.name as company_name
FROM
  db_sync.angejia__broker bs
LEFT JOIN
  db_sync.angejia__agent agent
ON
  bs.agent_id = agent.id
LEFT JOIN
  db_sync.angejia__company company
ON
  agent.company_id = company.id
;


CREATE TABLE IF NOT EXISTS dw_db.dw_summary_broker_basis_info_daily (
  user_id string,
  broker_name string,
  broker_on_duty_date string,
  broker_status string,

  broker_city_name string,
  agent_name string,
  agent_company_name string,
  broker_label_name string,

  phone string,
  app_name string,
  call_jt_and_wjt string,
  call_jt string,
  call_jtr string,
  visit_dkl string,
  visit_fq_dkl string,
  followup_fdgjl string,
  followup_khgjl string,
  survey_skfys string,
  visit_avg_jj string,
  point_sy string,
  point_day string,
  demand_customer_num string,
  demand_customer_sk_num string,
  inventory_sp string,
  inventory_all string,
  inventory_followup_fygjl string,
  black_house string,

  msg_receive_people string,
  msg_five_reply_people string,
  msg_day_reply_people string,
  msg_avg_reply_time string

) partitioned by (p_dt string)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
COLLECTION ITEMS TERMINATED BY '\n';

INSERT OVERWRITE TABLE
  dw_db.dw_summary_broker_basis_info_daily
partition(
  p_dt = ${dealDate}
)
SELECT
  bs.user_id,

  bs.name as broker_name,
  bs.on_duty_date as broker_on_duty_date,

  CASE
    WHEN bs.status = 1
      THEN '待入职'
    WHEN bs.status = 2
      THEN '在职'
    WHEN bs.status = 3
      THEN '取消入职'
    WHEN bs.status = 4
      THEN '离职'
  END as broker_status,

  ds_city.name as broker_city_name,
  dt_agent_tmp.agent_name as agent_name,
  dt_agent_tmp.company_name as agent_company_name,
  ds_broker_label.name as broker_label_name,

  sy_user_phone.phone,
  dt_access_log_tmp.app_name,

  dt_call_log_tmp_1.call_num as call_jt_and_wjt,
  dt_call_log_tmp_2.call_num as call_jt,
  dt_call_log_tmp_3.call_num as call_jtr,
  dt_visit_tmp_1.num as visit_dkl,
  dt_visit_tmp_2.num as visit_fq_dkl,
  dt_commission_followup_tmp.num as followup_fdgjl,
  dt_buyer_followup_tmp.num as followup_khgjl,
  dt_survey_tmp.num as survey_skfys,
  dt_visit_review_tmp.num as visit_avg_jj,
  dt_broker_service_point_tmp.num as point_sy,
  dt_broker_point_day_deduct_tmp.num as point_day,
  dt_demand_tmp_1.num as demand_customer_num,
  dt_demand_tmp_2.num as demand_customer_sk_num,
  dt_inventory_tmp_1.num as inventory_sp,
  dt_inventory_tmp_2.num as inventory_all,
  dt_inventory_followup_tmp.num as inventory_followup_fygjl,
  dt_broker_black_house_tmp.start_and_end as black_house,

  dw_db_effect_info.customer_info_radices as msg_receive_people,
  dw_db_effect_info.reply_by_broker_5min as msg_five_reply_people,
  dw_db_effect_info.reply_by_broker_day as msg_day_reply_people,
  dw_db_effect_info.avg_reply_time as msg_avg_reply_time

FROM
  db_sync.angejia__broker bs

LEFT JOIN
  db_sync.angejia__city ds_city
ON
  bs.city_id = ds_city.id

LEFT JOIN
  db_sync.angejia__user_phone sy_user_phone
ON
  bs.user_id = sy_user_phone.user_id

LEFT JOIN
  dw_temp_angejia.dw_app_access_log_tmp dt_access_log_tmp
ON
  bs.user_id = dt_access_log_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__call_log_tmp dt_call_log_tmp_1
ON
  bs.user_id = dt_call_log_tmp_1.user_id
    AND
  dt_call_log_tmp_1.type = 1

LEFT JOIN
  dw_temp_angejia.angejia__call_log_tmp dt_call_log_tmp_2
ON  
    bs.user_id = dt_call_log_tmp_2.user_id
  AND
    dt_call_log_tmp_2.type = 2

LEFT JOIN
  dw_temp_angejia.angejia__call_log_tmp dt_call_log_tmp_3
ON  
  bs.user_id = dt_call_log_tmp_3.user_id
    AND
  dt_call_log_tmp_3.type = 3

LEFT JOIN
  dw_temp_angejia.angejia__visit_tmp dt_visit_tmp_1
ON
  bs.user_id = dt_visit_tmp_1.user_id
AND
  dt_visit_tmp_1.type = 1

LEFT JOIN
  dw_temp_angejia.angejia__visit_tmp dt_visit_tmp_2
ON
  bs.user_id = dt_visit_tmp_2.user_id
AND
  dt_visit_tmp_2.type = 2

LEFT JOIN
  dw_temp_angejia.angejia__commission_followup_tmp dt_commission_followup_tmp
ON
  bs.user_id = dt_commission_followup_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__buyer_followup_tmp dt_buyer_followup_tmp
ON
  bs.user_id = dt_buyer_followup_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__inventory_followup_tmp dt_inventory_followup_tmp
ON
  bs.user_id = dt_inventory_followup_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__survey_tmp dt_survey_tmp
ON
  bs.user_id = dt_survey_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__visit_review_tmp dt_visit_review_tmp
ON
  bs.user_id = dt_visit_review_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__broker_service_point_tmp dt_broker_service_point_tmp
ON
  bs.user_id = dt_broker_service_point_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__broker_point_day_deduct_tmp dt_broker_point_day_deduct_tmp
ON
  bs.user_id = dt_broker_point_day_deduct_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__demand_tmp dt_demand_tmp_1
ON
    bs.user_id = dt_demand_tmp_1.user_id
  AND
    dt_demand_tmp_1.type = 1

LEFT JOIN
  dw_temp_angejia.angejia__demand_tmp dt_demand_tmp_2
ON
    bs.user_id = dt_demand_tmp_2.user_id
  AND
    dt_demand_tmp_2.type = 2

LEFT JOIN
  dw_temp_angejia.property__inventory_tmp dt_inventory_tmp_1
ON
    bs.user_id = dt_inventory_tmp_1.user_id
  AND
    dt_inventory_tmp_1.type = 1

LEFT JOIN
  dw_temp_angejia.property__inventory_tmp dt_inventory_tmp_2
ON
    bs.user_id = dt_inventory_tmp_2.user_id
  AND
    dt_inventory_tmp_2.type = 2

LEFT JOIN
  dw_temp_angejia.angejia__broker_black_house_tmp dt_broker_black_house_tmp
ON
  bs.user_id = dt_broker_black_house_tmp.user_id

LEFT JOIN
  dw_temp_angejia.angejia__agent_tmp dt_agent_tmp
ON
  bs.user_id = dt_agent_tmp.user_id

LEFT JOIN
  dw_db.dw_mobile_chat_effect_info dw_db_effect_info
ON
    bs.user_id = dw_db_effect_info.broker_id
  AND
    dw_db_effect_info.cal_dt = ${dealDate}

LEFT JOIN
  db_sync.angejia__broker_label ds_broker_label
ON
  bs.label_id = ds_broker_label.id

WHERE
    bs.user_id NOT IN (0,3,4)
  AND
    bs.city_id <> 3;


export hive dw_db.dw_summary_broker_basis_info_daily
to mysql dw_db.dw_summary_broker_basis_info_daily PARTITION p_dt;

```


## 字段说明
```

  user_id string comment '经纪人ID',
  broker_name string comment '经纪人名称',
  broker_on_duty_date string comment '经纪人入职日期',
  broker_status string comment '经纪人在职状态',

  broker_city_name string comment '经纪人所在城市',
  agent_name string comment '中心名称',
  agent_company_name string comment '中心公司名称',
  broker_label_name string comment '标签名称',

  phone string comment '经纪人电话号码',

  app_name string comment '登录的app名称',

  call_jt_and_wjt string comment '接通和未接通',
  call_jt string comment '接通',
  call_jtr string comment '未接通',

  visit_dkl string comment '带看量',
  visit_fq_dkl string comment '发起带看量',

  followup_fdgjl string comment '房东跟进量',
  followup_khgjl string comment '经纪人客户跟进量',

  survey_skfys string comment '实堪房源数',

  visit_avg_jj string comment '历史上累计评价平均分',

  point_sy string comment '当月被扣服务分',
  point_day string comment '当天被扣服务分',

  demand_customer_num string comment '录入客户数',
  demand_customer_sk_num string comment '私客数',

  inventory_sp string comment '总房源量',
  inventory_all string comment '当天录入房源量',
  inventory_followup_fygjl string '房源跟进量'


  black_house string comment '是否被关小黑屋',

  msg_receive_people '收到微聊人数',
  msg_five_reply_people '5分内回复微聊人数',
  msg_day_reply_people '当天回复人数',
  msg_avg_reply_time '平均回复时间',


  inventory_sham_num 虚假房源数

  broker_info_full_status string comment '经纪人信息是否填写完善'

  broker_has_leader 是否是leader

  call_daily_num 每日拨出电话数

  call_daily_people_num 每日拨出电话人,去重

  broker_laidian_genjin_num 经纪人来电跟进量

  partitioned by (p_dt string) 日期分区字段

```
