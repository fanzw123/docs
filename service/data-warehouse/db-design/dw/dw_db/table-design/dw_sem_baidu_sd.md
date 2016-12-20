# dw_sem_baidu_sd  sem 百度日统计表

## 字段

``` sql

-- sem_baidu_log
sem_account '百度 sem 账号'

sem_campaign_id '计划 id'

sem_campaign_name '计划 name'

sem_adgroup_id '单元 id'

sem_adgroup_name '单元 name'

sem_keyword_id '关键字 id'

sem_keyword_name '关键字 name'

sem_pc_destination_url  'PC 投放 URL'

sem_pc_utm_term_and_pi 'PC 投放 URL 中的 utm_term 和 pi'

sem_mobile_destination_url 'mobile 投放 URL'

sem_mobile_utm_term_and_pi 'mobile 投放 URL 中的 utm_term 和 pi'

sem_pv 'pv'

sem_uv 'uv'

sem_vppv 'vppv'

sem_vpuv 'vpuv'

sem_guid_count 'guid 总访问次数'

sem_zx '展现'

sem_dj '点击'

sem_xf '消费'

sem_pjdjjg '平均点击均价'

sem_djl '点击率'

sem_pjpm '平均排名'

-- 日期分区
p_dt '分区日期 yyyy-mm-dd 格式'

```

## HQL
- [sem summary](service/data-warehouse/db-design/dw/dw_summary/table-design/sem/)
- [dw_sem_baidu_summary_detail_info_daily.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/sem/dw_sem_baidu_summary_detail_info_daily.sql)



## 升级迁移

### 1、备份源数据库
``` sql
HIVE
  -- 拷贝、创建新字段
  ./hive-copy-and-create-fields.sh source_table=dw_db.dw_sem_baidu_summary_detail_info_daily run_date=20150803 add_fields=sem_pjpm table_type=1 partition_field=p_dt source_db_type=dw



  -- 验证记录条数,是否一致
  select count(*) from sem_log.sem_baidu_log;
  select count(*) from dw_history_db.sem_baidu_log_20150731;


```

### 2、在原基础上添加字段

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_sem_baidu_summary_detail_info_daily
  ADD COLUMNS(
    sem_zx STRING COMMENT '20150731 jason add',
    sem_dj STRING COMMENT '20150731 jason add',
    sem_xf STRING COMMENT '20150731 jason add',
    sem_pjdjjg STRING COMMENT '20150731 jason add',
    sem_djl STRING COMMENT '20150731 jason add'
  );


MYSQL
  ALTER TABLE
    dw_db.dw_sem_baidu_summary_detail_info_daily
  ADD `sem_zx` int(10) NOT NULL DEFAULT '0' AFTER sem_guid_count,
  ADD `sem_dj` int(10) NOT NULL DEFAULT '0' AFTER sem_zx,
  ADD `sem_xf` varchar(255) NOT NULL DEFAULT '' AFTER sem_dj,
  ADD `sem_pjdjjg` varchar(255) NOT NULL DEFAULT '' AFTER sem_xf,
  ADD `sem_djl` varchar(255) NOT NULL DEFAULT '' AFTER sem_pjdjjg
  ;
```


### 3、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_sem_baidu_summary_detail_info_daily
  DROP PARTITION (
    p_dt = '2015-07-30'
  );

MYSQL
  DELETE FROM
    dw_sem_baidu_summary_detail_info_daily
  WHERE
    p_dt = '2015-07-30'
  ;
```
