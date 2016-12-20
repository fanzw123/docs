# dw_block_sd 板块房源汇总信息表

## * 注意事项

``` sql
 无

```

## * 字段说明
``` sql
block_id            	string              	板块ID
block_name          	string              	板块名称
district_id         	string              	区域ID
district_name       	string              	区域名称
vppv_total          	bigint              	小区VPPV
phone_counseling_total	bigint              	咨询次数
reservation_visit_total	bigint              	预约次数
followup_total      	bigint              	跟进次数
seven_followup_volume	bigint              	近七天跟进量
survey_total        	bigint              	实勘数
visit_total         	bigint              	带看数
seven_visit_total   	bigint              	近七天带看数
protection_total    	bigint              	护盘数
seven_protection_total	bigint              	近七天护盘数
today_inventory_cnt 	bigint              	当天新增房源量
inventory_cnt       	bigint              	房源量
lower_rack_cnt      	bigint              	当天下架量
bambooplate_cnt     	bigint              	当天笋盘量
bambooplate_total   	bigint              	笋盘量
flash_sales_cnt     	bigint              	闪购房源量
touch_vpud          	bigint              	touch vpud
wechat_public_num_vpud	bigint              	wechat vpud
pc_vpud             	bigint              	pc vpud
app_vpud_ios        	bigint              	app ios vpud
app_vpud_android    	bigint              	app android vpud
p_dt                	string              	分区日期

```



## HQL
- [dw_block_summary_basis_info_daily.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/block/dw_block_summary_basis_info_daily.sql)



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 添加表字段流程（会备份源数据）
 ./hive-copy-and-create-fields.sh source_table=dw_db.dw_block_summary_basis_info_daily run_date=20150812 add_fields=new_exclusive_amount table_type=1 partition_field=p_dt source_db_type=dw

 -- （直接拷贝表）
 ./hive-copy-table.sh source_table=dw_db.dw_block_summary_basis_info_daily target_table=test.dw_block_summary_basis_info_daily table_type=1 partition_field=p_dt


 -- 刷新表指定表，指定字段，指定日期的，历史数据（只重新计算需要刷新的字段）
 ./hive-rerun-table.sh \
reset_db_table=test.dw_block_summary_basis_info_daily \
reset_date=20150808  \
extend_sql_file=/home/dwadmin/test/jason/aaa.sql \
reset_table_alias=bs_info \
map_fields=column1-t_1.column1,column2-t_1.column2 \
is_delete_partition=1 \
is_use_reset_date_where=1 \
is_debug=1


-- 重跑
./reset-run.sh "/home/dwadmin/app/uba/scripts/shell/aux/hive-rerun-table.sh reset_db_table=dw_db.dw_block_summary_basis_info_daily  reset_date={date} extend_sql_file=/data/log/test/reset-hql/broker_20150810.sql reset_table_alias=bs_info map_fields=column1-t_1.column1,column2-t_1.column2 is_delete_partition=0 is_use_reset_date_where=1 is_debug=0"  20150801 20150809



MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_block_summary_basis_info_daily_20150717
  LIKE
    dw_block_summary_basis_info_daily;

  INSERT INTO
    dw_block_summary_basis_info_daily_20150717
  SELECT
    *
  FROM
    dw_block_summary_basis_info_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_block_summary_basis_info_daily;
  select count(*) from dw_db.dw_block_summary_basis_info_daily_20150717;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_block_summary_basis_info_daily
  ADD COLUMNS(
    column2 STRING COMMENT '20150717 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_block_summary_basis_info_daily
  ADD
    column2 varchar(255) NOT NULL DEFAULT '' AFTER column1
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_block_summary_basis_info_daily
  DROP PARTITION (
    p_dt = '2015-07-16'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_block_summary_basis_info_daily
  WHERE
    p_dt = '2015-07-16'



```
