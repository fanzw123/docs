# mysql to hive 增量设计

## 设计目的
- 针对特大的 mysql 数据表,只同步每日最新的增量数据
- 针对只增加不会怎么变动的数据的表,以及微小变动不影响业务统计的大数据表

## 解决问题
- 加快同步速度
- 用何种方式访问增量数据

## 解决方案

- 针对有变化的输入如何解决(?)

### 1、整理需要增量的数据表

增量的表有几个原则问题

- 数据量会持续增加，但是不会变化的数据


``` sql

-- 打星号表示只变动，不增加的数据表

-- 万级别
angejia__user_msg:52725 (主键 msg_id)
angejia__buyer_followup:24742 (主键 id)
angejia__inventory_followup:73962 (主键 id)
angejia__community:19294 (主键 id)
angejia__community_extend:19082 (主键 id)
angejia__property_log:32824 (主键 id)
angejia__sms:57914 (主键 id)
angejia__community_image:87921 (主键 id)
angejia__inventory_image:49442 (主键 id)
angejia__property_verification_record:16794 (主键 id)


-- 十万级别
angejia__member:99760 (主键 user_id)
angejia__user:101476 (主键 user_id) *
angejia__call_log:117181 (主键 id) *
angejia__inventory_extend:146574 (主键 id)
angejia__inventory_developments:191755 (主键 id)
angejia__wechat_qrcode_sender:100000 (主键 id) 此表最多 10W 条数据
angejia__commission:135237 (主键 id) *
property__inventory:146566 (主键 id)
property__house:104697 (主键 id)
property__property:104689 (主键 id)
property__inventory_has_seller:148514 (主键 id)
property__inventory_has_tag:136551 (主键 id)
```

### 2、增量脚本设计

- 会遇到的问题
 - 增量数据表,数据结构变动
 ```
  mysql 中的新增数据入 hive 时,如果 db_sync 的数据结构变化改如何解决
  方案1、对于增量的数据表,把查询的数据临时存放在 dw_temp 数据库中，然后与 db_sync 对比是否有结构变动,再把数据移动到 db_sync 中
  方案2、db_sync 依旧每次删除,把数据在 db_gather 中处理,线上所有用到 db_sync 数据库都改成到 db_gather ,这么做维护成本太大
 ```
- shell 代码部分

``` sh

rm -rf /home/hadoop/test/jason/uba/scripts/shell/tool/../.tmp/user_msg.java

#方法一 ：hive查询最后一次拉去的 id,带入到 hive 的 last-value 中查询，并且写入到当日分区中

sqoop import \
--connect "jdbc:mysql://192.168.160.54:3306/angejia?useUnicode=true&tinyInt1isBit=false&characterEncoding=utf-8" \
--username angejia \
--password angejia123 \
\
--target-dir /user/temp/sqoop-target/user_msg \
--num-mappers 4 \
--table user_msg \
--hive-table jason_test.user_msg \
--hive-import \
--hive-delims-replacement '%n&' \
\
--fields-terminated-by '\001' \
--lines-terminated-by '\n' \
\
--input-null-string '\\N' \
--input-null-non-string '\\N' \
--outdir /home/hadoop/test/jason/uba/scripts/shell/tool/../.tmp \
\
--check-column 'msg_id' \
--incremental 'append' \
--last-value '10' \
\
--hive-partition-key 'p_dt' \
--hive-partition-value '2015-07-16'



#方案二 ，把查询结果写入到 mysql 中，格式如下
table_name | primary_id | min_num | max_num | p_dt

每次导入前，查询上一天的 max_num 数量,作为当天 min_num 的值,查询当天 max_num 写入到数据库
当天 拼接 min_num 和 max_num 作为查询条件,去 mysql 查询这个边界的数据，写入到 hive 中

sqoop import \
--connect "jdbc:mysql://192.168.160.54:3306/angejia?useUnicode=true&tinyInt1isBit=false&characterEncoding=utf-8" \
--username angejia \
--password angejia123 \
\
--target-dir /user/temp/sqoop-target/user_msg \
--delete-target-dir \
--num-mappers 1 \
--table user_msg \
--hive-table jason_test.user_msg \
--hive-import \
--hive-delims-replacement '%n&' \
--split-by 'msg_id' \
--boundary-query "select 11, 30" \
\
--fields-terminated-by '\001' \
--lines-terminated-by '\n' \
\
--input-null-string '\\N' \
--input-null-non-string '\\N' \
--outdir /home/hadoop/test/jason/uba/scripts/shell/tool/../.tmp \
\
--hive-partition-key 'p_dt' \
--hive-partition-value '2015-07-17'


```
