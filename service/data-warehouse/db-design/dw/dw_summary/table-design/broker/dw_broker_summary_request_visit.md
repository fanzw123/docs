# dw_broker_summary_request_visit 经纪人访问量

## 字段
``` sql

broker_id '经纪人iD'

broker_pv_home_day '经纪人主页日PV'

broker_uv_home_day '经纪人主页日UV'

```

## HQL

依赖
- dw_db.dw_web_visit_traffic_log

``` sql

--- 统计经纪人访问量 START ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_request_visit;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_request_visit (
  broker_id  STRING,
  broker_pv_home_day STRING,
  broker_uv_home_day STRING
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_request_visit
SELECT
  t_1.broker_id,
  COUNT(t_1.broker_id) AS broker_pv_home_day,
  COUNT(DISTINCT t_1.guid) AS broker_uv_home_day
from (
  SELECT
    regexp_extract(s_1.current_page,'^/broker/sh_([0-9]+)',1) AS broker_id,
    s_1.guid
  FROM
    dw_db.dw_web_visit_traffic_log AS s_1
  WHERE
      s_1.p_dt = ${dealDate}
    AND
      s_1.current_page_id = '10072'
) AS t_1
GROUP BY
  t_1.broker_id
;
--- 统计经纪人访问量 END ---
```
