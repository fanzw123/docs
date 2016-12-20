# dw_property_summary_inventory_seller_info 房源房东信息

## 字段

``` sql

landlord_name '房东姓名'

landlord_phone '房东电话'

```

## HQL

依赖

- db_sync.property__inventory_has_seller

-

``` sql

--房东信息--

drop table if exists dw_db_temp.eric_inventory_seller_info_tmp;

create table dw_db_temp.eric_inventory_seller_info_tmp
as
select a.inventory_id
      ,a.alias as landlord_name
      ,b.phone as landlord_phone
from db_sync.property__inventory_has_seller a
left outer join db_sync.angejia__user_phone b
  on a.seller_uid=b.user_id
where to_date(a.created_at) = ${dealDate}
  and b.phone is not null;

```
