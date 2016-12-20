# Spark Sql Thriftserver

## 一、thrift-server 服务

- 开启 thrift-server 服务
- [spark thrift-jdbcodbc-serve 文档](http://spark.apache.org/docs/1.5.2/sql-programming-guide.html#running-the-thrift-jdbcodbc-server)

### 1. $SPARK_HOME/conf 下的 hive-site.conf

``` xml
<!-- 设置 metastore thrift 地址 -->
<property>
  <name>hive.metastore.uris</name>
  <value>thrift://uhadoop-ociicy-master1:9083,thrift://uhadoop-ociicy-master2:9083</value>
</property>
```

### 2. 启动 Thriftserver 进程

``` sh

1. Yarn 模式
  (1) yarn-client 模式 , 让 Yarn 管理进程 , Driver 运行在客户端 ,Work 运行在 NodeManager 上
    $SPARK_HOME/sbin/start-thriftserver.sh \
    --master yarn \
    --deploy-mode client \
    --name spark-sql-test \
    --driver-cores 2 \
    --driver-memory 4096M \
    --num-executors 2 \
    --executor-memory 2048M \
    --jars file://path/xxx.jar,file://path/xxx.jar \
    --hiveconf hive.server2.thrift.port=10002 

  (2) yarn-cluster模式, 集群模式目前不支持
    ./sbin/start-thriftserver.sh \
    --master yarn \
    --deploy-mode cluster \
    --name spark-sql \
    --driver-cores 2 \
    --driver-memory 500M \
    --hiveconf hive.server2.thrift.port=10002

2. standalone 模式
  $SPARK_HOME/sbin/start-thriftserver.sh \
  --master spark://uhadoop-ociicy-task3:7077 \
  --deploy-mode client \
  --name spark-sql \
  --driver-cores 2 \
  --driver-memory 500M \
  --hiveconf hive.server2.thrift.port=10002


3. JDBC 操作 hive
  $SPARK_HOME/bin/beeline !connect jdbc:hive2://hostname:10002

```

## 二、Spark Sql Udf

- Hive UDF 与 Spark UDF 通用
- [UDF](technology/hadoop-docs/sub-project/hive/hive-udf.md)
