# da_broker_summary_basis_info_daily 提供给业务使用的经纪人日表

## 字段
- [文档](service/data-warehouse/db-design/dw/dw_db/table-design/dw_summary_broker_basis_info_daily.md)


### 1.HQL 部分
``` sql

--- 存储过程 start ---

-- 插入数据
INSERT OVERWRITE TABLE
  da_db.da_broker_summary_basis_info_daily
PARTITION (
  p_dt = ${dealDate}
)
SELECT
  user_id,
  broker_name,
  broker_on_duty_date,
  broker_status,
  broker_city_name,
  agent_name string,
  agent_company_name,
  broker_label_name,
  phone,
  app_name,
  call_jt_and_wjt,
  call_jt,
  call_jtr,
  visit_dkl,
  visit_fq_dkl,
  followup_fdgjl,
  followup_khgjl,
  survey_skfys,
  visit_avg_jj,
  point_sy,
  point_day,
  demand_customer_num,
  demand_customer_sk_num,
  inventory_sp,
  inventory_all,
  inventory_followup_fygjl,
  black_house,
  msg_receive_people,
  msg_five_reply_people,
  msg_day_reply_people,
  msg_avg_reply_time,
  msg_received_wechat_info_daily,
  msg_reply_wechat_info_daily,
  inventory_sham_num,
  broker_info_full_status,
  broker_has_leader,
  call_daily_num,
  call_daily_people_num,
  broker_laidian_genjin_num,
  working_hours,
  broker_laidian_num,
  broker_laidian_genjin_rate,

  -- 20150629 jason add
  followup_fygjl_qc
FROM
  dw_db.dw_summary_broker_basis_info_daily
WHERE
  p_dt = ${dealDate}
;

--- 存储过程 end ---

-- 导出到 mysql
export hive da_db.da_broker_summary_basis_info_daily
to mysql da_db.da_broker_summary_basis_info_daily PARTITION p_dt;

```


## * 上线注意事项

### 1、备份源数据库

``` sql
HIVE
  ./migrate-hive-tabel.sh source_table=da_db.da_broker_summary_basis_info_daily target_table=da_db.da_broker_summary_basis_info_daily_20150629

MYSQL
  USE da_db;
  CREATE TABLE
    da_broker_summary_basis_info_daily_20150629
  LIKE
    da_broker_summary_basis_info_daily;

  INSERT INTO
    da_broker_summary_basis_info_daily_20150629
  SELECT
    *
  FROM
    da_broker_summary_basis_info_daily;
```


### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    da_db.da_broker_summary_basis_info_daily
  ADD COLUMNS(
    followup_fygjl_qc string comment '20150629 jason add'
  );


MYSQL
  USE da_db;
  ALTER TABLE
    da_broker_summary_basis_info_daily
  ADD
    followup_fygjl_qc varchar(255) NOT NULL DEFAULT '' AFTER broker_laidian_genjin_rate COMMENT '20150629 jason add';

```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
MYSQL
  USE da_db;
  DELETE FROM
    da_broker_summary_basis_info_daily
  WHERE
    p_dt = '2015-06-28'

HIVE
  ALTER TABLE
    da_db.da_broker_summary_basis_info_daily
  DROP PARTITION (
    p_dt='2015-06-28'
  );
```
