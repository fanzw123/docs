CREATE EXTERNAL TABLE IF NOT EXISTS ods.ods_browser_use (
  `channel` string,
  `client_ip` string,
  `mac` string,
  `install_day` string,
  `use_day` string,
  `version` string,
  `server_time` string,
  `system_start_time` string,
  `system_install_time` string,
  `pc_name` string,
  `pc_hardware` string,
  `big_version` String,
  `kuid` string,
  `tag` string
) PARTITIONED BY (type String, p_dt String)
ROW FORMAT DELIMITED
  FIELDS TERMINATED BY ','
  COLLECTION ITEMS TERMINATED BY '\n'
STORED AS TEXTFILE
;

-- 分区加载外部数据
ALTER TABLE ods.ods_browser_use ADD IF NOT EXISTS PARTITION  (type = '0',p_dt = ${dealDate}) LOCATION '/ods/browser_use/0/${baseDealDate}';
ALTER TABLE ods.ods_browser_use ADD IF NOT EXISTS PARTITION  (type = '1',p_dt = ${dealDate}) LOCATION '/ods/browser_use/1/${baseDealDate}';
ALTER TABLE ods.ods_browser_use ADD IF NOT EXISTS PARTITION  (type = '2',p_dt = ${dealDate}) LOCATION '/ods/browser_use/2/${baseDealDate}';


ADD JAR /etc/hive/auxlib/json-serde-1.3.7-jar-with-dependencies.jar;


CREATE EXTERNAL TABLE IF NOT EXISTS temp_db.test_safe_click (
  `common` string,
  `count` string,
  `integer` string,
  `string` string,
  `ip` string
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
WITH SERDEPROPERTIES (
  "ignore.malformed.json"="true"
)
STORED AS TEXTFILE
;

hdfs dfs -ls /user/hive/warehouse/temp_db.db/test_safe_click


load data local inpath '/data1/log/tmp/2017-01-21-09-1.txt.gz' OVERWRITE into TABLE temp_db.test_safe_click;




load data local inpath '/data1/log/tmp/2017-01-21-09-3.snappy' OVERWRITE into TABLE temp_db.test_safe_click;


CREATE TABLE temp_db.test_safe_click_1 STORED AS TEXTFILE AS SELECT * FROM temp_db.test_safe_click;

SELECT * FROM temp_db.test_safe_click limit 1;
