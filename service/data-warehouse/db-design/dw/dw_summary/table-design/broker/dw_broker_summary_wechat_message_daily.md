# dw_broker_summary_wechat_message_daily 经纪人微聊信息日表

## 字段
``` sql

broker_id                   bigint  经纪人ID
customer_info_radices       bigint  用户发送消息数
reply_by_broker_5min        bigint  5分钟回复数
reply_by_broker_5min_rate   double  5分钟回复率
reply_by_broker_day         bigint  当日回复数
reply_by_broker_day_rate    double  当日回复率
received_wechat_info_daily  bigint  每日收到消息数
reply_wechat_info_daily     bigint  每日回复消息数
avg_reply_time              double  平均回复时长
cal_dt                      string  统计日期
```


## HQL
``` sql

--- 经纪人微聊相关 start ---

--微聊基础信息表 汇总每天的微聊信息 剔除无效信息 --
drop table if exists dw_temp_angejia.dw_mobile_chat_msg_info_daily;

create table dw_temp_angejia.dw_mobile_chat_msg_info_daily
as
select
a.msg_id as msg_id,
b.value_desc as msg_type,
a.from_uid as sender_id,
a.to_uid as receiver_id,
c.value_desc as msg_status,
a.created_at as create_time,
a.updated_at as last_update,
to_date(a.created_at) as cal_dt
from
  db_sync.angejia__user_msg a
left join dw_db.dw_basis_common_data_dictionary b
  on a.content_type =b.value_code
left join dw_db.dw_basis_common_data_dictionary c
  on a.`status`=c.value_code
where a.from_uid not in (0,3,4)
  and a.to_uid not in (0,3,4)
  and a.content_type not in (5,106)
  and a.created_at >= '2015-04-09 15:00:00'
  and b.column_name = 'content_type'
  and c.column_name = 'status';

--用户发送消息临时表 --
drop table
if exists dw_temp_angejia.customer_send_info;

create table dw_temp_angejia.customer_send_info
as
select
a.cal_dt,
concat(sender_id, "/", receiver_id) as wechat_customer,
a.sender_id as user_id,
a.receiver_id as broker_id,
min(a.create_time) as user_send_time
from
  dw_temp_angejia.dw_mobile_chat_msg_info_daily a
join db_sync.angejia__user b
  on a.receiver_id = b.user_id
where b.user_type = 2
  and hour(a.create_time) between '9' and '22'
group by a.cal_dt,
         a.receiver_id,
         a.sender_id,
         concat(sender_id, "/", receiver_id);

--经纪人回复消息临时表 --
drop table if exists dw_temp_angejia.broker_reply_info;

create table dw_temp_angejia.broker_reply_info
as
select
a.cal_dt,
concat(receiver_id,"/",sender_id) as wechat_broker_reply,
a.receiver_id as user_id,
a.sender_id as broker_id,
a.create_time as broker_reply_time
from dw_temp_angejia.dw_mobile_chat_msg_info_daily a
join db_sync.angejia__user b
  on a.receiver_id = b.user_id
where b.user_type = 1
  and hour(a.create_time) between '9' and '22'
group by a.receiver_id,
         a.sender_id,
         a.cal_dt,
         concat(receiver_id,"/",sender_id),
         a.create_time;

--汇总消息临时表 --
drop table if exists dw_temp_angejia.wechat_info_total;

create table dw_temp_angejia.wechat_info_total
as
select a.cal_dt,
a.broker_id,
a.wechat_customer,
b.wechat_broker_reply,
a.user_send_time,
min(b.broker_reply_time) as broker_reply_time
from dw_temp_angejia.customer_send_info a
left join dw_temp_angejia.broker_reply_info b
  on a.wechat_customer = b.wechat_broker_reply
where a.user_send_time < b.broker_reply_time
  and a.cal_dt = b.cal_dt
group by a.cal_dt,
         a.broker_id,
         a.wechat_customer,
         b.wechat_broker_reply,
         a.user_send_time;

--计算5min回复率,当日回复率,平均回复时长 --
drop table if exists dw_temp_angejia.wechat_effect_info_5min_tmp;

create table dw_temp_angejia.wechat_effect_info_5min_tmp
as
select
broker_id,
count(distinct wechat_customer) as customer_info_radices,

count(distinct case when ((unix_timestamp(broker_reply_time)-unix_timestamp(user_send_time))<=300) = true then wechat_broker_reply end) as reply_by_broker_5min,
round(count(distinct case when ((unix_timestamp(broker_reply_time)-unix_timestamp(user_send_time))<=300) = true then wechat_broker_reply end)/count(distinct wechat_customer),2)*100 as reply_by_broker_5min_rate,
count(distinct case when wechat_broker_reply is not null then wechat_broker_reply end) as reply_by_broker_day,
round(count(distinct case when wechat_broker_reply is not null then wechat_broker_reply end)/count(distinct wechat_customer),2)*100 as reply_by_broker_day_rate,
coalesce(round(avg(case when wechat_broker_reply is not null then (unix_timestamp(broker_reply_time)-unix_timestamp(user_send_time))/60 end),2),0) as avg_reply_time,
cal_dt
from dw_temp_angejia.wechat_info_total
group by broker_id,cal_dt;

--计算当日用户发送消息临时表 --
drop table
if exists dw_temp_angejia.customer_send_info_day;

create table dw_temp_angejia.customer_send_info_day
as
select
a.cal_dt,
concat(sender_id, "/", receiver_id) as wechat_customer,
a.sender_id as user_id,
a.receiver_id as broker_id,
min(a.create_time) as user_send_time
from
  dw_temp_angejia.dw_mobile_chat_msg_info_daily a
join db_sync.angejia__user b
  on a.receiver_id = b.user_id
where b.user_type = 2
group by a.cal_dt,
         a.receiver_id,
         a.sender_id,
         concat(sender_id, "/", receiver_id);

--经纪人当日回复消息临时表 --
drop table if exists dw_temp_angejia.broker_reply_info_day;

create table dw_temp_angejia.broker_reply_info_day
as
select
a.cal_dt,
concat(receiver_id,"/",sender_id) as wechat_broker_reply,
a.receiver_id as user_id,
a.sender_id as broker_id,
a.create_time as broker_reply_time
from dw_temp_angejia.dw_mobile_chat_msg_info_daily a
join db_sync.angejia__user b
  on a.receiver_id = b.user_id
where b.user_type = 1
group by a.receiver_id,
         a.sender_id,
         a.cal_dt,
         concat(receiver_id,"/",sender_id),
         a.create_time;


--当日汇总消息临时表 --
drop table if exists dw_temp_angejia.wechat_info_total_day;

create table dw_temp_angejia.wechat_info_total_day
as
select a.cal_dt,
a.broker_id,
a.wechat_customer,
b.wechat_broker_reply,
a.user_send_time,
min(b.broker_reply_time) as broker_reply_time
from dw_temp_angejia.customer_send_info_day a
left join dw_temp_angejia.broker_reply_info_day b
  on a.wechat_customer = b.wechat_broker_reply
where a.user_send_time < b.broker_reply_time
  and a.cal_dt = b.cal_dt
group by a.cal_dt,
         a.broker_id,
         a.wechat_customer,
         b.wechat_broker_reply,
         a.user_send_time;

--计算当日微聊消息指标 --
drop table if exists dw_temp_angejia.wechat_effect_info_day_tmp;

create table dw_temp_angejia.wechat_effect_info_day_tmp
as
select
broker_id,
count(wechat_customer) as received_wechat_info_daily,
count(wechat_broker_reply) as reply_wechat_info_daily,
cal_dt
from dw_temp_angejia.wechat_info_total_day
group by broker_id,cal_dt;


--合并临时表指标 --
drop table if exists dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily;

create table dw_temp_angejia.eric_dw_broker_summary_wechat_message_daily
as
select  
 a.broker_id
,a.customer_info_radices
,a.reply_by_broker_5min
,a.reply_by_broker_5min_rate
,a.reply_by_broker_day
,a.reply_by_broker_day_rate
,b.received_wechat_info_daily
,b.reply_wechat_info_daily
,a.avg_reply_time
,a.cal_dt
from dw_temp_angejia.wechat_effect_info_5min_tmp a
inner join dw_temp_angejia.wechat_effect_info_day_tmp b
  on a.broker_id = b.broker_id
 and a.cal_dt = b.cal_dt;

 --- 经纪人微聊相关 end ---

```
