# monitory_subject_table_info_daily 监控主题宽表

## 收件人

``` mail

jason@angejia.com
zhenghezhang@angejia.com
ray@angejia.com
yilinwang@angejia.com
stanley@angejia.com
shanweikang@angejia.com

```


## 确认

``` sql
date | database_name | table_name | kpi_name | kpi_count | owner_name | status

--- 监控 START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_monitory_subject_table_info_daily;
CREATE TABLE IF NOT EXISTS  dw_temp_angejia.jason_monitory_subject_table_info_daily AS

--- dw_db 层
-- broker 主题宽表
SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_broker_summary_basis_info_daily' AS table_name,
  '有数据正常' AS kpi_name,
  COUNT(*) AS kpi_count,
  'Kang' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 1
    ELSE
      0
  END AS status
FROM  
  dw_db.dw_broker_summary_basis_info_daily
WHERE
  p_dt = ${dealDate}

UNION ALL

-- 查询有数据出现警告
SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_inventory_detail_info_daily' AS table_name,
  '有数据警告' AS kpi_name,
  COUNT(*) AS kpi_count,
  'Kang' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 0
    ELSE
      1
  END AS status
FROM (
  SELECT
    inventory_id,
    count(*) AS num
  FROM
    dw_db.dw_inventory_detail_info_daily
  GROUP BY
    inventory_id
  HAVING
    count(*) > 1
) AS dw_inventory


UNION ALL


-- inventory_id 查询有数据出现警告
SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_property_summary_inventory_detail_daily' AS table_name,
  'inventory_id 查询有数据警告' AS kpi_name,
  count(*) AS kpi_count,
  'Kang' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 0
    ELSE
      1
  END AS status
FROM (
  SELECT
    inventory_id,
    count(*) AS num
  FROM
    dw_db.dw_property_summary_inventory_detail_daily
  WHERE
    p_dt = ${dealDate}
  GROUP BY
    inventory_id
  -- 筛选聚合后的数据
  HAVING
    COUNT(*) > 1
) AS dw_property_inventory


UNION ALL

-- community_id 查询有数据出现警告
SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_property_summary_community_info_daily' AS table_name,
  'community_id 查询有数据警告' AS kpi_name,
  count(*) AS kpi_count,
  'Kang' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 0
    ELSE
      1
  END AS status
FROM (
  SELECT
    community_id,
    count(*) AS num
  FROM
    dw_db.dw_property_summary_community_info_daily
  WHERE
    p_dt = ${dealDate}
  GROUP BY
    community_id
  -- 筛选聚合后的数据
  HAVING
    COUNT(*) > 1
) AS dw_property_community


UNION ALL


-- block community_id 查询有数据出现警告
SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_block_summary_basis_info_daily' AS table_name,
  'block_id 查询有数据警告' AS kpi_name,
  count(*) AS kpi_count,
  'Kang' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 0
    ELSE
      1
  END AS status
FROM (
  SELECT
    block_id,
    count(*) AS num
  FROM
    dw_db.dw_block_summary_basis_info_daily
  WHERE
    p_dt = ${dealDate}
  GROUP BY
    block_id
  -- 筛选聚合后的数据
  HAVING
    COUNT(*) > 1
) AS dw_block


UNION ALL

-- 判断 cnt=0 出现警告
select
  ${dealDate} AS day,
  'dw_db_temp' AS database_name,
  'da_property_select_community_info' AS table_name,
  'cnt = 0 错误警告' AS kpi_name,
  count(*) AS kpi_count,
  'Kang' AS owner_name,
  CASE
    WHEN COUNT(*) = 0
      THEN 0
    ELSE
      1
  END AS status
from
  dw_db_temp.da_property_select_community_info
where
  p_dt = ${dealDate}


UNION ALL


select
  ${dealDate} AS day,
  'dw_db_temp' AS database_name,
  'da_property_broker_followup_daily' AS table_name,
  'cnt = 0 错误警告' AS kpi_name,
  count(*) AS kpi_count,
  'Kang' AS owner_name,
  CASE
    WHEN COUNT(*) = 0
      THEN 0
    ELSE
      1
  END AS status
from
  dw_db_temp.da_property_broker_followup_daily
where
  p_dt = ${dealDate}


UNION ALL


SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_scorecard_summary_daily' AS table_name,
  '0 错误警告' AS kpi_name,
  count(*) AS kpi_count,
  'arran' AS owner_name,
  CASE
    WHEN COUNT(*) = 0
      THEN 0
    ELSE
      1
  END AS status
FROM
  dw_db.dw_scorecard_summary_daily
WHERE
  p_dt = ${dealDate}


UNION ALL

--- DA 监控

-- broker 业务表
SELECT
  ${dealDate} AS day,
  'da_db' AS database_name,
  'da_broker_summary_basis_info_daily' AS table_name,
  '有数据正常' AS kpi_name,
  COUNT(*) AS kpi_count,
  'Kang' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 1
    ELSE
      0
  END AS status
FROM  
  da_db.da_broker_summary_basis_info_daily
WHERE
  p_dt = ${dealDate}


UNION ALL

-- 查询有数据出现警告
SELECT
  ${dealDate} AS day,
  'da_db' AS database_name,
  'da_mobile_chat_effect_info' AS table_name,
  '有数据正常' AS kpi_name,
  count(*) AS kpi_count,
  'eric' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 1
    ELSE
      0
  END AS status
FROM
  da_db.da_mobile_chat_effect_info
WHERE
  cal_dt = ${dealDate}


UNION ALL

-- 检查是否有前一天的数据
SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_user_summary_user_browsing_metrics_daily' AS table_name,
  '有数据正常' AS kpi_name,
  COUNT(*) AS kpi_count,
  'eric' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 1
    ELSE
      0
  END AS status
FROM  
  dw_db.dw_user_summary_user_browsing_metrics_daily
WHERE
  p_dt = ${dealDate}


UNION ALL

-- 检查是否有前一天的数据
SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_sem_summary_basis_info_daily' AS table_name,
  '有数据正常' AS kpi_name,
  COUNT(*) AS kpi_count,
  'eric' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 1
    ELSE
      0
  END AS status
FROM  
  dw_db.dw_sem_summary_basis_info_daily
WHERE
  p_dt = ${dealDate}


UNION ALL


-- 判断条件，< 100,标红
select
  ${dealDate} AS day,
  'da_db' AS database_name,
  'da_property_summary_inventory_detail_daily' AS table_name,
  '< 100 错误' AS kpi_name,
  COUNT(*) AS kpi_count,
  'RAY' AS owner_name,
  CASE
    WHEN COUNT(*) < 100
      THEN 0
    ELSE
      1
  END AS status
from
  da_db.da_property_summary_inventory_detail_daily
where
  is_tao = 'Y'
and
  vppv_total > 0
and
  p_dt = ${dealDate}


UNION ALL

-- 检查是否有前一天的数据
SELECT
  ${dealDate} AS day,
  'dw_db' AS database_name,
  'dw_sem_baidu_summary_detail_info_daily' AS table_name,
  '有数据正常' AS kpi_name,
  COUNT(*) AS kpi_count,
  'jason' AS owner_name,
  CASE
    WHEN COUNT(*) > 0
      THEN 1
    ELSE
      0
  END AS status
FROM  
  dw_db.dw_sem_baidu_summary_detail_info_daily
WHERE
  p_dt = ${dealDate}

;
--- 监控 END ---

-- 导入到 mysql
export hive dw_temp_angejia.jason_monitory_subject_table_info_daily to mysql dw_temp_angejia.jason_monitory_subject_table_info_daily;

```
