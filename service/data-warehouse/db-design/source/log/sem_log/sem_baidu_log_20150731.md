# sem_baidu 百度 sem Log

## 字段
``` sql
account '百度 sem 账号'

campaign_id '计划 id'

campaign_name '计划 name'

adgroup_id '单元 id'

adgroup_name '单元 name'

keyword_id '关键字 id'

keyword_name '关键字 name'

pc_destination_url 'pc 地址页'

mobile_destination_url 'mobile 地址页'

sem 'sem pi'

p_dt '分区日期 yyyy-mm-dd 格式'

```

## HQL
``` sql
-- 模板表
DROP TABLE sem_log.sem_baidu_log;
CREATE TABLE sem_log.sem_baidu_log (
  account String,
  campaign_id String,
  campaign_name String,
  adgroup_id String,
  adgroup_name String,
  keyword_id String,
  keyword_name String,
  pc_destination_url String,
  mobile_destination_url String,
  sem String
) PARTITIONED BY (p_dt string)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
COLLECTION ITEMS TERMINATED BY '\n'
;

```
