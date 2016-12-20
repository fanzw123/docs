安个家 access_log日志
=====

本文档记录access_log日志解析项目中使用的参数;

解析后使用表名:dw_access_visit_traffic_log_$day

解析暂时存放:
           
           Hive:dw_stage;
           
           mysql:dw_stage;

备注:待URL和Page维表整理完毕，迁移正式数据仓库


| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 |备注 | 
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | app_name | string | dw_access_visit_traffic_log_$day| app名称 |  |
| 2 | app_version | string | dw_access_visit_traffic_log_$day | app版本号 |  |
| 3 | selection_city_id| string | dw_access_visit_traffic_log_$day | 用户选择城市id |  | 
| 4 | location_city_id | string | dw_access_visit_traffic_log_$day | 定位所在城市id |  |
| 5 | client_ip  | string | dw_access_visit_traffic_log_$day | ip地址 |  |
| 6 | network_type  | string   | dw_access_visit_traffic_log_$day | 网络类型 |  |
| 7 | platform  | string | dw_access_visit_traffic_log_$day| 平台 |  | 
| 8 | device_type | string | dw_access_visit_traffic_log_$day | 设备厂家或类型 |  |
| 9 | os_version | string | dw_access_visit_traffic_log_$day | 操作系统版本 |  | 
| 10 | device_id | string | dw_access_visit_traffic_log_$day | 设备id |  | 
| 11 | delivery_channels  | string | dw_access_visit_traffic_log_$day | 市场投放渠道包 |  |
| 12 | hostname | string | dw_access_visit_traffic_log_$day | 域名 |  |
| 13 | request_uri | string | dw_access_visit_traffic_log_$day | 请求地址uri |  |
| 14 | server_date | string | dw_touch_pc_visit_traffic_log_$day | 系统日期 | 默认格式:20150401 19:22:20  |
| 15 | server_time | string | dw_touch_pc_visit_traffic_log_$day | 系统时间 | 默认格式:20150401 19:22:20  |
| 16 | request_page_id  | string | dw_access_visit_traffic_log_$day | 请求来源页面id |  |
| 17 | request_page_name  | string | dw_access_visit_traffic_log_$day | 请求来源页面名称 |  |
| 18 | longitude | string | dw_touch_pc_visit_traffic_log_$day | 地理坐标经度 |  | 
| 19 | latitude | string | dw_touch_pc_visit_traffic_log_$day | 地理坐标纬度 |  | 
| 20 | p_dt | string | 分区字段 | 日期 |  |