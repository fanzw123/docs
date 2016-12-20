# dw_member_summary_basis_info 会员基础信息表

## 字段

``` sql

member_id '会员ID'

member_source_id '注册渠道 id'

member_source_name '注册渠道名称'

member_created_at '注册时间'

member_phone '会员手机号码'

```


## HQL

依赖

- db_sync.angejia__member
- db_sync.angejia__user_phone

``` sql

--- 会员基础信息表 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_basis_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_basis_info (
  member_id STRING,
  member_source_id STRING,
  member_source_name STRING,
  member_created_at STRING,
  member_phone STRING
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_basis_info
SELECT
  bs.user_id,
  bs.member_source,

  CASE
    WHEN bs.member_source = 0
      THEN '未知'
    WHEN bs.member_source = 1
      THEN '经纪人'
    WHEN bs.member_source = 2
      THEN '系统'
    WHEN bs.member_source = 3
      THEN '用户注册（未知渠道）'
    WHEN bs.member_source = 4
      THEN 'TW自己注册'
    WHEN bs.member_source = 5
      THEN 'APP自己注册'
    WHEN bs.member_source = 6
      THEN '微信扫描后的注册'
    WHEN bs.member_source = 7
      THEN '自己关注公众号后的注册'
    WHEN bs.member_source = 8
      THEN '打电话后的注册'
  END AS member_source_name,

  bs.created_at,
  t_1.phone
FROM
  db_sync.angejia__member AS bs
LEFT JOIN
  db_sync.angejia__user_phone AS t_1
ON
  bs.user_id = t_1.user_id
;
--- 会员基础信息表 end ---
```
