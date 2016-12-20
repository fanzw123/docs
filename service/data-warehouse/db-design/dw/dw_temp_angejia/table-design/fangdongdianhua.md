
### 1、在售

``` sql
select
 m.inventory_id
,case
 when m.survey_status='0' then '未实勘'
 when m.survey_status='1' then '实勘审核中'
 when m.survey_status='2' then '已实勘'
 when m.survey_status='3' then '被驳回' else '其它' end status
,m.community_name
,m.district_name
,m.block_name
,m.sale_price
,m.unit_price
,m.house_area
,m.bedrooms
,m.living_rooms
,m.bathrooms
,m.building_num
,m.door_num
,a.alias
,b.phone
,case
 when m.source in('4','5','6') then '房源局'
 when m.source in('1','3','7') then '房东'
 when m.source='2' then '经纪人' else '其它' end as source
,m.created_at
from dw_db.dw_property_summary_inventory_detail_daily m
left join db_sync.property__inventory_has_seller a on a.inventory_id =m.inventory_id
left join db_sync.angejia__user_phone b on  a.seller_uid = b.user_id
where p_dt='2015-09-10' and a.type='1' and m.district_id in ('8','9','13')
limit 10
;
```


### 2、所有的

``` sql
drop table if exists dw_temp_angejia.inventory_phone;
create table if not exists dw_temp_angejia.inventory_phone AS
select
 m.inventory_id
,m.community_name
,m.district_name
,m.block_name

,m.bedrooms
,m.living_rooms
,m.bathrooms
,m.building_num
,m.door_num
,a.alias
,b.phone
from dw_db.dw_inventory_detail_info_daily m
left join db_sync.property__inventory_has_seller a on a.inventory_id =m.inventory_id
left join db_sync.angejia__user_phone b on  a.seller_uid = b.user_id
where  a.type='1' and m.district_id in ('8','9','13')
;
```
