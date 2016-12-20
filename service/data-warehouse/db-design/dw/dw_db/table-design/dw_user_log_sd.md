# dw_user_log_sd 用户日志汇总信息表

## * 注意事项

``` sql
 无

```

## * 字段说明
``` sql
guid                	string              	标识ID,web访问点击guid,app访问点击device_id
id_code             	string              	访问日志表则为：page_id,点击日志表则为：action_id
source_type         	string              	来源(pc,touch,wechat,i-angejia,a-angejia,i-broker,a-broker)
type                	string              	1:web,2:web click,3:app,4:app click
pv                  	bigint              	vppv
uv                  	bigint              	vpuv
p_dt                	string              	分区日期

```



## HQL
- [dw_user_log_summary_daliy.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/user/dw_user_log_summary_daliy.sql)



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 添加表字段流程（会备份源数据）
 ./hive-copy-and-create-fields.sh source_table=dw_db.dw_user_log_summary_daliy run_date=20150812 add_fields=new_exclusive_amount table_type=1 partition_field=p_dt source_db_type=dw

 -- （直接拷贝表）
 ./hive-copy-table.sh source_table=dw_db.dw_user_log_summary_daliy target_table=test.dw_user_log_summary_daliy table_type=1 partition_field=p_dt


 -- 刷新表指定表，指定字段，指定日期的，历史数据（只重新计算需要刷新的字段）
 ./hive-rerun-table.sh \
reset_db_table=test.dw_user_log_summary_daliy \
reset_date=20150808  \
extend_sql_file=/home/dwadmin/test/jason/aaa.sql \
reset_table_alias=bs_info \
map_fields=column1-t_1.column1,column2-t_1.column2 \
is_delete_partition=1 \
is_use_reset_date_where=1 \
is_debug=1


-- 重跑
./reset-run.sh "/home/dwadmin/app/uba/scripts/shell/aux/hive-rerun-table.sh reset_db_table=dw_db.dw_user_log_summary_daliy  reset_date={date} extend_sql_file=/data/log/test/reset-hql/broker_20150810.sql reset_table_alias=bs_info map_fields=column1-t_1.column1,column2-t_1.column2 is_delete_partition=0 is_use_reset_date_where=1 is_debug=0"  20150801 20150809



MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_user_log_summary_daliy_20150717
  LIKE
    dw_user_log_summary_daliy;

  INSERT INTO
    dw_user_log_summary_daliy_20150717
  SELECT
    *
  FROM
    dw_user_log_summary_daliy;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_user_log_summary_daliy;
  select count(*) from dw_db.dw_user_log_summary_daliy_20150717;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_user_log_summary_daliy
  ADD COLUMNS(
    column2 STRING COMMENT '20150717 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_user_log_summary_daliy
  ADD
    column2 varchar(255) NOT NULL DEFAULT '' AFTER column1
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_user_log_summary_daliy
  DROP PARTITION (
    p_dt = '2015-07-16'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_user_log_summary_daliy
  WHERE
    p_dt = '2015-07-16'



```
