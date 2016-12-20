# dw_property_inventory_sd 房源汇总详细信息表

## * 注意事项

``` sql
 无

```

## * 字段说明
``` sql
inventory_id        	string              	库存ID
property_id         	string              	房源ID
community_id        	string              	小区ID
community_name      	string              	小区名称
community_level     	string              	小区层级
block_id            	string              	板块ID
block_name          	string              	板块名称
district_id         	string              	区域ID
district_name       	string              	区域名称
belong_agent        	string              	成员中心
belong_team         	string              	成员团队
provider_id         	string              	资源提供者ID
provider_type       	string              	资源提供者类型
creator_uid         	string              	创建者ID
createor_name       	string              	创建者名称
seller_broker_uid   	string              	卖家经纪人用户ID
seller_broker_name  	string              	卖家经纪人用户名称
survey_broker_uid   	string              	实勘经纪人用户ID
survey_broker_name  	string              	实勘经纪人用户名称
maintainer_uid      	string              	护盘经纪人ID
maintainer_name     	string              	护盘经纪人名称
exclusive_broker_uid	string              	独家归属经纪人ID
exclusive_broker_name	string              	独家归属经纪人名称
key_holder_uid      	string              	钥匙归属经纪人ID
key_holder_name     	string              	钥匙归属经纪人名称
publish_broker_uid  	string              	开盘经纪人用户ID
publish_broker_name 	string              	开盘经纪人用户名称
is_hot              	string              	热门小区,N不是,Y是
is_exclusive        	string              	是否独家,N不是,Y是
is_tao              	string              	是否淘房,N不是,Y是
is_selected         	string
created_at          	string              	创建时间
updated_at          	string              	更新时间
deleted_at          	string              	删除时间
trade_status        	tinyint             	房源状态
survey_status       	tinyint             	实勘状态
is_empty            	tinyint             	是否空屋,0非空屋,1空屋,2未知
is_household_registered	tinyint             	是否已有户口注册,0没有,1有,2未知
has_key             	tinyint             	是否有钥匙,0没有,1有,2未知
has_loan            	tinyint             	是否有贷款,0没有,1有,2未知
loan_detail         	string              	贷款详情
deliver_time        	string              	最快交付时间
owner_occupation    	string              	业主职业
acceptable_payment  	string              	可接受付款方式
is_real             	tinyint             	是否真实,0不,1是
visit_time          	string              	看房时间JSON
bound_at            	string              	拉私时间
published_at        	string              	开盘时间
bound_survey_at     	string              	待实勘绑定时间
has_indemnity       	tinyint             	是否签赔,0否,1是
flash_sale_referrer_uid	int                 	闪购推荐人ID
on_flash_sale       	tinyint             	是否闪购,0否,1是
has_checked         	tinyint             	是否审核,0否,1是
sale_price          	bigint              	售价
unit_price          	double              	单价
house_area          	double              	房产面积
source              	string              	来源
bedrooms            	tinyint             	卧室数
living_rooms        	tinyint             	客厅数
bathrooms           	tinyint             	卫生间数
building_unit       	string              	楼栋号单位
door_num            	string              	门牌号
orientation         	string              	朝向
floor               	int                 	楼层
total_floors        	int                 	总共楼层
built_year          	int                 	建筑年代
fitment             	string              	装修情况
use_type            	string              	使用(产权)类型,1住宅,2商住,3商业
community_avg_price 	double              	小区自算均价
avg_price           	double              	小区提取均价
fluctuation         	double              	房价波动
quality_of_image    	string              	实勘质量0为普通,1为高清,2为精装  
bambooplate         	string              	笋盘,Y是,N否
touch_vppv          	bigint              	touch vppv
touch_vpud          	bigint              	touch vpud
wechat_public_num_vppv	bigint              	wechat vppv
wechat_public_num_vpud	bigint              	wechat vpud
pc_vppv             	bigint              	pc vpud
pc_vpud             	bigint              	pc vpud
pc_phone_counseling_click	bigint              	pc 电话点击pv
touch_phone_counseling_click	bigint              	touch 电话点击pv
pc_reservation_visit_click	bigint              	pc 预约点击pv
touch_reservation_visit_click	bigint              	touch 预约点击pv
app_vpud_ios        	bigint              	app ios vpud
app_vppv_ios        	bigint              	app ios vppv
app_vpud_android    	bigint              	app android vpud
app_vppv_android    	bigint              	app android vppv
app_phone_counseling_click_android	bigint              	app android 电话点击vppv
app_phone_counseling_click_ios	bigint              	app ios 电话点击 vppv
app_reservation_visit_click_android	bigint              	app android 预约点击 vppv
app_reservation_visit_click_ios	bigint              	app ios 预约点击 vppv
house_image_cnt     	bigint              	房源图片数量
community_image_cnt 	bigint              	小区图片数量
last_followup_date  	string              	最后跟进时间
followup_cnt        	bigint              	跟进次数
three_followup_cnt  	bigint              	近三天跟进次数
seven_followup_cnt  	bigint              	近七天跟进次数
followup_broker_cnt 	bigint              	房源经经纪人跟进量
protection_time     	string              	护盘时间
last_survey_date    	string              	最后实勘时间
last_visit_date     	string              	最后带看时间
visit_cnt           	bigint              	带看次数
seven_visit_cnt     	bigint              	最近七天带看次数
visit_broker_cnt    	bigint              	经纪看带看量(去重)
visit_buyer_cnt     	bigint              	买家带看量(去重)
app_wechat_click_ios	bigint              	app ios 微聊次数
app_wechat_click_android	bigint              	app android 微聊次数
pc_counseling_click 	bigint              	PC点击咨询次数
touch_counseling_click	bigint              	touch点击咨询次数
app_counseling_click_ios	bigint              	app ios 点击咨询次数
app_counseling_click_android	bigint              	app android 点击咨询次数  
pc_moreinfo_click   	bigint              	PC点击更多图片与信息次数
touch_moreinfo_click	bigint              	touch点击更多图片与信息次数
app_newinventory_click_ios	bigint              	app ios 点击新房源通知我次数  
app_newinventory_click_android	bigint              	app android 点击新房源通知我次数
app_bargain_click_ios	bigint              	app ios 点击帮我议价次数
app_bargain_click_android	bigint              	app android 点击帮我议价次数
app_moreinfo_click_ios	bigint              	app ios 点击更多图片与信息次数
app_moreinfo_click_android	bigint              	app android 点击更多图片与信息次数
building_num        	string              	楼栋号
unit_num            	string              	单元号
p_dt                	string              	分区日期

```



## HQL
- [dw_property_summary_inventory_detail_daily.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/property/summary_hive_dw_property_inventory_detail_info_daily.sql)



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 添加表字段流程（会备份源数据）
 ./hive-copy-and-create-fields.sh source_table=dw_db.dw_property_summary_inventory_detail_daily run_date=20150812 add_fields=new_exclusive_amount table_type=1 partition_field=p_dt source_db_type=dw

 -- （直接拷贝表）
 ./hive-copy-table.sh source_table=dw_db.dw_property_summary_inventory_detail_daily target_table=test.dw_property_summary_inventory_detail_daily table_type=1 partition_field=p_dt


 -- 刷新表指定表，指定字段，指定日期的，历史数据（只重新计算需要刷新的字段）
 ./hive-rerun-table.sh \
reset_db_table=test.dw_property_summary_inventory_detail_daily \
reset_date=20150808  \
extend_sql_file=/home/dwadmin/test/jason/aaa.sql \
reset_table_alias=bs_info \
map_fields=community_id-t_1.community_id,inventory_id-t_1.inventory_id,demand_customer_added_sk_num-t_2.num,inventory_survey_quality_day_num-t_3.num \
is_delete_partition=1 \
is_use_reset_date_where=1 \
is_debug=1


-- 重跑
./reset-run.sh "/home/dwadmin/app/uba/scripts/shell/aux/hive-rerun-table.sh reset_db_table=dw_db.dw_property_summary_inventory_detail_daily  reset_date={date} extend_sql_file=/data/log/test/reset-hql/broker_20150810.sql reset_table_alias=bs_info map_fields=community_id-t_1.community_id,inventory_id-t_1.inventory_id,demand_customer_added_sk_num-t_2.num,inventory_survey_quality_day_num-t_3.num is_delete_partition=0 is_use_reset_date_where=1 is_debug=0"  20150801 20150809



MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_property_summary_inventory_detail_daily_20150717
  LIKE
    dw_property_summary_inventory_detail_daily;

  INSERT INTO
    dw_property_summary_inventory_detail_daily_20150717
  SELECT
    *
  FROM
    dw_property_summary_inventory_detail_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_property_summary_inventory_detail_daily;
  select count(*) from dw_db.dw_property_summary_inventory_detail_daily_20150717;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_property_summary_inventory_detail_daily
  ADD COLUMNS(
    inventory_id STRING COMMENT '20150717 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_property_summary_inventory_detail_daily
  ADD
    inventory_id varchar(255) NOT NULL DEFAULT '' AFTER community_id
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_property_summary_inventory_detail_daily
  DROP PARTITION (
    p_dt = '2015-07-16'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_property_summary_inventory_detail_daily
  WHERE
    p_dt = '2015-07-16'



```
