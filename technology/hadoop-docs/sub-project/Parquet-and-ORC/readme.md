# 大数据开源列式存储引擎 Parquet 和 ORC

- http://dongxicheng.org/mapreduce-nextgen/columnar-storage-parquet-and-orc/


## 一、介绍

```
Parquet ：
     不支持修改，
     Java 编写，
     主导公司 Twitter/Cloudera
     支持的查询引擎 Apache Drill/impala
     支持索引 : block/group/chunk

ORC :
     支持修改,可与 Hive 结合
     Java 编写，
     主导公司 Hortonworks
     支持的查询引擎 Apache Hive
     支持索引 : file/Stripe/row

```
