# dw_member_summary_request_info 会员请求信息

## 字段
``` sql

member_id '会员ID'


member_pv_web_day '会员 web 日 PV'

member_pv_app_api_day '会员 App 调用 api 次数'


member_pv_app_inventory_list_day '会员找房列表页 pv app'

member_pv_pc_inventory_list_day  '会员找房列表页 pv pc'

member_pv_tw_inventory_list_day '会员找房列表页 pv tw'


member_pv_app_inventory_page_day '房源单页 pv app'

member_pv_pc_inventory_page_day '房源单页 pv PC'

member_pv_tw_inventory_page_day '房源单页 pv TW'


member_pv_app_community_page_day '小区单页 pv App'

member_pv_tw_community_page_day '小区单页 pv TW'


```

## HQL

依赖
- dw_temp_angejia.jason_dw_member_summary_basis  会员基础信息表
- dw_db.dw_app_access_log
- dw_db.dw_web_visit_traffic_log

``` sql

--- 会员请求相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_request_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_request_info (
  member_id STRING,

  member_pv_web_day STRING,
  member_pv_app_api_day STRING,

  member_pv_app_inventory_list_day STRING,
  member_pv_pc_inventory_list_day STRING,
  member_pv_tw_inventory_list_day STRING,

  member_pv_app_inventory_page_day STRING,
  member_pv_pc_inventory_page_day STRING,
  member_pv_tw_inventory_page_day STRING,

  member_pv_app_community_page_day STRING,
  member_pv_tw_community_page_day STRING
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_request_info

SELECT
  bs.member_id,
  t_1.num,
  t_2.num,
  t_3.num,
  t_4.num,
  t_5.num,
  t_6.num,
  t_7.num,
  t_8.num,
  t_9.num,
  t_10.num
FROM
  dw_temp_angejia.jason_dw_member_summary_basis AS bs

-- 会员 web 日 pv
LEFT JOIN (
  SELECT
    s_1.user_id,
    COUNT(s_1.user_id) as num
  FROM
    dw_db.dw_web_visit_traffic_log AS s_1
  WHERE
    s_1.p_dt = ${dealDate}
      AND
    s_1.user_id <> '0'
  GROUP BY
    s_1.user_id
  ) AS t_1
ON
  bs.member_id = t_1.user_id

-- 会员 App 调用 api 次数
LEFT JOIN (
  SELECT
    s_2.user_id,
    COUNT(s_2.user_id) as num
  FROM
    dw_db.dw_app_access_log AS s_2
  WHERE
    s_2.p_dt = ${dealDate}
      AND
    s_2.user_id <> ''
  GROUP BY
    s_2.user_id
  ) AS t_2
ON
  bs.member_id = t_2.user_id

-- 会员找房列表页 pv app
LEFT JOIN (
  SELECT
    s_3.user_id,
    -- request_uri,
    COUNT(s_3.user_id) AS num
  FROM
    dw_db.dw_app_access_log AS s_3
  WHERE
    s_3.p_dt = ${dealDate}
      AND
    s_3.user_id <> ''
      AND
    s_3.request_uri RLIKE '^/mobile/member/inventories/list[.]*'
  GROUP BY
    s_3.user_id
  ) AS t_3
ON
  bs.member_id = t_3.user_id

-- 会员找房列表页 pv PC (暂定)
LEFT JOIN (
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
    s_4.current_page_id IN ('20007','20009','20010')
  GROUP BY
    s_4.user_id
  ) AS t_4
ON
  bs.member_id = t_4.user_id

-- 会员找房列表页 pv TW
LEFT JOIN (
  SELECT
    s_5.user_id,
    COUNT(s_5.user_id) AS num
  FROM
    dw_db.dw_web_visit_traffic_log AS s_5
  WHERE
    s_5.p_dt = ${dealDate}
      AND
    s_5.user_id <> '0'
      AND
    s_5.current_page_id IN ('10032','10033','10034','10075','10076','10077')
  GROUP BY
    s_5.user_id
  ) AS t_5
ON
  bs.member_id = t_5.user_id

-- 房源单页 pv app
LEFT JOIN (
  SELECT
    s_6.user_id,
    -- request_uri,
    COUNT(s_6.user_id) AS num
  FROM
    dw_db.dw_app_access_log AS s_6
  WHERE
    s_6.p_dt = ${dealDate}
      AND
    s_6.user_id <> ''
      AND
    s_6.request_uri RLIKE '^/mobile/member/inventories/[0-9]+$'
  GROUP BY
    s_6.user_id
  ) AS t_6
ON
  bs.member_id = t_6.user_id

-- 房源单页 pv PC
LEFT JOIN (
  SELECT
    s_7.user_id,
    -- request_uri,
    COUNT(s_7.user_id) AS num
  FROM
    dw_db.dw_web_visit_traffic_log AS s_7
  WHERE
    s_7.p_dt = ${dealDate}
      AND
    s_7.user_id <> '0'
      AND
    s_7.current_page_id = '20008'
  GROUP BY
    s_7.user_id
  ) AS t_7
ON
  bs.member_id = t_7.user_id

-- 房源单页 pv TW
LEFT JOIN (
  SELECT
    s_8.user_id,
    -- request_uri,
    COUNT(s_8.user_id) AS num
  FROM
    dw_db.dw_web_visit_traffic_log AS s_8
  WHERE
    s_8.p_dt = ${dealDate}
      AND
    s_8.user_id <> '0'
      AND
    s_8.current_page_id = '10035'
  GROUP BY
    s_8.user_id
  ) AS t_8
ON
  bs.member_id = t_8.user_id

-- 小区单页 pv App
LEFT JOIN (
  SELECT
    s_9.user_id,
    -- request_uri,
    COUNT(s_9.user_id) AS num
  FROM
    dw_db.dw_app_access_log AS s_9
  WHERE
    s_9.p_dt = ${dealDate}
      AND
    s_9.user_id <> ''
      AND
    s_9.request_uri RLIKE '^/mobile/member/communities/[0-9]+$'
  GROUP BY
    s_9.user_id
  ) AS t_9
ON
  bs.member_id = t_9.user_id

-- 小区单页 pv TW
LEFT JOIN (
  SELECT
    s_10.user_id,
    COUNT(s_10.user_id) AS num
  FROM
    dw_db.dw_web_visit_traffic_log AS s_10
  WHERE
    s_10.p_dt = ${dealDate}
      AND
    s_10.user_id <> '0'
      AND
    s_10.current_page_id IN ('10037','10038')
  GROUP BY
    s_10.user_id
  ) AS t_10
ON
  bs.member_id = t_10.user_id

WHERE
  t_1.num IS NOT NULL
    OR
  t_2.num IS NOT NULL
    OR
  t_3.num IS NOT NULL
    OR
  t_4.num IS NOT NULL
    OR
  t_5.num IS NOT NULL
    OR
  t_6.num IS NOT NULL
    OR
  t_7.num IS NOT NULL
    OR
  t_8.num IS NOT NULL
    OR
  t_9.num IS NOT NULL
    OR
  t_10.num IS NOT NULL
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
