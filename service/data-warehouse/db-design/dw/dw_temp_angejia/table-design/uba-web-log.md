# uba web log

## 分析 SQL

``` sql
-- 获取用户第一次访问记录,当前页不是百度 pi 的数据
drop table if exists dw_temp_angejia.jason_uba_web_log;
create table if not exists dw_temp_angejia.jason_uba_web_log as
SELECT
  *
FROM (
  -- 按照 guid 分组后，再把 guid 访问时间按照从小到大排序
  select
    parse_url(current_full_url, 'QUERY','pi') AS current_pi,
    parse_url(current_full_url, 'HOST') AS current_host,
    parse_url(referer_full_url, 'QUERY','pi') AS referer_pi,
    parse_url(referer_full_url, 'HOST') AS referer_host,
    guid,
    current_full_url,
    current_page_id,
    server_time,
    current_page_name,
    client_ip,
    brower_type,
    phone_type,
    referer_full_url,
    referer_page_name,
    row_number() over (
      partition by
        guid
      order by
        server_time
      ASC
    ) as rownum  
  -- 把 没有 PI 的 URL 获取到
  from (
    select
      guid,
      current_full_url,
      server_time,
      current_page_id,
      current_page_name,
      client_ip,
      brower_type,
      phone_type,
      referer_full_url,
      referer_page_name
    from
      dw_db.dw_web_visit_traffic_log a
    where
      p_dt='2015-10-25'
  ) AS t
) AS re
-- 把排名第一的 guid 访问记录拿到，也就是第一次访问的记录
where
  re.rownum = 1
;



-- 一、pc 总量 2814
SELECT
  COUNT(*)
FROM
  dw_temp_angejia.jason_uba_web_log
WHERE
  current_host IN ('sale.sh.angejia.com','sh.angejia.com','www.angejia.com')
;


--  二、PC 当天第一次访问的 URL (有上一页地址 referer_host IS NOT NULL) 1747 占比 62%
SELECT
  COUNT(*)
FROM
  dw_temp_angejia.jason_uba_web_log
WHERE
  current_host IN ('sale.sh.angejia.com','sh.angejia.com','www.angejia.com')
AND
  referer_host IS NOT NULL
;

  -- 2.1 上一页 是 pi 过来的 36 ,占比 41 %
  SELECT
    COUNT(*)
  FROM
    dw_temp_angejia.jason_uba_web_log
  WHERE
    current_host IN ('sale.sh.angejia.com','sh.angejia.com','www.angejia.com')
  AND
    referer_host IS NOT NULL
  AND
    parse_url(referer_full_url, 'QUERY','pi') IS NOT NULL
  ;


  -- 2.2 上一页 不是 pi 过来的 1711 ,占比 60 %
  SELECT
    COUNT(*)
  FROM
    dw_temp_angejia.jason_uba_web_log
  WHERE
    current_host IN ('sale.sh.angejia.com','sh.angejia.com','www.angejia.com')
  AND
    referer_host IS NOT NULL
  AND
    parse_url(referer_full_url, 'QUERY','pi') IS NULL
  ;

    -- 2.3 上一页 不是 pi 过来的 ，并且当前页没有 pi 的， 60 ,占比 0.2 %
    SELECT
      COUNT(*)
    FROM
      dw_temp_angejia.jason_uba_web_log
    WHERE
      current_host IN ('sale.sh.angejia.com','sh.angejia.com','www.angejia.com')
    AND
      referer_host IS NOT NULL
    AND
      parse_url(referer_full_url, 'QUERY','pi') IS NULL
    AND
      parse_url(current_full_url, 'QUERY','pi') IS NULL
    ;


    -- 2.4 上一页 不是 pi 过来的 ，并且当前页有 pi 的， 1651 占比 58%
    SELECT
      COUNT(*)
    FROM
      dw_temp_angejia.jason_uba_web_log
    WHERE
      current_host IN ('sale.sh.angejia.com','sh.angejia.com','www.angejia.com')
    AND
      referer_host IS NOT NULL
    AND
      parse_url(referer_full_url, 'QUERY','pi') IS NULL
    AND
      parse_url(current_full_url, 'QUERY','pi') IS NOT NULL
    ;



-- 三、PC 当天第一次访问的 URL (没有上一页地址 referer_host IS NULL) 的 1067 占比 38 %
SELECT
  COUNT(*)
FROM
  dw_temp_angejia.jason_uba_web_log
WHERE
  current_host IN ('sale.sh.angejia.com','sh.angejia.com','www.angejia.com')
AND
  referer_host IS  NULL
;



```
