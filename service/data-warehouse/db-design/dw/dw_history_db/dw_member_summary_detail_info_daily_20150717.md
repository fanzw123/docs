# dw_member_summary_detail_info_daily 会员详细信息日表

- [构架图](http://www.processon.com/view/link/558bcfa4e4b09bd4b8d4bfe3)

## 字段

``` sql

-- dw_member_summary_basis_info 会员基础信息表
member_id '会员ID'

member_source_id '注册渠道 id'

member_source_name '注册渠道名称'

member_created_at '注册时间'

member_phone '会员手机号码'

-- dw_member_summary_brower_info 会员 brower 信息
member_web_guid 'WEB guid 设备ID (若有多个用,分格) | guid'

member_web_brower_type '浏览器类型(若有多个用,分格) | brower_type'

member_web_os_type 'web 操作系统(若有多个用,分格) | os_type'

member_web_os_version 'web 操作系统版本(若有多个用,分格) | os_version'

-- dw_member_summary_commission_info 会员委托信息
member_commission_intraday '会员当天委托'

member_commission_history '会员历史委托'

-- dw_member_summary_device_info 会员 device 信息表
member_device_ids 'APP 设备 id (若有多个用,分格)| device_id'

member_device_type '手机型号 | device_type'

member_app_name 'APP类型 | app_name'

member_device_platform '手机操作系统类型 | platform'

member_device_os_version '手机操作系统版本 | os_version'

member_app_version ' App 版本 | app_version'

member_app_channels_code 'App 渠道号代码 | delivery_channels'

member_app_channel_name 'App 渠道号名称'

-- dw_member_summary_inventory_info 会员房源相关
member_inventory_collect_intraday '会员当天收藏房源数'

member_inventory_collect_history '会员历史收藏房源数'

-- dw_member_summary_request_info 会员请求信息
-- web 相关字段
member_pv_web_day '会员 web 日 PV'

member_pv_pc_inventory_list_day  '会员找房列表页 pv pc'

member_pv_pc_inventory_page_day '房源单页 pv PC'

member_pv_tw_inventory_list_day '会员找房列表页 pv tw'

member_pv_tw_inventory_page_day '房源单页 pv TW'

member_pv_tw_community_page_day '小区单页 pv TW'

member_web_requset_first_time 'WEB 首次访问时间'

member_web_requset_last_time 'WEB 最后一次访问时间'
-- app 相关字段
member_pv_app_api_day '会员 App 调用 api 次数'

member_pv_app_inventory_list_day '会员找房列表页 pv app'

member_pv_app_inventory_page_day '房源单页 pv app'

member_pv_app_community_page_day '小区单页 pv App'

member_app_requset_first_time 'APP 首次访问时间'

member_app_requset_last_time 'APP 最后一次访问时间'

-- dw_member_summary_tag_info 会员标签信息
member_basic_demand_location '用户基本需求地点(多个 @ 分割 )'

member_basic_demand_house_type '用户基本需求户型 (多个 @ 分割)'

member_basic_demand_budget '用户基本需求预算(多个 @ 分割)'

member_like_tag '用户喜欢类型(多个 @ 分割)'

member_dislike_tag '用户不喜欢类型(多个 @ 分割)'

-- dw_member_summary_tel_info 会员电话量相关
member_tel_m2b_all '用户打给经纪人所有'

member_tel_m2b_distinct '用户打给经纪人去重'

-- dw_member_summary_visit_info 会员带看信息
member_visit_sponsor_intraday '会员当天主动发起带看'

member_visit_sponsor_history '会员历史主动发起带看'

member_visit_real_intraday '今日实际带看'

member_visit_real_history '历史实际带看'

-- dw_member_summary_web_from_entrance_info 会员 web 来源表
member_web_from_entrance '会员第一次来源 (sem:百度投放, direct:会员浏览器输入 ,seo:其他网页)'

-- dw_member_summary_wechat_message_info 会员微聊相关
member_wechat_message_m2b_distinct '会员发送给经纪人，去重'

member_wechat_message_m2b_all '会员发送给经纪人微聊，所有'


```

## member 运算 HQL

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


--- 会员委托 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_commission_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_commission_info (
  member_id STRING,
  member_commission_intraday STRING,
  member_commission_history STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_commission_info
SELECT
  t_1.seller_uid,
  -- 当天委托
  collect_list(t_1.c_1)[0] AS commission_intraday,
  collect_list(t_1.c_2)[0] AS commission_history
FROM (
  -- 今日委托房源数 (7)
  SELECT
    s_1_1.seller_uid,
    s_1_1.num AS c_1,
    NULL AS c_2 -- 占位
  FROM (
    SELECT
      s_1.seller_uid,
      COUNT(s_1.id) as num
    FROM
      db_sync.angejia__commission AS s_1
    WHERE
      -- 卖家 id 和 创建人 id 相同，表示是房东发房
      s_1.seller_uid = s_1.creator_uid
        AND
      TO_DATE(s_1.created_at) = ${dealDate}
    GROUP BY
      s_1.seller_uid
    ) AS s_1_1

  UNION ALL

  -- 历史委托房源数 (293)
  SELECT
    s_2_1.seller_uid,
    NULL AS c_1, -- 占位
    s_2_1.num AS c_2
  FROM (
    SELECT
      s_2.seller_uid,
      COUNT(s_2.id) as num
    FROM
      db_sync.angejia__commission AS s_2
    WHERE
      s_2.seller_uid = s_2.creator_uid
        AND
      s_2.created_at >= '2015-04-09 15:00:00'
    GROUP BY
      s_2.seller_uid
    ) AS s_2_1

) AS t_1
GROUP BY
  t_1.seller_uid
;
--- 会员委托 end ---


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



--- 会员房源相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_inventory_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_inventory_info (
  member_id STRING,
  member_inventory_collect_intraday STRING,
  member_inventory_collect_history STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_inventory_info
SELECT
  t_1.user_id,
  t_1.inventory_collect_intraday,
  t_1.inventory_collect_history
FROM (
  -- 收藏房源数
  SELECT
    s_1.user_id,

    -- 今日收藏的房源数
    COUNT(
      CASE
        WHEN TO_DATE(s_1.created_at) = ${dealDate}
          THEN s_1.inventory_id
      END
    ) AS inventory_collect_intraday,

    -- 历史收藏的房源数
    COUNT (
      s_1.inventory_id  
    ) AS inventory_collect_history
  FROM
    db_sync.angejia__member_like_inventory AS s_1
  WHERE
    s_1.status = 1
  GROUP BY
    s_1.user_id
) AS t_1
;
--- 会员房源相关 end ---



--- 会员请求相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_request_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_request_info (
  member_id STRING,

  member_pv_web_day STRING,
  member_pv_pc_inventory_list_day STRING,
  member_pv_pc_inventory_page_day STRING,
  member_pv_tw_inventory_list_day STRING,
  member_pv_tw_inventory_page_day STRING,
  member_pv_tw_community_page_day STRING,
  member_web_requset_first_time STRING,
  member_web_requset_last_time STRING,

  member_pv_app_api_day STRING,
  member_pv_app_inventory_list_day STRING,
  member_pv_app_inventory_page_day STRING,
  member_pv_app_community_page_day STRING,
  member_app_requset_first_time STRING,
  member_app_requset_last_time STRING
);

-- web 请求所有数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_request_info_web_visit_traffic;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_request_info_web_visit_traffic AS
  SELECT
    s_1.user_id,

    -- 会员 web 日 pv
    COUNT(s_1.user_id) AS pv_web_day,

    -- 会员找房列表页 pv PC (暂定)
    COUNT(
      CASE
        WHEN s_1.current_page_id IN ('20007','20009','20010')
          THEN s_1.user_id
      END
    ) AS pv_pc_inventory_list_day,

    -- 会员找房列表页 pv tw
    COUNT(
      CASE
        WHEN s_1.current_page_id IN ('10032','10033','10034','10075','10076','10077')
          THEN s_1.user_id
      END
    ) AS pv_tw_inventory_list_day,

    -- 房源单页 pv PC
    COUNT(
      CASE
        WHEN s_1.current_page_id IN ('20008')
          THEN s_1.user_id
      END
    ) AS pv_pc_inventory_page_day,

    -- 房源单页 pv TW
    COUNT(
      CASE
        WHEN s_1.current_page_id IN ('10035')
          THEN s_1.user_id
      END
    ) AS pv_tw_inventory_page_day,

    -- 小区单页 pv TW
    COUNT(
      CASE
        WHEN s_1.current_page_id IN ('10037','10038')
          THEN s_1.user_id
      END
    ) AS pv_tw_community_page_day,

    -- WEB 首次访问时间
    MIN(s_1.server_time) AS web_requset_first_time,

    -- WEB 最后一次访问时间
    MAX(s_1.server_time) AS web_requset_last_time

  FROM
    dw_db.dw_web_visit_traffic_log AS s_1
  WHERE
    s_1.p_dt = ${dealDate}
      AND
    s_1.user_id <> '0'
  GROUP BY
    s_1.user_id
;

-- APP 请求所有数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_request_info_app_access_log;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_request_info_app_access_log AS
  SELECT
    s_2.user_id,

    -- App 调用 api 次数
    COUNT(s_2.user_id) AS pv_app_api_day,

    -- 会员找房列表页 pv app
    COUNT(
      CASE
        WHEN s_2.request_uri RLIKE '^/mobile/member/inventories/list[.]*'
          THEN s_2.user_id
      END
    ) AS pv_app_inventory_list_day,

    -- 房源单页 pv app
    COUNT(
      CASE
        WHEN s_2.request_uri RLIKE '^/mobile/member/inventories/[0-9]+$'
          THEN s_2.user_id
      END
    ) AS pv_app_inventory_page_day,

    -- 小区单页 pv App
    COUNT(
      CASE
        WHEN s_2.request_uri RLIKE '^/mobile/member/communities/[0-9]+$'
          THEN s_2.user_id
      END
    ) AS pv_app_community_page_day,

    -- APP 首次访问时间
    MIN(s_2.server_time) AS app_requset_first_time,

    -- APP 最后一次访问时间
    MAX(s_2.server_time) AS app_requset_last_time

  FROM
    dw_db.dw_app_access_log AS s_2
  WHERE
    s_2.p_dt = ${dealDate}
      AND
    s_2.user_id <> ''
  GROUP BY
    s_2.user_id
;

-- 组合数据
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_request_info
SELECT
  bs.member_id,
  t_1.pv_web_day,
  t_1.pv_pc_inventory_list_day,
  t_1.pv_pc_inventory_page_day,
  t_1.pv_tw_inventory_list_day,
  t_1.pv_tw_inventory_page_day,
  t_1.pv_tw_community_page_day,
  t_1.web_requset_first_time,
  t_1.web_requset_last_time,

  t_2.pv_app_api_day,
  t_2.pv_app_inventory_list_day,
  t_2.pv_app_inventory_page_day,
  t_2.pv_app_community_page_day,
  t_2.app_requset_first_time,
  t_2.app_requset_last_time
FROM
  dw_temp_angejia.jason_dw_member_summary_basis_info AS bs

-- web 请求所有数据
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_request_info_web_visit_traffic AS t_1
ON
  bs.member_id = t_1.user_id

-- APP 请求所有数据
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_request_info_app_access_log AS t_2
ON
  bs.member_id = t_2.user_id

WHERE
  t_1.pv_web_day IS NOT NULL
    OR
  t_1.pv_pc_inventory_list_day IS NOT NULL
    OR
  t_1.pv_pc_inventory_page_day IS NOT NULL
    OR
  t_1.pv_tw_inventory_list_day IS NOT NULL
    OR
  t_1.pv_tw_inventory_page_day IS NOT NULL
    OR
  t_1.pv_tw_community_page_day IS NOT NULL
    OR
  t_1.web_requset_first_time IS NOT NULL
    OR
  t_1.web_requset_last_time IS NOT NULL
    OR

  t_2.pv_app_api_day IS NOT NULL
    OR
  t_2.pv_app_inventory_list_day IS NOT NULL
    OR
  t_2.pv_app_inventory_page_day IS NOT NULL
    OR
  t_2.pv_app_community_page_day IS NOT NULL
    OR
  t_2.app_requset_first_time IS NOT NULL
    OR
  t_2.app_requset_last_time IS NOT NULL
;
--- 会员请求相关 end ---


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



--- 会员带看信息 start ---

-- 主动发起带看
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_visit_info_visit_sponsor;
CREATE TABLE IF NOT EXISTS
  dw_temp_angejia.jason_dw_member_summary_visit_info_visit_sponsor AS  
SELECT
  t_1.creator_uid AS member_id,
  t_1.visit_sponsor_intraday,
  t_1.visit_sponsor_history
FROM (
  SELECT
    s_1.creator_uid,

    -- 今日主动发起带看
    COUNT(
      CASE
        WHEN TO_DATE(s_1.created_at) = ${dealDate}
          THEN s_1.visit_id
      END
    ) AS visit_sponsor_intraday,

    -- 历史主动发起带看
    COUNT (
      s_1.visit_id  
    ) AS visit_sponsor_history
  FROM
    db_sync.angejia__visit_item AS s_1
  WHERE
    -- 创建人类型 1:买家 2:经纪人
    s_1.creator_type = 1
      AND
    -- 状态 0:已删除 1:有效
    s_1.is_active = 1
  GROUP BY
    s_1.creator_uid
) AS t_1
;

-- 真实带看
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_visit_info_visit_real;
CREATE TABLE IF NOT EXISTS
  dw_temp_angejia.jason_dw_member_summary_visit_info_visit_real AS
SELECT
  t_1.buyer_uid AS member_id,
  t_1.visit_real_intraday,
  t_1.visit_real_history
FROM (
  SELECT
    s_1.buyer_uid,

    -- 今日实际带看
    COUNT(
      CASE
        WHEN TO_DATE(s_1.visit_started_at) = ${dealDate}
          THEN s_1.id
      END
    ) AS visit_real_intraday,

    -- 历史实际带看
    COUNT (
      s_1.id  
    ) AS visit_real_history
  FROM
    db_sync.angejia__visit AS s_1
  WHERE
    -- 默认有效带看
    s_1.is_valid = 1
      AND
    -- 带看结束后，买家已看房为 0，买家没看房 为 1
    s_1.is_buyer_denied = 0
  GROUP BY
    s_1.buyer_uid
) AS t_1
;


-- 组合数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_visit_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_visit_info (
  member_id STRING,
  member_visit_sponsor_intraday STRING,
  member_visit_sponsor_history STRING,
  member_visit_real_intraday STRING,
  member_visit_real_history STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_visit_info
SELECT
  t_1.member_id,
  collect_list(t_1.c_1)[0], -- 主动发起带看 当天
  collect_list(t_1.c_2)[0], -- 实际带看 历史
  collect_list(t_1.c_3)[0], -- 实际带看 当天
  collect_list(t_1.c_4)[0] -- 主动发起带看 历史
FROM (
  SELECT
    s_1.member_id,
    s_1.visit_sponsor_intraday AS c_1, -- 主动发起带看 当天
    s_1.visit_sponsor_history AS c_2, -- 主动发起带看 历史
    NULL AS c_3, -- 占位符
    NULL AS c_4 -- 占位符
  FROM
      dw_temp_angejia.jason_dw_member_summary_visit_info_visit_sponsor AS s_1

  UNION ALL -- 把 2 张表合成一张表

  SELECT
    s_2.member_id,
    NULL AS c_1, -- 占位符
    NULL AS c_2, -- 占位符
    s_2.visit_real_intraday AS c_3, -- 实际带看 当天
    s_2.visit_real_history AS c_4 -- 实际带看 历史
  FROM
    dw_temp_angejia.jason_dw_member_summary_visit_info_visit_real AS s_2
  ) AS t_1
GROUP BY
  t_1.member_id
;
--- 会员带看信息 end ---



--- 统计 web 会员第一次来源 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_web_from_entrance_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_web_from_entrance_info (
  member_id STRING,
  member_web_from_entrance STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_web_from_entrance_info
SELECT
  user_id,
  CASE
    -- 百度 sem 过来的
    WHEN regexp_extract(t_1.current_full_url,'pi=([a-z0-9-]+)',1) <> ''
      THEN 'sem'
    -- 当前页存在，上一页为空，表示是会员直接浏览器输入
    WHEN t_1.current_full_url <> '' AND t_1.referer_full_url = ''
      THEN 'direct'
    -- 当前页存在，上一页也存在，表示从其他渠道过来的
    WHEN t_1.current_full_url <> '' AND t_1.referer_full_url <> ''
      THEN 'seo'
  END AS member_web_from_entrance
FROM (
  -- 获取当天第一次访问的记录,按照 user_id 分类
  SELECT
    s_1.user_id,
    collect_set(s_1.server_time)[0] AS server_time,
    collect_set(s_1.current_full_url)[0] AS current_full_url,
    collect_set(s_1.referer_full_url)[0] AS referer_full_url
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
--- 统计 web 会员第一次来源 end ---


--- 会员微聊相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_wechat_message_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_wechat_message_info (
  member_id STRING,
  member_wechat_message_m2b_distinct STRING,
  member_wechat_message_m2b_all STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_wechat_message_info
SELECT
  t_1.from_uid,

  COUNT (
    DISTINCT(t_1.to_uid)
  ) AS wechat_message_m2b_distinct,

  COUNT (
    t_1.to_uid
  ) AS wechat_message_m2b_all

FROM
  db_sync.angejia__user_msg AS t_1
WHERE
  TO_DATE(t_1.created_at) = ${dealDate}
    AND
  t_1.account_type = 1 -- 发送方类型 1 用户发送   2 经纪人发送 4 公众号发送 100系统发送
    AND
  t_1.content_type NOT IN (5,106)
GROUP BY
  t_1.from_uid
;
--- 会员微聊相关 end ---

```


## member 统计 HQL

``` sql

--- member 日表 start ---
CREATE TABLE IF NOT EXISTS dw_db.dw_member_summary_detail_info_daily (
  member_id STRING,
  member_source_id STRING,
  member_source_name STRING,
  member_created_at STRING,
  member_phone STRING,

  member_web_guid STRING,
  member_web_brower_type STRING,
  member_web_os_type STRING,
  member_web_os_version STRING,

  member_commission_intraday STRING,
  member_commission_history STRING,

  member_device_ids STRING,
  member_device_type STRING,
  member_app_name STRING,
  member_device_platform STRING,
  member_device_os_version STRING,
  member_app_version STRING,
  member_app_channels_code STRING,
  member_app_channel_name STRING,

  member_inventory_collect_intraday STRING,
  member_inventory_collect_history STRING,

  member_pv_web_day STRING,
  member_pv_pc_inventory_list_day STRING,
  member_pv_pc_inventory_page_day STRING,
  member_pv_tw_inventory_list_day STRING,
  member_pv_tw_inventory_page_day STRING,
  member_pv_tw_community_page_day STRING,
  member_web_requset_first_time STRING,
  member_web_requset_last_time STRING,
  member_pv_app_api_day STRING,
  member_pv_app_inventory_list_day STRING,
  member_pv_app_inventory_page_day STRING,
  member_pv_app_community_page_day STRING,
  member_app_requset_first_time STRING,
  member_app_requset_last_time STRING,

  member_basic_demand_location STRING,
  member_basic_demand_house_type STRING,
  member_basic_demand_budget STRING,
  member_like_tag STRING,
  member_dislike_tag STRING,

  member_tel_m2b_all STRING,
  member_tel_m2b_distinct STRING,

  member_visit_sponsor_intraday STRING,
  member_visit_sponsor_history STRING,
  member_visit_real_intraday STRING,
  member_visit_real_history STRING,

  member_web_from_entrance STRING,

  member_wechat_message_m2b_distinct STRING,
  member_wechat_message_m2b_all STRING

) PARTITIONED BY (
  p_dt STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
COLLECTION ITEMS TERMINATED BY '\n'
;

INSERT OVERWRITE TABLE
  dw_db.dw_member_summary_detail_info_daily
PARTITION(
  p_dt = ${dealDate}
)
SELECT
  -- dw_member_summary_basis_info 会员基础信息表
  member_summary_basis_info.member_id,
  member_summary_basis_info.member_source_id,
  member_summary_basis_info.member_source_name,
  member_summary_basis_info.member_created_at,
  member_summary_basis_info.member_phone,

  -- dw_member_summary_brower_info 会员 brower 信息
  member_summary_brower_info.member_web_guid,
  member_summary_brower_info.member_web_brower_type,
  member_summary_brower_info.member_web_os_type,
  member_summary_brower_info.member_web_os_version,

  -- dw_member_summary_commission_info 会员委托信息
  member_summary_commission_info.member_commission_intraday,
  member_summary_commission_info.member_commission_history,

  -- dw_member_summary_device_info 会员 device 信息表
  member_summary_device_info.member_device_ids,
  member_summary_device_info.member_device_type,
  member_summary_device_info.member_app_name,
  member_summary_device_info.member_device_platform,
  member_summary_device_info.member_device_os_version,
  member_summary_device_info.member_app_version,
  member_summary_device_info.member_app_channels_code,
  member_summary_device_info.member_app_channel_name,

  -- dw_member_summary_inventory_info 会员房源相关
  member_summary_inventory_info.member_inventory_collect_intraday,
  member_summary_inventory_info.member_inventory_collect_history,

  -- dw_member_summary_request_info 会员请求信息
  -- web 相关字段
  member_summary_request_info.member_pv_web_day,
  member_summary_request_info.member_pv_pc_inventory_list_day,
  member_summary_request_info.member_pv_pc_inventory_page_day,
  member_summary_request_info.member_pv_tw_inventory_list_day,
  member_summary_request_info.member_pv_tw_inventory_page_day,
  member_summary_request_info.member_pv_tw_community_page_day,
  member_summary_request_info.member_web_requset_first_time,
  member_summary_request_info.member_web_requset_last_time,
  -- app 相关字段
  member_summary_request_info.member_pv_app_api_day,
  member_summary_request_info.member_pv_app_inventory_list_day,
  member_summary_request_info.member_pv_app_inventory_page_day,
  member_summary_request_info.member_pv_app_community_page_day,
  member_summary_request_info.member_app_requset_first_time,
  member_summary_request_info.member_app_requset_last_time,

  -- dw_member_summary_tag_info 会员标签信息
  member_summary_tag_info.member_basic_demand_location,
  member_summary_tag_info.member_basic_demand_house_type,
  member_summary_tag_info.member_basic_demand_budget,
  member_summary_tag_info.member_like_tag,
  member_summary_tag_info.member_dislike_tag,

  -- dw_member_summary_tel_info 会员电话量相关
  member_summary_tel_info.member_tel_m2b_all,
  member_summary_tel_info.member_tel_m2b_distinct,

  -- dw_member_summary_visit_info 会员带看信息
  member_summary_visit_info.member_visit_sponsor_intraday,
  member_summary_visit_info.member_visit_sponsor_history,
  member_summary_visit_info.member_visit_real_intraday,
  member_summary_visit_info.member_visit_real_history,

  -- dw_member_summary_web_from_entrance_info 会员 web 来源表
  member_summary_web_from_entrance_info.member_web_from_entrance,

  -- dw_member_summary_wechat_message_info 会员微聊相关
  member_summary_wechat_message_info.member_wechat_message_m2b_distinct,
  member_summary_wechat_message_info.member_wechat_message_m2b_all

-- dw_member_summary_basis_info 会员基础信息表
FROM
  dw_temp_angejia.jason_dw_member_summary_basis_info AS member_summary_basis_info

-- dw_member_summary_brower_info 会员 brower 信息
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_brower_info AS member_summary_brower_info
    ON
  member_summary_basis_info.member_id = member_summary_brower_info.member_id

-- dw_member_summary_commission_info 会员委托信息
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_commission_info AS member_summary_commission_info
    ON
  member_summary_basis_info.member_id = member_summary_commission_info.member_id

-- dw_member_summary_device_info 会员 device 信息表
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_device_info AS member_summary_device_info
    ON
  member_summary_basis_info.member_id = member_summary_device_info.member_id

-- dw_member_summary_inventory_info 会员房源相关
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_inventory_info AS member_summary_inventory_info
    ON
  member_summary_basis_info.member_id = member_summary_inventory_info.member_id

-- dw_member_summary_request_info 会员请求信息
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_request_info AS member_summary_request_info
    ON
  member_summary_basis_info.member_id = member_summary_request_info.member_id

-- dw_member_summary_tag_info 会员标签信息
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_tag_info AS member_summary_tag_info
    ON
  member_summary_basis_info.member_id = member_summary_tag_info.member_id

-- dw_member_summary_tel_info 会员电话量相关
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_tel_info AS member_summary_tel_info
    ON
  member_summary_basis_info.member_id = member_summary_tel_info.member_id

-- dw_member_summary_visit_info 会员带看信息
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_visit_info AS member_summary_visit_info
    ON
  member_summary_basis_info.member_id = member_summary_visit_info.member_id

-- dw_member_summary_web_from_entrance_info 会员 web 来源表
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_web_from_entrance_info AS member_summary_web_from_entrance_info
    ON
  member_summary_basis_info.member_id = member_summary_web_from_entrance_info.member_id

-- dw_member_summary_wechat_message_info 会员微聊相关
LEFT JOIN
  dw_temp_angejia.jason_dw_member_summary_wechat_message_info AS member_summary_wechat_message_info
    ON
  member_summary_basis_info.member_id = member_summary_wechat_message_info.member_id
;

--- member 日表 end ---

-- 导入到 mysql
export hive dw_db.dw_member_summary_detail_info_daily
to mysql dw_db.dw_member_summary_detail_info_daily PARTITION p_dt;

```


## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 备份数据
  ./migrate-hive-tabel.sh source_table=dw_db.dw_member_summary_detail_info_daily target_table=dw_history_db.dw_member_summary_detail_info_daily_20150706

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_member_summary_detail_info_daily;
  select count(*) from dw_history_db.dw_member_summary_detail_info_daily_20150706;

MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_member_summary_detail_info_daily_20150706
  LIKE
    dw_member_summary_detail_info_daily;

  INSERT INTO
    dw_member_summary_detail_info_daily_20150706
  SELECT
    *
  FROM
    dw_member_summary_detail_info_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_member_summary_detail_info_daily;
  select count(*) from dw_db.dw_member_summary_detail_info_daily_20150706;  
```



### 2、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_member_summary_detail_info_daily
  DROP PARTITION (
    p_dt = '2015-07-05'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_member_summary_detail_info_daily
  WHERE
    p_dt = '2015-07-05'
```
