# Shell 优化方案

- [结构图](http://www.processon.com/view/link/5559b8c3e4b090bd2cca46f0) 密码:angejiadocs

## 一、 优化 m2h-sync run 脚本

### 1、数据源优化

- 把与业务无关的数据表，暂停同步

```
    #UPDATE SHELL FOR WECHAT 2 微聊数据
    angejia.user-0
    angejia.user_msg-0

    #经纪人宽表相关依赖表
    angejia.user_phone-0
    angejia.call_log-0
    angejia.commission_followup-0
    angejia.buyer_followup-0
    angejia.inventory_followup-0
    angejia.visit_review-0
    angejia.broker_service_point-0
    angejia.broker_service_point_log-0
    angejia.broker_service_action-0
    angejia.broker_black_house-0
    angejia.agent-0
    angejia.company-0
    angejia.broker_label-0
    angejia.broker-1
    angejia.visit-1
    angejia.survey-1
    angejia.demand-1
    property.inventory-1

    #快照表
    angejia.broker_team_member-1
    angejia.broker_team-1
    angejia.commission-1
    angejia.commission_has_broker-1
    angejia.user_base_demand-1
    angejia.user_broker-1
    property.house-1
    property.property-1

    #其他
    angejia.app_push_info-0
    angejia.assign_phone_log-0
    angejia.assigned_visit-0
    angejia.broker_team_apply-0
    angejia.builder-0
    angejia.buyer_demand_bind_broker-0
    angejia.call_assigned_phone-0
    angejia.call_member_code-0
    angejia.city-0
    angejia.commission_log-0
    angejia.commission_scheme-0
    angejia.commission_stash-0
    angejia.community-0
    angejia.community_avg_price-0
    angejia.community_extend-0
    angejia.community_house_type-0
    angejia.community_image-0
    angejia.contact-0
    angejia.crm_complain-0
    angejia.crm_permission-0
    angejia.crm_role-0
    angejia.crm_user_role-0
    angejia.customer_service-0
    angejia.demand_timer-0
    angejia.district-0
    angejia.filter_property-0
    angejia.filter_property_extend-0
    angejia.filter_property_group-0
    angejia.filter_property_operation_log-0
    angejia.filter_property_phone_log-0
    angejia.grab_property_url-0
    angejia.inventory_extend-0
    angejia.inventory_has_seller-0
    angejia.inventory_has_tag-0
    angejia.inventory_house_tag-0
    angejia.inventory_image-0
    angejia.inventory_log-0
    angejia.inventory_other_tag-0
    angejia.inventory_timer-0
    angejia.inventory_verification-0
    angejia.inventory_verification_log-0
    angejia.log_user_login-0
    angejia.manage_company-0
    angejia.marketing_property-0
    angejia.marketing_property_desc-0
    angejia.marketing_property_img-0
    angejia.member-0
    angejia.member_like_inventory-0
    angejia.member_tip_notify-0
    angejia.message-0
    angejia.msg_push_task-0
    angejia.notice-0
    angejia.notify-0
    angejia.property-0
    angejia.property_log-0
    angejia.public_service-0
    angejia.public_service_contact-0
    angejia.push_task-0
    angejia.question-0
    angejia.question_tag_option-0
    angejia.questionnaire-0
    angejia.questionnaire_item-0
    angejia.questionnaire_item_result-0
    angejia.questionnaire_item_result_tmp-0
    angejia.score-0
    angejia.score_action-0
    angejia.score_first_time_login-0
    angejia.score_log-0
    angejia.sms-0
    angejia.store-0
    angejia.survey_image-0
    angejia.survey_verification_log-0
    angejia.switch_relation-0
    angejia.system_tip_notify-0
    angejia.tag-0
    angejia.tag_category-0
    angejia.task-0
    angejia.team-0
    angejia.team_remind_count-0
    angejia.user_app-0
    angejia.user_broadcast_msg-0
    angejia.user_broadcast_msg_receive-0
    angejia.user_contact-0
    angejia.user_has_tag-0
    angejia.user_name-0
    angejia.user_push_info-0
    angejia.user_switch-0
    angejia.user_wechat-0
    angejia.user_wechat_source-0
    angejia.visit_cancellation-0
    angejia.visit_confirm_log-0
    angejia.visit_invalid-0
    angejia.visit_item-0
    angejia.visit_last_view-0
    angejia.visit_order_log-0
    angejia.visit_temp-0
    angejia.isit_timer-0
    angejia.visit_verification-0
    angejia.wechat_qrcode_distribute-0
    angejia.wechat_qrcode_sender-0
    angejia.wechat_user_relation-0
    angejia.wechat_activity_score-0
    angejia.broker_black_house_detail-0

    property.inventory_has_seller-0
    property.inventory_has_tag-0
    property.platform-0

```


### 2、配置数据表 map reduce 数

- sqoop 每次启动脚本都会默认启动 4 个 map reduce

```
1.对于数据量小的数据表启用 1 个 map reduce

2.可手动配置每个表的 map reduce 数量

3.每个表都有一个默认的 map reduce 数量为 1

```


### 3、优化重复性高的 hql

- create database
- 整合多余的 Hql 为一次操作

## 二、心跳监控 hiveServer2

- 心跳监控变为一条 hql 的 map reduce 操作

```
1. show databases 操作弃用

2. 使用 select * from heartbeat_hiveserver2 limit 1; 的空表作为心跳监控操作

```


## 三、监控报警

- 报警邮件：
  - hive table 与 mysql table 条数对比

    ```
    条数相同：绿色
    mysql 比 hive 多：橙色
    hive = 0  ：红色
    ```
- 检验 hive count 与 hdfs 统计文件条数，哪个速度较快速

  ```
  注意：
  1.需要统计 hive table 对应的 hdfs 目录下的文件条数，总和加起来就是文件的总条数
  ```


## 四、mysql 锁表

- 弃用 mysql 锁表功能


## 五、变动

### 1、shell 结构
```
-shell
  -aux
    - mysql2hive-pagename-lkp.sh 导入字典表
  -conf 配置文件目录
    - conf.sh 配置文件启动脚本
    - xxxxx-offline.conf 线下配置文件
    - xxxxx-online.conf 线上配置文件
  -monitor 监控脚本目录
    - xxxx.sh 监控实体
  -m2h-sync 同步脚本目录
    - run.sh 调度脚本
    - mysql-to-hive-sync.sh 同步脚本
    - gather-table.sh 聚合脚本
  -tool 工具脚本目录
    - check-table-is-exists.sh 验证表是否存在
    - connect-hive-server-hql.sh beeline 连接 hiveServer2 执行 hql 脚本
    - get-conf.sh 读取配置文件，并且设置变量
    - get-table-count.sh 获取表条数
    - get-table-fields.sh 获取数据表字段
    - implode.sh 转换数组为拼接字符串
    - in-array.sh 值，是否包含在数组 中
    - mysql-to-hive.sh sqoop 导入到 hive
    - send-mail.sh 发送监控邮件
    - timeout.sh 超时工具类
  -uba 文件目录
    - run.sh 调度脚本
    - creat-daily-table.sh 创建库、表
    - log-to-hdfs.sh 日志数据导入到 hfds 中
    - analysis-hive-to-result-hive.sh 解析结果数据
    - hive-to-mysql.sh 导入到 mysql
```

### 2、conf 目录介绍

配置文件分为:
- 系统配置(如安装的软件、目录等，保证每台机器都一样的配置)
- 环境配置(如数据库等，用仓库管理)
- 业务配置

#### 2.1、conf.sh
```
#!/bin/bash

basepath=$(cd `dirname $0`; pwd);

toolpath="${basepath}/../tool";

is_dev="/home/hadoop/app/DEV"; 相对路径，当前脚本某个目录
#线下环境
if [ -e $is_dev ]; then
    system_env=offline
else
    system_env=online
fi

source ${toolpath}/get-conf.sh "${basepath}/../conf/system-${system_env}.conf";

source ${toolpath}/get-conf.sh "${basepath}/../conf/uba-${system_env}.conf";

source ${toolpath}/get-conf.sh "${basepath}/../conf/sync-${system_env}.conf";
```

#### 2.2、配置文件写法
```
1) 配置文件命名规则：
  xxx-offline.conf
  xxx-online.conf

  其中 xxx 表示功能，offline 表示线下配置，表示 online 线上配置

  如：[业务名称]-[offline or online].conf
    system-offline.conf 线下
    system-online.conf  线上

2) 配置文件，变量书写
  遵循规则：
    文件名大写，作为命名空间
    必须大写，字符用 _ 分割
    变量名 = 变量值

  如：[文件名命名空间]_[变量名称] = [变量值]
    SYSTEM_BEELINE_PATH = /opt/cloudera/parcels/CDH/bin
    SYSTEM_BEELINE_IP = 192.168.160.45:10000

```

#### 2.3、调用方式
```
以 m2h-sync/run.sh 为例子

basepath=$(cd `dirname $0`; pwd);
confpath="${basepath}/../conf";

#引入配置文件
source ${confpath}/conf.sh;

echo ${HADOOP_USER};

必须使用 source 引入

```

### 3、目录结构规划
```
每个类型的业务一个目录结果，如 uba、m2h-sync 等

每个业务下有个总调度的 run 方法，这里初始化一些参数配置，最用调用实体等

```

### 4、监控

#### 4.1、规划
```

统一移动到 monitor 目录下

1、uba 日志监控
2、心跳 heartbeat-hive-server2.sh 监控
3、m2h-sync 监控

```


#### 4.2、心跳 hiveServer2 监控
```
1. show databases 操作启用

2. 使用 select * from heartbeat_hiveserver2 limit 1; 的空表作为心跳监控操作，等待执行返回结果

3. 超时重启脚本
```

#### 4.3、sync 监控

```
待验证 hive count 与 hive table 目录下所有文件计算量总和

效率如何

```
