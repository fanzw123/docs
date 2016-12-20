# da_property_select_community_info 经纪人小区跟进表

## 字段
## * 字段说明
``` sql
community_id    								'小区ID'
community_name    							'小区名'
community_block    							'小区板块'
community_district    					'小区区域'
community_avg_price   		 			'小区均价'
inventory_count    							'小区房源数'
followup_percent    						'跟进占比'
followup_cnt    								'小区房源跟进数'
survey_cnt    									'小区房源实勘数'
survey_percent    							'实勘占比'
seven_followup_percent    			'近7天跟进占比'
seven_inventory_count    				'近7天新增房源数'
protection_count    						'已护盘数量'
bambooplate_count    						'笋盘数量'
p_dt    												'统计日期'
```

## HQL
- [da_property_select_community_info](http://git.corp.angejia.com/dw/dw_sql/tree/master/property/da_property_select_community_info.sql)


## * 上线注意事项

### 1、备份源数据库

``` sql
HIVE
  ./migrate-hive-tabel.sh source_table=da_db.da_property_select_community_info target_table=dw_history_db.da_property_select_community_info_20150728


MYSQL
  USE da_db;
  CREATE TABLE
    da_property_select_community_info_20150728
  LIKE
    da_property_select_community_info;

  INSERT INTO
    da_property_select_community_info_20150728
  SELECT
    *
  FROM
    da_property_select_community_info;
```



### 2、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
MYSQL
  USE da_db;
  DELETE FROM
    da_property_select_community_info
  WHERE
    p_dt = '2015-07-27'

HIVE
  ALTER TABLE
    da_db.da_property_select_community_info
  DROP PARTITION (
    p_dt='2015-07-27'
  );


HIVE 添加新字段  
  ALTER TABLE
    da_db.da_property_select_community_info
  ADD COLUMNS(
    followup_khgjl_distinct STRING
  );  

Mysql 添加新字段
  ALTER TABLE
    da_property_select_community_info
  ADD
    followup_khgjl_distinct varchar(255) NOT NULL DEFAULT '' AFTER followup_fygjl_qc

```
