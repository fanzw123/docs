# dw_cal 日期维度表


## 字段:2015-06-01为例
``` sql
cal_dt             date not null primary key   日期主键'2015-06-01'
cal_dt_short       varchar(8)                  短日期'20150601'
day_numofweek      int                         当周第几天1
day_numofmonth     int                         当月第几天1
day_numofyear      int                         当年第几天152
week_beg_dt        date                        周初日期（周一）'2015-06-01'
week_end_dt        date                        周末日期（周日）'2015-06-07'
week_beg_dt_short  varchar(8)                  周初日期（周一）'20150601'
week_end_dt_short  varchar(8)                  周末日期（周日）'20150607'
weekid             varchar(7)                  周序号Gregorian Calendar '2015W23'
week_numofyear     int                         当年第几周Gregorian Calendar 23
retailweekid       varchar(7)                  周序号Retail Calendar '2015W23'
retailweek_numofyear int                       当年第几周Retail Calendar 23
month_beg_dt       date                        月初日期'2015-06-01'
month_end_dt       date                        月末日期'2015-06-30'
month_beg_dt_short varchar(8)                  月初日期'20150601'
month_end_dt_short varchar(8)                  月末日期'20150630'
monthid            varchar(7)                  月序号2015M06
month_numofyear    int                         当年第几月6
year_beg_dt        date                        年初日期'2015-01-01'
year_end_dt        date                        年末日期'2015-12-31'
year_beg_dt_short  varchar(8)                  年初日期'20150101'
year_end_dt_short  varchar(8)                  年末日期'20151231'
yearid             varchar(4)                  年序号'2015'  

```

## mysql
``` sql
DROP PROCEDURE IF EXISTS makedwcal;

DELIMITER //
CREATE PROCEDURE makedwcal ()
BEGIN
DECLARE v_startdt DATE;
DECLARE v_enddt DATE;
SELECT STR_TO_DATE("20000101", '%Y%m%d') INTO v_startdt;
SELECT STR_TO_DATE("20991231", '%Y%m%d') INTO v_enddt;

WHILE v_startdt <= v_enddt DO
INSERT INTO dw_cal(
cal_dt,
cal_dt_short,
day_numofweek,
day_numofmonth,
day_numofyear,
week_beg_dt,
week_end_dt,
week_beg_dt_short,
week_end_dt_short,
weekid,
week_numofyear,
retailweekid,
retailweek_numofyear,
month_beg_dt,
month_end_dt,
month_beg_dt_short,
month_end_dt_short,
monthid,
month_numofyear,
year_beg_dt,
year_end_dt,
year_beg_dt_short,
year_end_dt_short,
yearid)
VALUES(
v_startdt,
DATE_FORMAT(v_startdt,'%Y%m%d'),
WEEKDAY(v_startdt)+1,
DAYOFMONTH(v_startdt),
DAYOFYEAR(v_startdt),
v_startdt - INTERVAL WEEKDAY(v_startdt) DAY,
v_startdt + INTERVAL (6-WEEKDAY(v_startdt)) DAY,
DATE_FORMAT(v_startdt - INTERVAL WEEKDAY(v_startdt) DAY,'%Y%m%d'),
DATE_FORMAT(v_startdt + INTERVAL (6-WEEKDAY(v_startdt)) DAY,'%Y%m%d'),
CASE WHEN WEEK(DATE_FORMAT(v_startdt, '%Y0101'),5) = 1 THEN CONCAT(DATE_FORMAT(v_startdt,'%YW'),LPAD(WEEK(v_startdt,5),2,'0'))
ELSE CONCAT(DATE_FORMAT(v_startdt,'%YW'),LPAD(TRIM(LEADING '0' FROM WEEK(v_startdt,5))+1,2,'0')) END,
CASE WHEN WEEK(DATE_FORMAT(v_startdt, '%Y0101'),5) = 1 THEN WEEK(v_startdt,5)
ELSE LPAD(TRIM(LEADING '0' FROM WEEK(v_startdt,5))+1,2,'0') END,
DATE_FORMAT(v_startdt,'%xW%v'),
DATE_FORMAT(v_startdt,'%v'),
STR_TO_DATE(DATE_FORMAT(v_startdt, '%Y%m01'),'%Y%m%d'),
DATE_SUB(DATE_ADD(DATE_FORMAT(v_startdt,'%Y%m01'),INTERVAL 1 MONTH),INTERVAL 1 DAY),
DATE_FORMAT(v_startdt, '%Y%m01'),
DATE_FORMAT(DATE_SUB(DATE_ADD(DATE_FORMAT(v_startdt,'%Y%m01'),INTERVAL 1 MONTH),INTERVAL 1 DAY),'%Y%m%d'),
DATE_FORMAT(v_startdt,'%YM%m'),
MONTH(v_startdt),
STR_TO_DATE(DATE_FORMAT(v_startdt, '%Y0101'),'%Y%m%d'),
STR_TO_DATE(DATE_FORMAT(v_startdt, '%Y1231'),'%Y%m%d'),
DATE_FORMAT(v_startdt, '%Y0101'),
DATE_FORMAT(v_startdt, '%Y1231'),
YEAR(v_startdt)
);
SET v_startdt= DATE_ADD(v_startdt,INTERVAL 1 DAY);
END WHILE;
END;
//

call makedwcal();

```
