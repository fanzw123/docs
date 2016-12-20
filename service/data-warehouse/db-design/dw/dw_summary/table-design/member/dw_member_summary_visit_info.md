# dw_member_summary_visit_info 会员带看信息

## 字段

``` sql

member_id '会员ID'

member_visit_sponsor_intraday '会员当天主动发起带看'

member_visit_sponsor_history '会员历史主动发起带看'

member_visit_real_intraday '今日实际带看'

member_visit_real_history '历史实际带看'

```


## HQL

依赖
- db_sync.angejia__visit_item

``` sql

--- 会员带看信息 start ---

-- 主动发起带看
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_visit_info_visit_sponsor;
CREATE TABLE IF NOT EXISTS
  dw_temp_angejia.jason_dw_member_summary_visit_info_visit_sponsor AS  
SELECT
  t_1.creator_uid AS member_id,
  t_1.visit_sponsor_intraday,
  t_1.visit_sponsor_history
FROM (
  SELECT
    s_1.creator_uid,

    -- 今日主动发起带看
    COUNT(
      CASE
        WHEN TO_DATE(s_1.created_at) = ${dealDate}
          THEN s_1.visit_id
      END
    ) AS visit_sponsor_intraday,

    -- 历史主动发起带看
    COUNT (
      s_1.visit_id  
    ) AS visit_sponsor_history
  FROM
    db_sync.angejia__visit_item AS s_1
  WHERE
    -- 创建人类型 1:买家 2:经纪人
    s_1.creator_type = 1
      AND
    -- 状态 0:已删除 1:有效
    s_1.is_active = 1
  GROUP BY
    s_1.creator_uid
) AS t_1
;

-- 真实带看
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_visit_info_visit_real;
CREATE TABLE IF NOT EXISTS
  dw_temp_angejia.jason_dw_member_summary_visit_info_visit_real AS
SELECT
  t_1.buyer_uid AS member_id,
  t_1.visit_real_intraday,
  t_1.visit_real_history
FROM (
  SELECT
    s_1.buyer_uid,

    -- 今日实际带看
    COUNT(
      CASE
        WHEN TO_DATE(s_1.visit_started_at) = ${dealDate}
          THEN s_1.id
      END
    ) AS visit_real_intraday,

    -- 历史实际带看
    COUNT (
      s_1.id  
    ) AS visit_real_history
  FROM
    db_sync.angejia__visit AS s_1
  WHERE
    -- 默认有效带看
    s_1.is_valid = 1
      AND
    -- 带看结束后，买家已看房为 0，买家没看房 为 1
    s_1.is_buyer_denied = 0
  GROUP BY
    s_1.buyer_uid
) AS t_1
;


-- 组合数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_member_summary_visit_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_member_summary_visit_info (
  member_id STRING,
  member_visit_sponsor_intraday STRING,
  member_visit_sponsor_history STRING,
  member_visit_real_intraday STRING,
  member_visit_real_history STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_member_summary_visit_info
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
