# dw_member_summary_wechat_message_info 会员微聊相关

## 字段

``` sql
member_id '会员ID'

member_wechat_message_m2b_distinct '会员发送给经纪人，去重'

member_wechat_message_m2b_all '会员发送给经纪人微聊，所有'

```


## HQL

依赖
- db_sync.angejia__user_msg

``` sql

--- 会员微聊相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_wechat_message_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_wechat_message_info (
  member_id STRING,
  member_wechat_message_m2b_distinct STRING,
  member_wechat_message_m2b_all STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_wechat_message_info
SELECT
  t_1.from_uid,

  COUNT (
    DISTINCT(t_1.to_uid)
  ) AS wechat_message_m2b_distinct,

  COUNT (
    t_1.to_uid
  ) AS wechat_message_m2b_all

FROM
  db_sync.angejia__user_msg AS t_1
WHERE
  TO_DATE(t_1.created_at) = ${dealDate}
    AND
  t_1.account_type = 1 -- 发送方类型 1 用户发送   2 经纪人发送 4 公众号发送 100系统发送
    AND
  t_1.content_type NOT IN (5,106)
GROUP BY
  t_1.from_uid
;
--- 会员微聊相关 end ---

```



### 老算法
``` sql
SELECT
  t_1.from_uid,

  COUNT (
    DISTINCT(t_1.to_uid)
  ) AS wechat_message_m2b_distinct,

  COUNT (
    t_1.to_uid
  ) AS wechat_message_m2b_all

FROM
  db_sync.angejia__user_msg AS t_1
LEFT JOIN
  db_sync.angejia__broker AS t_2
ON
  t_2.user_id = t_1.to_uid
WHERE
  TO_DATE(t_1.created_at) = ${dealDate}
    AND
  t_1.content_type NOT IN (5,106)
GROUP BY
  t_1.from_uid
;

```
