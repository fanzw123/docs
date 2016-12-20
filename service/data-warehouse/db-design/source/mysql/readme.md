# m2h sync 设计

##  快照、同步

### 1、说明
分 2 类

- 同步库 -> 同步上一天最新的 mysql 表，到 db_sync 数据库
- 聚合库 -> 聚合每天 db_sync 库的数据，按照 d_pt 日期分区，放到酷中

### 2、业务流程
{date} = 20150425 格式

- 通过 sqoop 导入 mysql 的 db.table 表 to hive 的 db_sync.table 中
- 从 hive db_sync.table{date} 导入到 hive dw_gather.table(这个表按照 d_pt 字段分区) 成为聚合表
