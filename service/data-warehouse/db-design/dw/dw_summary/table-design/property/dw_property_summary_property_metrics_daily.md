# dw_property_summary_property_metrics_daily 房源指标信息

## 字段

``` sql

property_id
house_id
city_id
city_name
community_id
bedrooms
living_rooms
bathrooms
is_real
sale_status
has_checked
building_num
building_unit
unit_num
door_num
orientation
floor
total_floors
built_year
use_type
created_at
creator_uid
creator_broker_name
provider_id
provider_type
seller_broker_uid
seller_broker_name
survey_broker_uid
survey_broker_name
maintainer_uid
maintainer_broker_name
exclusive_broker_uid
exclusive_broker_name
key_holder_uid
key_holder_broker_name
publish_broker_uid
publish_broker_name
house_area_total
house_area
fitment
is_empty
is_household_registered
has_key
is_exclusive
has_loan
loan_detail
deliver_time
acceptable_payment
survey_status
status
source
bound_date
published_date
last_followup_at
followup_broker_counter
inventory_followup_broker_daily
inventory_followup_broker_week
inventory_followup_broker_month
inventory_followup_daily
inventory_followup_week
inventory_followup_month
last_survey_date
survey_broker_counter
survey_broker_daily
survey_broker_week
survey_broker_month
inventory_survey_daily
inventory_survey_week
inventory_survey_month
last_visit_date
visit_broker_counter
visit_broker_daily
visit_broker_week
visit_broker_month
inventory_visit_daily
inventory_visit_week
inventory_visit_month
has_image
image_quality
image_counter

```

## HQL

依赖
-

``` sql

---使用property_id为主键合并所有信息--

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

 --- 房源指标 end ---

```
