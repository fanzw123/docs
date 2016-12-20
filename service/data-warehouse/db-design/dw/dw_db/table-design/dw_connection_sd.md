连接设计文档
=====
一. 基础信息

本文档记录连接宽表使用的字段及逻辑;

解析后使用表名:dw_connection_sd

解析存放:

 Hive:dw_db;


```
1.微聊相关

源表: user_msg

```
| 编号 | 字段名称 | 字段类型 | 来源表 | 字段含义 | 逻辑 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | customer_send_wechat_cnt  | bigint | user_msg | 每日发送微聊的用户数 | count(distinct from_uid) | account_type=1 |
| 2 | customer_wechat_cnt  | bigint | user_msg | 用户微聊总数 | count(id) |  account_type=1　|
| 3 | broker_receive_wechat_cnt | bigint | user_msg | 收到用户微聊总数 | count(case when status = 2 then id) | account_type=1 |
| 4 | broker_receive_wechat_rate | bigint | user_msg | 接收率 | 　|　　|
| 5 | broker_read_wechat_cnt | bigint | user_msg | 已读用户微聊总数 | count(case when status=4 then id) | account_type=1 |
| 6 | broker_read_wechat_rate | bigint | user_msg | 已读率 |
| 7 | broker_send_wechat_num  | bigint | user_msg | 每日发送微聊的经纪人数 | count(distinct from_uid) | account_type=2 |
| 8 | broker_wechat_cnt | bigint | user_msg | 经纪人微聊总数 | count(id) | account_type=2 |
| 9 | customer_receive_wechat_cnt  | bigint | user_msg | 收到经纪人微聊总数 | count(case when status = 2 then id) | account_type=2 |
| 10 | customer_receive_wechat_rate  | bigint | user_msg | 接收率 |
| 11 | customer_read_wechat_cnt | bigint | user_msg | 已读经纪人微聊总数 | count(case when status=4 then id) | account_type=2 |
| 12 | customer_read_wechat_rate | bigint | user_msg | 已读率 |
| 13 | avg_reply_time | bigint | user_msg | 平均回复时间 | coalesce(round(avg(case when wechat_broker_reply is not null then (unix_timestamp(broker_reply_time)-unix_timestamp(user_send_time))/60 end),2),0) | account_type=2 |
| 14 | wechat_couple | bigint | user_msg | 微聊对数 |
| 15 | avg_wechat_couple | bigint | user_msg | 平均微聊对数 |  | account_type=2 |
| 16 | p_dt | string | user_msg | 日期 |

```
2.电话相关

源表:call_log&call_broker_contacts

```

| 编号 | 字段名称 | 字段类型 | 来源表 | 字段含义 | 逻辑 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | call_cnt | bigint | call_log | 来电量 |  |  |
| 2 | call_cnt_agj | bigint | call_log | angejia来电量 |  | 　|
| 3 | call_cnt_ajk | bigint | call_log | anjuke来电量 |  |  |
| 4 | call_cnt_sf | bigint | call_log | soufun来电量 | 　|　　|
| 5 | call_intercept_cnt | bigint | call_log | 拦截量 |  |  |
| 6 | call_intercept_cnt_agj | bigint | call_log | angejia拦截量 |
| 7 | call_intercept_cnt_ajk | bigint | call_log | anjuke拦截量 |  |  |
| 8 | call_intercept_cnt_sf | bigint | call_log | soufun拦截量 |  |  |
| 9 | call_connected_cnt   | bigint | call_log | 接通量 |  |  |
| 10 | call_connected_cnt_agj | bigint | call_log | angejia接通量 |
| 11 | call_connected_cnt_ajk | bigint | call_log | anjuke接通量 |  |  |
| 12 | call_connected_cnt_sf | bigint | call_log | soufun接通量 |
| 13 | call_cnt_private_guest | bigint | call_log | 私客来电量 |  |   |
| 14 | call_cnt_agj_private_guest | bigint | call_log | angejia私客来电量 |
| 15 | call_cnt_ajk_private_guest | bigint | call_log | anjuke私客来电量 |  |  |
| 16 | call_cnt_sf_private_guest | bigint | call_log | soufun私客来电量 |  |  |
| 17 | call_cnt_no_tag | bigint | call_log | 来电量无标记 |  |  |
| 18 | call_cnt_agj_no_tag | bigint | call_log | angejia来电量无标记 |
| 19 | call_cnt_ajk_no_tag | bigint | call_log | anjuke来电量无标记 |  |  |
| 20 | call_cnt_sf_no_tag | bigint | call_log | soufun来电量无标记 |  |  |
| 21 | call_cnt_invalid_phone | bigint | call_log | 来电量无效电话 |  |  |
| 22 | call_cnt_agj_invalid_phone | bigint | call_log | angejia来电量无效电话 |
| 23 | call_cnt_ajk_invalid_phone | bigint | call_log | anjuke来电量无效电话 |  |  |
| 24 | call_cnt_sf_invalid_phone | bigint | call_log | soufun来电量无效电话 |  |  |
| 25 | call_cnt_no_contact | bigint | call_log | 来电量联系不上 |  |  |
| 26 | call_cnt_agj_no_contact | bigint | call_log | angejia来电量联系不上 |
| 27 | call_cnt_ajk_no_contact | bigint | call_log | anjuke来电量联系不上 |  |  |
| 28 | call_cnt_sf_no_contact | bigint | call_log | soufun来电量联系不上 |  |  
| 29 | call_cnt_other_conditions | bigint | call_log | 来电量其他情况 |  |  |
| 30 | call_cnt_agj_other_conditions | bigint | call_log | angejia来电量其他情况 |
| 31 | call_cnt_ajk_other_conditions | bigint | call_log | anjuke来电量其他情况 |  |  |
| 32 | call_cnt_sf_other_conditions | bigint | call_log | soufun来电量其他情况 |  |  |
| 33 | call_harass_cnt | bigint | call_log | 骚扰量 |  |  |
| 34 | call_harass_agj_cnt | bigint | call_log | angejia骚扰量 |  |  |
| 35 | call_harass_ajk_cnt | bigint | call_log | anjuke骚扰量 |  |  |
| 36 | call_harass_sf_cnt | bigint | call_log | soufun骚扰量 |  |  |


```
3.咨询相关

源表:page_information_statistics

```

| 编号 | 字段名称 | 字段类型 | 来源表 | 字段含义 | 逻辑 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | pc_user_consultation | bigint | page_information_statistics | PC咨询量 |  |  |
| 2 | touch_user_consultation | bigint | page_information_statistics | touch咨询量 |  | 　|
| 3 | app_user_consultation | bigint | page_information_statistics | APP咨询量 |  |  |


```
4.需求相关

源表:user_base_demand&demand
```

| 编号 | 字段名称 | 字段类型 | 来源表 | 字段含义 | 逻辑 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | user_demand_cnt | bigint | user_base_demand | 需求录入量 |  |  |
| 2 | user_source_cnt | bigint | user_base_demand | 用户来源 |  | source_id(1~6)　|

source_id = 1 name = 安个家
source_id = 2 name = 安居客
source_id = 3 name = 搜房
source_id = 4 name = 58
source_id = 5 name = 赶集
source_id = 6 name = 其他

```
5.预约相关

源表:visit_item

```
| 编号 | 字段名称 | 字段类型 | 来源表 | 字段含义 | 逻辑 | 备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | scheduler_cnt | bigint | visit_item |  |  |  |
