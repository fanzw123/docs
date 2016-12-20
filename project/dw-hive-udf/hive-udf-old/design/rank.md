# HIVE UDF



UDF指的是Hive自定义函数，如SUBSTRING_INDEX在MySQL中有，Hive中没有，所以就需要用UDF来实现。

```
add jar hdfs://NameNode:8020/user/jars/Rank.jar;
create temporary function rank as 'com.angejia.dw.hive.udf.Rank';
```


目前DW已经实现了几个UDF

* [ParseMobileAgent](../hive-udf.md#ParseMobileAgent) 从MobileAgent中解析系统浏览器等信息
* [RANK](../hive-udf.md#rank) 分类排序并标号
* [ParseUserAgent](../hive-udf.md#ParseUserAgent) 从UserAgent中解析系统浏览器等信息
* [ParseMobileToken](../hive-udf.md#ParseMobileToken) 从MobileToken中解析Token信息
* [geturl](../hive-udf.md#geturl) 根据经纬度返回一个地图的url链接

使用方式:

Hive

eg:

Hive dw_stage库中有一张城市表:

```
select * from city;  
OK  
1	wh	500
2	bj	600
3	wh	100
4	sh	400
5	wh	200
6	bj	100
7	sh	200
8	bj	300
9	sh	900
```

SQL:按照cname把score排序

```

add jar hdfs://NameNode:8020/user/jars/Rank.jar;  添加UDF使用的JAR位置（存储于HDFS）

create temporary function rank as 'com.angejia.dw.hive.udf.Rank'; 创建使用的UDF函数

select cname,value,rank(cname) csum
from( select cname,value
             from dw_stage.city distribute by cname
      sort by cname,value desc)a
group by cname,value
```

结果如下:

```
bj	100	1
bj	300	2
bj	600	3
sh	200	1
sh	400	2
sh	900	3
wh	100	1
wh	200	2
wh	500	3
```
