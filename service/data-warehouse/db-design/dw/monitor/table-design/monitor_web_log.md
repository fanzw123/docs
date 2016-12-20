# 网站日志监控

- 监控网站 access_log 和 dw_log 各项指标

``` sql

--- 准备基础数据层 start ---
-- access_log 过滤爬虫后跟 host 以后的正常日志
DROP TABLE IF EXISTS dw_temp_angejia.jason_angejia_normal_log;
CREATE TABLE dw_temp_angejia.jason_angejia_normal_log AS
SELECT
  *
FROM
  access_log.access_log_${baseDealDate} AS access_log
-- 过滤非法 ip
LEFT JOIN
  dw_db.dw_basis_dimension_filter_ip AS filter_ip_table
    ON access_log.remote_addr = filter_ip_table.client_ip
WHERE
  -- 正常访问的 host_name
  access_log.hostname IN('m.angejia.com','sale.sh.angejia.com','sh.angejia.com','www.angejia.com')

  -- 方法 agent
  AND access_log.user_agent <> '-'

  -- curl 请求的 agent
  AND access_log.user_agent not like '%curl%'

  -- 爬虫 agent  
  AND access_log.user_agent not like '%pider%'

  -- 爬虫 agent  
  AND access_log.user_agent not like '%bot%'

  --  爬虫 agent  
  AND access_log.user_agent not like '%Bot%'

  -- yahoo 爬虫 agent  
  AND access_log.user_agent not like '%Slurp%'

  -- Apache-HttpClient
  AND access_log.user_agent not like '%Apache-HttpClient%'

  -- 正常 code
  AND access_log.http_code in ('200')

  -- method = GET
  AND access_log.method = 'GET'

  -- 过滤非法 ip
  AND filter_ip_table.client_ip IS NULL

;


-- IP 访问统计
DROP TABLE IF EXISTS dw_temp_angejia.jason_angejia_access_log_ip_total;
CREATE TABLE dw_temp_angejia.jason_angejia_access_log_ip_total AS
SELECT
  t.*
FROM (
  -- 过滤后的 access_log 的 ip 访问统计
  SELECT
    'access_normal_ip' AS type,
    remote_addr,
    COUNT(*) AS num
  FROM
    dw_temp_angejia.jason_angejia_normal_log
  GROUP BY
    remote_addr
  ORDER BY
    num DESC

UNION ALL

  -- 没有过滤后的 access_log 的 ip 访问统计
  SELECT
    'access_ip' AS type,
    remote_addr,
    COUNT(*) AS num
  FROM
    access_log.access_log_${baseDealDate}
  GROUP BY
    remote_addr
  ORDER BY
    num DESC
) AS t;



-- 过滤后的 user_agent 的统计数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_angejia_access_log_user_agent_total;
CREATE TABLE  IF NOT EXISTS dw_temp_angejia.jason_angejia_access_log_user_agent_total AS
SELECT
  user_agent,
  COUNT(*) as num
FROM
  dw_temp_angejia.jason_angejia_normal_log
GROUP BY
  user_agent
ORDER BY
  num DESC
;

--- 准本基础数据层 end ---


--- 统计层 start ---
CREATE TABLE IF NOT EXISTS dw_db.dw_log_total (
  `access_log` int COMMENT 'access_log 总数',
  `access_log_filter` int COMMENT 'access_log 过滤后的日志数',
  `uba_web_visit_log` int COMMENT 'pc touch 访问日志数',
  `uba_web_action_log` int COMMENT 'web action 日志数',
  `uba_app_action_log` int COMMENT 'app action 日志数'
) PARTITIONED BY (
  `p_dt` String)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
COLLECTION ITEMS TERMINATED BY '\n';
-- 插入数据
INSERT OVERWRITE TABLE
  dw_db.dw_log_total
PARTITION (
  `p_dt` = ${dealDate}
)
SELECT
  access_log.num,
  access_log_filter_spider.num,
  uba_web_visit_log.num,
  uba_web_action_log.num,
  uba_app_action_log.num
FROM (
  SELECT
    'access_log' AS log_type,
    COUNT(*) AS num
  FROM
    access_log.access_log_${baseDealDate}
) AS access_log

JOIN (
  SELECT
    'access_log_filter_spider' AS log_type,
    COUNT(*) AS num
  FROM
    dw_temp_angejia.jason_angejia_normal_log
) AS access_log_filter_spider

JOIN (
  SELECT
    'uba_web_visit_log' AS log_type,
    COUNT(*) AS num
  FROM
    uba_web_visit_log.uba_web_visit_log_${baseDealDate}
) AS uba_web_visit_log

JOIN (
  SELECT
    'uba_web_action_log' AS log_type,
    COUNT(*) AS num
  FROM
    uba_web_action_log.uba_web_action_log_${baseDealDate}
) AS uba_web_action_log

JOIN (
  SELECT
    'uba_app_action_log' AS log_type,
    COUNT(*) AS num
  FROM
    uba_app_action_log.uba_app_action_log_${baseDealDate}
) AS uba_app_action_log
;

--- 统计层 end ---


-- 导出到 mysql
export hive dw_db.dw_log_total to mysql dw_db.dw_log_total partition p_dt;
export hive dw_temp_angejia.jason_angejia_access_log_ip_total to mysql dw_temp_angejia.jason_angejia_access_log_ip_total;
export hive dw_temp_angejia.jason_angejia_access_log_user_agent_total to mysql dw_temp_angejia.jason_angejia_access_log_user_agent_total;


```
