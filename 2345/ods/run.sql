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
