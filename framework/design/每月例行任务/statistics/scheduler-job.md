# SchedulerJob

- [monitor_scheduler_job](http://git.corp.angejia.com/dw/dw_sql/blob/master/monitor/monitor_scheduler_job.sql)

``` sql

-- JOB 当天运行时长
SELECT
	COUNT(*) AS task_count,
	SUM(last_second) AS task_sum,
	AVG(last_second) AS task_avg
FROM
	dw_temp_angejia.jason_scheduler_job_daily;

-- 所有 Job 数
select count(*) from dw_temp_angejia.jason_scheduler_job_daily;

```
