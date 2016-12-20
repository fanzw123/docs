# da_broker_summary_basis_info_daily 提供给业务使用的经纪人日表

## 字段
- [文档](service/data-warehouse/db-design/dw/dw_db/table-design/dw_summary_broker_basis_info_daily.md)


## HQL
- [da_broker_summary_basis_info_daily](http://git.corp.angejia.com/dw/dw_sql/tree/master/broker/da_broker_summary_basis_info_daily.sql)


## * 上线注意事项

### 1、备份源数据库

``` sql
HIVE
  ./migrate-hive-tabel.sh source_table=da_db.da_broker_summary_basis_info_daily target_table=dw_history_db.da_broker_summary_basis_info_daily_20150717

MYSQL
  USE da_db;
  CREATE TABLE
    da_broker_summary_basis_info_daily_20150717
  LIKE
    da_broker_summary_basis_info_daily;

  INSERT INTO
    da_broker_summary_basis_info_daily_20150717
  SELECT
    *
  FROM
    da_broker_summary_basis_info_daily;
```



### 2、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
MYSQL
  USE da_db;
  DELETE FROM
    da_broker_summary_basis_info_daily
  WHERE
    p_dt = '2015-06-28'

HIVE
  ALTER TABLE
    da_db.da_broker_summary_basis_info_daily
  DROP PARTITION (
    p_dt='2015-06-28'
  );
```
