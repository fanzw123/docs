# dw_member_summary_tel_info 会员电话量相关

## 字段

``` sql

member_id '会员ID'

member_tel_m2b_all '用户打给经纪人所有'

member_tel_m2b_distinct '用户打给经纪人去重'

```


## HQL

依赖
- db_sync.angejia__call_log

``` sql

--- 会员电话量相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_tel_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_tel_info (
  member_id STRING,
  member_tel_m2b_all STRING,
  member_tel_m2b_distinct STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_tel_info
SELECT
  t_1.caller_uid,
  -- 打给经纪人电话数（不去重）
  COUNT(
    t_1.id
  ) AS tel_m2b_all,

  -- 打给经纪人电话数（去重）
  COUNT(
    DISTINCT(t_1.called_uid)
  ) AS tel_m2b_distinct

FROM
  db_sync.angejia__call_log AS t_1
WHERE
  t_1.call_type = 2
    AND
  t_1.is_harass = 0
    AND
  TO_DATE(t_1.start_at) = ${dealDate}
GROUP BY
  t_1.caller_uid
;
--- 会员电话量相关 end ---

```
