# dw_broker_summary_basis 经纪人基础信息

### 字段
``` sql
broker_id string comment '经纪人ID',
broker_name string comment '经纪人名称',
broker_on_duty_date string comment '经纪人入职日期',
broker_duty_status string comment '经纪人在职状态',
broker_phone string comment '经纪人电话号码',
broker_city_name string comment '经纪人所在城市'
broker_info_full_status string comment '经纪人信息是否填写完善'
broker_has_leader string comment '是否胜任组长',
broker_duty_status_id '经纪人在职状态id',
broker_city_id '经纪人城市ID'
```

### HQL

依赖表
- db_sync.angejia__broker 经纪人基础信息表
- db_sync.angejia__city   城市表
- db_sync.angejia__user_phone  用户电话表

``` sql

--- 经纪人基础信息 start ---
DROP TABLE IF EXISTS dw_temp_angejia.jason_dw_broker_summary_basis;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_dw_broker_summary_basis (
  broker_id string,
  broker_name string,
  broker_on_duty_date string,
  broker_duty_status string,
  broker_phone string,
  broker_city_name string,
  broker_info_full_status string,
  broker_has_leader string,
  broker_duty_status_id string,
  broker_city_id string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.jason_dw_broker_summary_basis
SELECT
  bs.user_id AS broker_id,

  bs.name AS broker_name,

  bs.on_duty_date AS broker_on_duty_date,

  CASE
    WHEN bs.status = 1
      THEN '待入职'
    WHEN bs.status = 2
      THEN '在职'
    WHEN bs.status = 3
      THEN '取消入职'
    WHEN bs.status = 4
      THEN '离职'
  END AS broker_duty_status,

  sy_user_phone.phone AS broker_phone,

  ds_city.name AS broker_city_name,

  CASE
    WHEN
      bs.identity_card_number = '' OR
      bs.avatar               = 0 OR
      bs.identity_card_photo  ='' OR
      bs.join_year            = 0 OR
      bs.wechat_name          = '' OR
      bs.engage_block_ids     = '' OR
      bs.good_business_ids    = '' OR
      bs.familiar_community_ids = '' OR
      bs.work_experience      = '' OR
      bs.life_image_ids       = ''
    THEN
      'No'
    ELSE
      'Yes'
  END AS info_full_status,

  CASE
    WHEN
      bs.has_leader_ability = 1
    THEN
      'Yes'
    ELSE
      'No'
  END AS broker_has_leader,

  status,

  city_id

FROM
  db_sync.angejia__broker AS bs
LEFT JOIN
  db_sync.angejia__city AS ds_city
ON
  bs.city_id = ds_city.id
LEFT JOIN
  db_sync.angejia__user_phone AS sy_user_phone
ON
  bs.user_id = sy_user_phone.user_id
;

--- 经纪人基础信息 end ---
```
