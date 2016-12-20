# dw_broker_summary_exclusive_amount_info 经纪人独家量

## 字段
``` sql

broker_id '经纪人 id'

new_exclusive_amount '新增独家量（或签赔或笋盘）'

```

## HQL
``` sql

--- 经纪人独享相关 START ---
drop table if exists dw_temp_angejia.swan_dw_broker_summary_exclusive_amount_info;
create table if not exists dw_temp_angejia.swan_dw_broker_summary_exclusive_amount_info (
    broker_id string,
    new_exclusive_amount string
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.swan_dw_broker_summary_exclusive_amount_info
select
  t.broker_uid AS broker_id,
  count(DISTINCT t.inventory_id) AS new_exclusive_amount
from (
  select a.inventory_id,a.creator_uid as broker_uid
  from db_sync.angejia__bamboo_plate a
  join dw_db.dw_cal b
  where a.status=3
  and to_date(a.reviewed_at)<=${dealDate}
  and to_date(a.reviewed_at)>=b.month_beg_dt

  union all

  select a.id AS inventory_id,a.exclusive_broker_uid as broker_uid
  from db_gather.property__inventory a
  join dw_db.dw_cal b
  where a.exclusive_broker_uid<>0
  and a.p_dt>=b.month_beg_dt
  and a.p_dt<=${dealDate}
  group by a.id,a.exclusive_broker_uid
) AS t

group by
  t.broker_uid,
  t.inventory_id
;
--- 经纪人独享相关 END ---

```
