# mysql to hdfs design

## 设计目的

- 从原有的 sqoop 迁移到 mysql 查询后写入 hdfs,从而提升效率
  - [性能分析结果](mysql-to-hdfs-performance.md)

## 概要

### 1、mysql 部分
``` sh

通过 mysql 查询数据，写入到本地文件下中
  mysql -h10.10.2.91 -uhadoop -pangejia -s -e "select * FROM test.performance_mb_50;" >> performance_mb_50;

```

### 2、中间处理部分

``` sh

mysql desc 得到 mysql 数据表的结构信息

根据 mysql 结构组合 hive table 数据表结构

再通过 hive load 方法把 mysql 查询到的文件结果放到对应的 hive table 中


CREATE TABLE `performance_test_1`(
  `id` String,
  `s1` String,
  `s2` String,
  `s3` String,
  `s4` String)
ROW FORMAT DELIMITED
  FIELDS TERMINATED BY '\t'
  COLLECTION ITEMS TERMINATED BY '\n'
;

LOAD DATA LOCAL INPATH '/root/student_two.txt' overwrite into table student;

```
