
``` sql
create table test.baidu_agent
ROW FORMAT DELIMITED
  FIELDS TERMINATED BY '\t'
  COLLECTION ITEMS TERMINATED BY '\n'
 AS
select
  a.*
from (

  select * from  access_log.access_log_20150830
  union all
  select * from  access_log.access_log_20150831
  union all
  select * from  access_log.access_log_20150901
  union all
  select * from  access_log.access_log_20150902
  union all
  select * from  access_log.access_log_20150903
  union all
  select * from  access_log.access_log_20150904
  union all
  select * from  access_log.access_log_20150905
  union all
  select * from  access_log.access_log_20150906
  union all
  select * from  access_log.access_log_20150907

  union all

  select * from  access_log.access_log_20150927
  union all
  select * from  access_log.access_log_20150928
  union all
  select * from  access_log.access_log_20150929
  union all
  select * from  access_log.access_log_20150930
  union all
  select * from  access_log.access_log_20151001
  union all
  select * from  access_log.access_log_20151002
  union all
  select * from  access_log.access_log_20151003

) AS a

WHERE
  a.user_agent like '%Baiduspider%'
;


drop table if exists test.baidu_agent_down_pc;
create table test.baidu_agent_down_pc
ROW FORMAT DELIMITED
  FIELDS TERMINATED BY '\t'
  COLLECTION ITEMS TERMINATED BY '\n'
AS select * from test.baidu_agent where hostname = 'sale.sh.angejia.com';

drop table if exists test.baidu_agent_down_mobile;
create table test.baidu_agent_down_mobile
ROW FORMAT DELIMITED
  FIELDS TERMINATED BY '\t'
  COLLECTION ITEMS TERMINATED BY '\n'
AS select * from test.baidu_agent where hostname = 'm.angejia.com';



-- 下载到本地
hadoop dfs -get /umr-jdlg4d/hive/test/baidu_agent_down/000000_0 ./
```
