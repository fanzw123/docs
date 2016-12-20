# UserCBCF 用户基于内容的 CBCF

## 设计

- [安个家 - 数据部 - 推荐系统 CBCF - 2.0](https://www.processon.com/view/link/56d3b2e7e4b0f9ea1683e1e5)

## 部署

- Api : http://ds.corp.angejia.com/recommendapi/user/37324.json

## 环境

``` sh

一、日志
  # 创建 recommendUsers Topic
  kafka-topics.sh --create --zookeeper namenode:2181 --replication-factor 1 --partitions 1 --topic recommendUsers
  kafka-topics.sh --create --zookeeper uhadoop-ociicy-master1:2181 --replication-factor 1 --partitions 1 -topic recommendUsers

  # 生产 recommendUsers Topic
  kafka-console-producer.sh --broker-list dwtest:9092 --topic recommendUsers
  kafka-console-producer.sh --broker-list bi4:9092 --topic recommendUsers

  {"user_id":"37324","city_id":"1"}

  # 消费 recommendUsers Topic
  kafka-console-consumer.sh --zookeeper namenode:2181 --topic recommendUsers --from-beginning
  kafka-console-consumer.sh --zookeeper uhadoop-ociicy-master1:2181  --topic recommendUsers --from-beginning



二、 部署

1. 本地部署
  spark-submit \
  --name UserCBCF \
  --class com.angejia.dw.recommend.user.UserCBCF \
  --master local[2] \
  ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "dev" "3" "recommendUsers" "1" "userCBCF"


2. 提交模式写 cluster 和 client 模式
  spark-submit \
  --name UserCBCF \
  --class com.angejia.dw.recommend.user.UserCBCF \
  --master yarn-client \
  --driver-cores 2 \
  --driver-memory 2048M \
  --executor-memory 2048M \
  --executor-cores 2 \
  --num-executors 2 \
  ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "online" "10" "recommendUsers" "1" "userCBCF" >> /data/log/recommend/UserCBCF 2>&1  &


cd /data/log/recommend
tail -f UserCBCF


```
