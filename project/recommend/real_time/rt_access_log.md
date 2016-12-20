# rt_access_log 实时日志

- [推荐系统物理架构](https://www.processon.com/view/link/5704a60ae4b04878f849e689)

### `* 准备工作`

``` sh
# 启动 zookeeper // 测试
$ZOOKEEPER_HOME/bin/zkCli.sh -server namenode:2181  
$ZOOKEEPER_HOME/bin/zkServer.sh start

# 启动 kafka
$KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_CONF_DIR/server.properties &


sbt clean assembly  先编译

一、 accessLog 实时日志服务

  1. kafuka 命令
    # 创建 accessLog Topic
    kafka-topics.sh --create --zookeeper namenode:2181 --replication-factor 1 --partitions 1 --topic accessLog
    kafka-topics.sh --create --zookeeper uhadoop-ociicy-master1:2181 --replication-factor 1 --partitions 1 -topic accessLog

    # 生产 accessLog Topic
    kafka-console-producer.sh --broker-list dwtest:9092 --topic accessLog
    kafka-console-producer.sh --broker-list bi4:9092 --topic accessLog
    kafka-console-producer.sh --broker-list ukafka-tixy3x-1-bj03.service.ucloud.cn:9092 --topic accessLog

    # 消费 accessLog Topic
    kafka-console-consumer.sh --zookeeper namenode:2181 --topic accessLog --from-beginning
    kafka-console-consumer.sh --zookeeper uhadoop-ociicy-master1:2181  --topic accessLog --from-beginning
    kafka-console-consumer.sh --zookeeper ukafka-uiu1lt-1-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-2-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-3-bj03.service.ucloud.cn:2181 --topic accessLog --from-beginning

    # 查看消费组
    kafka-consumer-groups.sh --zookeeper ukafka-uiu1lt-1-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-2-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-3-bj03.service.ucloud.cn:2181 --list

    # 查看主题
    kafka-topics.sh --list --zookeeper ukafka-uiu1lt-1-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-2-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-3-bj03.service.ucloud.cn:2181

    # 查看单个 Topic 详情
    kafka-topics.sh --describe --zookeeper ukafka-uiu1lt-1-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-2-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-3-bj03.service.ucloud.cn:2181 --topic accessLog

    # 连接 kafka 集群 zookeeper 
    $ZOOKEEPER_HOME/bin/zkCli.sh -server ukafka-uiu1lt-1-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-2-bj03.service.ucloud.cn:2181,ukafka-uiu1lt-3-bj03.service.ucloud.cn:2181


  2. 客户端收集日志发送到 kafka

    1) 本地测试
    java -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.recommend.extract.ExtractFileToKafka "namenode:2181" "dwtest:9092" "accessLog" "0" "accessLogBase" "/data/log/real_time/logs/access_log" "2"


    1) 发送日志到 accessLog 线上
    开始读取点 : /data/log/real_time/logs/access_log
    运行日志 : /data/log/real_time/logs/access_log_run
    java -DAPP_NAME=ExtractFileToKafkaAccessLog \
    -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.recommend.extract.ExtractFileToKafka "uhadoop-ociicy-master1:2181" "bi4:9092" "accessLog" "0" "accessLogBase" "/data/log/real_time/logs/access_log" "2000" >> /data/log/real_time/logs/access_log_run 2>&1  &



  3. 提交 spark-streaming 程序,实时收集日志

    1) 本地测试
    spark-submit --name AccessLogStreaming --class com.angejia.dw.logs.AccessLogStreaming --master local[2] ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "3" "namenode:2181" "accessLog" "1" "accessLogBase" "/user/hive/real_time/source_data/access_log"

    2) 线上本地测试
    spark-submit --name AccessLogStreaming --class com.angejia.dw.logs.AccessLogStreaming --master local[2] ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "5" "uhadoop-ociicy-master1:2181" "accessLog" "1" "accessLogBase" "/user/hive/real_time/source_data/access_log"

    3) 线上部署 提交给 Yarn
    #export HADOOP_CONF_DIR=XXX cluster
    spark-submit \
    --name AccessLogStreaming \
    --class com.angejia.dw.logs.AccessLogStreaming \
    --master yarn-client \
    --driver-cores 1 \
    --driver-memory 2048M \
    --executor-memory 1024M \
    --num-executors 2  \
    ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "5" "uhadoop-ociicy-master1:2181" "accessLog" "1" "accessLogBase" "/user/hive/real_time/source_data/access_log" >> /data/log/recommend/AccessLogStreaming 2>&1  &

```
