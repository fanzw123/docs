# dw_property_inventory 房源详细信息表

## * 注意事项

``` sql
 无

```

## * 字段说明
``` sql
inventory_id        	string              	库存ID
i_creator_uid       	string              	创建用户ID
i_creator_name      	string              	创建用户名称
provider_id         	string              	资源提供者ID
provider_type       	string              	资源提供者类型
seller_broker_uid   	string              	卖家经纪人用户ID
seller_broker_name  	string              	卖家经纪人用户名称
survey_broker_uid   	string              	实勘经纪人用户ID
survey_broker_name  	string              	实勘经纪人用户名称
exclusive_broker_uid	string              	独家归属经纪人ID
exclusive_broker_name	string              	独家归属经纪人名称
key_holder_uid      	string              	钥匙归属经纪人ID
key_holder_name     	string              	钥匙归属经纪人名称
publish_broker_uid  	string              	开盘经纪人用户ID
publish_broker_name 	string              	开盘经纪人用户名称
price               	string              	房源售价,单位:元
i_area              	string              	房屋面积
fitment             	string              	装修情况
i_is_real           	string              	是否真实,0不,1是
survey_status       	string              	实勘状态,0未实勘,1实勘审核中,2已实勘,3被驳回
i_status            	string              	交易状态0无效(被丢弃),1不卖,2在卖,3交易中,4已卖
visit_time          	string              	看房时间JSON
source              	string              	发布来源1房东发房(委托录入),2经纪人发房,3CC发房,4抓取,5房源局导入,6平台房源复制
bound_at            	string              	拉私时间
published_at        	string              	开盘时间
last_followup_at    	string              	最近跟进时间
bound_survey_at     	string              	待实勘绑定时间
has_indemnity       	string              	是否签赔,0否,1是
flash_sale_referrer_uid	string              	闪购推荐人ID
on_flash_sale       	string              	是否闪购(弃用)
i_has_checked       	string              	是否审核,0否,1是
i_created_at        	string              	库存创建时间
i_updated_at        	string              	库存更新时间
i_deleted_at        	string              	库存删除时间
property_id         	string              	房源ID
house_id            	string              	字典ID
p_creator_uid       	string              	创建用户ID
bedrooms            	string              	卧室数
living_rooms        	string              	客厅数
bathrooms           	string              	卫生间数
p_is_real           	string              	房源是否真实,0不,1是
p_status            	string              	房源状态,1在卖,2已卖
p_has_checked       	string              	房源是否已审核,0未审核,1已审核
p_created_at        	string              	房源创建时间
p_updated_at        	string              	房源更新时间
p_deleted_at        	string              	房源删除时间
building_num        	string              	楼栋号
building_unit       	string              	楼栋号单位
unit_num            	string              	单元号
door_num            	string              	门牌号
orientation         	string              	朝向
floor               	string              	楼层
total_floors        	string              	总共楼层
built_year          	string              	建筑年代
use_type            	string              	使用(产权)类型1住宅,2商住,3商业详情与配置文件一致
building_type       	string              	房屋类型,公寓,别墅等,与配置文件一致
h_is_real           	string              	字典是否真实,0不,1是
h_has_checked       	string              	字典是否已审核,0未审核,1已审核
h_created_at        	string              	字典创建时间
h_updated_at        	string              	字典更新时间
h_deleted_at        	string              	字典删除时间
community_id        	string              	字典小区ID
community_name      	string              	小区名称
alias               	string              	小区别名
address             	string              	小区详细地址
community_lng       	string              	小区经度
community_lat       	string              	小区维度
zoom                	string              	缩放级别
community_is_active 	string              	小区是否激活,0未激活,1已激活
builder_id          	string              	建筑商ID
manage_company_id   	string              	物业公司ID
label_id            	string              	标签ID
community_area      	string              	小区总建筑面积
manage_pay          	string              	物业管理费
house_total         	string              	总户数
contain_pert        	string              	容积率
carbarn_state       	string              	停车位
green_pert          	string              	绿化率
intro               	string              	小区介绍
build_date          	string              	建造年代
team_id             	string              	小区所属的中心id
team_name           	string              	小区所属的中心名称
type                	string              	类型,1重点,2普通
a_community         	string              	热门小区,Y是,N否
block_id            	string              	板块ID
block_name          	string              	板块名称
block_is_active     	string              	板块是否激活,0未激活,1已激活
district_id         	string              	区域ID
district_name       	string              	区域名称
district_is_active  	string              	区域是否激活,0未激活,1已激活
city_id             	string              	城市ID
city_name           	string              	城市名称
city_is_active      	string              	城市是否激活,0未激活,1已激活  

```



## HQL
- [dw_inventory_detail_info_daily.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/property/dw_inventory_detail_info_daily.sql)



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE
  -- 添加表字段流程（会备份源数据）
 ./hive-copy-and-create-fields.sh source_table=dw_db.dw_inventory_detail_info_daily run_date=20150812 add_fields=new_exclusive_amount table_type=1 partition_field=p_dt source_db_type=dw

 -- （直接拷贝表）
 ./hive-copy-table.sh source_table=dw_db.dw_inventory_detail_info_daily target_table=test.dw_inventory_detail_info_daily table_type=1 partition_field=p_dt


 -- 刷新表指定表，指定字段，指定日期的，历史数据（只重新计算需要刷新的字段）
 ./hive-rerun-table.sh \
reset_db_table=test.dw_inventory_detail_info_daily \
reset_date=20150808  \
extend_sql_file=/home/dwadmin/test/jason/aaa.sql \
reset_table_alias=bs_info \
map_fields=column1-t_1.column1,column2-t_1.column2 \
is_delete_partition=1 \
is_use_reset_date_where=1 \
is_debug=1


-- 重跑
./reset-run.sh "/home/dwadmin/app/uba/scripts/shell/aux/hive-rerun-table.sh reset_db_table=dw_db.dw_inventory_detail_info_daily  reset_date={date} extend_sql_file=/data/log/test/reset-hql/broker_20150810.sql reset_table_alias=bs_info map_fields=column1-t_1.column1,column2-t_1.column2 is_delete_partition=0 is_use_reset_date_where=1 is_debug=0"  20150801 20150809



MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_inventory_detail_info_daily_20150717
  LIKE
    dw_inventory_detail_info_daily;

  INSERT INTO
    dw_inventory_detail_info_daily_20150717
  SELECT
    *
  FROM
    dw_inventory_detail_info_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_inventory_detail_info_daily;
  select count(*) from dw_db.dw_inventory_detail_info_daily_20150717;  
```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_inventory_detail_info_daily
  ADD COLUMNS(
    column2 STRING COMMENT '20150717 jason add'
  );


MYSQL
  USE dw_db;
  ALTER TABLE
    dw_inventory_detail_info_daily
  ADD
    column2 varchar(255) NOT NULL DEFAULT '' AFTER column1
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_inventory_detail_info_daily
  DROP PARTITION (
    p_dt = '2015-07-16'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_inventory_detail_info_daily
  WHERE
    p_dt = '2015-07-16'



```
