# monitor_etl_job

```
jason@angejia.com
stanley@angejia.com
shanweikang@angejia.com
yilinwang@angejia.com
shuangyanluo@angejia.com
```

## scheduler HQL

依赖
- dw_monitor.dw_monitor_user   用户表
- dw_monitor.dw_scheduler_job  调度基础表
- dw_scheduler_task_excute_log  执行日志表

``` sql

set time_zone='+00:00';

/* 准备数据,所有运行日志数据 */
DROP TABLE IF EXISTS dw_temp_angejia.jason_scheduler_job_daily_stage;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_scheduler_job_daily_stage AS
SELECT
  id AS schedule_log_id,
  scheduler_id,
  excute_time,
  create_time,
  update_time,
  exit_code,
  /* 运行秒数 */
  UNIX_TIMESTAMP(update_time) - UNIX_TIMESTAMP(excute_time) AS diff_second
FROM
  dw_monitor.dw_scheduler_task_excute_log
WHERE
  /*1-每天自动运行，2-代表手动调起重跑，3-代表单独运行一个job */
  type IN (0,1,2,3)
;

-- 调度详情，组合
DROP TABLE IF EXISTS dw_temp_angejia.jason_scheduler_job_daily;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_scheduler_job_daily AS
SELECT
  t_1.id AS user_id,
  t_1.user_name,
  bs.scheduler_id,
  bs.job_id,
  bs.job_name,
  bs.job_state,
  bs.job_state_name,
  bs.status,
  t_2.name AS job_category,
  t_3.name AS job_layering,
  t_4.id AS job_level_id,
  t_4.name AS job_level,
  t_5.name AS job_fun_type,
  bs.run_time,
  bs.schedule_time,
  CASE
    WHEN time_to_sec(schedule_time) < time_to_sec('00:59:00')
      THEN 0
    WHEN time_to_sec(schedule_time) >= time_to_sec('01:00:00') AND time_to_sec(schedule_time) <= time_to_sec('01:59:00')
      THEN 1
    WHEN time_to_sec(schedule_time) >= time_to_sec('02:00:00') AND time_to_sec(schedule_time) <= time_to_sec('02:59:00')
      THEN 2
    WHEN time_to_sec(schedule_time) >= time_to_sec('03:00:00') AND time_to_sec(schedule_time) <= time_to_sec('03:59:00')
      THEN 3
    WHEN time_to_sec(schedule_time) >= time_to_sec('04:00:00') AND time_to_sec(schedule_time) <= time_to_sec('04:59:00')
      THEN 4
    WHEN time_to_sec(schedule_time) >= time_to_sec('05:00:00') AND time_to_sec(schedule_time) <= time_to_sec('05:59:00')
      THEN 5
    WHEN time_to_sec(schedule_time) >= time_to_sec('06:00:00') AND time_to_sec(schedule_time) <= time_to_sec('06:59:00')
      THEN 6
    WHEN time_to_sec(schedule_time) >= time_to_sec('07:00:00')
      THEN 7
  END AS time_bucket,
  /* 平均运行时间 */
  t_6.avg_second AS avg_second,
  /* FROM_UNIXTIME(t_6.avg_second,'%i:%s') AS avg_time, */
  /* 最后一次运行时间 */
  (SELECT
      diff_second
    FROM
      dw_temp_angejia.jason_scheduler_job_daily_stage
    WHERE
      scheduler_id = bs.scheduler_id
    AND
      exit_code = 0
    ORDER BY
      schedule_log_id DESC
    LIMIT 1
  ) AS last_second,
  bs.create_time,
  bs.update_time
FROM (
  SELECT
    user_id,
    /* 调度ID */
    Id AS scheduler_id,
    /* 脚本 id,真正执行的 id */
    job_id,
    job_name,
    run_time,
    /*  把调度的时间转换为正常日期*/
    str_to_date(run_time,'%s %i %H') AS schedule_time,

    job_state,
    CASE
      WHEN job_state = 0
      	THEN '未调度'
      WHEN job_state = 1
      	THEN '等待信号文件'
      WHEN job_state = 2
      	THEN '执行中'
      WHEN job_state = 3
      	THEN '执行成功'
      WHEN job_state = 4
      	THEN '执行失败'
      WHEN job_state = 5
      	THEN 'kill'
    END AS job_state_name,

    status,
    job_category,
    job_layering,
    job_level,
    job_fun_type,
    create_time,
    update_time
  FROM
    dw_monitor.dw_scheduler_job
  WHERE
    status = 1
  AND
    /* 排除部分监控脚本 */
    Id NOT IN (10,11,12)
) AS bs

LEFT JOIN
  dw_monitor.dw_monitor_user AS t_1
ON
  bs.user_id = t_1.id

LEFT JOIN
  dw_monitor.dw_scheduler_job_category AS t_2
ON
  bs.job_category = t_2.id

LEFT JOIN
  dw_monitor.dw_scheduler_job_layering AS t_3
ON
  bs.job_layering = t_3.id

LEFT JOIN
  dw_monitor.dw_scheduler_job_level AS t_4
ON
  bs.job_level = t_4.id

LEFT JOIN
  dw_monitor.dw_scheduler_job_type AS t_5
ON
  bs.job_fun_type = t_5.id
AND
  t_5.status = 1

-- 获取平均运行时长
LEFT JOIN (
  SELECT
    s_2.scheduler_id,
    ceil(AVG(s_2.diff_second)) AS avg_second
  FROM
    dw_temp_angejia.jason_scheduler_job_daily_stage AS s_2
  WHERE
    /*执行成功的*/
    exit_code = 0
  AND
    s_2.diff_second IS NOT NULL
  GROUP BY
    s_2.scheduler_id
) AS t_6
ON
  bs.scheduler_id = t_6.scheduler_id
;


SELECT * FROM dw_temp_angejia.jason_scheduler_job_daily;


date(report_created) = date_format(date_sub(now(), interval 1 day),'%Y-%m-%d')
```
