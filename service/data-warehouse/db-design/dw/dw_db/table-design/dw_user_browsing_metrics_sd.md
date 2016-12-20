# dw_user_browsing_metrics_sd 用户当天浏览汇总信息表

## * 注意事项

``` sql
 无

```

## * 字段说明
``` sql
touch_fud           	bigint              	TW FUD
touch_ud            	bigint              	TW UD
touch_pv            	bigint              	TW PV
touch_vppv          	bigint              	TW VPPV
touch_vpud          	bigint              	TW VPUD
touch_list_pv       	bigint              	TW房源列表页PV
touch_list_ud       	bigint              	TW房源列表页UD
touch_login_ud      	bigint              	TW登陆页UD
touch_vcud          	bigint              	TW小区单页UD
touch_vcpv          	bigint              	TW小区单页PV
touch_broker_ud     	bigint              	TW经纪人单页UD
touch_broker_pv     	bigint              	TW经纪人单页PV
touch_scheduler_ud  	bigint              	TW预约页UD
touch_scheduler_pv  	bigint              	TW预约页PV
pc_fud              	bigint              	PC FUD
pc_ud               	bigint              	PC UD
pc_pv               	bigint              	PC PV
pc_login_ud         	bigint              	PC登陆页UD
pc_list_ud          	bigint              	PC列表页UD
pc_list_pv          	bigint              	PC列表页PV
pc_vppv             	bigint              	PC房源列表页PV
pc_vpud             	bigint              	PC房源列表页UD
pc_vcpv             	bigint              	PC小区单页PV
pc_vcud             	bigint              	PC小区单页UD
wechat_public_num_fud	bigint              	微信公众号FUD
wechat_public_num_ud	bigint              	微信公众号UD
wechat_public_num_vpud	bigint              	微信公众号VPUD
wechat_public_num_pv	bigint              	微信公众号PV
wechat_public_num_vppv	bigint              	微信公众号VPPV
app_fud             	bigint              	APP FUD
app_fud_android     	bigint              	安卓 FUD
app_fud_ios         	bigint              	IOS FUD
app_ud              	bigint              	APP UD
app_ud_android      	bigint              	安卓 UD
app_ud_ios          	bigint              	IOS UD
app_login_ud_ios    	bigint              	IOS登陆页UD
app_login_ud_android	bigint              	安卓登陆页UD
app_list_ud         	bigint              	APP列表页UD
app_list_ud_ios     	bigint              	IOS列表页UD
app_list_ud_android 	bigint              	安卓列表页UD
app_vpud            	bigint              	APP VPUD
app_vpud_ios        	bigint              	IOS VPUD
app_vpud_android    	bigint              	安卓 VPUD
app_vcud            	bigint              	APP VCUD
app_vcud_ios        	bigint              	IOS VCUD
app_vcud_android    	bigint              	安卓 VCUD
app_broker_ud       	bigint              	APP经纪人单页UD
app_broker_ud_ios   	bigint              	IOS经纪人单页UD
app_broker_ud_android	bigint              	安卓经纪人单页UD
app_broker_map_ud   	bigint              	APP经纪人地图页UD
app_broker_map_ud_ios	bigint              	IOS经纪人地图页UD
app_broker_map_ud_android	bigint              	安卓经纪人地图页UD
app_scheduler_ud    	bigint              	APP预约页UD
app_scheduler_ud_ios	bigint              	IOS预约页UD
app_scheduler_ud_android	bigint              	安卓预约页UD
app_commission_list_ud	bigint              	APP委托页UD
app_commission_ud_list_ios	bigint              	IOS委托页UD
app_commission_ud_list_android	bigint              	安卓委托页UD
app_list_pv         	bigint              	APP房源列表页PV
app_list_pv_ios     	bigint              	IOS房源列表页PV
app_list_pv_android 	bigint              	安卓房源列表页PV
app_commission_pv   	bigint              	APP委托单页PV
app_commission_pv_ios	bigint              	IOS委托单页PV
app_commission_pv_android	bigint              	安卓委托单页PV
app_commission_list_pv	bigint              	APP委托列表页PV
app_commission_pv_list_ios	bigint              	IOS委托列表页PV
app_commission_pv_list_android	bigint              	安卓委托列表页PV
app_scheduler_pv    	bigint              	APP预约页PV
app_scheduler_pv_ios	bigint              	IOS预约页PV
app_scheduler_pv_android	bigint              	安卓预约页PV
app_broker_map_pv   	bigint              	APP经纪人地图页PV
app_broker_map_pv_ios	bigint              	IOS经纪人地图页PV
app_broker_map_pv_android	bigint              	安卓经纪人地图页PV
app_broker_pv       	bigint              	APP经纪人单页PV总和
app_broker_pv_ios   	bigint              	安卓经纪人单页PV
app_broker_pv_android	bigint              	IOS经纪人单页PV总和
app_vcpv            	bigint              	APP VCPV
app_vcpv_ios        	bigint              	IOS VCPV
app_vcpv_android    	bigint              	安卓 VCPV
app_vppv            	bigint              	APP VPPV
app_vppv_ios        	bigint              	IOS VPPV
app_vppv_android    	bigint              	安卓 VPPV
user_register_ud    	bigint              	用户注册数(无渠道)
touch_register_ud   	bigint              	TW用户注册数
app_register_ud     	bigint              	APP用户注册数
scan_register_ud    	bigint              	二维码扫描注册用户数
wechat_public_num_register_ud	bigint              	微信公众号注册用户数
phone_register_ud   	bigint              	电话用户注册数
pc_user_consultation	bigint              	PC用户咨询量
touch_user_consultation	bigint              	TW用户咨询量
app_user_consultation	bigint              	APP用户咨询量
app_call_click_num  	bigint              	APP电话Click数
app_call_click_num_ios	bigint              	APP电话Click数-IOS
app_call_click_num_android	bigint              	APP电话Click数-安卓
app_wechat_click_num	bigint              	APP微聊Click数
app_wechat_click_num_ios	bigint              	APP微聊Click数-IOS
app_wechat_click_num_android	bigint              	APP微聊Click数-安卓
app_reservation_click_num	bigint              	APP预约Click数
app_reservation_click_num_ios	bigint              	APP预约Click数-IOS
app_reservation_click_num_android	bigint              	APP预约Click数-安卓
app_commission_click_num	bigint              	APP委托Click数
app_commission_click_num_ios	bigint              	APP委托Click数-IOS
app_commission_click_num_android	bigint              	APP委托Click数-安卓
touch_call_click_num	bigint              	TW Call-Click
touch_reservation_click_num	bigint              	TW预约-Click
touch_notice_click_num	bigint              	TW通知-Click
touch_consultation_click_num	bigint              	TW咨询房源单页-Click
touch_ask_click_num 	bigint              	TW咨询经纪人-Click
wechat_call_click_num	bigint              	公众号Call-Click
wechat_reservation_click_num	bigint              	公众号预约-Click
wechat_notice_click_num	bigint              	公众号通知-Click
wechat_consultation_click_num	bigint              	公众号咨询房源单页-Click
wechat_ask_click_num	bigint              	公众号咨询经纪人-Click
pc_call_click_num   	bigint              	PC电话Click
pc_reservation_click_num	bigint              	PC预约Click
pc_notice_click_num 	bigint              	PC降价通知Click
pc_consultation_click_num	bigint              	PC咨询房源单页Click
pc_ask_click_num    	bigint              	PC咨询经纪人Click
return_rate_seven_date_ud_ios	double              	7日返回率-IOS
return_rate_next_date_ud_ios	double              	次日返回率-IOS
return_rate_seven_date_ud_android	double              	7日返回率-安卓
return_rate_next_date_ud_android	double              	次日返回率-安卓
touch_7day_rate     	double              	7日返回率-TW
touch_2day_rate     	double              	次日返回率-TW
pc_7day_rate        	double              	7日返回率-IOS
pc_2day_rate        	double              	次日返回率-IOS
pc_subscribe_click_num	bigint              	PC订阅Click
app_consultation_click_num	bigint              	APP咨询Click数
app_consultation_click_num_ios	bigint              	APP咨询Click数-IOS
app_consultation_click_num_android	bigint              	APP咨询Click数-安卓
touch_wechat_click_num	bigint              	TW微聊Click数
wechat_public_num_wechat_click_num	bigint              	公众号微聊Click数
p_dt                	string            分区日期

```



## HQL
- [dw_user_summary_user_browsing_metrics_daily.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/user/mobile/dw_user_summary_user_browsing_metrics_daily.sql)



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 添加表字段流程（会备份源数据）
 ./hive-copy-and-create-fields.sh source_table=dw_db.dw_user_summary_user_browsing_metrics_daily run_date=20150812 add_fields=new_exclusive_amount table_type=1 partition_field=p_dt source_db_type=dw

 -- （直接拷贝表）
 ./hive-copy-table.sh source_table=dw_db.dw_user_summary_user_browsing_metrics_daily target_table=test.dw_user_summary_user_browsing_metrics_daily table_type=1 partition_field=p_dt


 -- 刷新表指定表，指定字段，指定日期的，历史数据（只重新计算需要刷新的字段）
 ./hive-rerun-table.sh \
reset_db_table=test.dw_user_summary_user_browsing_metrics_daily \
reset_date=20150808  \
extend_sql_file=/home/dwadmin/test/jason/aaa.sql \
reset_table_alias=bs_info \
map_fields=column1-t_1.column1,column2-t_1.column2 \
is_delete_partition=1 \
is_use_reset_date_where=1 \
is_debug=1


-- 重跑
./reset-run.sh "/home/dwadmin/app/uba/scripts/shell/aux/hive-rerun-table.sh reset_db_table=dw_db.dw_user_summary_user_browsing_metrics_daily  reset_date={date} extend_sql_file=/data/log/test/reset-hql/broker_20150810.sql reset_table_alias=bs_info map_fields=column1-t_1.column1,column2-t_1.column2 is_delete_partition=0 is_use_reset_date_where=1 is_debug=0"  20150801 20150809



MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_user_summary_user_browsing_metrics_daily_20150717
  LIKE
    dw_user_summary_user_browsing_metrics_daily;

  INSERT INTO
    dw_user_summary_user_browsing_metrics_daily_20150717
  SELECT
    *
  FROM
    dw_user_summary_user_browsing_metrics_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_user_summary_user_browsing_metrics_daily;
  select count(*) from dw_db.dw_user_summary_user_browsing_metrics_daily_20150717;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_user_summary_user_browsing_metrics_daily
  ADD COLUMNS(
    column2 STRING COMMENT '20150717 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_user_summary_user_browsing_metrics_daily
  ADD
    column2 varchar(255) NOT NULL DEFAULT '' AFTER column1
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_user_summary_user_browsing_metrics_daily
  DROP PARTITION (
    p_dt = '2015-07-16'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_user_summary_user_browsing_metrics_daily
  WHERE
    p_dt = '2015-07-16'



```
