# 数据统计

- [monitor_hive_table](http://git.corp.angejia.com/dw/dw_sql/blob/master/monitor/monitor_hive_table.sql)

```sql

-- 超过 30 天 没有修改的数据表
DROP TABLE IF EXISTS test.check_table_list;
CREATE TABLE IF NOT EXISTS test.check_table_list AS
SELECT
	db_name,
	tbl_name,
	tbl_last_time_stamp,
	tbl_last_time
FROM
	test.hive_table_history
WHERE
	date_index = date_format(now(),'%Y%m%d')
AND
	db_name = 'dw_temp_angejia'
AND
  -- 30 天前
  tbl_last_time_stamp <=  UNIX_TIMESTAMP(date_sub(now(), interval 30 day))
ORDER BY
  tbl_last_time_stamp ASC

;


-- 统计各个数据库的表的使用情况
select db_name,count(*) from hive_table_history where date_index = date_format(now(),'%Y%m%d') group by db_name;

```
