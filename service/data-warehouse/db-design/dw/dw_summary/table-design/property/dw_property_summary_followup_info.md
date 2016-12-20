# dw_property_summary_followup_info 房源跟进信息表

## 字段

``` sql

inventory_id '房源ID'

followup_broker_cnt '当日房源跟进经纪人数'

followup_cnt '当日房源跟进数'

```

## HQL

依赖
- db_sync.angejia__inventory_followup

``` sql

--followup指标--

drop table if exists dw_db_temp.eric_inventory_followup_metrics_tmp;

create table dw_db_temp.eric_inventory_followup_metrics_tmp
as
select a.inventory_id
      ,count(a.inventory_id) as followup_cnt
      ,count(distinct a.broker_uid) as followup_broker_cnt
 from db_sync.angejia__inventory_followup a
left join db_sync.angejia__broker b
  on a.broker_uid = b.user_id
where a.type = 0 --0经纪人写跟进操作--
  and b.user_id not in (0,3,4)
  and b.city_id <> 3
  and to_date(a.create_at) = ${dealDate}
group by a.inventory_id;

--- 房源跟进指标 end ---

```
