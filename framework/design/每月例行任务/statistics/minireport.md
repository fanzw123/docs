# Minireport

- [monitor-minireport](http://git.corp.angejia.com/dw/dw_sql/blob/master/monitor/monitor-minireport.sql)

```sql

-- 有效的 minireport
DROP TABLE IF EXISTS test.valid_minireport_list;
CREATE TABLE IF NOT EXISTS test.valid_minireport_list AS
SELECT
  s_1.id,
  s_1.name,
  s_1.created,
  s_1.schedule,
  s_1.status,
  s_1.owner_id,
  s_1.sp

FROM
  dw_monitor.mini_report AS s_1
WHERE
  -- 有效的 report
  s_1.status = 1
-- AND s_1.sp LIKE '%demand%'
;


-- 显示是否有 Minireport 依赖的数据表
SELECT
  t_1.DB_NAME,
  t_1.TBL_NAME,
  t_2.id AS minirepot_id,
--  t_2.name AS minireport_name,
  t_3.user_name
--  ,t_2.sp
FROM
  test.check_table_list AS t_1
LEFT JOIN
  test.valid_minireport_list AS t_2
ON
  t_2.sp LIKE CONCAT('%',t_1.DB_NAME,'.',t_1.TBL_NAME,'%')
LEFT JOIN
  dw_monitor.dw_monitor_user AS t_3
ON
  t_2.owner_id = t_3.id
-- WHERE t_2.sp IS NOT NULL
;


-- 统计运行时长
SELECT
	COUNT(*) AS task_count,
	SUM(last_second) AS task_sum,
	AVG(last_second) AS task_avg
FROM
	dw_temp_angejia.jason_monitor_report_daily;



-- minireprot 目前有效数
select count(*) from dw_temp_angejia.jason_monitor_report_daily;



```
