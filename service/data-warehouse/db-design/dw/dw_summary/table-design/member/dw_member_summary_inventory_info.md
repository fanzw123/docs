# dw_member_summary_inventory_info 会员房源相关

## 字段

``` sql

member_id '会员ID'

member_inventory_collect_intraday '会员当天收藏房源数'

member_inventory_collect_history '会员历史收藏房源数'

```


## HQL

依赖

- db_sync.angejia__member_like_inventory

``` sql

--- 会员房源相关 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_inventory_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_inventory_info (
  member_id STRING,
  member_inventory_collect_intraday STRING,
  member_inventory_collect_history STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_inventory_info
SELECT
  t_1.user_id,
  t_1.inventory_collect_intraday,
  t_1.inventory_collect_history
FROM (
  -- 收藏房源数
  SELECT
    s_1.user_id,

    -- 今日收藏的房源数
    COUNT(
      CASE
        WHEN TO_DATE(s_1.created_at) = ${dealDate}
          THEN s_1.inventory_id
      END
    ) AS inventory_collect_intraday,

    -- 历史收藏的房源数
    COUNT (
      s_1.inventory_id  
    ) AS inventory_collect_history
  FROM
    db_sync.angejia__member_like_inventory AS s_1
  WHERE
    s_1.status = 1
  GROUP BY
    s_1.user_id
) AS t_1
;
--- 会员房源相关 end ---

```
