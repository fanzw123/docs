# dw_basis_dimension_mobile_dwudid_daily 计算 touch web 的 fud

## 背景

access_log的内容中user_agent字段会存放guid,user_id之类的很多ID类数值,DW会根据不同类型的指标使用不同的ID,
但是由于爬虫、模拟器等不同原因ID并不能完整表达一个数据仓库中对于ID的定义要求。


DW会根据不同的guid的顺序获取唯一可以代表一个用户在DW的唯一的生命周期

根据不同的TYPE获取内容：

1、Touchweb类型获取guid


##基本逻辑

B、TouchWeb

1、最近90天的TouchWeb访问信息的全部数据

2、guid赋值dwudid


```
dw_basis_dimension_mobile_dwudid_daily表提供TouchWeb、PC计算FUD使用

```

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 |备注 |
| ---| --- | ---  | --- | --- | --- | --- |
| 1 | dwudid | string | dw_basis_dimension_mobile_dwudid_daily | 用户唯一ID |
| 2 | user_id | string | dw_basis_dimension_mobile_dwudid_daily | 用户ID |
| 3 | platform | string | dw_basis_dimension_mobile_dwudid_daily | 平台 | 1.TouchWeb;2.PC
| 4 | os_type | string | dw_basis_dimension_mobile_dwudid_daily | 操作系统平台 |  
| 5 | os_version | string | dw_basis_dimension_mobile_dwudid_daily | 操作系统版本 |  
| 6 | brower_type | string | dw_basis_dimension_mobile_dwudid_daily | 浏览器类型 |  
| 7 | brower_version | string | dw_basis_dimension_mobile_dwudid_daily | 浏览器版本 |
| 8 | phone_type | string | dw_basis_dimension_mobile_dwudid_daily | 平台 | 1.TouchWeb;2.PC
| 9 | first_date | string | dw_basis_dimension_mobile_dwudid_daily | 首次登陆日期 |
| 10 | last_date | string | dw_basis_dimension_mobile_dwudid_daily | 最后登陆日期 |
| 11 | remark | string | dw_basis_dimension_mobile_dwudid_daily | 备注 |
| 12 | cal_dt | string | dw_basis_dimension_mobile_dwudid_daily | 统计日期 |
