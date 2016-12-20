# dw_sem_baidu_summary_detail_info_week 百度 sem 周报


## HQL

``` sql

--- baidu sem pc top 500 DESC sem_dj_count START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_pc;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_pc AS
SELECT
  date_sub(${dealDate},6) AS p_dt_start,
  ${dealDate} AS p_dt_end,
  sem.sem_campaign_id,
  sem.sem_adgroup_id,
  sem.sem_keyword_id,
  collect_set(sem_account)[0] AS sem_account,
  collect_set(sem_campaign_name)[0] AS sem_campaign_name,
  collect_set(sem_adgroup_name)[0] AS sem_adgroup_name,
  collect_set(sem_keyword_name)[0] AS sem_keyword_name,
  collect_set(sem_pc_destination_url)[0] AS sem_pc_destination_url,
  collect_set(sem_pc_utm_term_and_pi)[0] AS sem_pc_utm_term_and_pi,
  SUM(sem.sem_zx) AS sem_zx,
  SUM(sem.sem_dj) AS sem_dj_count,
  AVG(sem.sem_pjpm) AS sem_pjpm,
  SUM(sem.sem_xf) AS sem_xf,
  -- 平均点击价格(消费 / 点击)
  AVG(sem.sem_pjdjjg) AS sem_pjdjjg,
  -- 点击率 (点击 / 展现)
  AVG(sem.sem_djl) AS sem_djl,
  SUM(sem.sem_pv) AS sem_pv,
  SUM(sem.sem_uv) AS sem_uv,
  SUM(sem.sem_vppv) AS sem_vppv,
  SUM(sem.sem_vpuv) AS sem_vpuv,
  SUM(sem.sem_guid_count) AS sem_guid_count
FROM
  dw_db.dw_sem_baidu_summary_detail_info_daily AS sem
WHERE (
  sem.p_dt >= date_sub(${dealDate},6)
    AND
  sem.p_dt <= ${dealDate}
)
AND
  sem.sem_account = 'baidu-安个家2151374'
AND (
  sem.sem_zx IS NOT NULL
    OR
  sem.sem_dj IS NOT NULL
    OR
  sem.sem_pjpm IS NOT NULL
    OR
  sem.sem_xf IS NOT NULL
    OR
  sem.sem_pjdjjg IS NOT NULL
    OR
  sem.sem_djl IS NOT NULL
    OR
  sem.sem_pv IS NOT NULL
    OR
  sem.sem_vppv IS NOT NULL
    OR
  sem.sem_vpuv IS NOT NULL
    OR
  sem.sem_guid_count IS NOT NULL
)
GROUP BY
  sem.sem_campaign_id,
  sem.sem_adgroup_id,
  sem.sem_keyword_id
ORDER BY
  sem_dj_count DESC
LIMIT
  500
;
--- baidu sem pc top 500 DESC sem_dj END ---


--- baidu sem mobile top 500 DESC sem_dj_count START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_mobile;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_mobile AS
SELECT
  date_sub(${dealDate},6) AS p_dt_start,
  ${dealDate} AS p_dt_end,
  sem.sem_campaign_id,
  sem.sem_adgroup_id,
  sem.sem_keyword_id,
  collect_set(sem_account)[0] AS sem_account,
  collect_set(sem_campaign_name)[0] AS sem_campaign_name,
  collect_set(sem_adgroup_name)[0] AS sem_adgroup_name,
  collect_set(sem_keyword_name)[0] AS sem_keyword_name,
  collect_set(sem_mobile_destination_url)[0] AS sem_mobile_destination_url,
  collect_set(sem_mobile_utm_term_and_pi)[0] AS sem_mobile_utm_term_and_pi,
  SUM(sem.sem_zx) AS sem_zx,
  SUM(sem.sem_dj) AS sem_dj_count,
  AVG(sem.sem_pjpm) AS sem_pjpm,
  SUM(sem.sem_xf) AS sem_xf,
  -- 平均点击价格(消费 / 点击)
  AVG(sem.sem_pjdjjg) AS sem_pjdjjg,
  -- 点击率 (点击 / 展现)
  AVG(sem.sem_djl) AS sem_djl,
  SUM(sem.sem_pv) AS sem_pv,
  SUM(sem.sem_uv) AS sem_uv,
  SUM(sem.sem_vppv) AS sem_vppv,
  SUM(sem.sem_vpuv) AS sem_vpuv,
  SUM(sem.sem_guid_count) AS sem_guid_count
FROM
  dw_db.dw_sem_baidu_summary_detail_info_daily AS sem
WHERE (
  sem.p_dt >= date_sub(${dealDate},6)
    AND
  sem.p_dt <= ${dealDate}
)
AND
  sem.sem_account = 'baidu-无线bc安个家2151374'
AND (
  sem.sem_zx IS NOT NULL
    OR
  sem.sem_dj IS NOT NULL
    OR
  sem.sem_pjpm IS NOT NULL
    OR
  sem.sem_xf IS NOT NULL
    OR
  sem.sem_pjdjjg IS NOT NULL
    OR
  sem.sem_djl IS NOT NULL
    OR
  sem.sem_pv IS NOT NULL
    OR
  sem.sem_vppv IS NOT NULL
    OR
  sem.sem_vpuv IS NOT NULL
    OR
  sem.sem_guid_count IS NOT NULL
)
GROUP BY
  sem.sem_campaign_id,
  sem.sem_adgroup_id,
  sem.sem_keyword_id
ORDER BY
  sem_dj_count DESC
LIMIT
  500
;
--- baidu sem mobile top 500 DESC sem_dj_count END ---


-- 导出到 mysql
export hive dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_pc to mysql dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_pc;
export hive dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_mobile to mysql dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_mobile;


```

## 查询

``` sql

-- PC
select
  sem_campaign_id,
  sem_adgroup_id,
  sem_keyword_id,
  sem_account,
  sem_campaign_name,
  sem_adgroup_name,
  sem_keyword_name,
  sem_pc_utm_term_and_pi,
  sem_zx,
  sem_dj_count,
  sem_pjpm,
  sem_xf,
  -- 平均点击价格(消费 / 点击)
  sem_pjdjjg,
  -- 点击率 (点击 / 展现)
  sem_djl,
  sem_pv,
  sem_uv,
  sem_vppv,
  sem_vpuv,
  sem_guid_count
from
  dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_pc
limit 10;

-- Moblie
select
  sem_campaign_id,
  sem_adgroup_id,
  sem_keyword_id,
  sem_account,
  sem_campaign_name,
  sem_adgroup_name,
  sem_keyword_name,
  sem_mobile_utm_term_and_pi,
  sem_zx,
  sem_dj_count,
  sem_pjpm,
  sem_xf,
  -- 平均点击价格(消费 / 点击)
  sem_pjdjjg,
  -- 点击率 (点击 / 展现)
  sem_djl,
  sem_pv,
  sem_uv,
  sem_vppv,
  sem_vpuv,
  sem_guid_count
  from
    dw_temp_angejia.jason_dw_sem_baidu_summary_detail_info_week_mobile
  LIMIT 10;

```
