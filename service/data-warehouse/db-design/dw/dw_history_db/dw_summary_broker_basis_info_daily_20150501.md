# 经纪人行为日表关系，详细设计

## 规划图
- [关系图](http://www.processon.com/view/link/554c31f1e4b0dd9aa98855f0) 密码：angejiadocs
- [流程图](http://www.processon.com/view/link/554c434fe4b0dd9aa988e5f4) 密码：angejiadocs

## 部署环境
```
dw_admin
ip 10.10.2.91
```

## 宽表组成

### 1、基础表

```
db_sync.angejia__broker
```

### 2、db_sync.angejia__user_phone

#### 逻辑
```
user_id 获取 phone

```

#### 案例
```
select
  bs.user_id,
  sy_user_phone.phone
from
  db_sync.angejia__broker bs
left join
  db_sync.angejia__user_phone sy_user_phone
ON
  bs.user_id = sy_user_phone.user_id
ORDER BY
  bs.user_id ASC

```


### 3、dw_stage.dw_app_access_log

#### 逻辑
```
根据 user_id 获取 app_name
要对 user_id 去重

```

#### 案例
```

DROP TABLE IF EXISTS dw_temp_angejia.dw_app_access_log_tmp;

CREATE TABLE IF NOT EXISTS dw_temp_angejia.dw_app_access_log_tmp(
  user_id  string,
  app_name  string
);

INSERT OVERWIRTE TABLE
  dw_temp_angejia.dw_app_access_log_tmp
SELECT
  user_id,
  app_name
FROM
  dw_stage.dw_app_access_log
WHERE
    user_id != ''
  AND
    app_name IN ('a-broker','i-broker')
  AND
    p_dt = '2015-05-08'
GROUP BY
  user_id,
  app_name;


```


### 4、db_sync.angejia__call_log

#### 逻辑
```
接到电话数(含接通和未接通)
call_type = 2，被叫经纪人 called_uid 统计电话数

接通电话数(只含接通的)
call_type = 2 and keep_time >0 ，被叫经纪人called_uid统计电话数

接通电话人
call_type = 2 and keep_time >0 ，被叫经纪人called_uid统计来电人数count（distinct caller)按电话号码计数

```

#### 案例

```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__call_log_tmp;

CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__call_log_tmp(
  user_id  string,
  call_num  string,
  type string
);


INSERT INTO TABLE
  dw_temp_angejia.angejia__call_log_tmp
SELECT
  called_uid,
  count(id),
  '1' as type
FROM
  db_sync.angejia__call_log
WHERE
    call_type = 2
  AND
    to_date(start_at) = '2015-05-08'
GROUP BY
  called_uid;


INSERT INTO TABLE
  dw_temp_angejia.angejia__call_log_tmp
SELECT
    called_uid,
    count(id),
    '2' as type
FROM
    db_sync.angejia__call_log
WHERE
    call_type = 2
AND
    keep_time > 0
AND
    to_date(start_at) = '2015-05-08'
GROUP BY
    called_uid;


INSERT INTO TABLE
    dw_temp_angejia.angejia__call_log_tmp
SELECT
    called_uid,
    COUNT(DISTINCT(caller)),
    '3' as type
FROM
    db_sync.angejia__call_log
WHERE
    call_type = 2
AND
    keep_time > 0
AND
    to_date(start_at) = '2015-05-08'
GROUP BY
    called_uid;

```


### 5、微聊回复 db_sync.angejia__user_msg

- 请用微聊表的：dw_db.dw_mobile_chat_effect_info 的 reply_by_broker_5min 和 reply_by_broker_day 字段

##### 1) `经纪人 5分钟回复人数` 逻辑
```
需求
  经纪人，5分钟内回复的微聊人数

逻辑
  09:00 ~ 22:00 内聊天的人
  用户当天第一次发送给经纪人
  经纪人在这 5 分钟内回复的人数

需要的表
  db_sync.angejia__user_msg  用户消息表
  db_sync.angejia__broker    经纪人表
  db_sync.angejia__user      用户类型表

思考满足条件
  user_msg 表里，得到用户发送给经纪人消息，并且是第一条
  user_msg 表里，得到经纪人发送给用的一个消息，并且是第一条

```

##### `经纪人 5分钟回复人数` 案例

```
拿出经纪人给用户发送的所有消息，作为基础表
SELECT
  a.from_uid as broker_uid,
  a.to_uid as user_uid,
  min(a.created_at) as created_at
FROM
  db_sync.angejia__user_msg a
LEFT JOIN
  db_sync.angejia__broker b
    ON
      a.from_uid = b.user_id
WHERE
  b.user_id is not null
GROUP BY
  a.from_uid,
  a.to_uid


拿出用户发送给经纪人的消息数据
SELECT
  c.from_uid as user_uid,
  c.to_uid as broker_uid,
  min(c.created_at) as created_at
FROM
  db_sync.angejia__user_msg c
LEFT JOIN
  db_sync.angejia__user d
    ON
      c.from_uid = d.user_id
WHERE
  d.user_type = 1
GROUP BY
  c.from_uid,
  c.to_uid


按照经纪人发送给用户的消息，拿出一条对话，并且是 300 秒内，统计经纪人 300 秒内回复的人数

DROP TABLE IF EXISTS dw_temp_angejia.angejia__user_msg_five_tmp;

CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__user_msg_five_tmp(
  user_id  string,
  people_num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__user_msg_five_tmp
SELECT
  broker_basic.broker_uid,
  count(DISTINCT(broker_basic.user_uid))
FROM (
  SELECT
    a.from_uid as broker_uid,
    a.to_uid as user_uid,
    min(a.created_at) as created_at
  FROM
    db_sync.angejia__user_msg a
  LEFT JOIN
    db_sync.angejia__broker b
      ON
        a.from_uid = b.user_id
  WHERE
      b.user_id is not null
    AND
      to_date(a.created_at) = '2015-05-08'
  GROUP BY
    a.from_uid,
    a.to_uid
  ) broker_basic

JOIN (
  SELECT
    c.from_uid as user_uid,
    c.to_uid as broker_uid,
    min(c.created_at) as created_at
  FROM
    db_sync.angejia__user_msg c
  LEFT JOIN
    db_sync.angejia__user d
      ON
        c.from_uid = d.user_id
  WHERE
    d.user_type = 1
  GROUP BY
    c.from_uid,
    c.to_uid
  ) user_basic
ON
  broker_basic.broker_uid = user_basic.broker_uid
AND
  broker_basic.user_uid = user_basic.user_uid

WHERE
  (unix_timestamp(broker_basic.created_at) - unix_timestamp(user_basic.created_at)) <=300

GROUP BY
  broker_basic.broker_uid

```


##### 2) `经纪人 当天内回复的微聊人数` 逻辑
```
拿到当天经纪人所有的回复数据,from_uid 是经纪人的
对结果进行 group by from_uid,并且去重 to_uid

```

##### `经纪人 当天内回复的微聊人数` 案例
```

DROP TABLE IF EXISTS dw_temp_angejia.angejia__user_msg_day_tmp;

CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__user_msg_day_tmp(
  user_id  string,
  people_num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__user_msg_day_tmp
SELECT
  a.from_uid as broker_uid,
  COUNT(DISTINCT(a.to_uid)) as user_uid
FROM
  db_sync.angejia__user_msg a
LEFT JOIN
  db_sync.angejia__broker b
    ON
      a.from_uid = b.user_id
WHERE
  to_date(a.created_at) = '2015-05-08'
GROUP BY
  a.from_uid

```


### 6、db_sync.angejia__visit

#### 逻辑
```
带看量
where is_valid=1          /*有效1，无效0*/
is_buyer_denied=0       /*买家否认1，买家未否认0*/
按 visit_started_at 带看时间字段计算


发起带看量
按 visit_started_at 带看时间字段计算

```

#### 案例
```
带看量

DROP TABLE IF EXISTS dw_temp_angejia.angejia__visit_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__visit_tmp(
  user_id  string,
  num  string,
  type string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__visit_tmp
SELECT
  broker_uid,
  COUNT(id),
  '1' as type
FROM
  db_sync.angejia__visit
WHERE
    is_valid = 1
  AND
    is_buyer_denied = 0
  AND
    to_date(visit_started_at) = '2015-05-08'
GROUP BY
  broker_uid


发起带看量
INSERT INTO TABLE
  dw_temp_angejia.angejia__visit_tmp
SELECT
  broker_uid,
  COUNT(id),
  '2' as type
FROM
  db_sync.angejia__visit
WHERE
  to_date(created_at) = '2015-05-08'
GROUP BY
  broker_uid

```



### 7.db_sync.angejia__commission_followup

#### 逻辑
```
房东跟进量
```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__commission_followup_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__commission_followup_tmp(
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__commission_followup_tmp
SELECT
  broker_uid,
  COUNT(id)
FROM
  db_sync.angejia__commission_followup
WHERE
  to_date(create_at) = '2015-05-08'
GROUP BY
  broker_uid

```



### 8.db_sync.angejia__buyer_followup

#### 逻辑
```
经纪人客户跟进
```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__buyer_followup_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__buyer_followup_tmp(
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__buyer_followup_tmp
SELECT
  broker_uid,
  COUNT(id)
FROM
  db_sync.angejia__buyer_followup
WHERE
  to_date(create_at) = '2015-05-08'
GROUP BY
  broker_uid

```


### 9.db_sync.angejia__inventory_followup

#### 逻辑
```
房源跟进量
```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__inventory_followup_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__inventory_followup_tmp(
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__inventory_followup_tmp
SELECT
  broker_uid,
  COUNT(id)
FROM
  db_sync.angejia__inventory_followup
WHERE
    type = 0
  AND
    to_date(create_at) = '2015-05-08'
GROUP BY
    broker_uid

```

### 10.db_sync.angejia__survey

#### 逻辑
```
实堪房源数
按实堪审核通过时间计算
where status=1   ，审核时间按updated_at

```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__survey_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__survey_tmp(
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__survey_tmp
SELECT
  broker_uid,
  COUNT(inventory_id)
FROM
  db_sync.angejia__survey
WHERE
    to_date(updated_at) = '2015-05-08'
  AND
    status = 1
GROUP BY
  broker_uid

```


### 11.db_sync.angejia__visit_review

#### 逻辑
```
（历史上累计评价平均分）
相关字段 level
```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__visit_review_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__visit_review_tmp(
  user_id  string,
  num  string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__visit_review_tmp
SELECT
  broker_uid,
  AVG(level)
FROM
  db_sync.angejia__visit_review
GROUP BY
  broker_uid

```


### 12.db_sync.angejia__broker_service_point

#### 逻辑
```
当前月被扣服务分
broker_uid为 被扣分的经纪人

```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__broker_service_point_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__broker_service_point_tmp(
  user_id  string,
  num  string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.angejia__broker_service_point_tmp
SELECT
  broker_uid,
  (SUM(point))
FROM
  db_sync.angejia__broker_service_point
WHERE
  month = '201505'
GROUP BY
  broker_uid
```

### 13.db_sync.angejia__broker_service_point_log

#### 逻辑
```
经纪人今日被扣除分数

从 broker_service_point_log 表筛选
  is_valid = 1
  type = 2 //这个字段等上线后才有
  created_at = 2015-05-08
找到 action_id

通过 action_id 匹配 broker_service_action 表的 id 字段
  action_id = id
统计 broker_service_action 表的 point 字段

然后在 通过
broker_service_action 表的 point_id 找到 broker_service_point 表的 broker_uid

```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__broker_point_day_deduct_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__broker_point_day_deduct_tmp(
  user_id string,
  num string
);

INSERT OVERWRITE TABLE
  dw_temp_angejia.angejia__broker_point_day_deduct_tmp


方案一:

SELECT
  d.broker_uid,
  c.sum_point
FROM (
  SELECT
    a.point_id,
    SUM(b.point) as sum_point
  FROM
    db_sync.angejia__broker_service_point_log a
  JOIN
    db_sync.angejia__broker_service_action b
  ON
    b.id = a.action_id
  WHERE
      to_date(a.created_at) = '2015-05-08'
    AND
      a.is_valid = 1
    AND
      a.type = 2
  GROUP BY
    a.point_id
  ) c
LEFT JOIN
  db_sync.angejia__broker_service_point d
ON
  d.id = c.point_id


方案二(优化后):

SELECT
    d.broker_uid,
    SUM(b.point) as sum_point
FROM
  db_sync.angejia__broker_service_point_log a
JOIN
  db_sync.angejia__broker_service_action b
ON
  b.id = a.action_id
LEFT JOIN
  db_sync.angejia__broker_service_point d
ON
  d.id = a.point_id
WHERE
    to_date(a.created_at) = '2015-05-08'
  AND
    a.is_valid = 1
  AND
    a.type = 2
GROUP BY
  d.broker_uid
```


### 14.db_sync.db_sync.angejia__demand

#### 逻辑
```
录入客户数
按照 creator_uid 计算
按照 created_at 计算

私客数
统计 broker_uid 下有几个 buyer_uid
```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__demand_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__demand_tmp(
  user_id string,
  num string,
  type string
);


录入客户数：
INSERT INTO TABLE
  dw_temp_angejia.angejia__demand_tmp
SELECT
  creator_uid,
  COUNT(buyer_uid) as customer,
  '1' as type
FROM
  db_sync.angejia__demand
WHERE
    to_date(created_at) = '2015-05-08'
GROUP BY
  creator_uid;


私客数
INSERT INTO TABLE
  dw_temp_angejia.angejia__demand_tmp
SELECT
  broker_uid,
  COUNT(buyer_uid) as customer,
  '2' as type
FROM
  db_sync.angejia__demand
GROUP BY
  broker_uid;

```


### 15.db_sync.property__inventory

#### 逻辑
```
总房源量 (自己私盘的房源数)
seller_broker_uid 为经纪人
status=2

当天录入房源量
where
  source=2   /*1 房东发房; 2 经纪人发房; 3 CC发房; 4 抓取*/
    and
  status=2 /*-1无效; 0虚假; 1待售; 2在售(已开盘); 3交易中; 4已售出'*/，按creator_uid创建的id数计算
    and
  created_at = 当天日期
```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.property__inventory_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.property__inventory_tmp(
  user_id string,
  num string,
  type string
);

总房源量 (自己私盘的房源数)：
INSERT INTO TABLE
  dw_temp_angejia.property__inventory_tmp
SELECT
  seller_broker_uid,
  COUNT(id),
  '1' as type
FROM
  db_sync.property__inventory
WHERE
  status = 2
GROUP BY
  seller_broker_uid

当天录入房源量
INSERT INTO TABLE
  dw_temp_angejia.property__inventory_tmp
SELECT
  creator_uid,
  COUNT(id),
  '2' as type
FROM
  db_sync.property__inventory
WHERE
    source = 2
  AND
    status = 2
  AND
    to_date(created_at) = '2015-05-08'
GROUP BY
  creator_uid
```


### 16.db_sync.angejia__broker_black_house

#### 逻辑
```
当天是否被关小黑屋
start_date 日期 end_date  

逻辑
  start_date <= 日期
AND
  end_date >= 日期


```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__broker_black_house_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__broker_black_house_tmp(
  user_id string,
  start_and_end string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__broker_black_house_tmp
SELECT
  broker_uid,
  concat(start_date,' , ', end_date) as start_and_end
FROM
  db_sync.angejia__broker_black_house
WHERE
  unix_timestamp(to_date(start_date),'yyyy-MM-dd') <= unix_timestamp('2015-05-08','yyyy-MM-dd')
AND
  unix_timestamp(to_date(end_date),'yyyy-MM-dd') >= unix_timestamp('2015-05-08','yyyy-MM-dd')

```


### 17.db_sync.angejia__agent

#### 逻辑
```
经纪人所属中心
通过 broker 表的 agent_id 找到 agent 表的 name
```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__agent_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__agent_tmp (
  user_id string,
  agent_name string,
  company_name string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__agent_tmp
SELECT
  bs.user_id,
  agent.name as agent_name,
  company.name as company_name
FROM
  db_sync.angejia__broker bs
LEFT JOIN
  db_sync.angejia__agent agent
ON
  bs.agent_id = agent.id
LEFT JOIN
  db_sync.angejia__company company
ON
  agent.company_id = company.id
;

```


### 18.db_sync.broker_label

#### 逻辑
```
通过 broker 表
broker.label_id = broker_label.id  

获取名字 broker_label.name
```

#### 案例
```
SELECT
  ds_broker_label.name as broker_label_name
FROM
  db_sync.angejia__broker bs
LEFT JOIN
  db_sync.angejia__broker_label ds_broker_label
ON
  bs.label_id = ds_broker_label.id
```



### 19.经纪人信息是否填写完善 (2015-05-30 start)

#### 逻辑
```
见案例 HQL
```

#### 案例

```
DROP TABLE IF EXISTS dw_temp_angejia.angejia__broker_info_full_status_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__broker_info_full_status_tmp (
  user_id string,
  info_full_status string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__broker_info_full_status_tmp
SELECT
  user_id,
  CASE
    WHEN
        a.identity_card_number = '' OR
        a.avatar               = 0 OR
        a.identity_card_photo  ='' OR
        a.join_year            = 0 OR
        a.wechat_name          = '' OR
        a.engage_block_ids     = '' OR
        a.good_business_ids    = '' OR
        a.familiar_community_ids = '' OR
        a.work_experience      = '' OR
        a.life_image_ids       = ''
      THEN 'No'
    ELSE
      'Yes'
  END AS info_full_status
FROM
  db_sync.angejia__broker a
```


### 20.虚假房源数

#### 逻辑

```
见案例 HQL
```

#### 案例
```
DROP TABLE IF EXISTS dw_temp_angejia.property__inventory_sham_inventory_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.property__inventory_sham_inventory_tmp (
  user_id string,
  num string
);

INSERT INTO TABLE
  dw_temp_angejia.property__inventory_sham_inventory_tmp
SELECT
  a.creator_uid,
  COUNT(a.id)
FROM
  db_sync.property__inventory a
WHERE
  a.is_real = 0
AND
  to_date(a.updated_at) = '2015-03-16'
AND
  a.source = 2
GROUP BY
  a.creator_uid;


老逻辑
SELECT
  a.creator_uid,
  CASE
    when
        a.is_real = 0
      AND
        date(a.updated_at) = '2015-03-16'
      AND
        a.source = 2
    THEN
      a.id
  END
FROM
  db_sync.property__inventory a

```



### 21.每天工作时长

#### 逻辑

```
就是app接活开关为开的总时长。具体逻辑咨询下开发，暂不详，只知道在 user_switch 内。
```

#### 案例

```

```



### 22.每日收到的微聊人（全天，之前仅白天）

#### 逻辑

```
参照之前逻辑，时间不限定在9：00和22：之间
```

#### 案例

```

```



### 23.每日回复的微聊人数（全天，之前仅白天）

#### 逻辑
```
参照之前逻辑，时间不限定在9：00和22：之间
```

#### 案例

```

```



### 24.每日拨出电话数 (broker to user)

#### 逻辑
```
caller_uid 主叫 uid
called_uid 被叫 uid (问题，使用这个 id 有问题)

统计经纪人 to 用户数量

```

#### 案例

```

DROP TABLE IF EXISTS dw_temp_angejia.angejia__call_log_broker_call_user_tmp ;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.angejia__call_log_broker_call_user_tmp (
  user_id string,
  num string,
  type string
);

INSERT INTO TABLE
  dw_temp_angejia.angejia__call_log_broker_call_user_tmp
SELECT
  caller_uid as broker_uid,
  COUNT(id) as get_calls_daily,
  '1' as type
FROM
  db_sync.angejia__call_log a
WHERE
  call_type = 1
AND
  to_date(start_at) = '2015-03-16'
AND
  keep_time > 0
GROUP BY
  caller_uid;

```



### 25.每日拨出电话人

#### 逻辑
```
(broker to user , 去除重复的电话号码)
统计 broker to user ，去除重复的电话号码

```

#### 案例
```

INSERT INTO TABLE
  dw_temp_angejia.angejia__call_log_broker_call_user_tmp
SELECT
  caller_uid AS broker_uid,
  COUNT(DISTINCT(called)) AS get_calls_daily,
  '2' AS type
FROM
  db_sync.angejia__call_log a
WHERE
  call_type = 1
AND
  to_date(start_at) = '2015-06-16'
AND
  keep_time > 0
GROUP BY
  caller_uid

```



### 26.活动范围 (2015-05-30)

#### 逻辑

```
后续开会讨论
最大经度纬度之间的距离？
```

#### 案例

```

```
