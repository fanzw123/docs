df # SparkSql ＋ UDF 支持

- [dw-hive-udf](project/dw-hive-udf) 本项目依赖 dw-hive-udf

## 一、access_log (正则支持)

### 1. spark-sql 客户端模式配置

- 问题描述: 创建 access_log 表使用了正则表示

```
解析格式  'input.regex'='([^\\t]*)........' 导致查询查询异常

处理办法一:
  通过 spark-sql add jar 引入 hive-serde.jar 包

处理办法二: 修改 $HIVE_HOME/conf/hive-site.xml  (默认使用)
  加载类包: hive-serde.jar
  <property>
    <name>hive.aux.jars.path</name>
    <value>file:///usr/local/hive/lib/hive-serde.jar</value>
  </property>
```

### 2. spark-thriftServer 模式配置

- 问题描述: 创建 access_log 表使用了正则表示

```
access_log 表使用了正则表示，如下语句  'input.regex'='([^\\t]*)........',所以必须引入相应的正则解析包，如下方式：

SPARK_HOME/sbin/start-thriftserver.sh  --jars file:///usr/local/hive/lib/hive-json-serde.jar

```


## 二、uba_log json (格式数据支持)

### 1. spark-sql 客户端模式配置

- 问题描述: hive udf 迁移到 spark udf 必须做如下处理

``` xml
1）增加 jar 包, 支持 json 格式的行数据

  $HIVE_HOME/conf/hive－site.xml 添加 hive-json-serde.jar

  <property>
    <name>hive.aux.jars.path</name>
    <value>file:///usr/local/hive/lib/hive-json-serde.jar</value>
  </property>
```


### 2. spark-thriftServer 模式配置

-  uba_log json 格式的支持

```
uba_log 原始数据使用的是 json 格式数据，所以操作 uba_log 数据时必须引入 json 解析包，如下方式：

SPARK_HOME/sbin/start-thriftserver.sh   --jars file:///usr/local/hive/lib/hive-json-serde.jar
```


## 三、HiveUDF 迁移到 SparkUDF

### 1. UDF 平滑迁移的问题 tempory function 时抛出异常的问题如下

- 出现部分 udf 创建 tempory function 时抛出异常

``` sh

1. beeline> 模式下执行
  add jar hdfs://Ucluster/user/jars/dw_hive_udf-1.0-SNAPSHOT.jar;
  create temporary function parse_mobile_token as 'com.angejia.dw.hive.udf.parse.ParseMobileToken';
  create temporary function parse_mobile_agent as 'com.angejia.dw.hive.udf.parse.ParseMobileAgent';

2. 错误异常  
  1) Error: org.apache.spark.sql.AnalysisException: undefined function get_page_info; line 6 pos 26 (state=,code=0)
    创建永久函数, 方法如下

  2) 这个错误请无视
    Error fetching results:
    org.apache.hive.service.cli.HiveSQLException: Couldn t find log associated with operation handle: OperationHandle    
       opType=EXECUTE_STATEMENT,getHandleIdentifier()

```


### 2. SparkSQL-ThriftServer 服务部署注意事项和流程

- [1.5 版本 Bug](https://issues.apache.org/jira/browse/SPARK-12051) Can't register UDF from Hive thrift server
- [1.5 版本 Bug](https://issues.apache.org/jira/browse/SPARK-11191) Can't create UDF's using hive thrift service

``` sh
* Hive Udf 加载到 SparkSql ThriftServer 上的步骤和注意事项(非常重要！)
  1. jar 必须在 SparkSql ThriftServer 本地节点上, 不可以在 HDFS 上, 如果 jar 有依赖, 必须把依赖打入这个 jar 中
  2. 必须创建永久 UDF function , 创建之后必须重启 SparkSql ThriftServer 服务


* 流程步骤: 在 SparkSql ThriftServer beeline 客户端加载

  登录客户端方法:
    $SPARK_HOME/bin/beeline -u jdbc:hive2://uhadoop-ociicy-task4:10002/default -nhadoop -phadoop

  1. 加载 SparkSql ThriftServer 服务器上的本地 UDF jar 包

    beeline> ADD JAR /data/app/jars/dw_hive_udf-1.0-SNAPSHOT-spark.jar;    必须加载全部打包后的 jar

  2. 创建永久 函数 , 写在 hive 元数据库的 FUNCS 表中 (永久 函数创建一次即可, 除非函数加载的类路径发生变化)

    beeline>
    CREATE  FUNCTION  parse_user_agent  AS  'com.angejia.dw.hive.udf.useragent.ParseUserAgent';
    CREATE  FUNCTION  get_page_info  AS  'com.angejia.dw.hive.udf.pageinfo.CalculatePageInfo';

  3. 重启 SparkSql ThriftServer  服务

    a) 重启服务
      $SPARK_HOME/sbin/start-thriftserver.sh \
      --master yarn \
      --deploy-mode client \
      --name spark-sql-client \
      --driver-cores 2 \
      --driver-memory 8192M \
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
      --conf spark.io.compression.codec=org.apache.spark.io.SnappyCompressionCodec  &  

    b) 重启之后登陆 beeline>
      $SPARK_HOME/bin/beeline -u jdbc:hive2://uhadoop-ociicy-task4:10002/default -nhadoop -phadoop

      SHOW FUNCTIONS;  查看函数是否已经加载进入

      ADD JAR /data/app/jars/dw_hive_udf-1.0-SNAPSHOT-spark.jar;  需要重新 add jar, 即可生效, 每次修改 jar 包, 需要重启服务


* 通过 beeline 客户端连接测试,(当登录的账号更改, 需要重新 add jar)

  # 生产用
  $SPARK_HOME/bin/beeline -u jdbc:hive2://uhadoop-ociicy-task4:10002/default -nhadoop -phadoop


```
