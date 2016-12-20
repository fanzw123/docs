# proerty_inventory ES 索引

## 一、依赖管理

- [dw_elasticsearch](dw_elasticsearch.md)


## 二、索引与部署

### 1. 操作索引文档

``` sh

索引文档操作

* 查看所有索引列表  
  http://dwtest:9200/_cat/indices?v

* 查看 索引 Mapping 映射字段关系
  http://dwtest:9200/dw_property_inventory/_mapping

* 删除索引
 curl -XDELETE 'dwtest:9200/customer?pretty'


文档操作

* 搜索文档
  按照 文档 id 搜搜
  http://dwtest:9200/dw_property_inventory/_search?pretty&q=inventory_id:1

* 查看单个文档
  http://dwtest:9200/dw_property_inventory/a/1
  curl -XDELETE 'dwtest:9200/customer/external/1?pretty'

* 删除文档
  curl -XDELETE 'dwtest:9200/dw_property_inventory/z/1?pretty'

* 查询所有文档
  http://dwtest:9200/dw_property_inventory/_search?pretty&q=*

```


### 2. 部署

``` sh
线下测试
  java -DAPP_NAME=PropertyInventoryService \
  -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.service.property.PropertyInventoryService "dev" "/data/log/service/property/service_property_date_point" "/Users/jack/app/dw_sql/service/property/service_property_mysql_source.sql" "/Users/jack/app/dw_sql/service/property/service_property_hive_source.sql"


线上部署
  java -DAPP_NAME=PropertyInventoryService \
  -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.service.property.PropertyInventoryService "online" "/data/log/service/property/service_property_date_point" "/home/dwadmin/app/dw_sql/service/property/service_property_mysql_source.sql" "/home/dwadmin/app/dw_sql/service/property/service_property_hive_source.sql"
  >> /data/log/service/property/service_property_extract 2>&1  &
```
