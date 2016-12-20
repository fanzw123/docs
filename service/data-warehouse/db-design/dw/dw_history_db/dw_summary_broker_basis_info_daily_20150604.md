# dw_db_broker_basis_info_daily 经纪人日报表

## 字段
```

```

## HQL

依赖
- dw_summary.dw_summary_broker_basis
- dw_summary.dw_summary_broker_agent_info
- dw_summary.dw_summary_broker_call_info
- dw_summary.dw_summary_broker_demand_info
- dw_summary.dw_summary_broker_followup_info
- dw_summary.dw_summary_broker_incoming_telegram
- dw_summary.dw_summary_broker_inventory_info
- dw_summary.dw_summary_broker_msg
- dw_summary.dw_summary_broker_service_info
- dw_summary.dw_summary_broker_visit_info
- dw_summary.dw_summary_user_app_info


```

CREATE TABLE IF NOT EXISTS dw_db.dw_db_broker_basis_info_daily (
  user_id string,
  broker_name string,
  broker_on_duty_date string,
  broker_status string,

  broker_city_name string,
  agent_name string,
  agent_company_name string,
  broker_label_name string,

  phone string,
  app_name string,
  call_jt_and_wjt string,
  call_jt string,
  call_jtr string,
  visit_dkl string,
  visit_fq_dkl string,
  followup_fdgjl string,
  followup_khgjl string,
  survey_skfys string,
  visit_avg_jj string,
  point_sy string,
  point_day string,
  demand_customer_num string,
  demand_customer_sk_num string,
  inventory_sp string,
  inventory_all string,
  inventory_followup_fygjl string,
  black_house string,

  msg_receive_people string,
  msg_five_reply_people string,
  msg_day_reply_people string,
  msg_avg_reply_time string,


  inventory_sham_num string,
  broker_info_full_status string,
  broker_has_leader string,
  call_daily_num string,
  call_daily_people_num string,
  broker_laidian_genjin_num string

) partitioned by (p_dt string)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
COLLECTION ITEMS TERMINATED BY '\n';


INSERT OVERWRITE TABLE
  dw_db.dw_db_broker_basis_info_daily

partition(
  p_dt = ${dealDate}
)


SELECT
  bs.user_id,
  ds_broker_basis.broker_name,
  ds_broker_basis.broker_on_duty_date,
  ds_broker_basis.broker_duty_status,
  ds_broker_basis.broker_city_name,
  ds_broker_agent_info.agent_name,
  ds_broker_agent_info.company_name,
  ds_broker_agent_info.label_name,
  ds_broker_basis.broker_phone,

  COALESCE(ds_user_app_info.app_name,''),

  ds_broker_call_info.call_jt_and_wjt,
  ds_broker_call_info.call_jt,
  ds_broker_call_info.call_wjt,

  COALESCE(ds_broker_visit_info.visit_dkl,0),
  COALESCE(ds_broker_visit_info.visit_fq_dkl,0),

  ds_broker_followup_info.followup_fdgjl,
  ds_broker_followup_info.followup_khgjl,
  ds_broker_inventory_info.inventory_survey_num,

  ds_broker_service_info.history_avg_pj_num ,
  ds_broker_service_info.point_month_deduct_num,
  ds_broker_service_info.point_day_deduct_num,

  ds_broker_demand_info.customer_day_num,
  ds_broker_demand_info.customer_all_sk_num,

  ds_broker_inventory_info.inventory_all_sp_num,
  ds_broker_inventory_info.inventory_day_num,
  ds_broker_followup_info.followup_fygjl,

  ds_broker_service_info.black_house_time,

  COALESCE(ds_summary_broker_msg.msg_receive_people,0),
  COALESCE(ds_summary_broker_msg.msg_five_reply_people,0),
  COALESCE(ds_summary_broker_msg.msg_day_reply_people,0),
  COALESCE(ds_summary_broker_msg.msg_avg_reply_time,0),


  ds_broker_inventory_info.inventory_sham_num,

  ds_broker_basis.broker_info_full_status,
  ds_broker_basis.broker_has_leader,

  ds_broker_call_info.call_daily_num,
  ds_broker_call_info.call_daily_people_num,

  COALESCE(ds_broker_incoming_telegram.broker_laidian_genjin_num,0)

FROM
  db_sync.angejia__broker AS bs

LEFT JOIN
  dw_summary.dw_summary_broker_basis AS ds_broker_basis
ON
  ds_broker_basis.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_basis.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_agent_info AS ds_broker_agent_info
ON
  ds_broker_agent_info.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_agent_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_user_app_info AS ds_user_app_info
ON
  ds_user_app_info.p_dt = ${dealDate}
    AND
  bs.user_id = ds_user_app_info.user_id

LEFT JOIN
  dw_summary.dw_summary_broker_call_info AS ds_broker_call_info
ON
  ds_broker_call_info.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_call_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_visit_info AS ds_broker_visit_info
ON
  ds_broker_visit_info.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_visit_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_followup_info AS ds_broker_followup_info
ON
  ds_broker_followup_info.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_followup_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_service_info AS ds_broker_service_info
ON
  ds_broker_service_info.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_service_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_demand_info AS ds_broker_demand_info
ON
  ds_broker_demand_info.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_demand_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_inventory_info AS ds_broker_inventory_info
ON
  ds_broker_inventory_info.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_inventory_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_msg AS ds_summary_broker_msg
ON
  ds_summary_broker_msg.p_dt = ${dealDate}
    AND
  bs.user_id = ds_summary_broker_msg.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_incoming_telegram AS ds_broker_incoming_telegram
ON
  ds_broker_incoming_telegram.p_dt = ${dealDate}
    AND
  bs.user_id = ds_broker_incoming_telegram.broker_id


WHERE
  bs.user_id NOT IN (0,3,4)
    AND
  bs.city_id <> 3;

```





## HQL 最新结构
```

SELECT
  bs.user_id,

  ds_broker_basis.broker_name,
  ds_broker_basis.broker_on_duty_date,
  ds_broker_basis.broker_duty_status,
  ds_broker_basis.broker_phone,
  ds_broker_basis.broker_city_name,
  ds_broker_basis.broker_info_full_status,
  ds_broker_basis.broker_has_leader,


  ds_broker_agent_info.agent_name,
  ds_broker_agent_info.company_name,
  ds_broker_agent_info.label_name,


  COALESCE(ds_user_app_info.app_name,''),


  ds_broker_call_info.call_jt_and_wjt,
  ds_broker_call_info.call_jt,
  ds_broker_call_info.call_wjt,
  ds_broker_call_info.call_daily_num,
  ds_broker_call_info.call_daily_people_num,


  COALESCE(ds_broker_visit_info.visit_dkl,0),
  COALESCE(ds_broker_visit_info.visit_fq_dkl,0),


  ds_broker_followup_info.followup_fdgjl,
  ds_broker_followup_info.followup_khgjl,
  ds_broker_followup_info.followup_fygjl,


  ds_broker_service_info.history_avg_pj_num ,
  ds_broker_service_info.point_day_deduct_num,
  ds_broker_service_info.point_month_deduct_num,
  ds_broker_service_info.black_house_time,


  ds_broker_demand_info.customer_day_num,
  ds_broker_demand_info.customer_all_sk_num,


  ds_broker_inventory_info.inventory_all_sp_num,
  ds_broker_inventory_info.inventory_day_num,
  ds_broker_inventory_info.inventory_sham_num,
  ds_broker_inventory_info.inventory_survey_num,


  COALESCE(ds_summary_broker_msg.msg_receive_people,0),
  COALESCE(ds_summary_broker_msg.msg_five_reply_people,0),
  COALESCE(ds_summary_broker_msg.msg_day_reply_people,0),
  COALESCE(ds_summary_broker_msg.msg_avg_reply_time,0),


  COALESCE(ds_broker_incoming_telegram.broker_laidian_genjin_num,0)

FROM
  db_sync.angejia__broker AS bs

LEFT JOIN
  dw_summary.dw_summary_broker_basis AS ds_broker_basis
ON
  ds_broker_basis.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_basis.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_agent_info AS ds_broker_agent_info
ON
  ds_broker_agent_info.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_agent_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_user_app_info AS ds_user_app_info
ON
  ds_user_app_info.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_user_app_info.user_id

LEFT JOIN
  dw_summary.dw_summary_broker_call_info AS ds_broker_call_info
ON
  ds_broker_call_info.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_call_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_visit_info AS ds_broker_visit_info
ON
  ds_broker_visit_info.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_visit_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_followup_info AS ds_broker_followup_info
ON
  ds_broker_followup_info.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_followup_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_service_info AS ds_broker_service_info
ON
  ds_broker_service_info.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_service_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_demand_info AS ds_broker_demand_info
ON
  ds_broker_demand_info.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_demand_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_inventory_info AS ds_broker_inventory_info
ON
  ds_broker_inventory_info.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_inventory_info.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_msg AS ds_summary_broker_msg
ON
  ds_summary_broker_msg.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_summary_broker_msg.broker_id


LEFT JOIN
  dw_summary.dw_summary_broker_incoming_telegram AS ds_broker_incoming_telegram
ON
  ds_broker_incoming_telegram.p_dt = '2015-06-01'
    AND
  bs.user_id = ds_broker_incoming_telegram.broker_id


WHERE
  bs.user_id NOT IN (0,3,4)
    AND
  bs.city_id <> 3;

```
