# dw_broker_summary_organization_info 经纪人组织架构信息

## 字段

``` sql

broker_id '经纪人 id'

-- level 1
broker_company_id '经纪人公司 id'

broker_company_name '经纪人公司 name'

-- level 3
broker_agent_id '经纪人中心 id'

broker_agent_name '经纪人中心 name'

-- level 5
broker_team_id '经纪人组 id'

broker_team_name '经纪人组 name'

-- 其他
broker_agent_type_id '中心 type_id'

broker_agent_type_name '中心 type_name'

```


### HQL

依赖
- dw_temp_angejia.jason_dw_broker_summary_agent_info 经纪人中心组织架构表（老版）
- db_sync.property__agent_team
- db_sync.property__agent_team_broker

``` sql

--- 经纪人组织架构信息 start --

-- 经纪人组织架构
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_organization_info_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_organization_info_tmp AS
SELECT
  t_1.id AS team_id,
  t_1.name AS team_name,
  t_2.id AS agent_id,
  t_2.name AS agent_name,
  t_3.id AS company_id,
  t_3.name AS company_name

-- 获取组，这是最细力度
FROM (
  SELECT
    s_1.id,
    s_1.name,
    s_1.parent_team_id,
    s_1.level
  FROM
    db_sync.property__agent_team AS s_1
  WHERE
    s_1.deleted_at = 'null'
      AND
    s_1.level = 5
) AS t_1

-- 获取中心
LEFT JOIN (
  SELECT
    s_2.id,
    s_2.parent_team_id,
    s_2.name,
    s_2.level
  FROM
    db_sync.property__agent_team AS s_2
  WHERE
    s_2.deleted_at = 'null'
      AND
    s_2.level = 3
) AS t_2
ON
  t_1.parent_team_id = t_2.id

-- 获取公司
LEFT JOIN (
  SELECT
    s_3.id,
    s_3.parent_team_id,
    s_3.name,
    s_3.level
  FROM
    db_sync.property__agent_team AS s_3
  WHERE
    s_3.deleted_at = 'null'
      AND
    s_3.level = 1
) AS t_3
ON
  t_2.parent_team_id = t_3.id
;

-- 本公司直营组织结构
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_organization_info_new;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_organization_info_new (
  broker_id STRING,
  broker_team_id STRING,
  broker_team_name STRING,
  broker_agent_id STRING,
  broker_agent_name STRING,
  broker_company_id STRING,
  broker_company_name STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_organization_info_new
SELECT
  bs.user_id,
  t_1.team_id,
  t_1.team_name,
  t_1.agent_id,
  t_1.agent_name,
  t_1.company_id,
  t_1.company_name
FROM
  db_sync.property__agent_team_broker AS bs
LEFT JOIN
  dw_temp_angejia.jason_dw_broker_summary_organization_info_tmp AS t_1
ON
  bs.team_id = t_1.team_id
WHERE
  bs.deleted_at = 'null'
;


-- 组合新、老 组织架构数据
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_organization_info;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_organization_info (
  broker_id STRING,
  broker_team_id STRING,
  broker_team_name STRING,
  broker_agent_id STRING,
  broker_agent_name STRING,
  broker_company_id STRING,
  broker_company_name STRING,
  broker_agent_type_id STRING,
  broker_agent_type_name STRING
);
INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_organization_info
SELECT
  COALESCE(t_2.broker_id,t_1.broker_id) AS broker_id,

  COALESCE(t_2.broker_team_id,'0') AS broker_team_id,
  COALESCE(t_2.broker_team_name,t_1.label_name) AS broker_team_name,

  COALESCE(t_2.broker_agent_id,t_1.agent_id) AS broker_agent_id,
  COALESCE(t_2.broker_agent_name,t_1.agent_name) AS broker_agent_name,

  COALESCE(t_2.broker_company_id,t_1.company_id) AS broker_company_id,
  COALESCE(t_2.broker_company_name,t_1.company_name) AS broker_company_name,

  -- 中心 type 类型
  CASE
    WHEN t_2.broker_id IS NOT NULL
      THEN
        '1' -- 表示直营中心
      ELSE
        t_1.agent_type_id
  END AS broker_agent_type_id,

  CASE
    WHEN t_2.broker_id IS NOT NULL
      THEN
        '直营中心'
      ELSE
        t_1.agent_type_name
  END AS broker_agent_type_name

-- 老版本组织架构数据,逐渐停用(等业务关闭业务系统后),目前会继续给(非公司直营)使用
FROM
  dw_temp_angejia.jason_dw_broker_summary_agent_info AS t_1

-- 新版组织架构
FULL JOIN
  dw_temp_angejia.jason_dw_broker_summary_organization_info_new AS t_2
ON
  t_1.broker_id = t_2.broker_id
;
--- 经纪人组织架构信息 end --

```


### 上线事项

#### 1、分析表

老的中心组织架构
- angejia.agent
- angejia.company
- angejia.broker_label

使用新的组织架构
- property.agent_team  组织中心表
  ``` sql
    name '组织名称'
    parent_team_id '父级组织 id'
    level '组织级别 1公司 2大区(保留，暂不使用) 3中心 4卫星门店(保留，暂不使用) 5组'
  ```
- property.agent_team_broker 组织中心与经纪人关系表
  ``` sql
    user_id '经纪人 id'
    team_id '所属组织 id'
  ```
