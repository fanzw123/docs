# dw_property_summary_touchweb_info 房源的基本属性

## 字段

``` sql

touch_vppv 'TouchWeb房源PV'

touch_vpud 'TouchWeb房源UD'

wechat_public_num_vppv '微信公众号房源PV'

wechat_public_num_vpud '微信公众号房源UD'

pc_vppv 'PC房源PV'

pc_vpud 'PC房源UD'

touch_phone_counseling_click 'TouchWeb电话咨询_click'

pc_phone_counseling_click 'PC电话咨询_click'

touch_reservation_visit_click 'TouchWeb预约看房_click'

pc_reservation_visit_click 'PC预约看房_click'

```

## HQL

依赖
- dw_db.dw_web_visit_traffic_log

- dw_db.dw_web_action_detail_log

- db_sync.angejia__user

``` sql

--Touchweb指标--

drop table if exists dw_db_temp.eric_inventory_browsing_metrics_tmp;

create table dw_db_temp.eric_inventory_browsing_metrics_tmp
as
select regexp_extract(parse_url(current_full_url,'PATH'),'^/sale/sh/(\\d+)\.html$',1) as inventory_id
      ,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' then guid end) as touch_vppv
      ,count(distinct case when current_page_id = '10035' and brower_type <> 'MicroMessenger' then guid end) as touch_vpud
      ,count(case when current_page_id = '10035' and brower_type = 'MicroMessenger' then guid end) as wechat_public_num_vppv
      ,count(distinct case when current_page_id = '10035' and brower_type = 'MicroMessenger' then guid end) as wechat_public_num_vpud
      ,count(case when current_page_id = '20008' then guid end) as pc_vppv
      ,count(distinct case when current_page_id = '20008' then guid end) as pc_vpud
from dw_db.dw_web_visit_traffic_log
where p_dt = ${dealDate}
  and regexp_extract(parse_url(current_full_url,'PATH'),'^/sale/sh/(\\d+)\.html$',1) is not null
  and regexp_extract(parse_url(current_full_url,'PATH'),'^/sale/sh/(\\d+)\.html$',1) != ''
group by regexp_extract(parse_url(current_full_url,'PATH'),'^/sale/sh/(\\d+)\.html$',1);

--Touchweb click指标--

drop table if exists dw_db_temp.eric_inventory_touch_action_metrics_tmp;

create table dw_db_temp.eric_inventory_touch_action_metrics_tmp
as
select regexp_extract(parse_url(a.current_full_url,'PATH'),'^/sale/sh/(\\d+)\.html$',1) as inventory_id
      ,count(case when a.action_id = '1-100008' and a.os_type in('Windows 7','Windows 8.1','Windows XP')  then a.guid end) as pc_phone_counseling_click
      ,count(case when a.action_id = '1-100008' and a.os_type in('Android','iOS','Windows Phone 8.1')  then a.guid end) as touch_phone_counseling_click
      ,count(case when a.action_id = '1-100033' and a.os_type in('Windows 7','Windows 8.1','Windows XP')  then a.guid end) as pc_reservation_visit_click
      ,count(case when a.action_id = '1-100033' and a.os_type in('Android','iOS','Windows Phone 8.1') then a.guid end) as touch_reservation_visit_click
from dw_db.dw_web_action_detail_log a
left join db_sync.angejia__user b
  on a.user_id = b.user_id
where a.p_dt = ${dealDate}
  and b.user_type = 2
  and a.current_page_id='10035'
group by regexp_extract(parse_url(a.current_full_url,'PATH'),'^/sale/sh/(\\d+)\.html$',1);

```
