# dw_broker_summary_incoming_telegram 经纪人来电

## 字段
``` sql
broker_id '经纪人 id'
broker_laidian_num string '来电量 去重',
broker_laidian_genjin_num string '来电跟进量 去重',
broker_laidian_genjin_rate string '来电跟进率'
```

## HQL


依赖
- db_sync.angejia__commission
- db_sync.angejia__commission_followup
- db_sync.angejia__user_phone
- db_sync.angejia__buyer_followup
- db_sync.angejia__inventory_followup
- db_sync.property__inventory
- db_sync.angejia__call_log
- db_sync.angejia__call_blacklist
- db_sync.angejia__call_badge_log

``` sql

--- 经纪人来电跟进量 start

-- 房东跟进
drop table if exists dw_temp_angejia.swan_genjin_commission_daily;
create table
  dw_temp_angejia.swan_genjin_commission_daily as
select
  a.broker_uid,
  c.phone,
  to_date(a.create_at) as cal_dt,
  a.create_at
from
  db_sync.angejia__commission_followup a
left outer join
  db_sync.angejia__commission b on a.commission_id=b.id
left outer join
  db_sync.angejia__user_phone c on b.seller_uid=c.user_id
where
  to_date(a.create_at)= ${dealDate}
and
  a.broker_uid not in (0,3,4)
;


-- 买家跟进
drop table if exists dw_temp_angejia.swan_genjin_buyer_daily;
create table
  dw_temp_angejia.swan_genjin_buyer_daily as
select
  a.broker_uid,
  b.phone,
  to_date(a.create_at) as cal_dt,
  a.create_at
from
  db_sync.angejia__buyer_followup a
left outer join
  db_sync.angejia__user_phone b
on
  a.buyer_uid=b.user_id
where
  to_date(a.create_at) = ${dealDate}
and
  a.broker_uid not in (0,3,4)
;


-- 房源跟进
drop table if exists dw_temp_angejia.swan_genjin_inventory_daily;
create table dw_temp_angejia.swan_genjin_inventory_daily as
select
  a.broker_uid,
  d.phone,
  to_date(a.create_at) as cal_dt,
  a.create_at
from
  db_sync.angejia__inventory_followup a
left outer join
  db_sync.property__inventory b on a.inventory_id=b.id
left outer join
  db_sync.angejia__commission c on b.id=c.inventory_id
left outer join
  db_sync.angejia__user_phone d on c.seller_uid=d.user_id  
where
  to_date(a.create_at)= ${dealDate}
and
  a.broker_uid not in (0,3,4)
;


-- 所有跟进
drop table if exists dw_temp_angejia.swan_genjin_daily_20150504;
create table
  dw_temp_angejia.swan_genjin_daily_20150504 as
select
  t.broker_uid,
  t.phone,
  t.cal_dt
from
(
  select
    *
  from
    dw_temp_angejia.swan_genjin_commission_daily as s_1
  union all
    select * from dw_temp_angejia.swan_genjin_buyer_daily as s_2
  union all
    select * from dw_temp_angejia.swan_genjin_inventory_daily as s_3
) t

group by
  t.broker_uid,
  t.phone,
  t.cal_dt
;


-- 来电记录
drop table if exists dw_temp_angejia.swan_laidian_id_daily_20150504;
create table
  dw_temp_angejia.swan_laidian_id_daily_20150504 as
select
  a.called_uid as broker_uid,
  a.caller as phone,
  to_date(a.start_at) as cal_dt
from
  db_sync.angejia__call_log a
left join
  db_sync.angejia__call_blacklist c
on
  a.caller=c.phone
left join
  db_sync.angejia__call_badge_log d
on
  a.caller = d.user_phone
where
  c.phone is null
and
  call_type =2
and
  called_uid not in (0,3,4)
and
  keep_time>0
and
  to_date(start_at) = ${dealDate}
and
  d.status <> 1
group by
  a.called_uid,
  a.caller,
  to_date(a.start_at)

;



-- 汇总
drop table if exists dw_temp_angejia.swan_laidian_daily;
create table  
  dw_temp_angejia.swan_laidian_daily as
select
  t_1.broker_uid,
  t_1.phone,
  t_1.cal_dt,
  t_2.broker_uid as genjin_broker_uid
from
  dw_temp_angejia.swan_laidian_id_daily_20150504 as t_1

left join
  dw_temp_angejia.swan_genjin_daily_20150504 as t_2
on
  t_2.broker_uid = t_1.broker_uid
    and
  t_2.phone = t_1.phone
    and
  t_2.cal_dt = t_1.cal_dt;


-- 日来电跟进统计
drop table if exists dw_temp_angejia.jason_laidian_genjin_daily;
create table
  dw_temp_angejia.jason_laidian_genjin_daily as
select
  broker_uid,
  count(phone) as laidian_num,
  count(
    case
      when
        genjin_broker_uid is not null
      then
        phone
    end
    ) as laidian_genjin_num,
  cal_dt as p_dt
from
  dw_temp_angejia.swan_laidian_daily
group by
  broker_uid,
  cal_dt;



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
  laidian_num,
  laidian_genjin_num,
  ROUND(laidian_genjin_num / laidian_num,3) as broker_laidian_genjin_rate
FROM
  dw_temp_angejia.jason_laidian_genjin_daily
;


--- 经纪人来电跟进量 end
```
