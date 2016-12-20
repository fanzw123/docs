# Hive 分区详解

## 一、说明

### 1、分类

* 静态分区
* 动态分区

### 2、注意事项

#### 2.1、关键字  OVERWRITE

- 由于使用了 OVERWRITE 关键字，目标表中原来相同 partition 中的所有数据被覆盖，如果目标表中没有 partition ，则整个表会被覆盖。
- hive table 使用分区的时候：
 - 在 hive table 实际显示的时候，会把基本字段和"分区"字段一起显示出来。
 - 在 hiva table 实际存储的文件本身，会多一个 p_dt=20150401 的分区目录，该目录存放分区下的所有数据

#### 2.2、分割符号

``` sql
1) ^A (Ctrl+A) 用八进制 \001 表示
   ^B \002
   ^C \003
2) 分隔符号说明
  \t Tab
  \n Enter (Linux 下换行)
  \n\r Enter (Window 下换行)


```

## 二、静态分区

### 1、准备测试文件 stat-file-1.log

用 \t 分割字段，用 \n 分割换行

``` sql
1,jason1
2,jason2
3,jason3
4,jason4
5,jason5
6,jason6

```

### 2、通过本地文件导入到静态分区表

#### 2.1、创建静态表

这个表共有 3 个字段 (sid、sname、date) , date 作为分区字段

```sql
create table stat_table_1 (
  sid int,
  sname string
) partitioned by (h_date string)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
COLLECTION ITEMS TERMINATED BY '\n';

```

#### 2.2、导入数据

通过这种方式导入方便，会自动把相关的文件匹配到的 date 日期，在表下生成一个独立的分区文件夹。

```sql
load data local inpath '/var/hive-demo/stat-file-1.log'
into table stat_table_1 partition(date = '20150301');

```


### 3、通过查询其他 hive table 表，导入数据到分区表中

#### 3.1、首先创建源一张表，并且导入数据

数据源  /var/hive-demo/stat-file-2.log
```sql
1,jason1,20150301
2,jason2,20150301
3,jason3,20150302
4,jason4,20150302
5,jason5,20150303
6,jason6,20150303
```

```sql
1) 创建表
create table stat_source_1 (
  sid int,
  sname string,
  date string
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
COLLECTION ITEMS TERMINATED BY '\n';


2) 导入数据到源表
load data local inpath '/var/hive-demo/stat-file-2.log'
into table stat_source_1;
```

#### 3.2、查询 hive table 向分区表导数据

```sql
1) 创建测试表 stat_table_2
create table stat_table_2 (
  sid int,
  sname string
) partitioned by (h_date string)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\001'
COLLECTION ITEMS TERMINATED BY '\n';


2) 导入查询数据到表中

 因为 stat_table_2 是分区表,只有(sid,sname) 2个字段,h_date 是分区字段，值都会是 20150301，就是定义的分区日期

insert overwrite table
   stat_table_2
partition(h_date = '20150301')
select
   sid,
   sname
from
 stat_source_1;
```



## 三、动态分区

只能通过查询其他 hive table 进行分区

### 1、hive 准备工作，配置环境

```sql
-- (可通过这个语句查看：set hive.exec.dynamic.partition;)
set hive.exec.dynamic.partition=true;
set hive.exec.dynamic.partition.mode=nonstrict;
-- (如果自动分区数大于这个参数，将会报错)
set hive.exec.max.dynamic.partitions=100000;
set hive.exec.max.dynamic.partitions.pernode=100000;
```

### 2、准备测试文件 dynamic-file-1.log

用 \t 分割字段，用 \n 分割换行

```sql
1,jason1,20150301
2,jason2,20150301
3,jason3,20150302
4,jason4,20150302
5,jason5,20150303
6,jason6,20150303

```

### 3、查询 hive table 动态导入到分区表

#### 3.1、创建源 hive table

这个表共有 3 个字段 (sid、sname、date) , date 作为分区字段

```sql
1) 创建表
create table dynamic_source_1 (
  sid int,
  sname string,
  date string
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
COLLECTION ITEMS TERMINATED BY '\n';


2) 导入数据到源表

load data local inpath '/var/hive-demo/dynamic-file-1.log'
into table dynamic_source_1;
```

#### 3.2、通过源 hive table 导入到动态分区表

```sql
1) 创建表
  create table dynamic_table_1 (
    sid int,
    sname string
  ) partitioned by (h_date string)
  ROW FORMAT DELIMITED
  FIELDS TERMINATED BY ','
  COLLECTION ITEMS TERMINATED BY '\n';

2) 导入数据到动态分区 （批量的）

  insert overwrite table
    dynamic_table_1
  partition (
    h_date  #分区表的分区字段
  ) select
    sid,
    sname,
    date    #源数据表的日期字段放在最后，提供给分区表作为分区的依据
  from
    dynamic_source_1
  distribute by
    date    #这里必须要写

3) 向某个分区表动态导入数据，字段的最后一个必须是分区字段

  INSERT OVERWRITE TABLE
    dynamic_table_1
  PARTITION(p_dt)
  SELECT
      *
  FROM
      dynamic_source_1
  WHERE
      p_dt='2015-11-24'

```


### 四、命令

``` sh
#修改分区名字(执行貌似没有权限)

ALTER TABLE table_name PARTITION (dt='2008-08-08') RENAME TO PARTITION (dt='20080808');
```
