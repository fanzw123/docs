# dw_property_summary_visit_info 房源带看信息表

## 字段

``` sql

inventory_id '房源ID'

last_visit_date '最近带看日期'

visit_broker_counter '累计带看经纪人数'

visit_broker_daily '当日房源带看经纪人数'

inventory_visit_daily '当日房源带看数'

```

## HQL

依赖
- db_sync.angejia__visit
- db_sync.angejia__visit_item

``` sql

--visit指标--

drop table if exists dw_db_temp.eric_inventory_visit_metrics_tmp;

create table dw_db_temp.eric_inventory_visit_metrics_tmp
as
select b.inventory_id
      ,max(to_date(a.visit_at)) as last_visit_date
      ,count(a.broker_uid) as visit_cnt
      ,count(distinct a.broker_uid) as visit_broker_cnt
      ,count(distinct a.buyer_uid) as visit_buyer_cnt
from db_sync.angejia__visit a
left join db_sync.angejia__visit_item b
  on a.id = b.visit_id
left join db_sync.angejia__broker c
  on a.broker_uid = c.user_id
where to_date(a.visit_started_at) = ${dealDate}
  and a.is_valid=1
  and a.is_buyer_denied=0
  and c.user_id not in (0,3,4)
  and c.city_id <> 3
  and b.is_active=1
group by b.inventory_id;

--- 房源带看指标 end ---

```
