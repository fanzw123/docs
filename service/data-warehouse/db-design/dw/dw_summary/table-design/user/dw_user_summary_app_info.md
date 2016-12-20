# dw_user_summary_app_info 用户 app 信息

## 字段
``` sql
user_id string comment '用户 ID'
app_name string comment '登录的app名称',
```

## HQL

依赖
- dw_db.dw_app_access_log

``` sql
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_user_summary_app_info;

CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_user_summary_app_info (
  user_id  string,
  app_name  string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_user_summary_app_info
SELECT
  user_id,
  -- 返回一组对象,消除重复的元素。
  collect_set(app_name)[0]
FROM
  dw_db.dw_app_access_log
WHERE
    user_id <> ''
  AND
    app_name IN ('a-broker','i-broker')
  AND
    p_dt = ${dealDate}
GROUP BY
  user_id
;

```
