# Hive Json

- hive 列表 columns_v2

## 一、org.apache.hive.hcatalog.data.JsonSerDe 解析

- [hive](http://mvnrepository.com/artifact/org.apache.hive.hcatalog/hive-hcatalog-core)
- [spark](http://mvnrepository.com/artifact/org.spark-project.hive.hcatalog/hive-hcatalog-core)

``` sql

{"common":{"c1":"a","c2":"b","c3":"xxxx","c4":["a","b","c"]}}


CREATE EXTERNAL TABLE source_json_table (
  `common` struct<
    c1:string,
    c2:string,
    c3:string,
    c4:array<string>>
) PARTITIONED BY (p_dt String)
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
STORED AS TEXTFILE
;


ALTER TABLE source_json_table ADD IF NOT EXISTS PARTITION  (p_dt = '2017-01-17') LOCATION '/path/20170117';

SELECT common.c1 FROM source_json_table LIMIT 10;
```



## 二、org.openx.data.jsonserde.JsonSerDe 解析

- [文档](http://www.lamborryan.com/hive-json/)

``` sql

```



## 三、org.apache.hadoop.hive.contrib.serde2.JsonSerde 解析
