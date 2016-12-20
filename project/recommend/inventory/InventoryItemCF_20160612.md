# InventoryIBCF 看了又看推荐系统

## 设计

- [安个家 - 数据部 - ItemCF](https://www.processon.com/view/link/5704a60ae4b04878f849e689)

## 接口

- Api: http://ds.corp.angejia.com/recommendapi/inventory/100029.json

## 部署

``` sh
sbt clean assembly  先编译

* 看了又看推荐
  create 'inventoryRecommend',{NAME=>'inventoryRecommendInventory'}

  2. 提交 spark-streaming 程序,实时收集日期

  1) 本地测试
  spark-submit \
  --name InventoryIBCF \
  --class com.angejia.dw.recommend.inventory.InventoryIBCF \
  --master local[2] \
  ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "namenode" "inventoryRecommend" "/data/log/recommend/recommend_user_inventory_history/*"


  2) 训练模型写到 HBASE,
  提交模式写 cluster 和 client 模式
  spark-submit \
  --name InventoryIBCF \
  --class com.angejia.dw.recommend.inventory.InventoryItemCF \
  --master yarn-client \
  --driver-cores 4 \
  --driver-memory 10240M \
  --executor-memory 2048M \
  --num-executors 2 \
  ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar "uhadoop-ociicy-master1,uhadoop-ociicy-master2" "inventoryRecommend" "hdfs://uhadoop-ociicy-master1:8020/user/hive/real_time/rt_recommend_user_inventory_history/*"


* 创建 hive 映射到 Hbase 的表
  CREATE EXTERNAL TABLE real_time.inventory_recommend(
    row_key int,
    inventory_recommend_inventory__inventory_ids string)
  STORED BY 'org.apache.hadoop.hive.hbase.HBaseStorageHandler'
  WITH SERDEPROPERTIES (
    "hbase.columns.mapping" = "inventoryRecommendInventory:inventoryIds")
  TBLPROPERTIES (
    "hbase.table.name" = "inventoryRecommend")
  ;

```
