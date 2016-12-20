# da_property_broker_followup_daily 经纪人小区跟进表

## 字段
## * 字段说明
``` sql
broker_id    								'经纪人ID'
broker_name    							'经纪人姓名'
team_id    									'队伍ID号'
team_name    								'队伍名称'
community_type    					'0-精耕小区，1-非精耕小区'
inventory_view_count    		'查看房源数量'
inventory_followup_count    '跟进房源数量'
survey_count    						'实勘数量'
commit_bambooplate_count    '推笋数量'
visit_count    							'带看数量'
bambooplate_count    				'笋盘数量'
p_dt    										'统计日期'
```

## HQL
- [da_property_broker_followup_daily](http://git.corp.angejia.com/dw/dw_sql/tree/master/broker/da_property_broker_followup_daily.sql)


## * 上线注意事项

### 1、备份源数据库

``` sql
HIVE
  ./migrate-hive-tabel.sh source_table=da_db.da_property_broker_followup_daily target_table=dw_history_db.da_property_broker_followup_daily_20150728


MYSQL
  USE da_db;
  CREATE TABLE
    da_property_broker_followup_daily_20150728
  LIKE
    da_property_broker_followup_daily;

  INSERT INTO
    da_property_broker_followup_daily_20150728
  SELECT
    *
  FROM
    da_property_broker_followup_daily;
```



### 2、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
MYSQL
  USE da_db;
  DELETE FROM
    da_property_broker_followup_daily
  WHERE
    p_dt = '2015-07-27'

HIVE
  ALTER TABLE
    da_db.da_property_broker_followup_daily
  DROP PARTITION (
    p_dt='2015-07-27'
  );


HIVE 添加新字段  
  ALTER TABLE
    da_db.da_property_broker_followup_daily
  ADD COLUMNS(
    followup_khgjl_distinct STRING
  );  

Mysql 添加新字段
  ALTER TABLE
    da_property_broker_followup_daily
  ADD
    followup_khgjl_distinct varchar(255) NOT NULL DEFAULT '' AFTER followup_fygjl_qc

```
