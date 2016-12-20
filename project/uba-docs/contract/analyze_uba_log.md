安个家 Uba-TouchWeb用户日志
=====

本文档记录uba日志解析项目中使用的参数;

解析后使用表名:dw_touch_pc_visit_traffic_log_$day

解析暂时存放:
           
           Hive:dw_stage;
           
           mysql:dw_stage;

备注:待URL和Page维表整理完毕，迁移正式数据仓库


| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 |备注 | 
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | server_time | string | dw_touch_pc_visit_traffic_log_$day | 系统时间 | 默认格式:20150401 19:22:20 |
| 2 | client_time | string | dw_touch_pc_visit_traffic_log_$day | 用户电脑日期/时间 | 默认格式:20150401 19:22:20 |
| 3 | user_id | string | dw_touch_pc_visit_traffic_log_$day | 用户user_id | |
| 4 | guid | string | dw_touch_pc_visit_traffic_log_$day| 用户唯一标识 | |
| 5 | selection_city_id| string | dw_touch_pc_visit_traffic_log_$day | 选择页面城市id  |  | 
| 6 | user_based_city_id | string | dw_touch_pc_visit_traffic_log_$day | 用户所在城市id | 
| 7 | referer_full_url | string | dw_touch_pc_visit_traffic_log_$day | 来源页的url |  |
| 8 | referer_page | string | dw_touch_pc_visit_traffic_log_$day | 来源页的url内容 |  |
| 9 | referer_page_id | string | dw_touch_pc_visit_traffic_log_$day | 来源页面id |  |
| 10 | referer_page_name | string | dw_touch_pc_visit_traffic_log_$day | 来源页面名称 |  |
| 11 | current_full_url | string | dw_touch_pc_visit_traffic_log_$day | 当前页的url |  |
| 12 | current_page | string | dw_touch_pc_visit_traffic_log_$day | 当前页的url内容 |  |
| 13 | current_page_id | string | dw_touch_pc_visit_traffic_log_$day | 当前页面id |  |
| 14 | current_page_name  | string | dw_touch_pc_visit_traffic_log_$day | 当前页面名称 |  |
| 15 | channel_code | string | dw_touch_pc_visit_traffic_log_$day | 渠道pi代码 |  |
| 16 | page_param | string | dw_touch_pc_visit_traffic_log_$day | 页面扩展参数 |  |
| 17 | client_param | string | dw_touch_pc_visit_traffic_log_$day | 客户扩展信息 |  |
| 18 | client_ip | string | dw_touch_pc_visit_traffic_log_$day | 用户ip | 
| 19 | os_type | string | dw_touch_pc_visit_traffic_log_$day | 操作系统类型 | 解析agent参数获取 |
| 20 | os_version | string | dw_touch_pc_visit_traffic_log_$day | 操作系统版本 | 解析agent参数获取 |
| 21 | brower_type | string | dw_touch_pc_visit_traffic_log_$day | 浏览器类型 | 解析agent参数获取 |
| 22 | brower_version | string | dw_touch_pc_visit_traffic_log_$day | 浏览器版本 | 解析agent参数获取 |
| 23 | phone_type | string | dw_touch_pc_visit_traffic_log_$day | 手机类型 | 解析agent参数获取 |
| 24 | p_dt | string | 分区字段 | 日期 |  |