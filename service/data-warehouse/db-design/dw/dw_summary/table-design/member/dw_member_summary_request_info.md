# dw_member_summary_request_info 会员请求信息

## 字段
``` sql

member_id '会员ID'

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

```

## HQL

依赖
- dw_temp_angejia.jason_dw_member_summary_basis_info  会员基础信息表
- dw_db.dw_app_access_log
- dw_db.dw_web_visit_traffic_log

``` sql

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
```




### 备用算法
``` sql

-- 会员找房列表页 pv PC 算法 2
SELECT
  s_4.user_id,
  COUNT(s_4.user_id) AS num
FROM
  dw_db.dw_web_visit_traffic_log AS s_4
WHERE
  s_4.p_dt = ${dealDate}
    AND
  s_4.user_id <> '0'
    AND
  s_4.current_full_url RLIKE '^http://sale.sh.angejia.com'
    AND
  s_4.current_page RLIKE '^/([a-z_/]+)$'
GROUP BY
  s_4.user_id
;


-- 会员找房列表页 pv TW 算法2
SELECT
  s_5.user_id,
  --s_5.current_page,
  --s_5.current_full_url
  COUNT(s_5.user_id) AS num
FROM
  dw_db.dw_web_visit_traffic_log AS s_5
WHERE
  s_5.p_dt = ${dealDate}
    AND
  s_5.user_id <> '0'
    AND
  s_5.current_full_url RLIKE '^http://m.angejia.com'
    AND
  s_5.current_page RLIKE '^/sale/([a-z_/]+)$'
GROUP BY
  s_5.user_id
;
```
