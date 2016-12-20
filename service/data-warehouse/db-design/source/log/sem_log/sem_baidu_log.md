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

zx '展现'

dj '点击'

xf '消费'

pjdjjg '平均点击均价'

djl '点击率'

pjpm '平均排名'

p_dt '分区日期 yyyy-mm-dd 格式'

```

## HQL

### 1、备份源数据库
``` sql

  -- 备份上线脚本
  ./table-online-process.sh source_table=sem_log.sem_baidu_log run_date=20150803 add_fields=pjpm table_type=1 partition_field=p_dt source_db_type=dw


  -- 验证记录条数,是否一致
  select count(*) from sem_log.sem_baidu_log;
  select count(*) from dw_history_db.sem_baidu_log_20150803;


```
