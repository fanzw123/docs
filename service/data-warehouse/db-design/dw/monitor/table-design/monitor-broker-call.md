# 监控经纪人电话

收件人
```
justin@angejia.com
zmhu@angejia.com
benma@angejia.com
jiaweicheng@angejia.com
dl-bi@angejia.com
```

## 字段

``` sql


-- member call broker 相关指标
member_call_broker_daily_num '经纪人，接通、未接通，当天总数'

member_call_broker_succeed_num '经纪人接通成功次数'

member_call_broker_error_num '经纪人接通失败次数'

--member_call_broker_succeed_rate '接通成功率'

--member_call_broker_error_rate '接通失败率'

member_call_broker_blacklist_num '黑名单用户拨打经纪人电话数'


-- broker call member 相关指标

broker_call_member_daily_num 'broker call memeber 当天总数 (去除黑名单)'

broker_call_member_succeed_num '经纪人拨打用户成功次数'

broker_call_member_error_num '经纪人拨打用户失败次数'

--broker_call_member_succeed_rate '经纪人拨通成功率'

--broker_call_member_error_rate '经纪人拨通失败率'

broker_call_member_avg '经纪人拨打用户平均通话时长'



```


## HQL

依赖
- db_sync.angejia__call_log
- db_sync.angejia__broker
- db_sync.angejia__member

``` sql
DROP TABLE IF EXISTS dw_temp_angejia.jason_broker_call_daily_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_broker_call_daily_info AS
SELECT
  ${dealDate} AS p_dt,
  -- 经纪人基本信息
  bs.user_id AS broker_id,
  bs.broker_name,
  bs.phone AS broker_phone,
  bs.agent_company_name AS broker_company_name,
  bs.agent_name AS broker_agent_name,
  bs.broker_label_name,

-- member -> broker 相关指标
  -- 经纪人接通、未接通，总数 (去除黑名单)
  COALESCE(bs.call_jt_and_wjt,
    0) AS member_call_broker_daily_num,

  -- 经纪人接通成功次数 (去除黑名单，有通话时间的 keep_time > 0)
  COALESCE(bs.call_jt,
    0) AS member_call_broker_succeed_num,

  -- 经纪人接通失败次数 (总接通数 - 接通成功数)
  COALESCE(bs.call_jt_and_wjt - bs.call_jt,
    0) AS member_call_broker_error_num,

  -- 黑名单用户拨打经纪人电话数
  COALESCE(member_call_broker_info.member_call_broker_blacklist_num,
    0) AS member_call_broker_blacklist_num,


-- broker -> member 相关指标

  -- broker call memeber 当天总数 (去除黑名单)
  COALESCE(broker_call_member_info.broker_call_member_daily_num,
    0) AS broker_call_member_daily_num,

  -- 经纪人 回拨 用户数
  COALESCE(broker_call_member_info.broker_call_member_back,
    0) AS broker_call_member_back,

  -- 经纪人拨打用户成功次数 (有通话时间的 keep_time > 0)
  COALESCE(
    broker_call_member_info.broker_call_member_succeed_num,
    0) AS broker_call_member_succeed_num,

  -- 经纪人拨打用户失败次数
  COALESCE(
    broker_call_member_info.broker_call_member_daily_num - broker_call_member_info.broker_call_member_succeed_num,
    0) AS broker_call_member_error_num,

  -- 经纪人 call 用户,平均通话时长
  COALESCE(
    CEIL(broker_call_member_info.broker_call_member_avg),
    0) AS broker_call_member_avg



-- 经纪人宽表
FROM
  dw_db.dw_broker_summary_basis_info_daily AS bs


-- broker -> member 相关指标
LEFT JOIN (
  SELECT
    -- 主叫 uid
    s_1.caller_uid,

    -- broker -> memeber 总数
    COUNT(s_1.id) AS broker_call_member_daily_num,

    -- broker 回拨 -> member 总数
    COUNT(
      CASE
        WHEN s_1.call_type = 0 AND s_1.orig_called = '1001'
          THEN 1
      END
    ) AS broker_call_member_back,

    -- broker -> member 成功次数 (有通话时间的 keep_time > 0)
    COUNT(
      CASE
        WHEN s_1.keep_time > 0
          THEN 1
      END
    ) AS broker_call_member_succeed_num,

    -- broker -> member 平均时长
    AVG(
      CASE
        WHEN s_1.keep_time > 0
          THEN s_1.keep_time
      END
    ) AS broker_call_member_avg

  FROM
    db_sync.angejia__call_log AS s_1
  WHERE
    -- 日期
    to_date(s_1.start_at) = ${dealDate}

    -- 0 : broker 回拨 -> member | 1 : broker -> member | 2 : member -> broker'
    AND s_1.call_type IN (0,1)

    -- 排除黑名单
    AND s_1.is_harass = 0

  GROUP BY
    s_1.caller_uid

) AS broker_call_member_info
ON
  bs.user_id = broker_call_member_info.caller_uid


-- member -> broker 相关指标
LEFT JOIN (
  SELECT
    -- 被叫 uid
    s_1.called_uid,

    -- 黑名单用户拨打经纪人电话数
    COUNT(
      CASE
        WHEN s_1.is_harass = 1
          THEN s_1.id
      END
    ) AS member_call_broker_blacklist_num
  FROM
    db_sync.angejia__call_log AS s_1
  WHERE
    to_date(s_1.start_at) = ${dealDate}

    AND s_1.call_type = 2

  GROUP BY
    s_1.called_uid
) AS member_call_broker_info
ON
  bs.user_id = member_call_broker_info.called_uid

WHERE
  bs.p_dt = ${dealDate}
AND
  -- 在职
  bs.broker_duty_status_id = 2
AND
  bs.broker_city_id <> 3

;


export hive dw_temp_angejia.jason_broker_call_daily_info to mysql dw_temp_angejia.jason_broker_call_daily_info;

```
