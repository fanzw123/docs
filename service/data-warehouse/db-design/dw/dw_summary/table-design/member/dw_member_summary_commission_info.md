# dw_member_summary_commission_info 会员委托信息

## 字段

``` sql
member_id '会员ID'

member_commission_intraday '会员当天委托'

member_commission_history '会员历史委托'

```


## HQL

依赖
- db_sync.angejia__commission

``` sql

--- 会员委托 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_commission_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_commission_info (
  member_id STRING,
  member_commission_intraday STRING,
  member_commission_history STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_commission_info
SELECT
  t_1.seller_uid,
  -- 当天委托
  collect_list(t_1.c_1)[0] AS commission_intraday,
  collect_list(t_1.c_2)[0] AS commission_history
FROM (
  -- 今日委托房源数 (7)
  SELECT
    s_1_1.seller_uid,
    s_1_1.num AS c_1,
    NULL AS c_2 -- 占位
  FROM (
    SELECT
      s_1.seller_uid,
      COUNT(s_1.id) as num
    FROM
      db_sync.angejia__commission AS s_1
    WHERE
      -- 卖家 id 和 创建人 id 相同，表示是房东发房
      s_1.seller_uid = s_1.creator_uid
        AND
      TO_DATE(s_1.created_at) = ${dealDate}
    GROUP BY
      s_1.seller_uid
    ) AS s_1_1

  UNION ALL

  -- 历史委托房源数 (293)
  SELECT
    s_2_1.seller_uid,
    NULL AS c_1, -- 占位
    s_2_1.num AS c_2
  FROM (
    SELECT
      s_2.seller_uid,
      COUNT(s_2.id) as num
    FROM
      db_sync.angejia__commission AS s_2
    WHERE
      s_2.seller_uid = s_2.creator_uid
        AND
      s_2.created_at >= '2015-04-09 15:00:00'
    GROUP BY
      s_2.seller_uid
    ) AS s_2_1

) AS t_1
GROUP BY
  t_1.seller_uid
;
--- 会员委托 end ---
```
