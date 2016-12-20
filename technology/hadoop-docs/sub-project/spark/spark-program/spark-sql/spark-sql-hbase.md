# Hive 与 Hbase 整合

## 一、环境

``` sh
准备工作 :
  1) 登录 zookeeper
    $ZOOKEEPER_HOME/bin/zkCli.sh

  2) 查看所有 Habse 集群主机名
    ls /hbase/rs  

  3) 把 hbase 所有的主机名配置到 /etc/hosts 中,保证每个 host 都能访问到 hbase 集群的服务器
    vim /etc/hosts
    例如 :
    10.10.33.175    uhadoop-ociicy-core1
    10.10.7.68      uhadoop-ociicy-core2
    10.10.43.97     uhadoop-ociicy-core3
    10.10.240.22    uhadoop-ociicy-core4
    10.10.236.241   uhadoop-ociicy-core5
    10.10.222.21    uhadoop-ociicy-core6
    10.10.229.183   uhadoop-ociicy-task3
    10.10.234.131   uhadoop-ociicy-task4

  4) 配置相关的依赖 jar 包


    $HIVE_HOME/lib/hive-hbase-handler-1.1.0-cdh5.4.4.jar
    $HIVE_HOME/lib/hive-serde-1.1.0-cdh5.4.4.jar

    $HBASE_HOME/lib/hbase-common-1.0.0-cdh5.4.4.jar
    $HBASE_HOME/lib/hbase-server-1.0.0-cdh5.4.4.jar
    $HBASE_HOME/lib/hbase-protocol-1.0.0-cdh5.4.4.jar
    $HBASE_HOME/lib/htrace-core-3.0.4.jar
    $HBASE_HOME/lib/protobuf-java-2.5.0.jar
    $HBASE_HOME/lib/guava-12.0.1.jar
    $HBASE_HOME/lib/zookeeper-3.4.5-cdh5.4.4.jar
    $HBASE_HOME/lib/hbase-client-1.0.0-cdh5.4.4.jar
    
    Spark-SQL-on-HBase-1.0.0.jar


   $HIVE_HOME/lib/hive-serde-1.1.0-cdh5.4.4.jar:$HIVE_HOME/lib/hive-hbase-handler-1.1.0-cdh5.4.4.jar:$HBASE_HOME/lib/hbase-common-1.0.0-cdh5.4.4.jar:$HBASE_HOME/lib/hbase-server-1.0.0-cdh5.4.4.jar:$HBASE_HOME/lib/hbase-protocol-1.0.0-cdh5.4.4.jar:$HBASE_HOME/lib/htrace-core-3.0.4.jar:$HBASE_HOME/lib/protobuf-java-2.5.0.jar:$HBASE_HOME/lib/guava-12.0.1.jar:$HBASE_HOME/lib/zookeeper-3.4.5-cdh5.4.4.jar:$HBASE_HOME/lib/hbase-client-1.0.0-cdh5.4.4.jar

real_time.inventory_recommend

select row_key,inventory_recommend_inventory__inventory_ids from real_time.inventory_recommend limit 1;
```

## 二、命令

``` sql

1. 创建表 语法

  CREATE EXTERNAL TABLE db_name.tb_name(row_key int, '列' string)
  STORED BY 'org.apache.hadoop.hive.hbase.HBaseStorageHandler'
  WITH SERDEPROPERTIES ( "hbase.columns.mapping" = "列族:列")
  TBLPROPERTIES ("hbase.table.name" = "hbase 表名")
  ;

  // 案例: 创建外部表
  CREATE EXTERNAL TABLE real_time.inventory_recommend(row_key int, inventory_recommend_inventory__inventory_ids string)
  STORED BY 'org.apache.hadoop.hive.hbase.HBaseStorageHandler'
  WITH SERDEPROPERTIES ( "hbase.columns.mapping" = "inventoryRecommendInventory:inventoryIds")
  TBLPROPERTIES ("hbase.table.name" = "inventoryRecommend")
  ;



2. hive 创建 HBase 表

```
