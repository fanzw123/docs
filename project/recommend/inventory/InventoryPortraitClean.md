# InventoryPortraitClean 清理无用房源数据

## 一、调用

``` java
1. 指定房源清理
  java -DAPP_NAME=InventoryPortraitClean \
  -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.recommend.inventory.portrait.InventoryPortraitClean "online" "row-key"

2. 所有无效房源清理
  java -DAPP_NAME=InventoryPortraitClean \
  -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.recommend.inventory.portrait.InventoryPortraitClean "online" "" >> /data/log/recommend/InventoryPortraitClean 2>&1  &

3. 日志监控
  cd /data/log/recommend
  tail -f InventoryPortraitClean
```
