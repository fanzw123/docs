# 推荐数据接口


## 一、接口相关


- 开发 : http://127.0.0.1:8080
- 测试 : http://192.168.160.49:8080
- 线上 : http://ds.corp.angejia.com


### 1、用户房源推荐接口

- 接口地址
 - /dw_webservice/user/recommend/user-recommend-inventories?cityId=1&userId=37324
- 接口参数
 - userId 用户 ID
 - cityId 城市 ID
- 逻辑表
 - Hbase userPortrait  客户画像数据
 - da_user_inventory_recommend_ubcf   ubcf  算法推荐数据


### 2、房源推荐接口

- 接口地址
 - /recommendapi/inventory/169036.json
- 接口参数
 - 用户 id
 - cityId 城市 Id
- 逻辑表
 - da_property_inventroy_recommend


### 3、顾问配盘接口

- 接口地址
 - /dw_webservice/broker/broker-user-mate-inventory?brokerId=4&userId=79946&cityId=1
- 接口参数
 - brokerId 经纪人 id
 - userId 用户 id
 - cityId 城市 id


### 4、用户画像接口

- 接口地址
 - /dw_webservice/user/user-portrait/get-user-portrait?cityId=1&userIds=693473
- 接口参数
 - 城市 id
 - userIds 用户 IDS, 逗号(,)分隔


### 4、push 接口

- 接口地址
 - /dw_webservice/user/user-push/get-user-info?userIds=37324,53783&cityId=1
- 接口参数
 - 城市 id
 - userIds 用户 IDS, 逗号(,)分隔
