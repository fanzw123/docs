# dw_sem_summary_baidu_info 百度 SEM

## 字段
``` sql

sem_key 'sem 主键'

-- sem_guid '访问用户 guid'

sem_pi_num 'SEM 出现次数'

```

## HQL

依赖
- dw_db.dw_web_visit_traffic_log

``` sql

--- 统计有 pi 的访问 START ---
-- 统计 pi
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_sem_summary_baidu_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_sem_summary_baidu_info (
  sem_key STRING,
  --sem_guid STRING,
  sem_pi_num STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_sem_summary_baidu_info
SELECT
  t_1.pi,
  --CONCAT_WS(',',collect_set(t_1.guid)) AS guids,
  COUNT(t_1.pi) AS pi_num
FROM (
  SELECT
    regexp_extract(s_1.current_full_url,'pi=([a-z0-9-]+)',1) AS pi,
    s_1.guid,
    s_1.server_time
  FROM
    dw_db.dw_web_visit_traffic_log AS s_1
  WHERE
    p_dt = ${dealDate}
) AS t_1
WHERE
  t_1.pi <> ''
GROUP BY
  t_1.pi
;
--- 统计有 pi 的访问 END ---
```
