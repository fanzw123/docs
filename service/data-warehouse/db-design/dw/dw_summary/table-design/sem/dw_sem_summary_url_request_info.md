# dw_sem_summary_url_request_info  URL请求统计

## 字段

``` sql

```

## HQL

依赖
- dw_db.dw_web_visit_traffic_log

###  算法

``` sql

--- 百度 sem 访问统计 START ---

--- 格式化 web 访问表 START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_summary_url_requset_traffic_log_format;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_sem_summary_url_requset_traffic_log_format AS
SELECT
  t_1.current_full_url,
  t_1.guid,
  t_1.current_page_id,
  t_1.server_time,
  CONCAT(
    java_method("java.net.URLDecoder", "decode",parse_url(t_1.current_full_url,'QUERY','utm_term'),'utf-8'),
    parse_url(t_1.current_full_url,'QUERY','pi')
  ) AS utm_term_and_pi
FROM
  dw_db.dw_web_visit_traffic_log AS t_1
WHERE
    t_1.p_dt = ${dealDate}
  AND
    t_1.current_full_url <> ''
;
--- 格式化 web 访问表 END ---



--- 百度 sem 拉取的数据 START --
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_sem;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_sem AS
SELECT
  -- 所属账号，目前有2个账号，PC 和 Mobile
  t_1.account,
  t_1.campaign_id,
  t_1.campaign_name,
  t_1.adgroup_id,
  t_1.adgroup_name,
  t_1.keyword_id,
  t_1.keyword_name,
  -- PC URL
  t_1.pc_destination_url,
  -- Mobile URL
  t_1.mobile_destination_url,

  java_method("java.net.URLDecoder", "decode",parse_url(t_1.pc_destination_url,'QUERY','utm_term'),'utf-8') AS pc_utm_term,
  java_method("java.net.URLDecoder", "decode",parse_url(t_1.mobile_destination_url,'QUERY','utm_term'),'utf-8') AS mobile_utm_term,
  java_method("java.net.URLDecoder", "decode",parse_url(t_1.pc_destination_url,'QUERY','community_name'),'utf-8') AS pc_community_name,
  java_method("java.net.URLDecoder", "decode",parse_url(t_1.mobile_destination_url,'QUERY','community_name'),'utf-8') AS mobile_community_name,

  -- pc 的 utm_term + pi
  CONCAT(
    java_method("java.net.URLDecoder", "decode",parse_url(t_1.pc_destination_url,'QUERY','utm_term'),'utf-8'),
    parse_url(t_1.pc_destination_url,'QUERY','pi')
  ) AS sem_pc_utm_term_and_pi,

  -- mobile 的 utm_term + pi
  CONCAT(
    java_method("java.net.URLDecoder", "decode",parse_url(t_1.mobile_destination_url,'QUERY','utm_term'),'utf-8'),
    parse_url(t_1.mobile_destination_url,'QUERY','pi')
  ) AS sem_mobile_utm_term_and_pi

FROM
  sem_log.sem_baidu_log AS t_1
WHERE
  t_1.p_dt = ${dealDate}
;
--- 百度 sem 拉取的数据 END --



--- 获取全站的 URL 的 PV，UV  START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_pvuv;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_pvuv AS
SELECT
  --t_1.current_full_url,

  t_1.utm_term_and_pi,

  COUNT(*) AS pv,

  COUNT(DISTINCT t_1.guid) AS uv,

  COUNT(t_1.guid) AS guid_count
FROM
  dw_temp_angejia.jason_dw_sem_summary_url_requset_traffic_log_format AS t_1
GROUP BY
  --t_1.current_full_url,
  t_1.utm_term_and_pi
;
--- 获取全站的 URL 的 PV，UV  END ---



--- 获取 URL 第一次访问的 guid (用来表示 第一次是从站外点过来的 URL)  Start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_first;
CREATE TABLE dw_temp_angejia.jason_dw_sem_summary_url_request_first AS
SELECT
  t_1.guid,
  t_1.current_full_url,
  t_1.utm_term_and_pi
FROM (
  SELECT
    s_1.guid,
    s_1.current_full_url,
    s_1.utm_term_and_pi,
    row_number() OVER (
        PARTITION BY
          s_1.guid
        ORDER BY
          s_1.server_time ASC
    ) AS first_num
  FROM
    dw_temp_angejia.jason_dw_sem_summary_url_requset_traffic_log_format AS s_1
) AS t_1
WHERE
    t_1.first_num = 1
;
--- 获取 URL 第一次访问的 guid  END ---



--- 算出(访问用户)，访问过房源单页(vppv 和 vpuv) START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_vppv_upuv;
CREATE TABLE dw_temp_angejia.jason_dw_sem_summary_url_request_vppv_upuv AS
SELECT
  t_2.utm_term_and_pi,

  COUNT(t_1.guid) AS guid_count,

  COUNT(
    CASE WHEN t_1.current_page_id IN (10035,20008)
      THEN t_1.guid
    END
  ) vppv,
  COUNT(
    DISTINCT
    CASE WHEN t_1.current_page_id IN (10035,20008)
      THEN t_1.guid
    END
  ) vpuv
FROM
  dw_temp_angejia.jason_dw_sem_summary_url_requset_traffic_log_format AS t_1
LEFT JOIN
  dw_temp_angejia.jason_dw_sem_summary_url_request_first AS t_2
ON
  -- 第一次访客的 guid 和匹配的访问记录
  t_1.guid = t_2.guid

-- 按照查找关键字分组，用于跟百度 sem 拉取的关键字匹配
GROUP BY
  t_2.utm_term_and_pi
;
--- 算出(访问用户)，访问过房源单页(vppv 和 vpuv) END ---



-- PC 账号的统计
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_sem_pc;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_sem_pc AS
SELECT
  t_1.account,
  t_1.campaign_id,
  t_1.campaign_name,
  t_1.adgroup_id,
  t_1.adgroup_name,
  t_1.keyword_id,
  t_1.keyword_name,
  t_1.pc_destination_url,
  t_1.sem_pc_utm_term_and_pi,
  t_2.pv,
  t_2.uv,
  t_3.vppv,
  t_3.vpuv,
  t_3.guid_count
FROM
  dw_temp_angejia.jason_dw_sem_summary_url_request_sem AS t_1

LEFT JOIN
  dw_temp_angejia.jason_dw_sem_summary_url_request_pvuv AS t_2
ON
  t_1.sem_pc_utm_term_and_pi = t_2.utm_term_and_pi

LEFT JOIN
  dw_temp_angejia.jason_dw_sem_summary_url_request_vppv_upuv AS t_3
ON
  t_1.sem_pc_utm_term_and_pi = t_3.utm_term_and_pi
WHERE
  t_1.account = 'baidu-安个家2151374'
;



-- mobile 账号的统计
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_sem_mobile;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_sem_summary_url_request_sem_mobile AS
SELECT
  t_1.account,
  t_1.campaign_id,
  t_1.campaign_name,
  t_1.adgroup_id,
  t_1.adgroup_name,
  t_1.keyword_id,
  t_1.keyword_name,
  t_1.mobile_destination_url,
  t_1.sem_mobile_utm_term_and_pi,
  t_2.pv,
  t_2.uv,
  t_3.vppv,
  t_3.vpuv,
  t_3.guid_count
FROM
  dw_temp_angejia.jason_dw_sem_summary_url_request_sem AS t_1

LEFT JOIN
  dw_temp_angejia.jason_dw_sem_summary_url_request_pvuv AS t_2
ON
  t_1.sem_mobile_utm_term_and_pi = t_2.utm_term_and_pi

LEFT JOIN
  dw_temp_angejia.jason_dw_sem_summary_url_request_vppv_upuv AS t_3
ON
  t_1.sem_mobile_utm_term_and_pi = t_3.utm_term_and_pi
WHERE
  t_1.account = 'baidu-无线bc安个家2151374'
;



--- 组合数据 START ---
CREATE TABLE IF NOT EXISTS dw_db.dw_sem_baidu_summary_detail_info_daily (
  sem_account String,
  sem_campaign_id String,
  sem_campaign_name String,
  sem_adgroup_id String,
  sem_adgroup_name String,
  sem_keyword_id String,
  sem_keyword_name String,
  sem_pc_destination_url String,
  sem_pc_utm_term_and_pi String,
  sem_mobile_destination_url String,
  sem_mobile_utm_term_and_pi String,
  sem_pv String,
  sem_uv String,
  sem_vppv String,
  sem_vpuv String,
  sem_guid_count String
) PARTITIONED BY (p_dt string)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
COLLECTION ITEMS TERMINATED BY '\n'
;
INSERT OVERWRITE TABLE
  dw_db.dw_sem_baidu_summary_detail_info_daily
PARTITION(
  p_dt = ${dealDate}
)
SELECT
  t_1.account,
  t_1.campaign_id,
  t_1.campaign_name,
  t_1.adgroup_id,
  t_1.adgroup_name,
  t_1.keyword_id,
  t_1.keyword_name,
  t_1.pc_destination_url,
  t_1.sem_pc_utm_term_and_pi,
  t_1.mobile_destination_url,
  t_1.sem_mobile_utm_term_and_pi,
  t_1.pv,
  t_1.uv,
  t_1.vppv,
  t_1.vpuv,
  t_1.guid_count
FROM (

  SELECT
    s_1.account,
    s_1.campaign_id,
    s_1.campaign_name,
    s_1.adgroup_id,
    s_1.adgroup_name,
    s_1.keyword_id,
    s_1.keyword_name,
    s_1.pc_destination_url,
    s_1.sem_pc_utm_term_and_pi,
    NULL AS mobile_destination_url,
    NULL AS sem_mobile_utm_term_and_pi,
    s_1.pv,
    s_1.uv,
    s_1.vppv,
    s_1.vpuv,
    s_1.guid_count
  FROM
    dw_temp_angejia.jason_dw_sem_summary_url_request_sem_pc AS s_1

  UNION ALL -- 把 2 张表合成一张表

  SELECT
    s_2.account,
    s_2.campaign_id,
    s_2.campaign_name,
    s_2.adgroup_id,
    s_2.adgroup_name,
    s_2.keyword_id,
    s_2.keyword_name,
    NULL AS pc_destination_url,
    NULL AS sem_pc_utm_term_and_pi,
    s_2.mobile_destination_url,
    s_2.sem_mobile_utm_term_and_pi,
    s_2.pv,
    s_2.uv,
    s_2.vppv,
    s_2.vpuv,
    s_2.guid_count
  FROM
    dw_temp_angejia.jason_dw_sem_summary_url_request_sem_mobile AS s_2
) AS t_1;
--- 组合数据 END ---

--- 百度 sem 访问统计 END ---


-- 导出到 mysql
export hive dw_db.dw_sem_baidu_summary_detail_info_daily to mysql dw_db.dw_sem_baidu_summary_detail_info_daily PARTITION p_dt;
```


### 查询数据

``` sql

-- 查询 PC
SELECT
  pv,
  uv,
  vppv,
  vpuv,
  guid_count,
  pc_destination_url,
  sem_pc_utm_term_and_pi
FROM
  dw_temp_angejia.jason_dw_sem_summary_url_request_sem_pc
ORDER BY
  pv DESC
LIMIT 100;

-- 查询 Mobile
SELECT
  pv,
  uv,
  vppv,
  vpuv,
  guid_count,
  mobile_destination_url,
  sem_mobile_utm_term_and_pi
FROM
  dw_temp_angejia.jason_dw_sem_summary_url_request_sem_mobile
ORDER BY
  pv DESC
LIMIT 100;

```
