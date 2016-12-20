# dw_broker_sd 经纪人日报表

## * 注意事项

``` sql
1、经纪人组织架构从 2015-07-17 切换到新的组织架构系统,分析师们请注意

2、broker_has_leader 字段  2015-08-03 开始弃用
  使用新的逻辑字段
  broker_type_id
  broker_type_name

 3、新增独家量（或签赔或笋盘） 暂不使用

```

## * 字段说明
``` sql

user_id '经纪人ID',

-- dw_temp_angejia.jason_dw_broker_summary_basis
broker_name  '经纪人名称',

broker_on_duty_date  '经纪人入职日期',

broker_status  '经纪人在职状态',

broker_city_name  '经纪人所在城市',

-- dw_temp_angejia.jason_dw_broker_summary_organization_info
agent_name  '中心名称',

agent_company_name  '中心公司名称',

broker_label_name  '经纪人组名称',

-- dw_temp_angejia.jason_dw_broker_summary_basis
phone  '经纪人电话号码',

-- dw_temp_angejia.jason_dw_user_summary_app_info
app_name  '登录的app名称',

-- dw_temp_angejia.jason_dw_broker_summary_call_info
call_jt_and_wjt  '接通和未接通数',

call_jt  '接通时长大于0数',

call_jtr  '未接通',

-- dw_temp_angejia.jason_dw_broker_summary_visit_info
visit_dkl  '带看量',

visit_fq_dkl  '发起带看量',

-- dw_temp_angejia.jason_dw_broker_summary_followup_info
followup_fdgjl  '房东跟进量',

followup_khgjl  '经纪人客户跟进量',

-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
survey_skfys  '当日实堪房源数',

-- dw_temp_angejia.jason_dw_broker_summary_service_info
visit_avg_jj  '今日历史上累计评价平均分',

point_sy  '当月被扣服务分',

point_day  '当天被扣服务分',

-- dw_temp_angejia.jason_dw_broker_summary_demand_info
demand_customer_num  '当日录入客户数',

demand_customer_sk_num  '所有私客数',

-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
inventory_sp  '总私盘房源量',

inventory_all  '当天录入房源量',

inventory_followup_fygjl string '房源跟进量'

-- dw_temp_angejia.jason_dw_broker_summary_service_info
black_house  '是否被关小黑屋',

-- dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily
msg_receive_people '收到微聊人数(09:00-22:00)',

msg_five_reply_people '5分内回复微聊人数(09:00-22:00)',

msg_day_reply_people '当天回复人数(09:00-22:00)',

msg_avg_reply_time '平均回复时间(09:00-22:00)',

-- 20150605 新增字段
-- dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily
msg_received_wechat_info_daily '每日收到的微聊人（全天，之前仅白天）'

msg_reply_wechat_info_daily '每日回复的微聊人数（全天，之前仅白天'

-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
inventory_sham_num '当日虚假房源数'

-- dw_temp_angejia.jason_dw_broker_summary_basis
broker_info_full_status  '经纪人信息是否填写完善'

broker_has_leader '是否是leader (2015-08-03 开始废弃)'

-- dw_temp_angejia.jason_dw_broker_summary_call_info
call_daily_num '每日拨出电话数'

call_daily_people_num '每日拨出电话人,去重'

-- dw_temp_angejia.jason_dw_broker_summary_incoming_telegram
broker_laidian_genjin_num '经纪人来电跟进量'

-- dw_db_temp.ray_broker_working_hours_temp
working_hours '工作时长'

-- 20150609 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_incoming_telegram
broker_laidian_num '来电量 去重'

broker_laidian_genjin_rate '来电跟进率'

-- 20150612 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
inventory_all_num '所有来源(房东委托,经纪人发房)录入真实房源数'

inventory_survey_all_num '所有实堪房源数'

-- dw_temp_angejia.jason_dw_broker_summary_request_visit
broker_pv_home_day '经纪人主页日PV'

-- 20150618 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_basis
broker_duty_status_id '经纪人在职状态id (1:待入职,2:在职,3:取消入职,4离职)'


broker_city_id '经纪人城市ID'

-- dw_temp_angejia.jason_dw_broker_summary_organization_info
agent_id '中心ID'

company_id '公司ID'

-- 20150624 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_organization_info
agent_type_id '中心类型ID'

agent_type_name '经纪人中心类型名称'

-- 20150629 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_followup_info
followup_fygjl_qc '房源跟进量,去重'

-- 20150701 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_followup_info
followup_fdgjl_distinct '房东跟进量,去重',

followup_khgjl_distinct '经纪人客户跟进量,去重',

-- dw_temp_angejia.jason_dw_broker_summary_service_info
broker_evaluate_day '经纪人服务评价量',

broker_evaluate_distinct_day '经纪人服务评价量,去重'

-- 20150706 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_request_visit
broker_uv_home_day '经纪人主页日UV'

-- 20150717 新增字段
broker_team_id '经纪人组 id'


-- 20150805 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_basis
broker_type_id '经纪人类型 id (0:空,1:直营经纪人,2:合伙经纪人,3:部经理,9:其他)'

broker_type_name '经纪人类型 name'


-- 20150810 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_demand_info
demand_customer_added_sk_num '当日新增私客量 (不包括公客拉私)'

-- dw_temp_angejia.jason_dw_broker_summary_inventory_info
inventory_survey_quality_day_num '当日优质实勘房源量(高清大图或精装大图)'

-- dw_temp_angejia.jason_dw_broker_summary_trajectory_info
broker_track_ln '经纪人活动经纬度信息'


-- 20150811 新增字段
-- dw_temp_angejia.jason_dw_broker_summary_service_info
visit_customer_evaluate_num_day '带看客户好评量，当日'

-- 20150812
new_exclusive_amount '新增独家量（或签赔或笋盘）'

-- 当天打开app次数
open_app_num string '当天打开app次数'

-- 当天打开app时长
open_app_time_long string '当天打开app时长'

-- 分区字段
p_dt string '日期分区字段'

```



## HQL
- [broker summary 指标运算逻辑](service/data-warehouse/db-design/dw/dw_summary/table-design/broker/)
- [dw_broker_summary_basis_info_daily.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/broker/dw_broker_summary_basis_info_daily.sql)
- [dw_broker_summary_info_daily.sql](http://git.corp.angejia.com/dw/dw_sql/blob/master/broker/dw_broker_summary_info_daily.sql)


## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 添加表字段流程（会备份源数据）
 ./hive-copy-and-create-fields.sh source_table=dw_db.dw_broker_summary_basis_info_daily run_date=20150812 add_fields=new_exclusive_amount table_type=1 partition_field=p_dt source_db_type=dw

 -- （直接拷贝表）
 ./hive-copy-table.sh source_table=dw_db.dw_broker_summary_basis_info_daily target_table=test.dw_broker_summary_basis_info_daily table_type=1 partition_field=p_dt


 -- 刷新表指定表，指定字段，指定日期的，历史数据（只重新计算需要刷新的字段）
 ./hive-rerun-table.sh \
reset_db_table=test.dw_broker_summary_basis_info_daily \
reset_date=20150808  \
extend_sql_file=/home/dwadmin/test/jason/aaa.sql \
reset_table_alias=bs_info \
map_fields=broker_type_id-t_1.broker_type_id,broker_type_name-t_1.broker_type_name,demand_customer_added_sk_num-t_2.num,inventory_survey_quality_day_num-t_3.num \
is_delete_partition=1 \
is_use_reset_date_where=1 \
is_debug=1


-- 重跑
./reset-run.sh "/home/dwadmin/app/uba/scripts/shell/aux/hive-rerun-table.sh reset_db_table=dw_db.dw_broker_summary_basis_info_daily  reset_date={date} extend_sql_file=/data/log/test/reset-hql/broker_20150810.sql reset_table_alias=bs_info map_fields=broker_type_id-t_1.broker_type_id,broker_type_name-t_1.broker_type_name,demand_customer_added_sk_num-t_2.num,inventory_survey_quality_day_num-t_3.num is_delete_partition=0 is_use_reset_date_where=1 is_debug=0"  20150801 20150809



MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_summary_broker_basis_info_daily_20150717
  LIKE
    dw_summary_broker_basis_info_daily;

  INSERT INTO
    dw_summary_broker_basis_info_daily_20150717
  SELECT
    *
  FROM
    dw_summary_broker_basis_info_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_summary_broker_basis_info_daily;
  select count(*) from dw_db.dw_summary_broker_basis_info_daily_20150717;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_summary_broker_basis_info_daily
  ADD COLUMNS(
    broker_team_id STRING COMMENT '20150717 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_summary_broker_basis_info_daily
  ADD
    broker_team_id varchar(255) NOT NULL DEFAULT '' AFTER broker_uv_home_day
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_summary_broker_basis_info_daily
  DROP PARTITION (
    p_dt = '2015-07-16'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_summary_broker_basis_info_daily
  WHERE
    p_dt = '2015-07-16'



```
