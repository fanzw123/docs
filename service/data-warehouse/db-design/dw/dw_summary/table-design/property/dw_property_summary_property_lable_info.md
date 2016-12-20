# dw_property_summary_inventory_lable_info 房源我要卖标签信息

## 字段

``` sql

inventory_id '房源ID'

collect_inventory_broker_counter '被经纪人标记我要卖次数'

```

## HQL

依赖
- db_sync.angejia__broker_collect_property

``` sql

--我要卖标签指标--

drop table if exists dw_db_temp.eric_inventory_followup_metrics_tmp;

create table dw_db_temp.eric_inventory_followup_metrics_tmp
as
select inventory_id,
       count(distinct broker_uid)
from db_sync.angejia__broker_collect_property
where is_valid ='1'
  and to_date(updated_at) = ${dealDate}
group by inventory_id;

--我要卖标签指标 end---

```
