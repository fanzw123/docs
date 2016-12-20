# dw_broker_summary_incoming_telegram 经纪人来电跟进量

## 字段
```
broker_id 经纪人 id
broker_name 经纪人名字
broker_laidian_genjin_num 经纪人来电跟进量
```

## HQL

运行时间

```
CREATE TABLE IF NOT EXISTS dw_temp_angejia.dw_broker_summary_incoming_telegram (
  broker_id string,
  broker_name string,
  broker_laidian_genjin_num string
);


/*房东跟进*/
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


/*买家跟进*/
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


/*房源跟进*/
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


/*所有跟进*/
drop table if exists dw_temp_angejia.swan_genjin_daily_20150504;
create table
  dw_temp_angejia.swan_genjin_daily_20150504 as
select
  t.broker_uid,
  t.phone,
  t.cal_dt,
  t.create_at,
  concat(t.phone,t.create_at) as genjin_detail
from
(
  select
    *
  from
    dw_temp_angejia.swan_genjin_commission_daily  
  union all
    select * from dw_temp_angejia.swan_genjin_buyer_daily
  union all
    select * from dw_temp_angejia.swan_genjin_inventory_daily
)t
;


/*来电记录*/
drop table if exists dw_temp_angejia.swan_laidian_id_daily_20150504;
create
  table dw_temp_angejia.swan_laidian_id_daily_20150504 as
select
  a.called_uid as broker_uid,
  a.caller_uid,
  a.caller,
  b.user_id,
  start_at,
  concat(a.caller,start_at) as call_detail,
  to_date(start_at) as cal_dt
from
  db_sync.angejia__call_log a
left outer join
  db_sync.angejia__user_phone b
on
  a.caller=b.phone
left join
  db_sync.angejia__call_blacklist c
on
  a.caller=c.phone
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
;


drop table if exists
  dw_temp_angejia.swan_laidian_genjin_daily_20150504;
create table
  dw_temp_angejia.swan_laidian_genjin_daily_20150504 as
select
  t.name,
  t.broker_uid,
  if(t.call_num<t.genjin_num,t.call_num,t.genjin_num) as laidian_genjin_num
from
(
select
  c.name,
  a.broker_uid,
  count(distinct a.call_detail) as call_num,
  count(distinct b.genjin_detail) as genjin_num
from
  dw_temp_angejia.swan_laidian_id_daily_20150504 a

join
  dw_temp_angejia.swan_genjin_daily_20150504 b
on
  a.broker_uid=b.broker_uid
and
  a.caller=b.phone
and
  a.cal_dt=b.cal_dt

join
  db_sync.angejia__broker c
on
  a.broker_uid=c.user_id
where
  c.city_id<>3
and
  c.status=2
group by
  a.broker_uid,
  c.name
)t;


/* 写入结果 */
INSERT OVERWRITE TABLE
  dw_temp_angejia.dw_broker_summary_incoming_telegram
partition(
  p_dt = ${dealDate}
)
SELECT
  broker_uid,
  name,
  laidian_genjin_num
FROM
  dw_temp_angejia.swan_laidian_genjin_daily_20150504
;

```
