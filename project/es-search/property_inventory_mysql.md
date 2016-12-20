# proerty_inventory 索引表 Mysql 方案

## 一、依赖管理

- [dw_elasticsearch](dw_elasticsearch.md)


### 2. 部署

``` sh
线下测试
  java -DAPP_NAME=PropertyInventoryIndexService -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.service.property.PropertyInventoryService "dev" "/data/log/service/property/service_property_date_point" "/Users/jack/app/dw_sql/service/property/service_property_mysql_source_count.sql" "/Users/jack/app/dw_sql/service/property/service_property_mysql_source.sql" "/Users/jack/app/dw_sql/service/property/service_property_hive_source.sql"


线上部署
  java -DAPP_NAME=PropertyInventoryIndexService -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.service.property.PropertyInventoryService "online" "/data/log/service/property/service_property_date_point" "/home/dwadmin/app/dw_sql/service/property/service_property_mysql_source_count.sql" "/home/dwadmin/app/dw_sql/service/property/service_property_mysql_source.sql" "/home/dwadmin/app/dw_sql/service/property/service_property_hive_source.sql"
  >> /data/log/service/property/service_property_extract 2>&1  &


```
