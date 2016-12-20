# dw_property_summary_inventory_basis_info inventory房源基础信息

## 字段

``` sql

id '房源ID'

city_id '城市ID'

city_name '城市名'

creator_uid '房源创建经纪人ID'

creator_broker_name '房源创建经纪人姓名'

property_id '房源唯一ID,使用property表是使用'

provider_id '资源提供者ID'

provider_type '资源提供者类型'

seller_broker_uid '卖家经纪人ID'

seller_broker_name '卖家经纪人姓名'

survey_broker_uid '实勘经纪人ID'

survey_broker_name '实勘经纪人姓名'

maintainer_uid '护盘经纪人ID'

maintainer_broker_name '护盘经纪人姓名'

exclusive_broker_uid '独家归属经纪人ID'

exclusive_broker_name '独家归属经纪人姓名'

key_holder_uid '钥匙归属经纪人ID'

key_holder_broker_name '钥匙归属经纪人姓名'

publish_broker_uid '开盘经纪人ID'

publish_broker_name '开盘经纪人姓名'

sale_price '房源总价，单位：元'

house_area '房屋面积，单位：元'

unit_price '房源单价，单位：元'

fitment '装修情况'

is_empty '是否空屋，0 非空屋;1 空屋; 2未知'

is_household_registered '是否已有户口注册，0 没有; 1 有; 2未知'

has_key '是否有钥匙, 0 没有; 1 有; 2未知'

is_exclusive '是否独家，0 不是; 1 是; 2未知'

has_loan '是否有贷款, 0 没有; 1 有; 2未知'

loan_detail '贷款详情'

deliver_time '最快交付时间'

acceptable_payment '可接受付款方式'

is_real '是否真实，0 不; 1 是'

survey_status '实勘状态，0 未实勘; 1 实勘审核中; 2已实勘; 3被驳回'

status '交易状态 0无效(被丢弃); 1不卖; 2在卖; 3交易中; 4已卖'

source '发布来源 1 房东发房(委托录入); 2 经纪人发房; 3 CC发房;4 抓取; 5 房源局导入; 6 平台房源复制'

bound_date '拉私时间'

published_date '开盘日期'

last_followup_date '最近跟进日期'

created_date '创建日期'

landlord_name '房东姓名'

landlord_phone '房东电话'

```

## HQL

依赖

- db_sync.property__inventory

- db_sync.property__inventory_has_seller  

``` sql

--inventory基础信息---

drop table if exists dw_db_temp.eric_inventory_basis_info_tmp;

create table dw_db_temp.eric_inventory_basis_info_tmp
as
select
 a.id
,a.city_id
,b.name as city_name
,a.creator_uid
,c.name as creator_broker_name
,a.property_id
,a.provider_id
,a.provider_type
,a.seller_broker_uid
,d.name as seller_broker_name
,a.survey_broker_uid
,e.name as survey_broker_name
,a.maintainer_uid
,f.name as maintainer_broker_name
,a.exclusive_broker_uid
,g.name as exclusive_broker_name
,a.key_holder_uid
,h.name as key_holder_broker_name
,a.publish_broker_uid
,i.name as publish_broker_name
,a.price as sale_price
,a.area as house_area
,a.price/a.area as unit_price
,a.fitment

,(case when a.is_empty = 0 then 'N'
       when a.is_empty = 1 then 'Y'
 else 'UNKNOW'
 end) as is_empty

,(case when a.is_household_registered = 0 then 'N'
       when a.is_household_registered = 1 then 'Y'
 else 'UNKNOW'
 end) as is_household_registered

,(case when a.has_key = 0 then 'N'
       when a.has_key = 1 then 'Y'
 else 'UNKNOW'
 end) as has_key

,(case when a.is_exclusive = 0 then 'N'
       when a.is_exclusive = 1 then 'Y'
 else 'UNKNOW'
 end) as is_exclusive

,(case when a.has_loan = 0 then 'N'
       when a.has_loan = 1 then 'Y'
 else 'UNKNOW'
 end) as has_loan

,a.loan_detail
,a.deliver_time
,a.acceptable_payment

,(case when a.is_real = 0 then 'N'
       when a.is_real = 1 then 'Y'
 else 'UNKNOW'
 end) as is_real

,a.survey_status
,a.status
,a.source
,to_date(a.bound_at) as bound_date
,to_date(a.published_at) as published_date
,to_date(a.last_followup_at) as last_followup_at
,to_date(a.created_at) as created_date
from db_sync.property__inventory a
left join db_sync.angejia__city b
  on a.city_id = b.id
left join db_sync.angejia__broker c
  on a.creator_uid = c.user_id
left join db_sync.angejia__broker d
  on a.seller_broker_uid = d.user_id
left join db_sync.angejia__broker e
  on a.survey_broker_uid = e.user_id
left join db_sync.angejia__broker f
  on a.maintainer_uid = f.user_id
left join db_sync.angejia__broker g
  on a.exclusive_broker_uid = g.user_id
left join db_sync.angejia__broker h
  on a.key_holder_uid = h.user_id
left join db_sync.angejia__broker i
  on a.publish_broker_uid = i.user_id
 and c.user_id not in (0,3,4)
 and d.user_id not in (0,3,4)
 and e.user_id not in (0,3,4)
 and f.user_id not in (0,3,4)
 and g.user_id not in (0,3,4)
 and h.user_id not in (0,3,4)
 and i.user_id not in (0,3,4)
 and b.id <> 3
 and to_date(a.created_at) = ${dealDate};

 ---计算房源单价和小区单价的差值百分比

drop table if exists dw_db_temp.eric_inventory_price_offset;

create table dw_db_temp.eric_inventory_price_offset
as
select t.average_price
      ,((a.price_per-t.average_price)/t.average_price) as difference,
      a.* from
      dw_db_temp.eric_property_basis_info_tmp a
left outer join
(select e.community_id
       ,avg(a.price/a.area) as average_price
 from db_sync.property__inventory a
left join db_sync.property__property b
  on a.property_id=b.id
left join db_sync.property__house e
  on b.house_id=e.id
left join db_sync.angejia__community f
  on e.community_id=f.id
where a.status=2
  and b.is_real=1
  and b.status=1
group by e.community_id
)t on a.community_id=t.community_id
;


--- 房源基础信息 end ---

```
