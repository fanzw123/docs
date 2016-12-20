# 用户画像 UserPortrait

## 一、部署

 标签的三个基础
- 1. 查看所有标签，包括权重
- 2. 根据一个人ID查所有标签
- 3. 根据多个标签查符合条件的人


``` sh

hbase 创建用户画像
  create 'userPortrait',{NAME=>'tags'},{NAME=>'dimension'},{NAME=>'needs'},{NAME=>'modelState'}

  清空标签分数
  put 'userPortrait','613','tags:bedrooms','{}'
  put 'userPortrait','613','tags:block',''
  put 'userPortrait','613','tags:city','{}'
  put 'userPortrait','613','tags:community','{}'
  put 'userPortrait','613','tags:district','{}'
  put 'userPortrait','613','tags:price','{}'


1. 本地部署
  spark-submit \
  --name UserPortrait \
  --class com.angejia.dw.recommend.user.portrait.UserPortrait \
  --master local[2] \
  ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar --env "dev" --kafka-topic "accessLog" --kafka-consumer-gid "userPortrait"


2. 提交模式写 cluster 和 client 模式

  spark-submit \
  --name UserPortrait \
  --class com.angejia.dw.recommend.user.portrait.UserPortrait \
  --master yarn \
  --deploy-mode client \
  --driver-cores 2 \
  --driver-memory 4096M \
  --executor-memory 2048M \
  --executor-cores 1 \
  --num-executors 1 \
   --conf "spark.executor.extraJavaOptions=-XX:+PrintGCDetails -XX:+PrintGCTimeStamps" \
   --conf "spark.executor.extraJavaOptions=-XX:+UseConcMarkSweepGC" \
   ~/app/recommend/recommend-2.0/target/scala-2.11/recommend-2.0.jar \
   --env "online" \
   --kafka-topic "accessLog" \
   --kafka-consumer-gid "userPortrait"  >> /data/log/recommend/UserPortrait 2>&1  &


* hive 映射表

CREATE EXTERNAL TABLE real_time.user_portrait(
  row_key int,
  action_needs string,
  tags_city String,
  tags_district String,
  tags_block String,
  tags_community String,
  tags_bedrooms String,
  tags_price String
  )
STORED BY 'org.apache.hadoop.hive.hbase.HBaseStorageHandler'
WITH SERDEPROPERTIES (
  "hbase.columns.mapping" = "needs:actionNeeds,tags:city,tags:district,tags:block,tags:community,tags:bedrooms,tags:price")
TBLPROPERTIES (
  "hbase.table.name" = "userPortrait")



drop table dw_user_sd;
create table dw_user_sd AS
select
  '613' as user_id,
  '286,1055,1003' AS visit_item_invs_d,
  '286,1055,1003' AS visit_item_invs_a,
  '286,1055,1003' AS link_invs_d,
  '286,1055,1003' AS link_invs_a,
  '2016-04-28' as p_dt
UNION ALL
select
  '614' as user_id,
  '286,1055,1003' AS visit_item_invs_d,
  null AS visit_item_invs_a,
  '286,1055,1003' AS link_invs_d,
  '286,1055,1003' AS link_invs_a,
  '2016-04-28' as p_dt
;

```
