# dw_property_summary_app_info 房源APP信息

## 字段

``` sql

app_vpud_ios 'IOS房源UD'

app_vppv_ios 'IOS房源PV'

app_vpud_android 'android房源UD'

app_vppv_android 'android房源PV'

app_vpud_total 'APP总房源UD'

app_vppv_total 'APP总房源PV'

app_phone_counseling_click_ios 'APP电话咨询_click_ios'

app_phone_counseling_click_android 'APP电话咨询_click_android'

app_reservation_visit_click_ios 'APP预约看房_click_ios'

app_reservation_visit_click_android 'APP预约看房_click_android'

```

## HQL

依赖

- dw_db.dw_app_access_log

- dw_db.dw_app_action_detail_log

``` sql

--APP指标--

drop table if exists dw_db_temp.eric_inventory_app_metrics_tmp;

create table dw_db_temp.eric_inventory_app_metrics_tmp
as
select regexp_extract(request_uri,"(\\d+)$",1)  as inventory_id
      ,count(distinct case when app_name = 'i-angejia' then device_id end) app_vpud_ios
      ,count(case when app_name = 'i-angejia' then device_id end) app_vppv_ios
      ,count(distinct case when app_name = 'a-angejia' then device_id end) app_vpud_android
      ,count(case when app_name = 'a-angejia' then device_id end) app_vppv_android
      ,count(distinct case when app_name in('a-angejia','i-angejia') then device_id end) app_vpud_total
      ,count(case when app_name in('a-angejia','i-angejia') then device_id end) app_vppv_total
from dw_db.dw_app_access_log
where p_dt = ${dealDate}
  and request_page_id = '30003'
group by regexp_extract(request_uri,"(\\d+)$",1);

--APP click指标--

drop table if exists dw_db_temp.eric_inventory_app_click_metrics_tmp;

create table dw_db_temp.eric_inventory_app_click_metrics_tmp
as
select get_json_object(a.extend,'$.vpid') as inventory_id
      ,count(distinct case when a.action_id ='1-100008' and a.name = 'a-angejia' then a.dvid end) as app_phone_counseling_click_android
      ,count(distinct case when a.action_id ='1-100008' and a.name = 'i-angejia' then a.dvid end) as app_phone_counseling_click_ios
      ,count(distinct case when a.action_id ='1-160007' and a.name = 'a-angejia' then a.dvid end) as app_reservation_visit_click_android
      ,count(distinct case when a.action_id ='1-160007' and a.name = 'i-angejia' then a.dvid end) as app_reservation_visit_click_ios  
from dw_db.dw_app_action_detail_log a
where p_dt = ${dealDate}
  and get_json_object(a.extend,'$.vpid') is not null
  and get_json_object(a.extend,'$.vpid') != '0'
group by get_json_object(a.extend,'$.vpid');

```
