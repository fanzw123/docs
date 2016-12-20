# 监控 minireport 状态


## minireport HQL

report 依赖
- dw_monitor.dw_monitor_user  minitor 用户表
- dw_monitor.mini_report      report  报告表
- dw_monitor.mini_history     report  运行历史表


``` sql

set time_zone='+00:00';

-- 获取最近 7 天的运行日志
DROP TABLE IF EXISTS dw_temp_angejia.jason_monitor_report_log;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_monitor_report_log AS
SELECT
  s_1.id,
  s_1.report_id,
  s_1.status,
  s_1.started,
  s_1.ended,
  (UNIX_TIMESTAMP(s_1.ended) - UNIX_TIMESTAMP(s_1.started)) AS diff_second
FROM
  dw_monitor.mini_history as s_1
WHERE
  -- 今天开始算，7天前
  date(started) >= date_format(date_sub(now(), interval 7 day),'%Y-%m-%d')
AND
  -- 到今天
  date(started) <= date_format(now(),'%Y-%m-%d');


-- 获取 Minireport 当天运行详细数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_monitor_report_daily;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_monitor_report_daily AS
SELECT
  t_2.id AS user_id,
  t_2.user_name,
  t_1.id AS report_id,
  t_1.name AS report_name,
  t_1.created AS report_created,
  -- 平均运行秒数
  t_3.avg_second AS avg_second,
  -- 平均运行分钟
  FROM_UNIXTIME(t_3.avg_second,'%H:%i:%s') AS avg_minute,
  -- report 运行开始时间
  t_1.schedule AS report_schedule,
  -- 调度开始时间
  t_1.schedule_time,
  -- 计算 08:00 ~ 08:30
  time_to_sec(t_1.schedule_time) AS schedule_second,

  /* 最后一次运行时间 */
  (SELECT
      diff_second
    FROM
      dw_temp_angejia.jason_monitor_report_log
    WHERE
      report_id = t_1.id
    AND
      -- 成功的运行记录
      status = 2
    ORDER BY  
      id DESC
    LIMIT 1
  ) AS last_second,

  /* 最后一次运行的状态 */
  (SELECT
      status
    FROM
      dw_temp_angejia.jason_monitor_report_log
    WHERE
      report_id = t_1.id
    ORDER BY  
      id DESC
    LIMIT 1
  ) AS job_last_run_status,

  CASE
    WHEN time_to_sec(t_1.schedule_time) < time_to_sec('07:00')
      THEN 0
    WHEN time_to_sec(t_1.schedule_time) >= time_to_sec('07:00') AND time_to_sec(t_1.schedule_time) <= time_to_sec('07:29')
      THEN 1
    WHEN time_to_sec(t_1.schedule_time) >= time_to_sec('07:30') AND time_to_sec(t_1.schedule_time) <= time_to_sec('07:59')
      THEN 2
    WHEN time_to_sec(t_1.schedule_time) >= time_to_sec('08:00') AND time_to_sec(t_1.schedule_time) <= time_to_sec('08:29')
      THEN 3
    WHEN time_to_sec(t_1.schedule_time) >= time_to_sec('08:30') AND time_to_sec(t_1.schedule_time) <= time_to_sec('08:59')
      THEN 4
    WHEN time_to_sec(t_1.schedule_time) >= time_to_sec('09:00') AND time_to_sec(t_1.schedule_time) <= time_to_sec('09:29')
      THEN 5
    WHEN time_to_sec(t_1.schedule_time) >= time_to_sec('09:30') AND time_to_sec(t_1.schedule_time) <= time_to_sec('09:59')
      THEN 6
    WHEN time_to_sec(t_1.schedule_time) >= time_to_sec('10:00')
      THEN 7
  END AS time_bucket

FROM (
  SELECT
    s_1.id,
    s_1.name,
    s_1.created,
    s_1.schedule,
    s_1.status,
    s_1.owner_id,
    -- 把调度的时间转换为正常日期
    str_to_date(substring_index(s_1.schedule,' ',2),'%i %H') as schedule_time
  FROM
    dw_monitor.mini_report AS s_1
  WHERE
    -- 有效的 report
    s_1.status = 1

) AS t_1

LEFT JOIN
  dw_monitor.dw_monitor_user AS t_2
ON
  t_1.owner_id = t_2.id

LEFT JOIN (
  SELECT  
    s_2.report_id,
    ceil(AVG(s_2.diff_second)) AS avg_second
  FROM
    dw_temp_angejia.jason_monitor_report_log AS s_2
  WHERE
    -- 成功运行的 job
    s_2.status = 2
  GROUP BY
    s_2.report_id
) AS t_3
ON
  t_1.id = t_3.report_id
-- WHERE t_3.avg_second IS NOT NULL
;





```
