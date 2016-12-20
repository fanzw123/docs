# 房源宽表

主表使用property.inventory

## 房源的基本属性

A.property.house 展示的是房子自身属性信息

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | property_id | string | property.inventory | 房源ID |
| 2 | inventory_id | string | property.inventory | 房源展示ID |
| 3 | city_id | string | property.inventory | 城市ID |
| 4 | city_name | string | angejia_dw.city | 城市名称 |
| 5 | district_id | string | angejia_dw.district | 区域ID |
| 6 | district_name | string | angejia_dw.district | 区域名称 |
| 7 | block_id | string | angejia_dw.block | 板块ID |
| 8 | block_name | string | angejia_dw.block | 板块名称 |
| 9 | community_id | string | angejia_dw.community | 小区ID |
| 10 | community_name | string | angejia_dw.community | 小区名称 |
| 11 | creator_uid | string | property.inventory | 创建用户ID |
| 12 | source | string | property.inventory | 发布来源 | 1 房东发房(委托录入); 2 经纪人发房; 3 CC发房;4 抓取 5 房源局导入 6 平台房源复制 |
| 13 | sale_price | string | property.inventory | 房源售价 |  |
| 14 | unit_price | string | property.inventory | 每平方米单价 |  |
| 15 | area | string | property.inventory | 房屋面积 |  |
| 16 | fitment | string | property.inventory | 装修情况 |  |
| 17 | is_empty | string | property.inventory | 是否空屋 | 0 非空屋;1 空屋; 2未知 |
| 18 | is_exclusive | string | property.inventory | 是否独家 | 0 不是; 1 是; 2未知 |
| 19 | has_loan | string | property.inventory | 是否有贷款 |  0 没有; 1 有; 2未知 |
| 20 | loan_detail | string | property.inventory | 贷款详情 |  |
| 21 | deliver_time | string | property.inventory | 最快交付时间 |  |
| 22 | landlord_name | string | property.inventory_has_seller | 房东姓名 |  |
| 23 | landlord_phone | string | property.inventory_has_seller | 房东电话 |  |
| 24 | building_num | string | property.house | 楼栋号 |  |
| 25 | building_unit | string | property.house | 楼栋号单位 |  |
| 26 | unit_num | string | property.house | 单元号 |  |
| 27 | door_num | string | property.house | 门牌号 |  |
| 28 | orientation | string | property.house | 朝向 | e ; w ; n ; s ; ne ; nw ; se; sw; sn; ew |
| 29 | floor | string | property.house | 楼层 |  |
| 30 | total_floors | string | property.house | 总共楼层 |  |
| 31 | built_year | string | property.house | 建筑年代 |  |
| 32 | use_type | string | property.house | 使用(产权)类型 | 1 住宅; 2 商住; 3 商业详情与配置文件一致 |
| 33 | bedrooms | string | property.property | 卧室数 |  |
| 34 | living_rooms | string | property.property | 客厅数 |  |
| 35 | bathrooms | string | property.property | 卫生间数 |  |
| 36 | maintainer_uid | string | property.inventory | 护盘经纪人ID |  |
| 37 | survey_status | string | property.inventory | 实勘状态 | 0 未实勘；1 实勘审核中；2已实勘 3被驳回 |
| 38 | is_real | string | property.inventory | 是否真实 | 0 不; 1 是 |
| 39 | has_checked | string | property.house | 是否已审核 | 0-未审核；1-已审核 |
| 40 | status | string | property.inventory | 交易状态 | 0无效(被丢弃); 1不卖; 2在卖; 3交易中; 4已卖 |
| 41 | has_image | string | property.inventory_image | 是否有图 | 1.房源图; 2-小区图; 3-无图 |
| 42 | house_image_counter | string | property.inventory_image | 房源图数量 |  |
| 43 | sale_labeled | string | property.inventory_image | 被经纪人标记为我要卖的次数 |  |
| 44 | creator_broker_name  | string | property.inventory | 创建经纪人姓名 |
| 45 | provider_id  | string | property.inventory | 资源提供者ID |
| 46 | provider_type  | string | property.inventory | 资源提供者类型 |
| 47 | seller_broker_uid  | string | property.inventory | 卖家经纪人ID |
| 48 | seller_broker_name  | string | property.inventory | 卖家经纪人姓名 |
| 49 | survey_broker_uid  | string | property.inventory | 实勘经纪人ID |
| 50 | survey_broker_name  | string | property.inventory | 实勘经纪人姓名 |
| 51 | maintainer_uid  | string | property.inventory | 护盘经纪人ID |
| 52 | maintainer_broker_name  | string | property.inventory | 护盘经纪人姓名 |
| 53 | exclusive_broker_uid  | string | property.inventory | 独家归属经纪人ID |
| 54 | exclusive_broker_name  | string | property.inventory | 独家归属经纪人姓名 |
| 55 | key_holder_uid  | string | property.inventory | 钥匙归属经纪人ID |
| 56 | key_holder_broker_name  | string | property.inventory | 钥匙归属经纪人姓名 |
| 57 | publish_broker_uid  | string | property.inventory | 开盘经纪人ID |
| 58 | publish_broker_name  | string | property.inventory | 开盘经纪人姓名 |
| 59 | p_dt  | string | property.inventory | 统计日期 |

## Touchweb指标

```
**TIPS：**

由于TouchWeb的展示是使用的inventory_id，数据粒度比property_id更细

```

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| --- | --- | ---| --- | ---  | --- | --- | --- | --- |
| 1 | touch_vpud | string  | dw_db.dw_web_visit_traffic_log | TouchWeb房源UD | count(distinct case when current_page_id = '10035'  and brower_type <> 'MicroMessenger' then guid end) |
| 2 | touch_vppv  | string | dw_db.dw_web_visit_traffic_log | TouchWeb房源PV | count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' then guid end) |
| 3 | wechat_public_num_vpud  | string | dw_db.dw_web_visit_traffic_log | 公众号访问房源UD | count(distinct case when current_page_id = '10035' and brower_type = 'MicroMessenger' then guid end) |
| 4 | wechat_public_num_vppv  | string | dw_db.dw_web_visit_traffic_log | 公众号访问房源PV | count(case when current_page_id id = '10035' and brower_type = 'MicroMessenger' then guid end) |
| 5 | pc_vpud  | string | dw_db.dw_web_visit_traffic_log | PC房源UD | count(distinct case when current_page_id = '20008' then guid end) as pc_vpud |
| 6 | pc_vppv  | string | dw_db.dw_web_visit_traffic_log | PC房源PV | count(case when current_page_id = '20008' then guid end) as pc_vppv |
| 7 | touch_phone_counseling_click  | string | dw_db.dw_web_action_detail_log | TouchWeb电话咨询_click |  |
| 8 | pc_phone_counseling_click  | string | dw_db.dw_web_action_detail_log | PC电话咨询_click |  |
| 9 | touch_reservation_visit_click  | string | dw_db.dw_web_action_detail_log | TouchWeb预约看房_click |  |
| 10 | pc_reservation_visit_click  | string | dw_db.dw_web_action_detail_log | PC预约看房_click |  |

## APP指标

### IOS

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| --- | --- | ---| --- | ---  | --- | --- | --- | --- |
| 1 | app_vpud_ios | string  | dw_db.dw_app_access_log | APP房源UD-IOS | count(distinct case when request_uri rlike '^/mobile/member/inventories/[0-9]+$' and app_name = 'i-angejia' then device_id end) |
| 2 | app_vppv_ios | string  | dw_db.dw_app_access_log | APP房源PV-IOS | count(case when request_uri rlike '^/mobile/member/inventories/[0-9]+$' and app_name = 'i-angejia' then device_id end) |
| 3 | app_phone_counseling_click_ios  | string | dw_db.dw_web_action_detail_log | app电话咨询_click_ios |  |
| 4 | app_reservation_visit_click_ios  | string | dw_db.dw_web_action_detail_log | app预约看房_click_ios|  |

### Android

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| --- | --- | ---| --- | ---  | --- | --- | --- | --- |
| 1 | app_vpud_android | string  | dw_db.dw_app_access_log | APP房源UD-android | count(distinct case when request_uri rlike '^/mobile/member/inventories/[0-9]+$' and app_name = 'a-angejia' then device_id end) |
| 2 | app_vppv_android | string  | dw_db.dw_app_access_log | APP房源PV-android | count(case when request_uri rlike '^/mobile/member/inventories/[0-9]+$' and app_name = 'a-angejia' then device_id end) |
| 3 | app_phone_counseling_click_android  | string | dw_db.dw_web_action_detail_log | app电话咨询_click_android |  |
| 4 | app_reservation_visit_click_android  | string | dw_db.dw_web_action_detail_log | app预约看房_click_android |  |

## 经纪人指标

```
**TIPS：**

针对该房源统计去重的经纪人数据量

For property

```

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| --- | --- | ---| --- | ---  | --- | --- | --- | --- |
| 1 | last_followup_date | string  | property.inventory | 最近跟进时间 |  |
| 2 | followup_broker_counter | string  | db_sync.angejia__inventory_followup | 该房源被经纪人跟进次数 | |
| 3 | inventory_followup_broker_daily | string  | db_sync.angejia__inventory_followup | 该房源当日被经纪人跟进量 |  |
| 6 | last_survey_date | string  | db_sync.angejia__survey | 最近实堪时间 |  |
| 7 | survey_status | string  | db_sync.angejia__survey | 最近实堪时间 |  |
| 8 | last_visit_date | string  | db_sync.angejia__visit | 最近带看时间 |  |
| 9 | visit_broker_counter | string  | db_sync.angejia__visit | 该房源被经纪人带看次数 |  |
| 10 | visit_broker_daily | string  | db_sync.angejia__visit | 该房源当日被房源带看次数 |  |

## 小区指标

```
**TIPS：**

小区设计成宽表

```

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| --- | --- | ---| --- | ---  | --- | --- | --- | --- |
| 1 | community_id | string  | db_sync.angejia__community | 小区ID |  |
| 2 | community_name | string  | db_sync.angejia__community | 小区名称 |  |
| 3 | community_basis_info | string  | db_sync.angejia__community_extend | 小区介绍 |  |
| 4 | community_avg_price | string  | db_sync.community_avg_price | 小区均价 |  |
| 5 | community_built | string  | db_sync.angejia__community_extend | 小区建造年代 |  |
| 6 | community_lng | string  | db_sync.angejia__community | 小区经度 |  |
| 7 | community_lat | string  | db_sync.angejia__community | 小区维度 |  |
| 8 | community_pv_touchweb | string  | dw_db.dw_web_visit_traffic_log | 小区pv-touchweb |  |
| 9 | community_ud_touchweb | string  | dw_db.dw_web_visit_traffic_log | 小区ud-touchweb |  |
| 10 | community_pv_pc | string  | dw_db.dw_web_visit_traffic_log | 小区pv-pc |  |
| 11 | community_ud_pc | string  | dw_db.dw_web_visit_traffic_log | 小区ud-pc |  |
| 12 | community_app_pv_ios | string  | dw_db.dw_app_access_log | APP小区pv-ios |  |
| 13 | community_app_ud_ios | string  | dw_db.dw_app_access_log | APP小区ud-ios |  |
| 14 | community_app_ud_android | string  | dw_db.dw_app_access_log | APP小区pv-android |  |
| 15 | community_app_ud_android | string  | dw_db.dw_app_access_log | APP小区ud-android |  |
| 16 | community_on_sale | string  | property.inventory | 小区在售房源数 |  |
| 17 | community_in_agent | string  | db_sync.angejia__broker | 小区所属中心 |  |
| 18 | community_survey_total | string  | db_sync.angejia__survey | 小区总实堪量 |  |
| 19 | community_visit_total | string  | db_sync.angejia__visit | 小区总带看量 |  |


## 小安指标

```
**TIPS：**

针对小安处理房源的指标录入，逻辑需要确认

```

派单量

电话量
  电话量--房东
  电话量--买家

录入量

## 运算 HQL


``` sql

---计算followup指标---
drop table if exists dw_db_temp.eric_inventory_followup_metrics_tmp;

create table dw_db_temp.eric_inventory_followup_metrics_tmp
as
select a.inventory_id
      ,max(to_date(a.create_at)) as last_followup_date
      ,count(a.broker_uid) as followup_broker_counter
      ,count(case when to_date(a.create_at)= ${dealDate} then a.broker_uid end) as inventory_followup_broker_daily
      ,count(case when to_date(a.create_at)= ${dealDate} then a.inventory_id end) as inventory_followup_daily
 from db_sync.angejia__inventory_followup a
left join db_sync.angejia__broker b
  on a.broker_uid = b.user_id
left join dw_db_temp.eric_inventory_time_tmp c
  on to_date(a.create_at) = c.cal_dt
where a.type = 0 --0经纪人写跟进操作--
  and b.user_id not in (0,3,4)
  and b.city_id <> 3
group by a.inventory_id;

---计算survey指标
drop table if exists dw_db_temp.eric_inventory_survey_metrics_tmp;

create table dw_db_temp.eric_inventory_survey_metrics_tmp
as
select a.inventory_id

      ,max(to_date(a.created_at)) as last_survey_date

      ,count(a.broker_uid) as survey_broker_counter

      ,count(case when to_date(a.updated_at) = ${dealDate} then a.broker_uid end) as survey_broker_daily

      ,count(case when to_date(a.updated_at) >= c.week_beg_dt and to_date(a.updated_at) <= ${dealDate} then a.broker_uid end) as survey_broker_week

      ,count(case when to_date(a.updated_at) >= c.month_beg_dt and to_date(a.updated_at) <= ${dealDate} then a.broker_uid end) as survey_broker_month

      ,count(case when to_date(a.updated_at) = ${dealDate} then a.inventory_id end) as inventory_survey_daily

      ,count(case when to_date(a.updated_at) >= c.week_beg_dt and to_date(a.updated_at) <= ${dealDate} then a.inventory_id end) as inventory_survey_week

      ,count(case when to_date(a.updated_at) >= c.month_beg_dt and to_date(a.updated_at) <= ${dealDate} then a.inventory_id end) as inventory_survey_month

from db_sync.angejia__survey a
left join db_sync.angejia__broker b
  on a.broker_uid = b.user_id
left join dw_db_temp.eric_inventory_time_tmp c
  on to_date(a.updated_at) = c.cal_dt
where a.status=1
  and b.user_id not in (0,3,4)
  and b.city_id <> 3
group by a.inventory_id;

---visit指标----

drop table if exists dw_db_temp.eric_inventory_visit_metrics_tmp;

create table dw_db_temp.eric_inventory_visit_metrics_tmp
as
select b.inventory_id

      ,max(to_date(a.visit_at)) as last_visit_date

      ,count(a.broker_uid) as visit_broker_counter

      ,count(case when to_date(a.visit_started_at) = ${dealDate} then a.broker_uid end) as visit_broker_daily

      ,count(case when to_date(a.visit_started_at) >= d.week_beg_dt and to_date(a.visit_started_at)<= ${dealDate} then a.broker_uid end) as visit_broker_week

      ,count(case when to_date(a.visit_started_at) >= d.month_beg_dt and to_date(a.visit_started_at)<= ${dealDate} then a.broker_uid end) as visit_broker_month

      ,count(case when to_date(a.visit_started_at) = ${dealDate} then buyer_uid end) as inventory_visit_daily

      ,count(case when to_date(a.visit_started_at) >= d.week_beg_dt and to_date(a.visit_started_at)<= ${dealDate} then a.buyer_uid end) as inventory_visit_week

      ,count(case when to_date(a.visit_started_at) >= d.month_beg_dt and to_date(a.visit_started_at)<= ${dealDate} then a.buyer_uid end) as inventory_visit_month

from db_sync.angejia__visit a
left join db_sync.angejia__visit_item b
  on a.id = b.visit_id
left join db_sync.angejia__broker c
  on a.broker_uid = c.user_id
left join  dw_db_temp.eric_inventory_time_tmp d
  on to_date(a.visit_started_at) = d.cal_dt
where a.is_valid=1
  and a.is_buyer_denied=0
  and c.user_id not in (0,3,4)
  and c.city_id <> 3
  and b.is_active=1
group by b.inventory_id;

----使用inventory_id合并指标-----
drop table if exists dw_db_temp.eric_inventory_metrics_tmp;

create table dw_db_temp.eric_inventory_metrics_tmp
as
select
 a.id
,a.city_id
,a.city_name
,a.creator_uid
,a.creator_broker_name
,a.property_id
,a.provider_id
,a.provider_type
,a.seller_broker_uid
,a.seller_broker_name
,a.survey_broker_uid
,a.survey_broker_name
,a.maintainer_uid
,a.maintainer_broker_name
,a.exclusive_broker_uid
,a.exclusive_broker_name
,a.key_holder_uid
,a.key_holder_broker_name
,a.publish_broker_uid
,a.publish_broker_name
,a.house_area_total
,a.house_area
,a.fitment
,a.is_empty
,a.is_household_registered
,a.has_key
,a.is_exclusive
,a.has_loan
,a.loan_detail
,a.deliver_time
,a.acceptable_payment
,a.is_real
,a.survey_status
,a.status
,a.source
,a.bound_date
,a.published_date
,a.last_followup_at
,a.created_date

----跟进指标-----
,b.followup_broker_counter
,b.inventory_followup_broker_daily
,b.inventory_followup_broker_week
,b.inventory_followup_broker_month
,b.inventory_followup_daily
,b.inventory_followup_week
,b.inventory_followup_month

----实堪指标-----
,c.last_survey_date
,c.survey_broker_counter
,c.survey_broker_daily
,c.survey_broker_week
,c.survey_broker_month
,c.inventory_survey_daily
,c.inventory_survey_week
,c.inventory_survey_month

----带看指标-----
,d.last_visit_date
,d.visit_broker_counter
,d.visit_broker_daily
,d.visit_broker_week
,d.visit_broker_month
,d.inventory_visit_daily
,d.inventory_visit_week
,d.inventory_visit_month

from dw_db_temp.eric_inventory_basis_info_tmp a
left join dw_db_temp.eric_inventory_followup_metrics_tmp b
   on a.id = b.inventory_id
 left join dw_db_temp.eric_inventory_survey_metrics_tmp c
   on a.id = c.inventory_id
 left join dw_db_temp.eric_inventory_visit_metrics_tmp d
   on a.id = d.inventory_id
where a.created_date = ${dealDate};

---property表基本属性---

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


----使用property_id为关联条件合并inventory_metrics的内容---

drop table if exists dw_db_temp.eric_property_metrics_daily_tmp;

create table dw_db_temp.eric_property_metrics_daily_tmp
as
select
 b.property_id
,a.house_id
,b.city_id
,b.city_name
,a.community_id
,a.bedrooms
,a.living_rooms
,a.bathrooms
,a.is_real
,a.sale_status
,a.has_checked
,a.building_num
,a.building_unit
,a.unit_num
,a.door_num
,a.orientation
,a.floor
,a.total_floors
,a.built_year
,a.use_type
,a.created_at
,b.creator_uid
,b.creator_broker_name
,b.provider_id
,b.provider_type
,b.seller_broker_uid
,b.seller_broker_name
,b.survey_broker_uid
,b.survey_broker_name
,b.maintainer_uid
,b.maintainer_broker_name
,b.exclusive_broker_uid
,b.exclusive_broker_name
,b.key_holder_uid
,b.key_holder_broker_name
,b.publish_broker_uid
,b.publish_broker_name
,b.house_area_total
,b.house_area
,b.fitment
,b.is_empty
,b.is_household_registered
,b.has_key
,b.is_exclusive
,b.has_loan
,b.loan_detail
,b.deliver_time
,b.acceptable_payment
,b.survey_status
,b.status
,b.source
,b.bound_date
,b.published_date
,b.last_followup_at
,COALESCE(b.followup_broker_counter,0) as followup_broker_counter
,COALESCE(b.inventory_followup_broker_daily,0) as inventory_followup_broker_daily
,COALESCE(b.inventory_followup_broker_week,0) as inventory_followup_broker_week
,COALESCE(b.inventory_followup_broker_month,0) as inventory_followup_broker_month
,COALESCE(b.inventory_followup_daily,0) as inventory_followup_daily
,COALESCE(b.inventory_followup_week,0) as inventory_followup_week
,COALESCE(b.inventory_followup_month,0) as inventory_followup_month
,b.last_survey_date
,COALESCE(b.survey_broker_counter,0) as survey_broker_counter
,COALESCE(b.survey_broker_daily,0) as survey_broker_daily
,COALESCE(b.survey_broker_week,0) as survey_broker_week
,COALESCE(b.survey_broker_month,0) as survey_broker_month
,COALESCE(b.inventory_survey_daily,0) as inventory_survey_daily
,COALESCE(b.inventory_survey_week,0) as inventory_survey_week
,COALESCE(b.inventory_survey_month,0) as inventory_survey_month
,b.last_visit_date
,COALESCE(b.visit_broker_counter,0) as visit_broker_counter
,COALESCE(b.visit_broker_daily,0) as visit_broker_daily
,COALESCE(b.visit_broker_week,0) as visit_broker_week
,COALESCE(b.visit_broker_month,0) as visit_broker_month
,COALESCE(b.inventory_visit_daily,0) as inventory_visit_daily
,COALESCE(b.inventory_visit_week,0) as inventory_visit_week
,COALESCE(b.inventory_visit_month,0) as inventory_visit_month
,'' as has_image
,'' as image_quality
,'' as image_counter
from dw_db_temp.eric_property_basis_info_tmp a
left join dw_db_temp.eric_inventory_metrics_tmp b
  on a.id = b.property_id
 and a.created_at = b.created_date;

```

## 统计 HQL

``` sql

create table dw_db.dw_property_summary_detail_info_daily(
,property_id          string
,house_id             string
,city_id             	string
,city_name           	string
,community_id        	string
,bedrooms            	string
,living_rooms        	string
,bathrooms           	string
,is_real             	string
,sale_status         	string
,has_checked         	string
,building_num        	string
,building_unit       	string
,unit_num            	string
,door_num            	string
,orientation         	string
,floor               	string
,total_floors        	string
,built_year          	string
,use_type            	string
,created_at          	string
,creator_uid         	string
,creator_broker_name 	string
,provider_id         	string
,provider_type       	string
,seller_broker_uid   	string
,seller_broker_name  	string
,survey_broker_uid   	string
,survey_broker_name  	string
,mastringainer_uid      	string
,mastringainer_broker_name	string
,exclusive_broker_uid	string
,exclusive_broker_name	string
,key_holder_uid      	string
,key_holder_broker_name	string
,publish_broker_uid  	string
,publish_broker_name 	string
,house_area_total    	string
,house_area          	string
,fitment             	string
,is_empty            	string
,is_household_registered	string
,has_key             	string
,is_exclusive        	string
,has_loan            	string
,loan_detail         	string
,deliver_time        	string
,acceptable_payment  	string
,survey_status       	string
,status              	string
,source              	string
,bound_date          	string
,published_date      	string
,last_followup_at    	string
,followup_broker_counter	string
,inventory_followup_broker_daily	string
,inventory_followup_broker_week	string
,inventory_followup_broker_month	string
,inventory_followup_daily	string
,inventory_followup_week	string
,inventory_followup_month	string
,last_survey_date    	string
,survey_broker_counter	string
,survey_broker_daily 	string
,survey_broker_week  	string
,survey_broker_month 	string
,inventory_survey_daily	string
,inventory_survey_week	string
,inventory_survey_month	string
,last_visit_date     	string
,visit_broker_counter	string
,visit_broker_daily  	string
,visit_broker_week   	string
,visit_broker_month  	string
,inventory_visit_daily	string
,inventory_visit_week	string
,inventory_visit_month	string
,has_image           	string
,image_quality       	string
,image_counter       	string
) PARTITIONED BY (
  p_dt STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
COLLECTION ITEMS TERMINATED BY '\n'
;

--目标表---
INSERT OVERWRITE TABLE
  dw_db.dw_property_summary_detail_info_daily
PARTITION(
  p_dt = ${dealDate}
)
select

--property.property信息--
 property_id
,house_id
,city_id
,city_name
,community_id
,bedrooms
,living_rooms
,bathrooms
,is_real
,sale_status
,has_checked

--property.house--
,building_num
,building_unit
,unit_num
,door_num
,orientation
,floor
,total_floors
,built_year
,use_type
,created_at

--property.inventory
,creator_uid
,creator_broker_name
,provider_id
,provider_type
,seller_broker_uid
,seller_broker_name
,survey_broker_uid
,survey_broker_name
,maintainer_uid
,maintainer_broker_name
,exclusive_broker_uid
,exclusive_broker_name
,key_holder_uid
,key_holder_broker_name
,publish_broker_uid
,publish_broker_name
,house_area_total
,house_area
,fitment
,is_empty
,is_household_registered
,has_key
,is_exclusive
,has_loan
,loan_detail
,deliver_time
,acceptable_payment
,survey_status
,status
,source
,bound_date
,published_date

---inventory_followup指标---
,last_followup_at
,followup_broker_counter
,inventory_followup_broker_daily
,inventory_followup_broker_week
,inventory_followup_broker_month
,inventory_followup_daily
,inventory_followup_week
,inventory_followup_month

---survey指标----
,last_survey_date
,survey_broker_counter
,survey_broker_daily
,survey_broker_week
,survey_broker_month
,inventory_survey_daily
,inventory_survey_week
,inventory_survey_month

---visit指标----
,last_visit_date
,visit_broker_counter
,visit_broker_daily
,visit_broker_week
,visit_broker_month
,inventory_visit_daily
,inventory_visit_week
,inventory_visit_month

--图片指标---
,has_image
,image_quality
,image_counter
from dw_db_temp.eric_property_metrics_daily_tmp
where created_at = ${dealDate}

-- 导入到 mysql
export hive dw_db.dw_property_summary_detail_info_daily
to mysql dw_db.dw_property_summary_detail_info_daily PARTITION p_dt;

```
