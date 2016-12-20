# dw_property_summary_property_basis_info property房源的基本属性

## 字段

``` sql

id '房源ID,property表'

house_id '字典ID'

creator_uid '创建用户ID'

bedrooms '卧室数'

living_rooms '客厅数'

bathrooms '卫生间数'

is_real '是否真实，0 不; 1 是'

status '房源状态，1 在卖; 2 已卖'

has_checked '是否已审核，0-未审核；1-已审核'

community_id '小区ID'

building_num '楼栋号'

building_unit '楼栋号单位'

unit_num '单元号'

door_num '门牌号'

orientation '朝向 e ; w ; n ; s ; ne ; nw ; se; sw; sn; ew'

floor '楼层'

total_floors '总共楼层'

built_year '建筑年代'

use_type '使用(产权)类型 1 住宅; 2 商住; 3 商业详情与配置文件一致'

created_at '创建日期'

```

## HQL

依赖
- db_sync.property__property
- db_sync.property__house

``` sql

--property基础信息--

drop table if exists dw_db_temp.eric_property_basis_info_tmp;

create table dw_db_temp.eric_property_basis_info_tmp
as
select
 a.id
,a.house_id
,a.creator_uid
,a.bedrooms
,a.living_rooms
,a.bathrooms
,(case when a.is_real = 0 then 'N'
       when a.is_real = 1 then 'Y'
  else 'UNKNOW'
 end)  as is_real
,a.status as sale_status
,a.has_checked
,b.community_id
,b.building_num
,b.building_unit
,b.unit_num
,b.door_num
,(case when b.orientation = 's' then '朝南'
       when b.orientation = 'n' then '朝北'
       when b.orientation = 'e' then '朝东'
       when b.orientation = 'w' then '朝西'
       when b.orientation = 'ne' then '朝东北'
       when b.orientation = 'nw' then '朝西北'
       when b.orientation = 'se' then '朝东南'
       when b.orientation = 'sw' then '朝西南'
       when b.orientation = 'sn' then '南北通透'
       when b.orientation = 'ew' then '东西通透'
 else '其他'
 end)as orientation
,b.floor
,b.total_floors
,b.built_year
,b.use_type
,to_date(a.created_at) as created_at
from db_sync.property__property a
left join db_sync.property__house b
  on a.house_id = b.id
where to_date(a.created_at) = ${dealDate};

--- 房源property基础信息 end ---

```
