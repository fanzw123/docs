# dw_member_summary_device_info 会员 device 信息表

## 字段

``` sql
member_id '会员ID'

member_device_ids 'APP 设备 id (若有多个用,分格)| device_id'

member_device_type '手机型号 | device_type'

member_app_name 'APP类型 | app_name'

member_device_platform '手机操作系统类型 | platform'

member_device_os_version '手机操作系统版本 | os_version'

member_app_version ' App 版本 | app_version'

member_app_channels_code 'App 渠道号代码 | delivery_channels'

member_app_channel_name 'App 渠道号名称'
```

## HQL

依赖
- dw_db.dw_app_access_log

``` sql

--- 会员 device 信息 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_device_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_device_info (
  member_id STRING,
  member_device_ids STRING,
  member_device_type STRING,
  member_app_name STRING,
  member_device_platform STRING,
  member_device_os_version STRING,
  member_app_version STRING,
  member_app_channels_code STRING,
  member_app_channel_name STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_device_info
SELECT
  t_1.user_id,
  t_1.device_ids,
  t_1.device_types,
  t_1.app_names,
  t_1.platforms,
  t_1.os_versions,
  t_1.app_versions,
  t_1.delivery_channels,
  t_2.channel_name AS member_app_channel_name
FROM (
  SELECT
    s_1.user_id,
    concat_ws(',',collect_set(s_1.device_id)) AS device_ids,
    concat_ws(',',collect_set(s_1.device_type)) AS device_types,
    concat_ws(',',collect_set(s_1.app_name)) AS app_names,
    concat_ws(',',collect_set(s_1.platform)) AS platforms,
    concat_ws(',',collect_set(s_1.os_version)) AS os_versions,
    concat_ws(',',collect_set(s_1.app_version)) AS app_versions,
    collect_set(s_1.delivery_channels)[0] AS delivery_channels
  FROM
    dw_db.dw_app_access_log AS s_1
  WHERE
    s_1.p_dt = ${dealDate}
      AND
    s_1.user_id <> ''
  GROUP BY
    s_1.user_id
  ) AS t_1
LEFT JOIN
  dw_db.dw_basis_dimension_delivery_channels_package AS t_2
    ON
  t_1.delivery_channels = t_2.channel_package_code
;
--- 会员 device 信息 end ---

```
