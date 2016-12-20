# ETL 脚本工具

数据从来源端经过抽取（extract）、转换（transform）、加载（load）至目的端的过程

## 一、工具介绍

### 1、m2h.sh

- 抽取 mysql table 数据至 hive table

``` sh

参数:
  m2h.sh [dw | slave (数据库服务器)]-[db_name.tb_name (mysql的数据库、表名称)]-[db_name.tb_name (目标 hive 的数据库、表名称)]-[num (目标 hive 的数据库、表名称)]
  -[字段分隔符 (默认 \t)]

说明:
  1.当参数填写了 map_reduce 数量的时候，则使用 sqoop 生成 mp 导入数据
  2.所有导入的字段，都会转换成 STRING

案例:
  1.使用默认方式，即 mysql dump 方式导入数据
  ./m2h.sh dw-test_db.test_table-hive_test_db.test_table

  2.使用 sqoop 方式，开启 2 个 map reduce 导入数据
  ./m2h.sh dw-test_db.test_table-hive_test_db.test_table-2

  3.使用 sqoop 方式，开启 1 个 map reduce 导入数据，并且自定义分隔符为 \001
  ./m2h.sh dw-test_db.test_table-hive_test_db.test_table-1-\001
```


### 2、hive-copy-table.sh

- 拷贝 hive 数据表

``` sh

参数:
  source_table=[db_name.table_name (源数据表)]
  target_table=[db_name.table_name (迁移到的目标表)]

  table_type=[0 | 1 (可选 ,0:表示普通表 1:表示分区表,默认 1)]
  partition_field=[可选 ,分区字段 (默认 p_dt)]

案例:
  1.拷贝一张分区表
  ./hive-copy-table.sh source_table=test_db.test_table target_table=target_test_db.test_table table_type=1 partition_field=p_dt

  2.拷贝一张普通表
  ./hive-copy-table.sh source_table=test_db.test_table target_table=target_test_db.test_table table_type=0

```


### 3、hive-copy-and-create-fields.sh

- hive table 复制备份并且，在原表添加新字段
- 脚本流程
  - 备份原宽表数据(如果 Mysql 也有则 mysql 也备份)
  - 增加自定义字段(如果 Mysql 也有则 mysql 也增加)
  - 支持回滚 (如果 Mysql 也有则 mysql 也撤销)

``` sh

参数:
  table_type=[0 | 1 (数据表类型:0普通表，1分区表)]
  source_table=[db_name.table_name (源数据表)]
  run_date=[ymd (环境日期)]
  add_fields=[field_1,field_2,field_3 ... (需要添加的字段,为空则不追加字段)]
  partition_field=[分区表字段名:默认:p_dt]
  source_db_type=[dw | slave (数据库类型,默认 dw)]

  bakup_table=[(可选,备份到目标表的位置,默认规则 dw_history_db.[source_table]_[run_date])]
  is_reset=[1 | 0 (可选，是否回滚添加字段 1:是, 0:否 , 默认 0 )]

案例:
  1、备份 test.test_table 数据分区表到 dw_history_db.test_table_20150810 中，并且在 test.test_table 表中添加 3 个字段(t_1,t_2,t_3) 。
  ./hive-copy-and-create-fields.sh source_table=test.test_table run_date=20150810 add_fields=t_1,t_2,t_3 table_type=1 partition_field=p_dt source_db_type=dw

  2、回滚 test.test_table 数据分区表，撤销添加的字段 (t_1,t_2,t_3)
  ./hive-copy-and-create-fields.sh is_reset=1 source_table=test.test_table run_date=20150810 add_fields=t_1,t_2,t_3 table_type=1 partition_field=p_dt source_db_type=dw

```


### 3、hive-rerun-table.sh

- 刷新(指定逻辑)的历史数据到宽表中

``` sql

参数:
  reset_db_table=[db.table] 重跑库名表名
  reset_date=[ymd] 重跑的分区日期
  reset_table_alias=[重跑表的 alias 别名] 默认 bs
  extend_sql_file=[file_dir] 重跑的扩展逻辑 (文件中写入 : ${reset_date} 会替换成对应的,重跑的分区日期 y-m-d 。 ${reset_table_alias} : 会替换成源数据表的 alias 别名)
  map_fields=[old_field:new_field--old_field_two:new_field_two] 需要替换重跑的字段映射关系。(使用函数用 [[ ]] 代替 () ,如COALESCE[[xxx,0]])

  is_debug=[1 | 0] (是否调试模式，1 表示只打印不执行，0 表示打印执行，默认 1)
  is_delete_partition=[1 | 0] (是否删除当前分区，1 是，0 不是 ，默认 0 (除非完成重跑，不然请不要使用修改，使用默认即可)
  is_use_reset_date_where=[1 | 0] (是否使用重跑日期，作为重跑表的 where 条件。1 使用 ，0 不适用 ，默认 1)
  temp_db_name=[可选，临时执行数据库名称] 默认 dw_db_temp 库

案例:
  1.刷新表 test_db.test_table 表 ,
    old_field_1-t_1.new_field_1(原表的 old_field_1 字段，使用 t_1.new_field_1 代替), old_field_2-t_2.new_field_2 (原表的 old_field_2 字段，使用 t_2.new_field_2 代替)，20150808 分区日期的历史数据（只重新计算需要刷新的字段）
  ./hive-rerun-table.sh \
  reset_db_table=test_db.test_table \
  reset_date=20150808  \
  extend_sql_file=/home/dwadmin/test/xyz.sql \
  reset_table_alias=bs_info \
  map_fields=old_field_1:COALESCE[[t_1.new_field_1,0]]--old_field_2:t_2.new_field_2 \
  is_delete_partition=1 \
  is_use_reset_date_where=1 \
  is_debug=1

  自定义逻辑: xyz.sql 文件书写规则,注意结尾不需要 "分号"
  -- 自定义逻辑
  LEFT JOIN (
    SELECT
      s_1.user_id,
      -- 这是要查询出来的新字段
      s_1.new_field_1
    FROM
      xxx.xxx AS s_1
    WHERE
      -- ${reset_date} 会自动替换成类似 '2015-06-01' 的日期格式
    s_1.create = ${reset_date}
  ) AS t_1
  ON
    -- ${reset_table_alias} 会自动替换成 reset_db_table 表名的别名
    ${reset_table_alias}.user_id = t_1.user_id



```


### 4、rerun.sh

- 重跑脚本
- 重跑指定开始日期 - 结束日期的的脚本

``` sh

参数:
  rerun [file_dir {date} (脚本完整路径,{date} 会替换成当前执行的日期)] [ymd (开始时间)] [ymd (结束时间,如果不填写，则直接跑到当天日期为止)]

案例:
  1.重跑 "home/dwadmin/xxx/xx.sh {date}" 脚本,从 20150601 开始 - 20150605 结束。其中 {date} 会替换成当前执行的日期
  ./rerun "/home/dwadmin/xxx/xx.sh {date}"  20150601 20150605
```
