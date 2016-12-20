# dw_property_summary_survey_info 房源实堪信息表

## 字段

``` sql

inventory_id '房源ID'

last_survey_date '最近实堪日期'

```

## HQL

依赖
- db_sync.angejia__survey

``` sql

--survey指标--

drop table if exists dw_db_temp.eric_inventory_survey_metrics_tmp;

create table dw_db_temp.eric_inventory_survey_metrics_tmp
as
select a.inventory_id
      ,max(to_date(a.updated_at)) as last_survey_date
from db_sync.angejia__survey a
left join db_sync.angejia__broker b
  on a.broker_uid = b.user_id
where a.status=1
  and b.user_id not in (0,3,4)
  and b.city_id <> 3
group by a.inventory_id;

--- 房源实堪指标 end ---

```
