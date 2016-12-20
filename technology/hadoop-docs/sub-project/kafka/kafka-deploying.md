# Kafka 安装

## 一、环境配置

- Java 1.8 环境配置
- Scala 2.10.6 环境配置
- zookeeper 3.4.6 安装

## 二、下载 与 安装

### 1. 下载与 Scala 相同的版本的 Kafka

- [Kafka 下载地址](http://kafka.apache.org/downloads.html)

``` sh

1. 下载
  Binary downloads
    Scala 2.10  - kafka_2.10-0.9.0.0.tgz  具体根据 Scala 版本决定

2. 解压
  tar -zxvf kafka_2.10-0.9.0.0.tgz

3. 环境配置
  vim ~/.bashrc
# Kafka
export KAFKA_HOME=/usr/local/kafka
export KAFKA_CONF_DIR=$KAFKA_HOME/config
export PATH=$KAFKA_HOME/bin:$PATH

```



## 三、操作

### 1. 启动其中一个 Kafka broker 代理 Server

- [启动文档](http://kafka.apache.org/documentation.html#quickstart)

``` sh
1. 修改配置文件
  cp $KAFKA_CONF_DIR/server.properties $KAFKA_CONF_DIR/server-1.properties
  vim $KAFKA_CONF_DIR/server-1.properties

  # 集群代理 id , 指定到同一个 zookeeper 集群的 kafka 集群代理 , 必须是唯一的
  broker.id=1

  # 配置 zookeeper 集群地址
  zookeeper.connect=zookeeper-hostname:2181

  # 日志目录地址
  log.dirs=/data/log/kafka/kafka-logs


2. 启动 Kafka broker 代理 (指定配置文件)
  1) 启动一个
    $KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_CONF_DIR/server.properties &


    netstat -tunlp | grep 9092  查看是否启动

```

### 2. Kafka 使用

``` sh

1. Topic 主题
  1) 创建 Topic
    kafka-topics.sh --create --zookeeper zookeeper-hostname:2181 --replication-factor 1 --partitions 1 --topic test

  2) 创建一个主题和 2 个复制因子(--replication-factor 不能超过 broker 服务的数量)
    kafka-topics.sh --create --zookeeper zookeeper-hostname:2181 --replication-factor 2 --partitions 1 --topic my-replicated-topic

  3) 删除主题
    kafka-serkafka-topics.sh --zookeeper zookeeper-hostname:2181 --delete --topic "clicki_info_topic"


2. 查看 Topic
  1) 查看 Topic 列表
    kafka-topics.sh --list --zookeeper zookeeper-hostname:2181

  2) 查看单个 Topic 详情
    kafka-topics.sh --describe --zookeeper zookeeper-hostname:2181 --topic my-replicated-topic

      Leader : Leader 所在 Broker
      replicas : 副本所在 Broker
      Isr : 这个副本列表的子集目前活着的和以后的领导人


  3) Topic 增加 partition 数目 kafka-add-partitions.sh

    kafka-add-partitions.sh --topic test --partition 2   --zookeeper  192.168.197.170:2181,192.168.197.171:2181 （为topic test增加2个分区）


2. producer 生产者
  1) 向 Topic 生产数据
    kafka-console-producer.sh --broker-list broker-1-hostname:9092 --topic test


3. consumer 消费者
  1) 从 Topic 消费数据
    kafka-console-consumer.sh --zookeeper broker-1-hostname:2181 --topic test --from-beginning


4. consumer groups
  1) 查看 consumer groups
   kafka-consumer-groups.sh --zookeeper namenode:2181 --list


5. 使用卡夫卡连接到导入/导出数据
  1) 配置文件
    $KAFKA_CONF_DIR/connect-standalone.properties  卡夫卡连接的配置过程,包含常见的配置如卡夫卡代理连接和数据的序列化格式

    $KAFKA_CONF_DIR/connect-file-source.properties

  2) kafka-run-class.sh kafka.tools.ConsumerOffsetChecker --group accessLogBase  --topic accessLog  --zookeeper uhadoop-ociicy-master1:2181/kafka
```
