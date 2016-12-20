# dw_property_summary_inventory_info 房源的基本属性

## 字段

``` sql

id
city_id
city_name
creator_uid
creator_broker_name
property_id
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
is_real
survey_status
status
source
bound_date
published_date
last_followup_at
created_date

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

```

## HQL

TIPS
- 使用inventory_id为主键合并相关指标，使用property_id为主键与property表关联获取指标

``` sql

--合并inventory指标--

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

--- 房源inventory基础信息 end ---

```
