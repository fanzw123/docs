# dw_broker_summary_agent_info 经纪人中心表

## * 注意事项
本组织结构 2015-07-17 弃用

新的组织结构,2015-07-17 开始使用 : [dw_broker_summary_organization_info.md](dw_broker_summary_organization_info)

## 字段
``` sql

broker_id  '经纪人 id'
agent_name '中心名称',
company_name '中心公司名称',
label_name '标签名称',
agent_id '中心ID',
company_id '公司ID',
agent_type_id '中心类型ID'
agent_type_name '经纪人中心类型名称'

```

## HQL

依赖
- db_sync.angejia__broker 经纪人基础信息
- db_sync.angejia__company 公司
- db_sync.angejia__agent  中心
- db_sync.angejia__broker_label 中心组标签

``` sql
--- 经纪人中心表 strat ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_agent_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_agent_info (
  broker_id string,
  agent_name string,
  company_name string,
  label_name string,
  agent_id string,
  company_id string,
  agent_type_id string,
  agent_type_name string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_agent_info
SELECT
  bs.user_id AS broker_id,
  agent.name AS agent_name,
  company.name AS company_name,
  ds_broker_label.name as label_name,
  agent.id AS agent_id,
  company.id,

  agent.type AS agent_type_id,

  CASE
    WHEN agent.type = '1'
      THEN '直营中心'
    WHEN agent.type = '2'
      THEN '合作中心'
  END AS agent_type_name

FROM
  db_sync.angejia__broker AS bs
LEFT JOIN
  db_sync.angejia__agent AS agent
ON
  bs.agent_id = agent.id
LEFT JOIN
  db_sync.angejia__company AS company
ON
  agent.company_id = company.id
LEFT JOIN
  db_sync.angejia__broker_label AS ds_broker_label
ON
  bs.label_id = ds_broker_label.id
;
--- 经纪人中心表 end ---
```
