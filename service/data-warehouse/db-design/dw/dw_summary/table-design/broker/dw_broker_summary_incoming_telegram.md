# dw_broker_summary_incoming_telegram 经纪人来电跟进量

## 字段
``` sql

broker_id '经纪人 id'

broker_laidian_num string '来电量 去重',

broker_laidian_genjin_num string '来电跟进量 去重',

broker_laidian_genjin_rate string '来电跟进率 = 来电跟进量/来电量'

```

## HQL


依赖
- db_sync.angejia__call_broker_contacts

``` sql

--- 经纪人来电跟进量 start ---
-- 所有来电记录
drop table if exists dw_temp_angejia.swan_call_list_type;
create table dw_temp_angejia.swan_call_list_type as
select
  user_phone,
  broker_uid,
  max(type) as type
from
  db_sync.angejia__call_broker_contacts
where
  -- 0-不是私客  1-标记私客
  is_private_guest = 0
    and
  to_date(created_at) = ${dealDate}
group by
  user_phone,
  broker_uid
;

-- summary-1
DROP TABLE IF EXISTS dw_temp_angejia.swan_call_list_type_summary_1;
CREATE TABLE IF NOT EXISTS  dw_temp_angejia.swan_call_list_type_summary_1 AS
select
  broker_uid,
  coalesce(
    count(
      distinct user_phone
    ),0) as call,
  -- 经纪人做过标记的用户电话
  coalesce(
    count(
      distinct
      case
        when
          type <> 0
        then
          user_phone
      end
    ),0) as genjin_mark
from
  dw_temp_angejia.swan_call_list_type
group by
  broker_uid
;

-- summary-2
DROP TABLE IF EXISTS dw_temp_angejia.swan_call_list_type_summary_2;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.swan_call_list_type_summary_2 AS
select
  a.broker_uid,
  -- 被经纪人路过需求的电话
  coalesce(
    count(
      distinct b.buyer_uid
    ),0) as demand
from
  dw_temp_angejia.swan_call_list_type a
left outer join
  db_sync.angejia__demand b
    on
  a.user_phone = b.mark_phone
    and
  a.broker_uid = b.broker_uid
where
  a.type = 0
group by
  a.broker_uid
;

-- 计算临时结果
DROP TABLE IF EXISTS dw_temp_angejia.swan_call_list_type_result_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.swan_call_list_type_result_tmp AS
SELECT
  t.broker_uid,

  t.call,   -- 来电量

  (coalesce(t.genjin_mark,0) + coalesce(y.demand,0)) as genjin   -- 来电跟进量

-- summary-1
FROM
  dw_temp_angejia.swan_call_list_type_summary_1 AS t

-- summary-2
LEFT OUTER JOIN
  dw_temp_angejia.swan_call_list_type_summary_2 AS y

ON
  t.broker_uid = y.broker_uid
;

-- 写入结果
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_incoming_telegram;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_incoming_telegram (
  broker_id string,
  broker_laidian_num string,
  broker_laidian_genjin_num string,
  broker_laidian_genjin_rate string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_incoming_telegram
SELECT
  broker_uid,
  call, -- 来电量 去重
  genjin, -- 来电跟进量 去重
  ROUND(genjin / call,3) as broker_laidian_genjin_rate -- 来电跟进率
FROM
  dw_temp_angejia.swan_call_list_type_result_tmp
;
--- 经纪人来电跟进量 end ---

```
