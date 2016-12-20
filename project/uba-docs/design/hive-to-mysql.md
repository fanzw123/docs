# hive 导出数据到 mysql


## 需求

把 hive 表数据导入到 mysql 中

每天一张表，以日期分割，规则为 table_name_{$date}。

hive-to-mysql.sh {$date} 为执行脚本


## 一、 uba_web_visit_log 流程

### 思路
由于 uba_web_visit_log 保存的是 json 格式的 hdfs 数据,sqoop 目前不支持这种格式的数据导入

我们需要通过几个步骤来实现

一、Hive 部分
* 以源 hive table 表的字段为基础，建立一张 format 过后的 hive template 表
* 创建一张 template_table_name_{$date} 来保存源表 table_name_{$date} 中的数据
* 用 template_table_name_{$date} 作为数据源,通过 sqoop 导入到 mysql 中

二、MySql 部分
* mysql 创建与 hive table 字段相同的模板表 mysql template;
* 创建一张 table_name_{$date} 以 mysql template 为标准的表，保存每天 hive 导入的数据

### Hive 部分

#### 1、创建 hive template 模板表
```
CREATE  TABLE `uba_web_visit_log_template`(
  `uid` string COMMENT 'from deserializer',
  `ccid` string COMMENT 'from deserializer',
  `referer` string COMMENT 'from deserializer',
  `url` string COMMENT 'from deserializer',
  `guid` string COMMENT 'from deserializer',
  `client_time` string COMMENT 'from deserializer',
  `page_param` string COMMENT 'from deserializer',
  `client_param` string COMMENT 'from deserializer',
  `server_time` string COMMENT 'from deserializer',
  `ip` string COMMENT 'from deserializer',
  `agent` string COMMENT 'from deserializer')
  row format delimited
  FIELDS TERMINATED BY '\001'
  COLLECTION ITEMS TERMINATED BY '\t';
```

#### 2、创建 template_table_name_{$date} 表用来保存源 table_name_{$date} 中的数据
```
create_table uba_web_visit_log_template_{$date} like uba_web_visit_log_template;
```

#### 3、把源table table_name_{$date} 导入到 template_table_name_{$date}
```
insert into table uba_web_visit_log_template_{$date}
select * from uba_web_visit_log_{$date};
```

### MySql 部分

#### 1、创建 mysql template 表
```
CREATE TABLE `uba_web_visit_log_template` (
  `uid` int(11) unsigned DEFAULT '0',
  `ccid` int(11) unsigned DEFAULT '0',
  `referer` varchar(255) DEFAULT '',
  `url` varchar(255) DEFAULT '',
  `guid` varchar(255) DEFAULT '',
  `client_time` varchar(255) DEFAULT '',
  `page_param` varchar(255) DEFAULT '',
  `client_param` varchar(255) DEFAULT '',
  `server_time` varchar(255) DEFAULT '',
  `ip` varchar(255) DEFAULT '',
  `agent` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#### 2、创建一张 table_name_{$date} 以 mysql template 为标准的表，保存每天 hive 导入的数据
```
create uba_web_visit_log_{$date} like uba_web_visit_log_template
```

### 脚本实现
[hive-to-mysql.sh](scripts/shell/hive-to-mysql.sh)

```
sqoop 导入案例
sqoop export --connect jdbc:mysql://CDH-Manager:3306/sqoop -username test -password test -table uba_web_visit_log_20150327 -export-dir /user/hive/uba_log/uba_web_log/uba_web_visit_log/uba_web_visit_log_template_20150331 -input-fields-terminated-by '\001' -input-lines-terminated-by '\t';
```
