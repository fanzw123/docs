# da_broker_summary_basis_info_daily 提供给业务使用的经纪人日表

## 字段
- [文档](service/data-warehouse/db-design/dw/dw_db/table-design/dw_summary_broker_basis_info_daily.md)

## 数据逻辑


### HQL 部分
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

  broker_laidian_genjin_rate

FROM
  dw_db.dw_summary_broker_basis_info_daily
WHERE
  p_dt = ${dealDate}
;


--- 存储过程 end ---

-- 导出到 mysql 供业务拉取
export hive da_db.da_broker_summary_basis_info_daily
to mysql da_db.da_broker_summary_basis_info_daily PARTITION p_dt;

```


### mysql

``` sql

USE da_db;
CREATE TABLE `da_broker_summary_basis_info_daily` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` varchar(255) NOT NULL DEFAULT '',
  `broker_name` varchar(255) NOT NULL DEFAULT '',
  `broker_on_duty_date` varchar(255) NOT NULL DEFAULT '',
  `broker_status` varchar(255) NOT NULL DEFAULT '',
  `broker_city_name` varchar(255) NOT NULL DEFAULT '',
  `agent_name` varchar(255) NOT NULL DEFAULT '',
  `agent_company_name` varchar(255) NOT NULL DEFAULT '',
  `broker_label_name` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `app_name` varchar(255) NOT NULL DEFAULT '',
  `call_jt_and_wjt` varchar(255) NOT NULL DEFAULT '',
  `call_jt` varchar(255) NOT NULL DEFAULT '',
  `call_jtr` varchar(255) NOT NULL DEFAULT '',
  `visit_dkl` varchar(255) NOT NULL DEFAULT '',
  `visit_fq_dkl` varchar(255) NOT NULL DEFAULT '',
  `followup_fdgjl` varchar(255) NOT NULL DEFAULT '',
  `followup_khgjl` varchar(255) NOT NULL DEFAULT '',
  `survey_skfys` varchar(255) NOT NULL DEFAULT '',
  `visit_avg_jj` varchar(255) NOT NULL DEFAULT '',
  `point_sy` varchar(255) NOT NULL DEFAULT '',
  `point_day` varchar(255) NOT NULL DEFAULT '',
  `demand_customer_num` varchar(255) NOT NULL DEFAULT '',
  `demand_customer_sk_num` varchar(255) NOT NULL DEFAULT '',
  `inventory_sp` varchar(255) NOT NULL DEFAULT '',
  `inventory_all` varchar(255) NOT NULL DEFAULT '',
  `inventory_followup_fygjl` varchar(255) NOT NULL DEFAULT '',
  `black_house` varchar(255) NOT NULL DEFAULT '',
  `msg_receive_people` varchar(255) NOT NULL DEFAULT '',
  `msg_five_reply_people` varchar(255) NOT NULL DEFAULT '',
  `msg_day_reply_people` varchar(255) NOT NULL DEFAULT '',
  `msg_avg_reply_time` varchar(255) NOT NULL DEFAULT '',
  `msg_received_wechat_info_daily` varchar(255) NOT NULL DEFAULT '',
  `msg_reply_wechat_info_daily` varchar(255) NOT NULL DEFAULT '',
  `inventory_sham_num` varchar(255) NOT NULL DEFAULT '',
  `broker_info_full_status` varchar(255) NOT NULL DEFAULT '',
  `broker_has_leader` varchar(255) NOT NULL DEFAULT '',
  `call_daily_num` varchar(255) NOT NULL DEFAULT '',
  `call_daily_people_num` varchar(255) NOT NULL DEFAULT '',
  `broker_laidian_genjin_num` varchar(255) NOT NULL DEFAULT '',
  `working_hours` varchar(255) NOT NULL DEFAULT '',
  `broker_laidian_num` varchar(255) NOT NULL DEFAULT '',
  `broker_laidian_genjin_rate` varchar(255) NOT NULL DEFAULT '',
  `p_dt` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY idx_user_id(user_id(10)),
  KEY `idx_p_dt` (`p_dt`(10))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='经纪人日表';
```
