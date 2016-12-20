# UserUBCF 猜你喜欢

## 设计

- [安个家 - 数据部 - UBCF](https://www.processon.com/view/link/572b224be4b0c3c749748e14)

## 接口

- Api: http://ds.corp.angejia.com/recommendapi/user/37324.json

## 部署

``` sh
sbt clean assembly  先编译

猜你喜欢
  create 'userUBCF',{NAME=>'relation'},{NAME=>'recommend'}

  2. 提交 spark-streaming 程序,实时收集日期

  1) 本地测试
  spark-submit \
  --name UserUBCF \
  --class com.angejia.dw.recommend.user.UserUBCF \
  --master local[2] \
  ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "dev" "/data/log/recommend/rt_user_inventory_history/*"


  2) 训练模型写到 HBASE,
  提交模式写 cluster 和 client 模式
  spark-submit \
  --name UserUBCF \
  --class com.angejia.dw.recommend.user.UserUBCF \
  --master yarn-client \
  --driver-cores 4 \
  --driver-memory 10240M \
  --executor-memory 2048M \
  --num-executors 2 \
  ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "online" "hdfs://uhadoop-ociicy-master1:8020/user/hive/real_time/rt_user_inventory_history/*"



```
