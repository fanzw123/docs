# dw_member_summary_brower_info 会员 brower 信息

## 字段

``` sql
member_id '会员ID'

member_web_guid 'WEB guid 设备ID (若有多个用,分格) | guid'

member_web_brower_type '浏览器类型(若有多个用,分格) | brower_type'

member_web_os_type 'web 操作系统(若有多个用,分格) | os_type'

member_web_os_version 'web 操作系统版本(若有多个用,分格) | os_version'

```

## HQL

依赖
- dw_db.dw_web_visit_traffic_log

``` sql

--- 会员浏览器信息 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_brower_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_brower_info (
  member_id STRING,
  member_web_guid STRING,
  member_web_brower_type STRING,
  member_web_os_type STRING,
  member_web_os_version STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_brower_info
SELECT
  t_1.user_id,
  t_1.guids,
  t_1.brower_types,
  t_1.os_types,
  t_1.os_versions
FROM (
  SELECT
    s_1.user_id,
    concat_ws(',',collect_set(s_1.guid)) AS guids,
    concat_ws(',',collect_set(s_1.brower_type)) AS brower_types,
    concat_ws(',',collect_set(s_1.os_type)) AS os_types,
    concat_ws(',',collect_set(s_1.os_version)) AS os_versions
  FROM
    dw_db.dw_web_visit_traffic_log AS s_1
  WHERE
    s_1.p_dt = ${dealDate}
      AND
    s_1.user_id <> '0'
  GROUP BY
    s_1.user_id
) AS t_1
;
--- 会员浏览器信息 end ---

```
