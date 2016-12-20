# dw_contact_art_basis_info_daily 计算微聊相关指标

## 注意:

由于微聊设备信息未记录,所以分设备类指标先保留字段,待后期可以区分是补充相关逻辑。

## 字段

A、

```
dw_contact_art_basis_info_daily表提供ART展示相关微聊汇总数据

```

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 |备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | app_user_send_num | string | dw_contact_art_basis_info_daily | 用户发起会话数 |
| 2 | app_broker_resive_num | string | dw_contact_art_basis_info_daily | 安家顾问拉用户有回复会话数 |
| 3 | app_user_send_num_ios | string | dw_contact_art_basis_info_daily | IOS 用户发起会话人数 |
| 4 | app_user_send_num_android | string | dw_contact_art_basis_info_daily | Android 用户发起会话人数 |
| 5 | user_conversation_num_ios | string | dw_contact_art_basis_info_daily | IOS 用户发起对话数 |
| 6 | user_conversation_num_android | string | dw_contact_art_basis_info_daily | Android用户发起对话数 |  
| 7 | broker_conversation_num_ios | string | dw_contact_art_basis_info_daily | IOS 安家顾问发起对话数 |  
| 8 | broker_conversation_num_android | string | dw_contact_art_basis_info_daily | Android安家顾问发起对话数 |  
| 9 | user_dep_num_ios | string | dw_contact_art_basis_info_daily | IOS 用户发起对话深度 |  
| 10 | user_dep_num_android | string | dw_contact_art_basis_info_daily | Android用户发起对话深度 |  
| 11 | broker_dep_num_ios | string | dw_contact_art_basis_info_daily | IOS 安家顾问发起对话深度 | APP  
| 12 | broker_dep_num_android | string | dw_contact_art_basis_info_daily | Android安家顾问发起对话深度 |
| 13 | customer_info_radices | string | dw_contact_art_basis_info_daily | 微聊对数 |
| 14 | p_dt | string | dw_contact_art_basis_info_daily | 统计日期 |  

B、

```
dw_contact_basis_info_daily表提供ART展示相关微聊明细数据

```

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 |备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | reply_by_broker_5min | string | dw_contact_basis_info_daily | 安家顾问5min回复数 |
| 2 | reply_by_broker_5min_rate | string | dw_contact_basis_info_daily | 安家顾问5min回复率 |
| 3 | reply_by_broker_day | string | dw_contact_basis_info_daily | 安家顾问当日回复数 |
| 4 | reply_by_broker_day_rate | string | dw_contact_basis_info_daily | 安家顾问当日回复率 |
| 5 | received_wechat_info_daily | string | dw_contact_basis_info_daily | 安家顾问当日接收消息数 |
| 6 | broker_avg_reply_time | string | dw_contact_basis_info_daily | 安家顾问平均回复时间 |
| 7 | reply_by_user_5min | string | dw_contact_basis_info_daily | 用户5min回复数 |
| 8 | reply_by_user_5min_rate | string | dw_contact_basis_info_daily | 用户5min回复率 |
| 9 | user_avg_reply_time | string | dw_contact_basis_info_daily | 用户平均回复时间 |
| 10 | user_id | string | dw_contact_basis_info_daily | 唯一ID |
| 11 | user_type | string | dw_contact_basis_info_daily | 类型 |
| 10 | p_dt | string | dw_contact_basis_info_daily | 统计日期 |
