# dw_basis_dimension_app_dwudid_daily 计算 app fud

## 背景

access_log的内容中user_agent字段会存放device_id,user_id之类的很多ID类数值,DW会根据不同类型的指标使用不同的ID,
但是由于爬虫、模拟器等不同原因ID并不能完整表达一个数据仓库中对于ID的定义要求。


DW会根据不同的device_id的顺序获取唯一可以代表一个用户在DW的唯一的生命周期

根据不同的TYPE获取内容：

1、App的内容获取device_id



## 字段

A、App

1、获取最近90天的app登陆信息全部数据

2、生成device_id，根据不同的app_name来生成device_id,对应的dwudid

3、device_id赋值dwudid

```
dw_basis_dimension_app_dwudid_daily表提供APP计算FUD使用

```

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 |备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | dwudid | string | dw_basis_dimension_app_dwudid_daily | 设备ID |
| 2 | user_id | string | dw_basis_dimension_app_dwudid_daily | 用户ID |
| 3 | first_date | string | dw_basis_dimension_app_dwudid_daily | 首次登陆日期 |
| 4 | last_date | string | dw_basis_dimension_app_dwudid_daily | 最后登陆日期 |
| 5 | last_time | string | dw_basis_dimension_app_dwudid_daily | 最后登陆时间 |
| 6 | app_name | string | dw_basis_dimension_app_dwudid_daily | APP名称 |  
| 7 | app_version | string | dw_basis_dimension_app_dwudid_daily | APP版本 |  
| 8 | platform | string | dw_basis_dimension_app_dwudid_daily | 操作系统平台 |  
| 9 | os_version | string | dw_basis_dimension_app_dwudid_daily | 操作系统版本 |  
| 10 | device_type | string | dw_basis_dimension_app_dwudid_daily | 设备类型 |  
| 11 | channel_name | string | dw_basis_dimension_app_dwudid_daily | 渠道 | APP  
| 12 | remark | string | dw_basis_dimension_app_dwudid_daily | 备注 |  
| 13 | cal_dt | string | dw_basis_dimension_app_dwudid_daily | 统计日期 |  
