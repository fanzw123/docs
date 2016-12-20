# dw_summary_broker_basis_info_daily 经纪人日报表

## * 字段说明
``` sql
user_id '经纪人ID',

-- dw_temp_angejia.jason_dw_broker_summary_basis
broker_name  '经纪人名称',

broker_on_duty_date  '经纪人入职日期',

broker_status  '经纪人在职状态',

broker_city_name  '经纪人所在城市',

-- dw_temp_angejia.jason_dw_broker_summary_agent_info
agent_name  '中心名称',

agent_company_name  '中心公司名称',

broker_label_name  '标签名称',

-- dw_temp_angejia.jason_dw_broker_summary_basis
phone  '经纪人电话号码',

-- dw_temp_angejia.jason_dw_user_summary_app_info
app_name  '登录的app名称',

-- dw_temp_angejia.jason_dw_broker_summary_call_info
call_jt_and_wjt  '接通和未接通数',

call_jt  '接通时长大于0数',

call_jtr  '未接通',

-- dw_temp_angejia.jason_dw_broker_summary_visit_info
visit_dkl  '带看量',

visit_fq_dkl  '发起带看量',

-- dw_temp_angejia.jason_dw_broker_summary_followup_info
followup_fdgjl  '房东跟进量',

followup_khgjl  '经纪人客户跟进量',

-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
survey_skfys  '当日实堪房源数',

-- dw_temp_angejia.jason_dw_broker_summary_service_info
visit_avg_jj  '历史上累计评价平均分',

point_sy  '当月被扣服务分',

point_day  '当天被扣服务分',

-- dw_temp_angejia.jason_dw_broker_summary_demand_info
demand_customer_num  '录入客户数',

demand_customer_sk_num  '私客数',

-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
inventory_sp  '总房源量',

inventory_all  '当天录入房源量',

inventory_followup_fygjl string '房源跟进量'

-- dw_temp_angejia.jason_dw_broker_summary_service_info
black_house  '是否被关小黑屋',

-- dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily
msg_receive_people '收到微聊人数(09:00-22:00)',

msg_five_reply_people '5分内回复微聊人数(09:00-22:00)',

msg_day_reply_people '当天回复人数(09:00-22:00)',

msg_avg_reply_time '平均回复时间(09:00-22:00)',

-- 20150605 新增字段
-- dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily
msg_received_wechat_info_daily '每日收到的微聊人（全天，之前仅白天）'

msg_reply_wechat_info_daily '每日回复的微聊人数（全天，之前仅白天'

-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
inventory_sham_num '虚假房源数'

-- dw_temp_angejia.jason_dw_broker_summary_basis
broker_info_full_status  '经纪人信息是否填写完善'

broker_has_leader '是否是leader'

-- dw_temp_angejia.jason_dw_broker_summary_call_info
call_daily_num '每日拨出电话数'

call_daily_people_num '每日拨出电话人,去重'

-- dw_temp_angejia.jason_dw_broker_summary_incoming_telegram
broker_laidian_genjin_num '经纪人来电跟进量'

-- dw_db_temp.ray_broker_working_hours_temp
working_hours '工作时长'

-- 20150609 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_incoming_telegram
broker_laidian_num '来电量 去重'

broker_laidian_genjin_rate '来电跟进率'

-- 20150612 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
inventory_all_num comment '所有录入房源'

inventory_survey_all_num comment '所有实堪房源数'

-- dw_temp_angejia.jason_dw_broker_summary_request_visit
broker_pv_home_day comment '经纪人主页日PV'

-- 20150618 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_basis
broker_duty_status_id '经纪人在职状态id',

broker_city_id '经纪人城市ID',

-- dw_temp_angejia.jason_dw_broker_summary_agent_info
agent_id '中心ID',

company_id '公司ID',

-- 20150624 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_agent_info
agent_type_id '中心类型ID'

agent_type_name '经纪人中心类型名称'

-- 20150629 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_followup_info
followup_fygjl_qc '房源跟进量,去重'

-- 20150701 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_followup_info
followup_fdgjl_distinct '房东跟进量,去重',

followup_khgjl_distinct '经纪人客户跟进量,去重',

-- dw_temp_angejia.jason_dw_broker_summary_service_info
broker_evaluate_day '经纪人服务评价量',

broker_evaluate_distinct_day '经纪人服务评价量,去重'

-- 20150706 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_request_visit
broker_uv_home_day '经纪人主页日UV'


-- 分区字段
partitioned by (p_dt string) '日期分区字段'

```



## * HQL

### 1、计算临时 HQL

``` sql

--- 经纪人基础信息 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_basis;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_basis (
  broker_id string,
  broker_name string,
  broker_on_duty_date string,
  broker_duty_status string,
  broker_phone string,
  broker_city_name string,
  broker_info_full_status string,
  broker_has_leader string,
  broker_duty_status_id string,
  broker_city_id string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_basis
SELECT
  bs.user_id AS broker_id,

  bs.name AS broker_name,

  bs.on_duty_date AS broker_on_duty_date,

  CASE
    WHEN bs.status = 1
      THEN '待入职'
    WHEN bs.status = 2
      THEN '在职'
    WHEN bs.status = 3
      THEN '取消入职'
    WHEN bs.status = 4
      THEN '离职'
  END AS broker_duty_status,

  sy_user_phone.phone AS broker_phone,

  ds_city.name AS broker_city_name,

  CASE
    WHEN
      bs.identity_card_number = '' OR
      bs.avatar               = 0 OR
      bs.identity_card_photo  ='' OR
      bs.join_year            = 0 OR
      bs.wechat_name          = '' OR
      bs.engage_block_ids     = '' OR
      bs.good_business_ids    = '' OR
      bs.familiar_community_ids = '' OR
      bs.work_experience      = '' OR
      bs.life_image_ids       = ''
    THEN
      'No'
    ELSE
      'Yes'
  END AS info_full_status,

  CASE
    WHEN
      bs.has_leader_ability = 1
    THEN
      'Yes'
    ELSE
      'No'
  END AS broker_has_leader,

  status,

  city_id

FROM
  db_sync.angejia__broker AS bs
LEFT JOIN
  db_sync.angejia__city AS ds_city
ON
  bs.city_id = ds_city.id
LEFT JOIN
  db_sync.angejia__user_phone AS sy_user_phone
ON
  bs.user_id = sy_user_phone.user_id
;

--- 经纪人基础信息 end ---


--- 经纪人中心表 strat ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_agent_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_agent_info (
  broker_id string,
  agent_name string,
  company_name string,
  label_name string,
  agent_id string,
  company_id string,
  agent_type_id string,
  agent_type_name string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_agent_info
SELECT
  bs.user_id AS broker_id,
  agent.name AS agent_name,
  company.name AS company_name,
  ds_broker_label.name as label_name,
  agent.id AS agent_id,
  company.id,

  agent.type AS agent_type_id,

  CASE
    WHEN agent.type = '1'
      THEN '直营中心'
    WHEN agent.type = '2'
      THEN '合作中心'
  END AS agent_type_name

FROM
  db_sync.angejia__broker AS bs
LEFT JOIN
  db_sync.angejia__agent AS agent
ON
  bs.agent_id = agent.id
LEFT JOIN
  db_sync.angejia__company AS company
ON
  agent.company_id = company.id
LEFT JOIN
  db_sync.angejia__broker_label AS ds_broker_label
ON
  bs.label_id = ds_broker_label.id
;
--- 经纪人中心表 end ---


-- 用户 app 信息
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_user_summary_app_info;

CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_user_summary_app_info (
  user_id  string,
  app_name  string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_user_summary_app_info
SELECT
  user_id,
  -- 返回一组对象,消除重复的元素。
  collect_set(app_name)[0]
FROM
  dw_db.dw_app_access_log
WHERE
    user_id <> ''
  AND
    app_name IN ('a-broker','i-broker')
  AND
    p_dt = ${dealDate}
GROUP BY
  user_id
;


-- 经纪人电话表
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


-- 带看量
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_visit_info;

CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_visit_info (
  broker_id string,
  visit_dkl string,
  visit_fq_dkl string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_visit_info
SELECT
  COALESCE(t_1.broker_uid,t_2.broker_uid) AS broker_uid,
  t_1.visit_dkl,
  t_2.visit_fq_dkl
FROM (
  SELECT
    s_1.broker_uid,
    COUNT(s_1.id) AS visit_dkl
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

FULL JOIN (
  SELECT
    s_2.broker_uid,
    COUNT(s_2.id) AS visit_fq_dkl
  FROM
    db_sync.angejia__visit AS s_2
  WHERE
    to_date(s_2.created_at) = ${dealDate}
  GROUP BY
    s_2.broker_uid
  ) AS t_2
ON
  t_1.broker_uid = t_2.broker_uid
;


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


--- 经纪人服务相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_service_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_service_info (
  broker_id STRING,
  history_avg_pj_num STRING,
  point_day_deduct_num STRING,
  point_month_deduct_num STRING,
  black_house_time STRING,
  broker_evaluate_day STRING,
  broker_evaluate_distinct_day STRING
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
  t_5.evaluate_distinct_day
FROM
  db_sync.angejia__broker AS bs

-- 历史上累计评价平均分
LEFT JOIN (
  SELECT
    s_1.broker_uid,
    AVG(s_1.level) AS num
  FROM
    db_sync.angejia__visit_review AS s_1
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
;
--- 经纪人服务相关 end ---


-- 客户相关
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


--- 经纪人房源相关 start ---

DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_inventory_info;

CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_inventory_info (
  broker_id string,
  inventory_all_sp_num string,
  inventory_day_num string,
  inventory_sham_num string,
  inventory_survey_num string,
  inventory_all_num string,
  inventory_survey_all_num string
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
  t_6.num
FROM
  db_sync.angejia__broker AS bs

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

LEFT JOIN (
  SELECT
    s_2.creator_uid,
    COUNT(s_2.id) AS num
  FROM
    db_sync.property__inventory AS s_2
  WHERE
    to_date(s_2.created_at) = ${dealDate}
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
;

--- 经纪人房源相关 end ---


--- 经纪人来电跟进量 start ---
-- 所有来电记录
drop table if exists dw_temp_angejia.swan_call_list_type;
create table dw_temp_angejia.swan_call_list_type as
select
  user_phone,
  broker_uid,
  max(type) as type
from
  db_sync.angejia__call_broker_contacts
where
  -- 0-不是私客  1-标记私客
  is_private_guest = 0
    and
  to_date(created_at) = ${dealDate}
group by
  user_phone,
  broker_uid
;

-- summary-1
DROP TABLE IF EXISTS dw_temp_angejia.swan_call_list_type_summary_1;
CREATE TABLE IF NOT EXISTS  dw_temp_angejia.swan_call_list_type_summary_1 AS
select
  broker_uid,
  coalesce(
    count(
      distinct user_phone
    ),0) as call,
  -- 经纪人做过标记的用户电话
  coalesce(
    count(
      distinct
      case
        when
          type <> 0
        then
          user_phone
      end
    ),0) as genjin_mark
from
  dw_temp_angejia.swan_call_list_type
group by
  broker_uid
;

-- summary-2
DROP TABLE IF EXISTS dw_temp_angejia.swan_call_list_type_summary_2;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.swan_call_list_type_summary_2 AS
select
  a.broker_uid,
  -- 被经纪人路过需求的电话
  coalesce(
    count(
      distinct b.buyer_uid
    ),0) as demand
from
  dw_temp_angejia.swan_call_list_type a
left outer join
  db_sync.angejia__demand b
    on
  a.user_phone = b.mark_phone
    and
  a.broker_uid = b.broker_uid
where
  a.type = 0
group by
  a.broker_uid
;

-- 计算临时结果
DROP TABLE IF EXISTS dw_temp_angejia.swan_call_list_type_result_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.swan_call_list_type_result_tmp AS
SELECT
  t.broker_uid,

  t.call,   -- 来电量

  (coalesce(t.genjin_mark,0) + coalesce(y.demand,0)) as genjin   -- 来电跟进量

-- summary-1
FROM
  dw_temp_angejia.swan_call_list_type_summary_1 AS t

-- summary-2
LEFT OUTER JOIN
  dw_temp_angejia.swan_call_list_type_summary_2 AS y

ON
  t.broker_uid = y.broker_uid
;

-- 写入结果
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_incoming_telegram;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_incoming_telegram (
  broker_id string,
  broker_laidian_num string,
  broker_laidian_genjin_num string,
  broker_laidian_genjin_rate string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_incoming_telegram
SELECT
  broker_uid,
  call, -- 来电量 去重
  genjin, -- 来电跟进量 去重
  ROUND(genjin / call,3) as broker_laidian_genjin_rate -- 来电跟进率
FROM
  dw_temp_angejia.swan_call_list_type_result_tmp
;
--- 经纪人来电跟进量 end ---


--- 经纪人微聊相关 start ---

--微聊基础信息表 汇总每天的微聊信息 剔除无效信息 --
drop table if exists dw_temp_angejia.dw_mobile_chat_msg_info_daily;

create table dw_temp_angejia.dw_mobile_chat_msg_info_daily
as
select
a.msg_id as msg_id,
b.value_desc as msg_type,
a.from_uid as sender_id,
a.to_uid as receiver_id,
c.value_desc as msg_status,
a.created_at as create_time,
a.updated_at as last_update,
to_date(a.created_at) as cal_dt
from
  db_sync.angejia__user_msg a
left join dw_db.dw_basis_common_data_dictionary b
  on a.content_type =b.value_code
left join dw_db.dw_basis_common_data_dictionary c
  on a.`status`=c.value_code
where a.from_uid not in (0,3,4)
  and a.to_uid not in (0,3,4)
  and a.content_type not in (5,106)
  and a.created_at >= '2015-04-09 15:00:00'
  and b.column_name = 'content_type'
  and c.column_name = 'status';

--用户发送消息临时表 --
drop table
if exists dw_temp_angejia.customer_send_info;

create table dw_temp_angejia.customer_send_info
as
select
a.cal_dt,
concat(sender_id, "/", receiver_id) as wechat_customer,
a.sender_id as user_id,
a.receiver_id as broker_id,
min(a.create_time) as user_send_time
from
  dw_temp_angejia.dw_mobile_chat_msg_info_daily a
join db_sync.angejia__user b
  on a.receiver_id = b.user_id
where b.user_type = 2
  and hour(a.create_time) between '9' and '22'
group by a.cal_dt,
         a.receiver_id,
         a.sender_id,
         concat(sender_id, "/", receiver_id);

--经纪人回复消息临时表 --
drop table if exists dw_temp_angejia.broker_reply_info;

create table dw_temp_angejia.broker_reply_info
as
select
a.cal_dt,
concat(receiver_id,"/",sender_id) as wechat_broker_reply,
a.receiver_id as user_id,
a.sender_id as broker_id,
a.create_time as broker_reply_time
from dw_temp_angejia.dw_mobile_chat_msg_info_daily a
join db_sync.angejia__user b
  on a.receiver_id = b.user_id
where b.user_type = 1
  and hour(a.create_time) between '9' and '22'
group by a.receiver_id,
         a.sender_id,
         a.cal_dt,
         concat(receiver_id,"/",sender_id),
         a.create_time;

--汇总消息临时表 --
drop table if exists dw_temp_angejia.wechat_info_total;

create table dw_temp_angejia.wechat_info_total
as
select a.cal_dt,
a.broker_id,
a.wechat_customer,
b.wechat_broker_reply,
a.user_send_time,
min(b.broker_reply_time) as broker_reply_time
from dw_temp_angejia.customer_send_info a
left join dw_temp_angejia.broker_reply_info b
  on a.wechat_customer = b.wechat_broker_reply
where a.user_send_time < b.broker_reply_time
  and a.cal_dt = b.cal_dt
group by a.cal_dt,
         a.broker_id,
         a.wechat_customer,
         b.wechat_broker_reply,
         a.user_send_time;

--计算5min回复率,当日回复率,平均回复时长 --
drop table if exists dw_temp_angejia.wechat_effect_info_5min_tmp;

create table dw_temp_angejia.wechat_effect_info_5min_tmp
as
select
broker_id,
count(distinct wechat_customer) as customer_info_radices,

count(distinct case when ((unix_timestamp(broker_reply_time)-unix_timestamp(user_send_time))<=300) = true then wechat_broker_reply end) as reply_by_broker_5min,
round(count(distinct case when ((unix_timestamp(broker_reply_time)-unix_timestamp(user_send_time))<=300) = true then wechat_broker_reply end)/count(distinct wechat_customer),2)*100 as reply_by_broker_5min_rate,
count(distinct case when wechat_broker_reply is not null then wechat_broker_reply end) as reply_by_broker_day,
round(count(distinct case when wechat_broker_reply is not null then wechat_broker_reply end)/count(distinct wechat_customer),2)*100 as reply_by_broker_day_rate,
coalesce(round(avg(case when wechat_broker_reply is not null then (unix_timestamp(broker_reply_time)-unix_timestamp(user_send_time))/60 end),2),0) as avg_reply_time,
cal_dt
from dw_temp_angejia.wechat_info_total
group by broker_id,cal_dt;

--计算当日用户发送消息临时表 --
drop table
if exists dw_temp_angejia.customer_send_info_day;

create table dw_temp_angejia.customer_send_info_day
as
select
a.cal_dt,
concat(sender_id, "/", receiver_id) as wechat_customer,
a.sender_id as user_id,
a.receiver_id as broker_id,
min(a.create_time) as user_send_time
from
  dw_temp_angejia.dw_mobile_chat_msg_info_daily a
join db_sync.angejia__user b
  on a.receiver_id = b.user_id
where b.user_type = 2
group by a.cal_dt,
         a.receiver_id,
         a.sender_id,
         concat(sender_id, "/", receiver_id);

--经纪人当日回复消息临时表 --
drop table if exists dw_temp_angejia.broker_reply_info_day;

create table dw_temp_angejia.broker_reply_info_day
as
select
a.cal_dt,
concat(receiver_id,"/",sender_id) as wechat_broker_reply,
a.receiver_id as user_id,
a.sender_id as broker_id,
a.create_time as broker_reply_time
from dw_temp_angejia.dw_mobile_chat_msg_info_daily a
join db_sync.angejia__user b
  on a.receiver_id = b.user_id
where b.user_type = 1
group by a.receiver_id,
         a.sender_id,
         a.cal_dt,
         concat(receiver_id,"/",sender_id),
         a.create_time;


--当日汇总消息临时表 --
drop table if exists dw_temp_angejia.wechat_info_total_day;

create table dw_temp_angejia.wechat_info_total_day
as
select a.cal_dt,
a.broker_id,
a.wechat_customer,
b.wechat_broker_reply,
a.user_send_time,
min(b.broker_reply_time) as broker_reply_time
from dw_temp_angejia.customer_send_info_day a
left join dw_temp_angejia.broker_reply_info_day b
  on a.wechat_customer = b.wechat_broker_reply
where a.user_send_time < b.broker_reply_time
  and a.cal_dt = b.cal_dt
group by a.cal_dt,
         a.broker_id,
         a.wechat_customer,
         b.wechat_broker_reply,
         a.user_send_time;

--计算当日微聊消息指标 --
drop table if exists dw_temp_angejia.wechat_effect_info_day_tmp;

create table dw_temp_angejia.wechat_effect_info_day_tmp
as
select
broker_id,
count(wechat_customer) as received_wechat_info_daily,
count(wechat_broker_reply) as reply_wechat_info_daily,
cal_dt
from dw_temp_angejia.wechat_info_total_day
group by broker_id,cal_dt;


--合并临时表指标 --
drop table if exists dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily;

create table dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily
as
select  
 a.broker_id
,a.customer_info_radices
,a.reply_by_broker_5min
,a.reply_by_broker_5min_rate
,a.reply_by_broker_day
,a.reply_by_broker_day_rate
,b.received_wechat_info_daily
,b.reply_wechat_info_daily
,a.avg_reply_time
,a.cal_dt
from dw_temp_angejia.wechat_effect_info_5min_tmp a
inner join dw_temp_angejia.wechat_effect_info_day_tmp b
  on a.broker_id = b.broker_id
 and a.cal_dt = b.cal_dt;

--- 经纪人微聊相关 end ---



---经纪人工作时长计算开始(文档地址:http://git.corp.angejia.com/dw/docs/blob/master/service/data-warehouse/db-design/dw/dw_db/table-design/dw_broker_working_hours.md)---

--当天经纪人打卡信息汇总
drop table if exists dw_db_temp.ray_broker_working_hours_gather_temp;
create table dw_db_temp.ray_broker_working_hours_gather_temp
as
select
user_id,
count(case when action_type=1 then `user_id` end) as open_times,
count(case when action_type=2 then `user_id` end) as close_times,
coalesce(sum(case when action_type=1 then unix_timestamp(created_at) end),0) as open_sum,
coalesce(sum(case when action_type=2 then unix_timestamp(created_at) end),0) as close_sum
from db_sync.angejia__log_user_switch where switch_id=1 and action_type in(1,2) and action_source="switch" and created_at >= ${dealDate} and created_at < from_unixtime(unix_timestamp(),'yyyy-MM-dd')
group by user_id;


--补充无打卡记录的其他经纪人之后的聚合表
drop table if exists dw_db_temp.ray_broker_working_hours_gather_full_temp;
create table dw_db_temp.ray_broker_working_hours_gather_full_temp
as
select
a.user_id,
coalesce(open_times,0) as open_times,
coalesce(close_times,0) as close_times,
coalesce(open_sum,0) as open_sum,
coalesce(close_sum,0) as close_sum
from db_sync.angejia__broker a left outer join dw_db_temp.ray_broker_working_hours_gather_temp b
on a.user_id=b.user_id
;

--把今天记录重新排序，为找到错误日志做准备
drop table if exists dw_db_temp.ray_broker_working_hours_renumber_temp;
create table dw_db_temp.ray_broker_working_hours_renumber_temp
as
select user_id, action_type, ROW_NUMBER() over (distribute by user_id sort by id asc) as row_id
from db_sync.angejia__log_user_switch
where
switch_id=1 and action_type in(1,2) and action_source="switch"
and created_at >= ${dealDate} and created_at < from_unixtime(unix_timestamp(),'yyyy-MM-dd')
;

--找出log有错误的用户
drop table if exists dw_db_temp.ray_broker_working_hours_bad_temp;
create table dw_db_temp.ray_broker_working_hours_bad_temp
as
select distinct a.user_id, 1 as check_flag
from
  dw_db_temp.ray_broker_working_hours_renumber_temp a
left outer join
  (select * from dw_db_temp.ray_broker_working_hours_renumber_temp where row_id = 1) b
on a.user_id=b.user_id
where
  case
    when (pmod(a.row_id,2) = pmod(b.row_id,2)) and (a.action_type = b.action_type) then false
    when (pmod(a.row_id,2) <> pmod(b.row_id,2)) and (a.action_type <> b.action_type) then false
  else
    true
  end
;


--七天内有打卡记录的经纪人最后操作类型
drop table if exists dw_db_temp.ray_broker_working_hours_review_temp;
create table dw_db_temp.ray_broker_working_hours_review_temp
as
select b.user_id,b.action_type as last_action
from
(select
user_id,
max(id) as max_id
from db_sync.angejia__log_user_switch group by user_id) a
inner join
db_sync.angejia__log_user_switch b
on a.user_id=b.user_id
where a.max_id=b.id and created_at >= from_unixtime(unix_timestamp(concat(${dealDate},' 00:00:00'))-7*24*60*60,'yyyy-MM-dd') ;

--当天所有打卡记录的经纪人工作时间
drop table if exists dw_db_temp.ray_broker_working_hours_temp;
create table dw_db_temp.ray_broker_working_hours_temp
as
select
a.user_id,
(
  --如果开启时间和与关闭时间和的差值大于一天，数据错误。
  case when (abs(close_times - open_times) <= 1) then(
    --排除掉错误数据的干扰
    case when (c.check_flag is null) then(
      --关闭次数大于打开次数：说明第一次是关闭状态,需要补全打开时间（当天0点）
      case when (open_times < close_times) then(

        close_sum - (open_sum + unix_timestamp(concat(${dealDate},' 00:00:00')))

      )
      --打开次数大于关闭次数，说明最后一次是打开状态，需要补全关闭时间（当天24点）
      when (open_times > close_times) then(

          (close_sum + unix_timestamp(concat(${dealDate},' 23:59:59'))+1) - open_sum

      --打开次数与关闭次数相等
      )else(

        --如果打开关闭都是0，说明今天无操作，关联追溯表，查找最新状态
        case when(open_times = 0) then(

          case when(last_action = 1) then
            24*60*60
          when(last_action = 2) then
            0
          else
            -3
          end

        )else(
          --如果结束时间戳和大于开始时间戳和，直接相减
          case when(close_sum >= open_sum) then(

            close_sum - open_sum

          --否则，说明今天第一次记录是关闭操作，最后一次记录是打开操作，需要补全开始时间和结束时间
          )else(

            (close_sum + unix_timestamp(concat(${dealDate},' 23:59:59'))+1) - (open_sum + unix_timestamp(concat(${dealDate},' 00:00:00')))

          )end
        )end

      )end

    )else(
      -2
    )end

  )else(
    -1
  )end
) as working_hours
from dw_db_temp.ray_broker_working_hours_gather_full_temp a
left outer join
dw_db_temp.ray_broker_working_hours_review_temp b
on a.user_id=b.user_id
left outer join
dw_db_temp.ray_broker_working_hours_bad_temp c
on a.user_id=c.user_id
;

---经纪人工作时长计算结束---


--- 统计经纪人访问量 START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_request_visit;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_request_visit (
  broker_id  STRING,
  broker_pv_home_day STRING,
  broker_uv_home_day STRING
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_request_visit
SELECT
  t_1.broker_id,
  COUNT(t_1.broker_id) AS broker_pv_home_day,
  COUNT(DISTINCT t_1.guid) AS broker_uv_home_day
from (
  SELECT
    regexp_extract(s_1.current_page,'^/broker/sh_([0-9]+)',1) AS broker_id,
    s_1.guid
  FROM
    dw_db.dw_web_visit_traffic_log AS s_1
  WHERE
      s_1.p_dt = ${dealDate}
    AND
      s_1.current_page_id = '10072'
) AS t_1
GROUP BY
  t_1.broker_id
;
--- 统计经纪人访问量 END ---


```



### 2、经纪人 HQL

``` sql

--- 经纪人日 summary 表 start ---

CREATE TABLE IF NOT EXISTS dw_db.dw_summary_broker_basis_info_daily (
  user_id STRING,

  broker_name STRING,

  broker_on_duty_date STRING,

  broker_status STRING,

  broker_city_name STRING,

  agent_name STRING,

  agent_company_name STRING,

  broker_label_name STRING,

  phone STRING,

  app_name STRING,

  call_jt_and_wjt STRING,

  call_jt STRING,

  call_jtr STRING,

  visit_dkl STRING,

  visit_fq_dkl STRING,

  followup_fdgjl STRING,

  followup_khgjl STRING,

  survey_skfys STRING,

  visit_avg_jj STRING,

  point_sy STRING,

  point_day STRING,

  demand_customer_num STRING,

  demand_customer_sk_num STRING,

  inventory_sp STRING,

  inventory_all STRING,

  inventory_followup_fygjl STRING,

  black_house STRING,

  msg_receive_people STRING,

  msg_five_reply_people STRING,

  msg_day_reply_people STRING,

  msg_avg_reply_time STRING,

  msg_received_wechat_info_daily STRING,

  msg_reply_wechat_info_daily STRING,

  inventory_sham_num STRING,

  broker_info_full_status STRING,

  broker_has_leader STRING,

  call_daily_num STRING,

  call_daily_people_num STRING,

  broker_laidian_genjin_num STRING,

  working_hours STRING,

  broker_laidian_num STRING,

  broker_laidian_genjin_rate STRING,

  inventory_all_num STRING,

  inventory_survey_all_num STRING,

  broker_pv_home_day STRING,

  broker_duty_status_id STRING,

  broker_city_id STRING,

  agent_id STRING,

  company_id STRING,

  agent_type_id STRING,

  agent_type_name STRING,

  followup_fygjl_qc STRING,

  followup_fdgjl_distinct STRING,

  followup_khgjl_distinct STRING,

  broker_evaluate_day STRING,

  broker_evaluate_distinct_day STRING,

  broker_uv_home_day STRING

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

  -- dw_temp_angejia.jason_dw_broker_summary_basis
  ds_broker_basis.broker_name,

  ds_broker_basis.broker_on_duty_date,

  ds_broker_basis.broker_duty_status,

  ds_broker_basis.broker_city_name,

  -- dw_temp_angejia.jason_dw_broker_summary_agent_info
  ds_broker_agent_info.agent_name,

  ds_broker_agent_info.company_name,

  ds_broker_agent_info.label_name,

  -- dw_temp_angejia.jason_dw_broker_summary_basis
  ds_broker_basis.broker_phone,

  -- dw_temp_angejia.jason_dw_user_summary_app_info
  ds_user_app_info.app_name,

  -- dw_temp_angejia.jason_dw_broker_summary_call_info
  ds_broker_call_info.call_jt_and_wjt,

  ds_broker_call_info.call_jt,

  ds_broker_call_info.call_wjt,

  -- dw_temp_angejia.jason_dw_broker_summary_visit_info
  ds_broker_visit_info.visit_dkl,

  ds_broker_visit_info.visit_fq_dkl,

  -- dw_temp_angejia.jason_dw_broker_summary_followup_info
  ds_broker_followup_info.followup_fdgjl,

  ds_broker_followup_info.followup_khgjl,

  -- dw_temp_angejia.jason_dw_broker_summary_inventory_info
  ds_broker_inventory_info.inventory_survey_num,

  -- dw_temp_angejia.jason_dw_broker_summary_service_info
  ds_broker_service_info.history_avg_pj_num ,

  ds_broker_service_info.point_month_deduct_num,

  ds_broker_service_info.point_day_deduct_num,

  -- dw_temp_angejia.jason_dw_broker_summary_demand_info
  ds_broker_demand_info.customer_day_num,

  ds_broker_demand_info.customer_all_sk_num,

  -- dw_temp_angejia.jason_dw_broker_summary_inventory_info
  ds_broker_inventory_info.inventory_all_sp_num,

  ds_broker_inventory_info.inventory_day_num,

  ds_broker_followup_info.followup_fygjl,

  -- dw_temp_angejia.jason_dw_broker_summary_service_info
  ds_broker_service_info.black_house_time,

  -- -- dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily
  ds_summary_broker_msg.customer_info_radices,

  ds_summary_broker_msg.reply_by_broker_5min,

  ds_summary_broker_msg.reply_by_broker_day,

  ds_summary_broker_msg.avg_reply_time,

  ds_summary_broker_msg.received_wechat_info_daily,

  ds_summary_broker_msg.reply_wechat_info_daily,

  -- dw_temp_angejia.jason_dw_broker_summary_inventory_info
  ds_broker_inventory_info.inventory_sham_num,

  -- dw_temp_angejia.jason_dw_broker_summary_basis
  ds_broker_basis.broker_info_full_status,

  ds_broker_basis.broker_has_leader,

  -- dw_temp_angejia.jason_dw_broker_summary_call_info
  ds_broker_call_info.call_daily_num,

  ds_broker_call_info.call_daily_people_num,

  -- dw_temp_angejia.jason_dw_broker_summary_incoming_telegram
  ds_broker_incoming_telegram.broker_laidian_genjin_num,

  -- dw_db_temp.ray_broker_working_hours_temp
  ds_broker_working_hours.working_hours,

  -- dw_temp_angejia.jason_dw_broker_summary_incoming_telegram
  ds_broker_incoming_telegram.broker_laidian_num,

  ds_broker_incoming_telegram.broker_laidian_genjin_rate,

  -- dw_temp_angejia.jason_dw_broker_summary_inventory_info
  ds_broker_inventory_info.inventory_all_num,

  ds_broker_inventory_info.inventory_survey_all_num,

  -- dw_temp_angejia.jason_dw_broker_summary_request_visit
  ds_broker_summary_request_visit.broker_pv_home_day,

  -- dw_temp_angejia.jason_dw_broker_summary_basis
  ds_broker_basis.broker_duty_status_id,

  ds_broker_basis.broker_city_id,

  -- dw_temp_angejia.jason_dw_broker_summary_agent_info
  ds_broker_agent_info.agent_id,

  ds_broker_agent_info.company_id,

  ds_broker_agent_info.agent_type_id,

  ds_broker_agent_info.agent_type_name,

  -- dw_temp_angejia.jason_dw_broker_summary_followup_info
  ds_broker_followup_info.followup_fygjl_qc,

  ds_broker_followup_info.followup_fdgjl_distinct,

  ds_broker_followup_info.followup_khgjl_distinct,

  -- dw_temp_angejia.jason_dw_broker_summary_service_info
  ds_broker_service_info.broker_evaluate_day,

  ds_broker_service_info.broker_evaluate_distinct_day,

  -- dw_temp_angejia.jason_dw_broker_summary_request_visit
  ds_broker_summary_request_visit.broker_uv_home_day

FROM
  db_sync.angejia__broker AS bs

LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_basis AS ds_broker_basis
ON
  bs.user_id = ds_broker_basis.broker_id


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_agent_info AS ds_broker_agent_info
ON
  bs.user_id = ds_broker_agent_info.broker_id


LEFT JOIN
  dw_temp_angejia.jason_dw_user_summary_app_info AS ds_user_app_info
ON
  bs.user_id = ds_user_app_info.user_id


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_call_info AS ds_broker_call_info
ON
  bs.user_id = ds_broker_call_info.broker_id


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_visit_info AS ds_broker_visit_info
ON
  bs.user_id = ds_broker_visit_info.broker_id


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_followup_info AS ds_broker_followup_info
ON
  bs.user_id = ds_broker_followup_info.broker_id


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_service_info AS ds_broker_service_info
ON
  bs.user_id = ds_broker_service_info.broker_id


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_demand_info AS ds_broker_demand_info
ON
  bs.user_id = ds_broker_demand_info.broker_id


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_inventory_info AS ds_broker_inventory_info
ON
  bs.user_id = ds_broker_inventory_info.broker_id


LEFT JOIN
  dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily AS ds_summary_broker_msg
ON
  bs.user_id = ds_summary_broker_msg.broker_id
    AND
  ds_summary_broker_msg.cal_dt = ${dealDate}


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_incoming_telegram AS ds_broker_incoming_telegram
ON
  bs.user_id = ds_broker_incoming_telegram.broker_id


LEFT JOIN
  dw_db_temp.ray_broker_working_hours_temp AS ds_broker_working_hours
ON
  bs.user_id = ds_broker_working_hours.user_id


LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_request_visit AS ds_broker_summary_request_visit
ON
  bs.user_id = ds_broker_summary_request_visit.broker_id


WHERE
  bs.user_id NOT IN (0,3,4)
    AND
  bs.city_id <> 3;

--- 经纪人日 summary 表 end ---

-- 导入到 mysql
export hive dw_db.dw_summary_broker_basis_info_daily
to mysql dw_db.dw_summary_broker_basis_info_daily PARTITION p_dt;

```



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 备份数据
  ./migrate-hive-tabel.sh source_table=dw_db.dw_summary_broker_basis_info_daily target_table=dw_history_db.dw_summary_broker_basis_info_daily_20150706

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_summary_broker_basis_info_daily;
  select count(*) from dw_history_db.dw_summary_broker_basis_info_daily_20150706;

MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_summary_broker_basis_info_daily_20150706
  LIKE
    dw_summary_broker_basis_info_daily;

  INSERT INTO
    dw_summary_broker_basis_info_daily_20150706
  SELECT
    *
  FROM
    dw_summary_broker_basis_info_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_summary_broker_basis_info_daily;
  select count(*) from dw_db.dw_summary_broker_basis_info_daily_20150706;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_summary_broker_basis_info_daily
  ADD COLUMNS(
    broker_uv_home_day STRING COMMENT '20150706 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_summary_broker_basis_info_daily
  ADD
    broker_uv_home_day varchar(255) NOT NULL DEFAULT '' AFTER broker_evaluate_distinct_day
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_summary_broker_basis_info_daily
  DROP PARTITION (
    p_dt = '2015-07-05'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_summary_broker_basis_info_daily
  WHERE
    p_dt = '2015-07-05'
```
