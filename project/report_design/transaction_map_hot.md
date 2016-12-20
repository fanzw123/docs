# 成交热度地图

## 数据

- 数据依赖:
 - dm_db.dm_transaction_map_hot 成交热度
 - dm_db.dm_community_iwjw_geo 链家小区经纬度
 - [高德地图 API](http://lbs.amap.com/)
 	- [点标注](http://lbs.amap.com/api/javascript-api/guide/marker-point/)
	- [热力图](http://lbs.amap.com/api/javascript-api/example/layers/heatmap/)
- 测试 URL http://127.0.0.1:30000/map/shanghai/201604



```
更新 dm_db.dm_transaction_map_hot 存储过程即可
https://git.corp.angejia.com/dw/dw_sql/blob/master/service/map/dm_transaction_map_hot.sql
```
