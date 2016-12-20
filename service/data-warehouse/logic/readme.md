# 逻辑


## 一般逻辑
``` sql

-- 获取日期返回数据
s_1.p_dt >= '2015-06-08'
  AND
s_1.p_dt <= '2015-06-14'


-- 或者使用函数
unix_timestamp(s_1.p_dt, 'yyyy-MM-dd') >= unix_timestamp('2015-06-08', 'yyyy-MM-dd')
  AND
unix_timestamp(s_1.p_dt, 'yyyy-MM-dd') <= unix_timestamp('2015-06-14', 'yyyy-MM-dd')


```


## UNION ALL 高级应用

- 用占位符 NULL
- 解决多表组合时，数组排序混乱问题

### 1、案例一

- 找出数据，按照主键合并到一张表中的不同字段中

``` sql
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
```

### 2、针对多列

``` sql
SELECT
  t_1.member_id,
  collect_list(t_1.c_1)[0], -- 主动发起带看 当天
  collect_list(t_1.c_2)[0], -- 实际带看 历史
  collect_list(t_1.c_3)[0], -- 实际带看 当天
  collect_list(t_1.c_4)[0] -- 主动发起带看 历史
FROM (
  SELECT
    s_1.member_id,
    s_1.visit_sponsor_intraday AS c_1, -- 主动发起带看 当天
    s_1.visit_sponsor_history AS c_2, -- 主动发起带看 历史
    NULL AS c_3, -- 占位符
    NULL AS c_4 -- 占位符
  FROM
      dw_temp_angejia.jason_dw_member_summary_visit_info_visit_sponsor AS s_1

  UNION ALL -- 把 2 张表合成一张表

  SELECT
    s_2.member_id,
    NULL AS c_1, -- 占位符
    NULL AS c_2, -- 占位符
    s_2.visit_real_intraday AS c_3, -- 实际带看 当天
    s_2.visit_real_history AS c_4 -- 实际带看 历史
  FROM
    dw_temp_angejia.jason_dw_member_summary_visit_info_visit_real AS s_2
  ) AS t_1
GROUP BY
  t_1.member_id
;
--- 会员带看信息 end ---
```
