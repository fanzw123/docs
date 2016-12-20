# 推荐系统

## 一、介绍

### 1. 安个家推荐系统

- [基于内容的推荐 Content-based Recommendation](technology/algorithm/recommend/principle.md)

```
推荐逻辑:
1. 建立用户画像，用各个标签去描述用户特征、需求模型
2. 根据用户浏览房源单页、过滤房源、用户需求单、用户收藏房源，等等用户行为,对用户对应的标签进行加分
3. 根据用户需求(版块、小区、户型、价格)
  hbase inventory table 模糊匹配出一部分房子，
  根据用户需求,对着匹配的一部分房子,进行需求临时打分
  根据临时打的分数，推荐分数最高的房子
4. 没有匹配到房子
  选择(小区、户型、价格),分数最高取 hbase inventory table 模糊匹配出 10 套房子给用户

推荐系统 2.0 系统流程


```

### 2. 需要迭代 2.0

```
1. 加入 rank 值,排序房子

2. 用户画像(tag)
  用户画像(用户信息标签化)
  1、浏览过的房源单页
  2、收藏过的房源
  3、筛选过：区域、版块、户型
  4、安装过的 AppList
  6、搜索过的小区
  7、用户城市
  8、用户年纪
  9、用户性别

  把用户感兴趣的需求列出来

  然后数数一数手上的商品有没有符合用户的

  去房源库匹配出用感兴趣的房子

3. 房源推荐

  下架房源(不展示)
  看过房源(不展示)
  无图房源示(最后展示)
  最少推荐 20 套房子
  用户文本标签(版块、户型、)

  待处理问题: 房源为什么只推一个小区
  房源问题: Hbase 房源问题
    查看房源的 Streaming
    查看推荐的 Streaming



推荐系统 25% (新大陆项目)

4. 房子推房子

5. 给用户推荐经纪人(派单)

6. 给经纪人推荐用户(派代)

7. 给用户推荐房子(目前在做)

8. 重新派单(已有)

9. 合作派单(以后)

10. 2 个安家顾问互相推荐客户,给用户
```

## 二、部署

- [推荐系统物理架构](https://www.processon.com/view/link/56a60242e4b032b44e0bb9e8)

### 1. 抽取数据源

``` java

1. 抽取日志
  java -Djava.ext.dirs=/home/dwadmin/app/recommend/extract/lib/ -cp /home/dwadmin/app/recommend/run/logGather.jar angejia.logGather.LogGather "/data/log/uba/lb" "GBK" "action" "uhadoop-ociicy-master1:2181" "bi4:9092" "/home/dwadmin/app/recommend/run/logGatherConfig/lineInfo" &

2. Mysql 抽取
  java -Djava.ext.dirs=/home/dwadmin/app/recommend/extract/lib/ -cp /home/dwadmin/app/recommend/run/mysqlExtract.jar angejia.mysqlExt.MysqlExtract /home/dwadmin/app/recommend/run/mysqlExtractConfig/mysql_ext.properties &

```

### 2. KAFKA 服务

``` sh
1) 启动 KAFKA 服务
  broker_id = 1 (表示 KAFKA 的服务 id), zookeeper.connect (表示同属的 KAFKA 集群,用 zooker 管理)
  $KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties &

2) 创建  Topic
  $KAFKA_HOME/bin/kafka-topics.sh --create --zookeeper uhadoop-ociicy-master1:2181 --replication-factor 1 --partitions 1 --topic action

  有 3 个 Topic
    (1) action : 用户行为 (log , mysql)
      数据结构
        用户需求单(Mysql) : Json 串
        浏览信息(access_log) :  \t 分割的 log
        过滤房源(access_log) :  \t 分割的 log
        收藏房源(Mysql) : user_id-inventory_id 拼接字符串

    (2) needRecommend : (需要推荐的人的 user_id)
      数据结构
        user_id

    (3) inventoryUpdate : (房源信息变更,新增)
      数据结构
        见配置文件 mysqlExtractConfig/mysql_ext.properties


3) 查看 Topic
  $KAFKA_HOME/bin/kafka-topics.sh --describe --zookeeper uhadoop-ociicy-master1:2181 --topic action
```

### 3. recommend 推荐

``` sh
1) hbase 结构

  (1) 用户表，保存用户分数 user
    // demand : 用户分数(需求)
    // static : 静态用户基本信息(姓名、手机号等) (目前无数据)
    // dynamic : 动态用户信息(带看、使用频次、使用时长等) 目前无数据
    create 'user',{NAME=>'static'},{NAME=>'dynamic'},{NAME=>'demand'}
    rowKey : user_id
      demand:key = 123123

    案例数据:
    // 显示 user 表, 列族数据
    scan 'user', { LIMIT => 10}

    get 'user','101134'
      // 需求城市
      demand:P1001
      // 需求区域(区域:几分)
      demand:P1002
      // 需求板块(版块:几分)
      demand:P1003                      timestamp=1455871136188, value=0:70,90:30,68:28,172:4,77:2,4700:2,72:2,173:2,
      // 需求小区(小区:几分)
      demand:P1004                      timestamp=1455871136188, value=19100:14,19170:6,15488:4,19900:2,6929:2,6284:2,15541:2,5874:2,19121:2,5778:2,5909:2,
      // 需求户型(几室:几分)
      demand:P1005                      timestamp=1455871136188, value=3:62,2:48,
      // 需求价格(百万:几分)
      demand:P1006                      timestamp=1455871136188, value=3:80,4:20,5:4,2:4,7:2,


  (2) 房源信息表 inventory
    // static : 静态房源信息(价格、户型、小区等)
    // dynamic : 动态房源数据 (目前这套房子已经被推送给哪些 userId ,用逗号分隔 userId)
    create 'inventory',{NAME=>'static'},{NAME=>'dynamic'}
    rowKey : city-district-block-community-bedrooms-price-inventoryId


    案例数据:
    // 显示 inventory 表,列族数据
    scan 'inventory', {COLUMNS => ['dynamic'], LIMIT => 1}

    get 'inventory','1-10-100-10000-1-1-218989'
       //已经推此房源的用户 ids
       dynamic:P2012                     timestamp=1456059515522, value=373368,81498,391217,391373,354900,255174,395846,396872,398485,396515,
                                         402331,403599,404319,405229,395147,408421,408668,409356,410690,412495,
       //城市
       static:P1001                      timestamp=1453027447851, value=1
       //区域
       static:P1002                      timestamp=1453027447851, value=10
       //版块
       static:P1003                      timestamp=1453027447851, value=100
       //小区
       static:P1004                      timestamp=1453027447851, value=10000
       //户型
       static:P1005                      timestamp=1453027447851, value=1
       //价格
       static:P1006                      timestamp=1453027447851, value=1


2) 部署
  (1) user-score : 用户打分逻辑
spark-submit --name user-score --jars /home/hadoop/app/recommend/recommend/lib/spark-streaming-kafka_2.10-1.5.2.jar,/home/hadoop/app/recommend/recommend/lib/kafka_2.10-0.9.0.0.jar,/home/hadoop/app/recommend/recommend/lib/zkclient-0.7.jar,/home/hadoop/app/recommend/recommend/lib/metrics-core-2.2.0.jar,/home/hadoop/app/recommend/recommend/lib/hbase-client-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/kafka-clients-0.9.0.0.jar,/home/hadoop/app/recommend/recommend/lib/hbase-common-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/hbase-protocol-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/htrace-core-3.1.0-incubating.jar,/home/hadoop/app/recommend/recommend/lib/guava-12.0.1.jar  --class angejia.streaming.AssessScore --master local[2]  /home/hadoop/app/recommend/run/recommend/score.jar "uhadoop-ociicy-master1:2181" "bi4:9092" "action" "needRecommend" "group1" "5" &

  (2) recommend-user : 推荐逻辑
spark-submit --name recommend-user --jars /home/hadoop/app/recommend/recommend/lib/spark-streaming-kafka_2.10-1.5.2.jar,/home/hadoop/app/recommend/recommend/lib/kafka_2.10-0.9.0.0.jar,/home/hadoop/app/recommend/recommend/lib/zkclient-0.7.jar,/home/hadoop/app/recommend/recommend/lib/metrics-core-2.2.0.jar,/home/hadoop/app/recommend/recommend/lib/hbase-client-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/kafka-clients-0.9.0.0.jar,/home/hadoop/app/recommend/recommend/lib/hbase-common-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/hbase-protocol-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/htrace-core-3.1.0-incubating.jar,/home/hadoop/app/recommend/recommend/lib/guava-12.0.1.jar,/home/hadoop/app/recommend/recommend/lib/mysql-connector-java-5.1.26-bin.jar  --class angejia.streaming.Recommend --master local[2]  /home/hadoop/app/recommend/run/recommend/recommend.jar "uhadoop-ociicy-master1:2181" "bi4:9092" "needRecommend" "reco_group1" "5" "angejia-bi-db" "hadoop" "angejia888" "dw_db" &

  (3) 新增、更行、修改房源
spark-submit --name inventory-update --jars /home/hadoop/app/recommend/recommend/lib/spark-streaming-kafka_2.10-1.5.2.jar,/home/hadoop/app/recommend/recommend/lib/kafka_2.10-0.9.0.0.jar,/home/hadoop/app/recommend/recommend/lib/zkclient-0.7.jar,/home/hadoop/app/recommend/recommend/lib/metrics-core-2.2.0.jar,/home/hadoop/app/recommend/recommend/lib/hbase-client-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/kafka-clients-0.9.0.0.jar,/home/hadoop/app/recommend/recommend/lib/hbase-common-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/hbase-protocol-1.0.2.jar,/home/hadoop/app/recommend/recommend/lib/htrace-core-3.1.0-incubating.jar,/home/hadoop/app/recommend/recommend/lib/guava-12.0.1.jar,/home/hadoop/app/recommend/recommend/lib/mysql-connector-java-5.1.26-bin.jar  --class angejia.streaming.UpdateInventory --master local[2]  /home/hadoop/app/recommend/run/recommend/inventory-update.jar "uhadoop-ociicy-master1:2181" "bi4:9092" "update_group1" "inventoryUpdate" "needRecommend" "5" &
```
