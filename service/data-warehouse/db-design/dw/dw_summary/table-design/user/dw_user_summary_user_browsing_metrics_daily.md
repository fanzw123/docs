# 用户访问Summary表新增字段

**需要分TouchWeb、wechat、IOS、Android**

### 一、用户访问已有字段

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | touch_ud | bigint | dw_db.dw_web_visit_traffic_log |  |
| 2 | touch_fud | bigint | dw_db.dw_web_visit_traffic_log |  |
| 3 | touch_vpud | bigint | dw_db.dw_web_visit_traffic_log |  |
| 4 | touch_pv | bigint | dw_db.dw_web_visit_traffic_log |  |
| 5 | touch_vppv | bigint | dw_db.dw_web_visit_traffic_log |  |
| 6 | wechat_public_num_ud | bigint | dw_db.dw_web_visit_traffic_log |  |
| 7 | wechat_public_num_fud | bigint | dw_db.dw_web_visit_traffic_log |  |
| 8 | wechat_public_num_vpud | bigint | dw_db.dw_web_visit_traffic_log |  |
| 9 | wechat_public_num_pv | bigint | dw_db.dw_web_visit_traffic_log |  |
| 10 | wechat_public_num_vppv | bigint | dw_db.dw_web_visit_traffic_log |  |
| 11 | pc_ud | bigint | dw_db.dw_web_visit_traffic_log |  |
| 12 | pc_fud | bigint | dw_db.dw_web_visit_traffic_log |  |  |
| 13 | pc_vpud | bigint | dw_db.dw_web_visit_traffic_log |  |  |
| 14 | pc_pv | bigint | dw_db.dw_web_visit_traffic_log |  |  |
| 15 | pc_vppv | bigint | dw_db.dw_web_visit_traffic_log |  |  |
| 16 | app_ud | bigint | dw_db.dw_app_access_log |  |  |
| 17 | app_vppv | bigint | dw_db.dw_app_access_log |  |  |
| 18 | app_fud | bigint | dw_db.dw_app_access_log |  |  |
| 19 | app_vpud | bigint | dw_db.dw_app_access_log |  |   |

### 二、用户访问新增字段

```
1.APP细分
```

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | app_ud_ios | bigint | dw_db.dw_app_access_log |  |  |
| 2 | app_vppv_ios | bigint | dw_db.dw_app_access_log |  |  |
| 3 | app_fud_ios | bigint | dw_db.dw_app_access_log |  |  |
| 4 | app_vpud_ios | bigint | dw_db.dw_app_access_log |  |   |
| 5 | app_ud_android | bigint | dw_db.dw_app_access_log |  |  |
| 6 | app_vppv_android | bigint | dw_db.dw_app_access_log |  |  |
| 7 | app_fud_android | bigint | dw_db.dw_app_access_log |  |  |
| 8 | app_vpud_android | bigint | dw_db.dw_app_access_log |  |   |


```
2.APP Click信息
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | app_phone_counseling_click_ios | bigint | dw_db.dw_app_action_detail_log | 电话咨询Click-ios |  |
| 2 | app_phone_counseling_click_android | bigint | dw_db.dw_app_action_detail_log | 电话咨询Click-android |  |
| 3 | app_phone_counseling_click_pc | bigint | dw_db.dw_web_action_detail_log | 电话咨询Click-pc |  |
| 4 | app_phone_counseling_click_touchweb | bigint | dw_db.dw_web_action_detail_log | 电话咨询Click-touchweb |  |
| 5 | app_reservation_visit_click_ios | bigint | dw_db.dw_app_action_detail_log | 预约带看Click-ios |  |
| 6 | app_reservation_visit_click_android | bigint | dw_db.dw_app_action_detail_log | 预约带看Click-android |  |
| 7 | app_reservation_visit_click_pc | bigint | dw_db.dw_web_action_detail_log | 预约带看Click-pc |  |
| 8 | app_reservation_visit_click_touchweb | bigint | dw_db.dw_web_action_detail_log | 预约带看Click-touchweb |  |
| 9 | app_wechat_click_ios | bigint | dw_db.dw_app_action_detail_log | 微聊Click-ios |  |
| 10 | app_wechat_click_android | bigint | dw_db.dw_app_action_detail_log | 微聊Click-android |  |


```
3.房源列表页信息
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | inventory_list_ud_ios | bigint | dw_db.dw_app_access_log | 房源列表页UD-ios |  |
| 2 | inventory_list_ud_android | bigint | dw_db.dw_app_access_log | 房源列表页UD-android |  |
| 3 | inventory_list_ud_pc | bigint | dw_db.dw_web_visit_traffic_log | 房源列表页UD-pc |  |
| 4 | inventory_list_ud_touchweb | bigint | dw_db.dw_web_visit_traffic_log | 房源列表页UD-touchweb |  |

```
4.单页信息
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | inventory_page_ud_ios | bigint | dw_db.dw_app_access_log | 房源单页UD-ios |  |
| 2 | inventory_page_ud_android | bigint | dw_db.dw_app_access_log | 房源单页UD-android |  |
| 3 | inventory_page_ud_pc | bigint | dw_db.dw_web_visit_traffic_log | 房源单页UD-pc |  |
| 4 | inventory_page_ud_touchweb | bigint | dw_db.dw_web_visit_traffic_log | 房源单页UD-touchweb |  |
| 5 | broker_page_ud_ios | bigint | dw_db.dw_app_access_log | 经纪人单页UD-ios |  |
| 6 | broker_page_ud_android | bigint | dw_db.dw_app_access_log | 经纪人单页UD-android |  |
| 7 | broker_page_ud_pc | bigint | dw_db.dw_web_visit_traffic_log | 经纪人单页UD-pc |  |
| 8 | broker_page_ud_touchweb | bigint | dw_db.dw_web_visit_traffic_log | 经纪人单页UD-touchweb |  |
| 9 | community_page_ud_ios | bigint | dw_db.dw_app_access_log | 小区单页UD-ios |  |
| 10 | community_page_ud_android | bigint | dw_db.dw_app_access_log | 小区单页UD-android |  |
| 11 | community_page_ud_pc | bigint | dw_db.dw_web_visit_traffic_log | 小区单页UD-pc |  |
| 12 | community_page_ud_touchweb | bigint | dw_db.dw_web_visit_traffic_log | 小区单页UD-touchweb |  |

```
5.APP返回率
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | return_rate_next_date_ud_ios | bigint | dw_db.dw_app_access_log | UD次日返回率-ios |  |
| 2 | return_rate_next_date_ud_android | bigint | dw_db.dw_app_access_log | UD次日返回率-android |  |
| 3 | return_rate_seven_date_ud_ios | bigint | dw_db.dw_app_access_log | UD7日返回率-ios |  |
| 4 | return_rate_seven_date_ud_android | bigint | dw_db.dw_app_access_log | UD7日返回率-android |  |
| 5 | return_rate_next_date_fud_ios | bigint | dw_db.dw_app_access_log | FUD次日返回率-ios |  |
| 6 | return_rate_next_date_fud_android | bigint | dw_db.dw_app_access_log | FUD次日返回率-android |  |
| 7 | return_rate_seven_date_fud_ios | bigint | dw_db.dw_app_access_log | FUD7日返回率-ios |  |
| 8 | return_rate_seven_date_fud_android | bigint | dw_db.dw_app_access_log | FUD7日返回率-android |  |

```
6.注册数
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | user_register_ud | bigint | db_sync.angejia__member | 用户注册（未知渠道） |  |
| 2 | touch_register_ud | bigint | db_sync.angejia__member | TW自己注册 |  |
| 3 | app_register_ud | bigint | db_sync.angejia__member | APP自己注册 |  |
| 4 | wechat_public_num_register_ud | bigint | db_sync.angejia__member | 微信扫描后的注册 |  |
| 5 | phone_register_ud | bigint | db_sync.angejia__member | 打电话后的注册 |  |

```
7.登陆数
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | login_num_ios | bigint | dw_db.dw_app_access_log | 登录数-ios |  |
| 2 | login_num_android | bigint | dw_db.dw_app_access_log | 登录数-android |  |
| 3 | login_num_pc | bigint | dw_db.dw_app_access_log | 登录数-pc |  |
| 4 | login_num_touchweb | bigint | dw_db.dw_app_access_log | 登录数-touchweb |  |

```
8.蹦失率
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | jumped_loss_ud_rate | bigint | dw_db.dw_app_access_log | ud蹦失率 |  |
| 2 | jumped_loss_fud_rate | bigint | dw_db.dw_app_access_log | fud蹦失率 |  |

```
9.咨询人数
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | consult_num | bigint | db_sync.angejia__page_information_statistics | 咨询人数 |  |

```
10.经纪人地图页
```
| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | app_broker_map_ud | bigint | dw_db.dw_app_access_log | 经纪人地图页UD |  |
| 2 | app_broker_map_ud_ios | bigint | dw_db.dw_app_access_log | 经纪人地图页UD-ios |  |
| 3 | app_broker_map_ud_android | bigint | dw_db.dw_app_access_log | 经纪人地图页UD-android |  |
| 4 | app_broker_map_pv | bigint | dw_db.dw_app_access_log | 经纪人地图页pv |  |
| 5 | app_broker_map_pv_ios | bigint | dw_db.dw_app_access_log | 经纪人地图页pv-ios |  |
| 6 | app_broker_map_pv_android | bigint | dw_db.dw_app_access_log | 经纪人地图页pv-android |  |
