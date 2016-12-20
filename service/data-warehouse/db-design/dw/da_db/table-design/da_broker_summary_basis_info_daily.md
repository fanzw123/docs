# da_broker_summary_basis_info_daily 提供给业务使用的经纪人日表

## 在用字段

``` sql
`user_id`
`broker_name`
`broker_on_duty_date`
`app_name`
`visit_dkl`
`survey_skfys`
`visit_avg_jj`
`point_day`
`demand_customer_num`
`demand_customer_sk_num`
`inventory_all`
`msg_receive_people`
`msg_five_reply_people`
`inventory_sham_num`
`broker_info_full_status`
`call_daily_people_num`
`broker_laidian_genjin_num`
`working_hours`
`broker_laidian_num`
`broker_laidian_genjin_rate`
`followup_fygjl_qc`
`followup_khgjl_distinct`
`broker_team_id`
`broker_evaluate_day`
`broker_duty_status_id`
`demand_customer_added_sk_num`
`inventory_survey_quality_day_num`
`visit_customer_evaluate_num_day`
`new_exclusive_amount`
`p_dt`

```

## 字段说明

- [查看](service/data-warehouse/db-design/dw/dw_db/table-design/dw_summary_broker_basis_info_daily.md)


## HQL

- [da_broker_summary_basis_info_daily](http://git.corp.angejia.com/dw/dw_sql/tree/master/broker/da_broker_summary_basis_info_daily.sql)


## 处理

``` sql

-- 上线备份流程
./table-online-process.sh source_table=da_db.da_broker_summary_basis_info_daily run_date=20150812 add_fields= table_type=1 partition_field=p_dt source_db_type=dw


-- hive
drop table da_db.da_broker_summary_basis_info_daily;


-- mysql 改名老的
da_db.da_broker_summary_basis_info_daily







```
