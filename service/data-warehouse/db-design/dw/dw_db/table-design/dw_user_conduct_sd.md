# dw_user_conduct_sd 用户行为汇总信息表

## * 注意事项

``` sql
 无

```

## * 字段说明
``` sql
user_id             	string              	用户ID
name                	string              	用户名称
source_id           	string              	用户来源ID
created_at          	string              	用户创建时间
phone               	string              	用户手机号
pc_pv               	string              	当日pc pv
pc_list_pv          	string              	当日pc list pv
pc_inventory_page_pv	string              	当日pc vppv
pc_community_page_pv	string              	当日pc community pv(暂时无法统计)
touch_pv            	string              	当日touch pv
touch_list_pv       	string              	当日touch list pv
touch_inventory_page_pv	string              	当日touch vppv
touch_community_page_pv	string              	当日touch community pv
wechat_pv           	string              	当日wechat pv
wechat_list_pv      	string              	当日wechat list pv
wechat_inventory_page_pv	string              	当日wechat vppv
wechat_community_page_pv	string              	当日wechat community pv
web_requset_first_time	string              	当日WEB首次访问时间
web_requset_last_time	string              	当日WEB最后一次访问时间
app_pv              	string              	当日app pv
app_list_pv         	string              	当日app list pv
app_inventory_page_pv	string              	当日app vppv
app_community_page_pv	string              	当日app community pv  
app_requset_first_time	string              	当日APP首次访问时间
app_requset_last_time	string              	当日APP最后一次访问时间
demand_location     	string              	城市区域版块位置
demand_house_type   	string              	户型
demand_budget       	string              	预算
like_tags           	string              	喜欢的类型
dislike_tags        	string              	不喜欢的类型
tel_call_num        	string              	打电话数
tel_call_broker_num 	string              	打电话给经纪人数
conn_call_num       	string              	接电话数
conn_call_broker_num	string              	接电话经纪人数
visit_sponsor_num   	string              	今日主动发起带看数
visit_real_num      	string              	今日实际带看数
wechat_broker_num   	string              	发送微信人数
wechat_num          	string              	发送微信数
commission_inventory_num	string              	用户今日委托房源数
collect_inventory_num	string              	当日收藏的房源数
p_dt                	string              	分区日期

```



## HQL
- [dw_user_conduct_summary_info_daily.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/user/dw_user_conduct_summary_info_daily.sql)



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 添加表字段流程（会备份源数据）
 ./hive-copy-and-create-fields.sh source_table=dw_db.dw_user_conduct_summary_info_daily run_date=20150812 add_fields=new_exclusive_amount table_type=1 partition_field=p_dt source_db_type=dw

 -- （直接拷贝表）
 ./hive-copy-table.sh source_table=dw_db.dw_user_conduct_summary_info_daily target_table=test.dw_user_conduct_summary_info_daily table_type=1 partition_field=p_dt


 -- 刷新表指定表，指定字段，指定日期的，历史数据（只重新计算需要刷新的字段）
 ./hive-rerun-table.sh \
reset_db_table=test.dw_user_conduct_summary_info_daily \
reset_date=20150808  \
extend_sql_file=/home/dwadmin/test/jason/aaa.sql \
reset_table_alias=bs_info \
map_fields=column1-t_1.column1,column2-t_1.column2 \
is_delete_partition=1 \
is_use_reset_date_where=1 \
is_debug=1


-- 重跑
./reset-run.sh "/home/dwadmin/app/uba/scripts/shell/aux/hive-rerun-table.sh reset_db_table=dw_db.dw_user_conduct_summary_info_daily  reset_date={date} extend_sql_file=/data/log/test/reset-hql/broker_20150810.sql reset_table_alias=bs_info map_fields=column1-t_1.column1,column2-t_1.column2 is_delete_partition=0 is_use_reset_date_where=1 is_debug=0"  20150801 20150809



MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_user_conduct_summary_info_daily_20150717
  LIKE
    dw_user_conduct_summary_info_daily;

  INSERT INTO
    dw_user_conduct_summary_info_daily_20150717
  SELECT
    *
  FROM
    dw_user_conduct_summary_info_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_user_conduct_summary_info_daily;
  select count(*) from dw_db.dw_user_conduct_summary_info_daily_20150717;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_user_conduct_summary_info_daily
  ADD COLUMNS(
    column2 STRING COMMENT '20150717 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_user_conduct_summary_info_daily
  ADD
    column2 varchar(255) NOT NULL DEFAULT '' AFTER column1
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_user_conduct_summary_info_daily
  DROP PARTITION (
    p_dt = '2015-07-16'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_user_conduct_summary_info_daily
  WHERE
    p_dt = '2015-07-16'



```
