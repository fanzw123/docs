# MySQL 数据导入导出

- [优秀文章](http://blog.csdn.net/xin_yu_xin/article/details/7574662)
- [优秀文章](http://blog.chinaunix.net/uid-16844903-id-3411118.html)


## 导入数据

``` sql

1) 导入 test.sql 数据到 test 数据库
mysql -utest -ptest test -v -f < ./test.sql

```


## 导出数据

### 1、导出数据

``` sql

1) 导出 test 数据库到 test.sql 文件
  mysqldump -uroot -p123 test -F > ./test.sql


2) 导出指定库库中的表
  mysqldump -h[host] -u[account] -p[password] [db_name] [table_name]] > ./table_name.sql

4) 导出 test 到文件
    mysql -h10.10.2.91 -uhadoop -pangejia888 -s -e "select * FROM test.performance_mb limit 10" > ./tablename
```


### 2、把查询数据导出到文件

``` sql

select
  p.TypeName,
  c.*
from
  ajk_communitys as c
left join
  ajk_commtype as p
ON
  c.CityId = p.CityId
WHERE
  p.CityId IN ('19','27')
AND
  p.parentid = '0'
into outfile '/tmp/communitys6.txt'
fields terminated by '\t'
optionally enclosed by '"'
escaped by '"'
lines terminated by '\n'
;



select
  *
from
 test.performance_mb
LIMIT 10
into outfile '/tmp/performance_mb_2.txt'
fields terminated by '\t'
optionally enclosed by '"'
escaped by '"'
lines terminated by '\n'
;



```
