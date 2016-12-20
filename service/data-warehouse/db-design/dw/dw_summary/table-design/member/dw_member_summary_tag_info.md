# dw_member_summary_tag_info 会员标签信息

## 字段

``` sql

member_id '会员ID'

member_basic_demand_location '用户基本需求地点(多个 @ 分割 )'

member_basic_demand_house_type '用户基本需求户型 (多个 @ 分割)'

member_basic_demand_budget '用户基本需求预算(多个 @ 分割)'

member_like_tag '用户喜欢类型(多个 @ 分割)'

member_dislike_tag '用户不喜欢类型(多个 @ 分割)'

```


## HQL

依赖
- dw_temp_angejia.jason_dw_member_summary_basis_info  会员基础信息表
- db_sync.angejia__tag_category
- db_sync.angejia__user_has_tag
- db_sync.angejia__tag

``` sql

--- 会员标签信息 start ---

-- 计算所有基本需求
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_tag_info_member_basic_demand;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_tag_info_member_basic_demand (
  tag_type STRING,
  member_id STRING,
  tag_names STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_tag_info_member_basic_demand
SELECT
  t_1.tag_type,
  t_1.member_uid,
  CONCAT_WS('@',COLLECT_SET(t_1.tag_name)) AS tag_names
FROM (
  SELECT
    s_1.member_uid,

    -- 按照业务给标签分类
    CASE
      -- 需求 城市区域版块位置
      WHEN s_3.id IN (18,19,20)
        THEN '1'
      -- 需求 户型
      WHEN s_3.id IN (17)
        THEN '2'
      -- 需求 预算
      WHEN s_3.id IN (16)
        THEN '3'
    END tag_type,

    -- 标签类别id
    s_3.id AS category_id,

    -- 标签类别中文名称
    s_3.name AS category_name,

    -- 标签中文名称
    s_2.name AS tag_name
  FROM
    db_sync.angejia__user_has_tag AS s_1
  LEFT JOIN
    db_sync.angejia__tag AS s_2
      ON
    s_1.tag_id = s_2.id
  LEFT JOIN
    db_sync.angejia__tag_category AS s_3
      ON
    s_2.category_id = s_3.id
  WHERE
    -- 表示基本需求
    s_1.type = 3
      AND
    -- 表示没有删除的
    s_1.deleted_at = 'null'
      AND
    -- 所有标签类别
    s_3.id IN (16,17,18,19,20)
 ) AS t_1
GROUP BY
  -- 按照标签类别分组
  t_1.tag_type,
  -- 再按照会员 id 分组
  t_1.member_uid
;

-- 喜欢和不喜欢类型
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_tag_info_like_and_dislike_tag;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_tag_info_like_and_dislike_tag (
  like_type STRING,
  member_id STRING,
  tag_names STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_tag_info_like_and_dislike_tag
SELECT
  t_1.like_type,
  t_1.member_uid,
  CONCAT_WS('@',COLLECT_SET(t_1.tag_name)) AS tag_names
FROM (
  SELECT
    s_1.member_uid,

    s_1.type AS like_type,

    -- 标签类别id
    COALESCE(s_3.id,0) AS category_id,

    -- 标签类别中文名称
    COALESCE(s_3.name,'无分类标签') AS category_name,

    -- 标签中文名称
    s_2.name AS tag_name
  FROM
    db_sync.angejia__user_has_tag AS s_1
  LEFT JOIN
    db_sync.angejia__tag AS s_2
      ON
    s_1.tag_id = s_2.id
  LEFT JOIN
    db_sync.angejia__tag_category AS s_3
      ON
    s_2.category_id = s_3.id
  WHERE
    -- 喜欢和不喜欢的类型 id
    s_1.type in (1,2)
      AND
    -- 表示没有删除的
    s_1.deleted_at = 'null'
  ) AS t_1
GROUP BY
  t_1.like_type,
  t_1.member_uid
;

-- 组合 tag 相关字段数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_tag_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_tag_info (
  member_id STRING,
  member_basic_demand_location STRING,
  member_basic_demand_house_type STRING,
  member_basic_demand_budget STRING,
  member_like_tag STRING,
  member_dislike_tag STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_tag_info
SELECT
  bs.member_id,
  t_1.tag_names AS member_basic_demand_location,
  t_2.tag_names AS member_basic_demand_house_type,
  t_3.tag_names AS member_basic_demand_budget,
  t_4.tag_names AS member_like_tag,
  t_5.tag_names AS member_dislike_tag
FROM
  dw_temp_angejia.jason_dw_member_summary_basis_info AS bs

-- 城市区域版块位置
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_tag_info_member_basic_demand AS t_1
ON
  t_1.member_id = bs.member_id
    AND
  t_1.tag_type = '1'

-- 户型
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_tag_info_member_basic_demand AS t_2
ON
  t_2.tag_type = '2'
    AND
  t_2.member_id = bs.member_id

-- 预算
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_tag_info_member_basic_demand AS t_3
ON
  t_3.tag_type = '3'
    AND
  t_3.member_id = bs.member_id

-- 喜欢的类型
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_tag_info_like_and_dislike_tag AS t_4
ON  
  t_4.like_type = '1'
    AND
  t_4.member_id = bs.member_id  

-- 不喜欢的类型
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_tag_info_like_and_dislike_tag AS t_5
ON  
  t_5.like_type = '2'
    AND
  t_5.member_id = bs.member_id

WHERE
  t_1.tag_names IS NOT NULL
    OR
  t_2.tag_names IS NOT NULL
    OR
  t_3.tag_names IS NOT NULL
    OR
  t_4.tag_names IS NOT NULL
    OR
  t_5.tag_names IS NOT NULL
;

--- 会员标签信息 end ---

```
