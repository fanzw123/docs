# dw_property_summary_protection_info 房源护盘信息表

## 字段

``` sql

1、review_at 审核时间

2、status 护盘状态(STATUS_REVIEW_PENDING = 1;//待审核 STATUS_REJECTED = 2;//被驳回 STATUS_REVIEWED = 3;//已审核 STATUS_REVIEWED_BUT_NO_BROKER = 4;//已审核但无护盘人
STATUS_REMOVED = 5;//删除)

3、start_at 护盘开始时间

```

## HQL

依赖
- db_sync.angejia__protection **已同步**

护盘流程图
- [protection  护盘流程图](http://www.processon.com/view/link/55ae09c2e4b04efba0a7f6cf)

``` sql

--护盘指标--

drop table if exists dw_db_temp.eric_inventory_protection_metrics_tmp;

create table dw_db_temp.eric_inventory_protection_metrics_tmp
as
select a.inventory_id
      ,count(case when a.status = 3 then a.inventory_id end) as protection_cnt
      ,count(case when a.status = 3 and to_date(a.start_at) = date_sub(${dealDate},7) then a.inventory_id end) as seven_protection_cnt
from db_sync.angejia__protection  a
left join db_sync.angejia__broker b
  on a.protection_broker_uid = b.user_id
  and b.user_id not in (0,3,4)
  and b.city_id <> 3
group by a.inventory_id;

--房源护盘指标 end--

```
