# dw_member_summary_web_from_entrance_info 会员 web 来源表

## 字段

``` sql

member_id '会员ID'

member_web_from_entrance '会员第一次来源 (sem:百度投放, direct:会员浏览器输入 ,seo:其他网页)'

```

## HQL

依赖
- dw_db.dw_web_visit_traffic_log

``` sql

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

```
