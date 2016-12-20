# 迁移 hive table

## 设计目的

- 每次上线需要对现有数据表进行备份和迁移
- 分区表迁移时手动处理很繁琐，不方便

## 设计

- 输入表名和目标表名即可完成迁移
- 可对分区表进行迁移
- 可对普通表进行迁移

### 针对分区表迁移设计

- 对分区表处理

``` sql
-- 创建目标表，获取源表的数据结构
CREATE TABLE IF NOT EXTSIS target_table LIKE source_table;

-- 获取字段结构
DESC source_table

-- 插入数据
INSERT OVERWRITE TABLE
  target_table
PARTITON(
  partition_field_name
)
SELECT
  fiedls,
  partition_field_name
FORM
  source_table
DISTRIBUTE BY
  partition_field_name
;
```


### 针对普通表

- 兼容对分区表->普通表的导入

``` sql
-- 获取表结构
DESC source_table;

-- 创建表结构
CREATE TABLE IF NOT EXISTS target_table (
  source_table_fields
) ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
COLLECTION ITEMS TERMINATED BY '\n'
STORED AS TEXTFILE;

-- 插入数据
INSERT OVERWRITE TABLE
  target_table
SELECT
  source_table_fields
FROM
  source_table
;
```
