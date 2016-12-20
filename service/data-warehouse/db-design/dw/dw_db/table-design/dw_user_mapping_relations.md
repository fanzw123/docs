# dw_user_mapping_relations 用户与Guid映射信息表

## * 注意事项

``` sql
 当map等于1时则一个Guid对应一个UserId(N:1)
 当map等于2时则一个UserId对应一个Guid(N:1)
```

## * 字段说明
``` sql
guid                	string              	全局标识ID
user_id             	string              	用户ID
last_access_time    	string              	最近访问日期
map_type            	string              	分区字段,1表示以Guid为主,2表示以UserId为主

```



## HQL
- [dw_user_mapping_relations_info.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/user/dw_user_mapping_relations_info.sql)



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 添加表字段流程（会备份源数据）
 ./hive-copy-and-create-fields.sh source_table=dw_db.dw_user_mapping_relations_info run_date=20150812 add_fields=new_exclusive_amount table_type=1 partition_field=p_dt source_db_type=dw

 -- （直接拷贝表）
 ./hive-copy-table.sh source_table=dw_db.dw_user_mapping_relations_info target_table=test.dw_user_mapping_relations_info table_type=1 partition_field=p_dt


 -- 刷新表指定表，指定字段，指定日期的，历史数据（只重新计算需要刷新的字段）
 ./hive-rerun-table.sh \
reset_db_table=test.dw_user_mapping_relations_info \
reset_date=20150808  \
extend_sql_file=/home/dwadmin/test/jason/aaa.sql \
reset_table_alias=bs_info \
map_fields=column1-t_1.column1,column2-t_1.column2 \
is_delete_partition=1 \
is_use_reset_date_where=1 \
is_debug=1


-- 重跑
./reset-run.sh "/home/dwadmin/app/uba/scripts/shell/aux/hive-rerun-table.sh reset_db_table=dw_db.dw_user_mapping_relations_info  reset_date={date} extend_sql_file=/data/log/test/reset-hql/broker_20150810.sql reset_table_alias=bs_info map_fields=column1-t_1.column1,column2-t_1.column2 is_delete_partition=0 is_use_reset_date_where=1 is_debug=0"  20150801 20150809



MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_user_mapping_relations_info_20150717
  LIKE
    dw_user_mapping_relations_info;

  INSERT INTO
    dw_user_mapping_relations_info_20150717
  SELECT
    *
  FROM
    dw_user_mapping_relations_info;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_user_mapping_relations_info;
  select count(*) from dw_db.dw_user_mapping_relations_info_20150717;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_user_mapping_relations_info
  ADD COLUMNS(
    column2 STRING COMMENT '20150717 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_user_mapping_relations_info
  ADD
    column2 varchar(255) NOT NULL DEFAULT '' AFTER column1
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_user_mapping_relations_info
  DROP PARTITION (
    p_dt = '2015-07-16'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_user_mapping_relations_info
  WHERE
    p_dt = '2015-07-16'



```
