# dw_broker_summary_trajectory_info 经纪人活动轨迹

## 字段

``` sql

broker_id '经纪人 id'

broker_track_ln '经纪人活动经纬度信息'

```

## HQL

依赖
- db_sync.angejia__broker
- dw_db.dw_app_access_log

``` sql

add jar hdfs://UCloudcluster/umr-jdlg4d/jars/GetLn.jar;
create temporary function getln as 'com.angejia.dw.hive.udf.UDAFGetUrl';

--- 经纪人活动轨迹 START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_trajectory_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_trajectory_info (
  broker_id string,
  broker_track_ln string
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_trajectory_info
SELECT
  b.user_id,
  getln(
    a.longitude,
    a.latitude,
    a.server_time
  ) AS broker_track_ln
FROM
  db_sync.angejia__broker b
INNER JOIN
  dw_db.dw_app_access_log a
ON
  a.user_id = b.user_id
WHERE
  a.p_dt = ${dealDate}
AND
  a.user_id <> ''
AND
  a.longitude <> ''
AND
  a.latitude <> ''
AND
  a.longitude <> '0.000000'
AND
  a.latitude <> '0.000000'
GROUP BY
  b.user_id
;
--- 经纪人活动轨迹 END ---

```
