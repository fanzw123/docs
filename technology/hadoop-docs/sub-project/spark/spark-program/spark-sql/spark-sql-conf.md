# Spark SQL 配置

## 一、配置优化

- Spark SQL 已经使用了 Catalyst 查询优化器模块, 优化过了, 所以可以提供给我们的优化参数不多

``` sql

以下的单位是字节: 256 * 1024 * 1024

*. 小文件合并，默认是4M，可以调大点，不然每个小文件就是一个Task ,
  spark.sql.files.maxPartitionBytes=268435456;

*. 调节每个partition大小，默认 128M，可以适当调大点
  spark.sql.files.openCostInBytes=268435456;

*. 两个表shuffle，如join。这个最有用，经常使用的。 默认是10M，调成100M，甚至是1G。
  spark.sql.autoBroadcastJoinThreshold=268435456;

*. 并行度的优化，这要根据自己集群的配置来调节，默认情况下是 200
  spark.sql.shuffle.partitions=6;

*. 如果开启, 表示所有的 JDBC/ODBC connection 共用用一份 SQL 配置和临时函数注册表
  spark.sql.hive.thriftServer.singleSession=false;

```


## 二、thriftServer 服务

``` sh

启动服务
  $SPARK_HOME/sbin/start-thriftserver.sh \
  --master yarn \
  --deploy-mode client \
  --name spark-sql-client-2.x \
  --driver-cores 2 \
  --driver-memory 2048M \
  --num-executors 2 \
  --executor-memory 2048M \
  --jars file://$HIVE_HOME/lib/hive-json-serde.jar,file://$HIVE_HOME/lib/hive-contrib.jar,file://$HIVE_HOME/lib/hive-serde.jar \
  --hiveconf hive.server2.thrift.port=10002 \
  --conf spark.sql.hive.thriftServer.singleSession=false \
  --conf spark.sql.files.maxPartitionBytes=268435456 \
  --conf spark.sql.files.openCostInBytes=268435456 \
  --conf spark.sql.autoBroadcastJoinThreshold=268435456 \
  --conf spark.sql.shuffle.partitions=12 \
  --conf spark.broadcast.compress=true \
  --conf spark.io.compression.codec=org.apache.spark.io.SnappyCompressionCodec


连接
  $SPARK_HOME/bin/beeline -u jdbc:hive2://hostname:10002/default -nhadoop -phadoop
```
