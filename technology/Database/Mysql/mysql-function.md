# Mysql 函数

## 一、String

- [优秀文章](http://justdo2008.iteye.com/blog/1141609)

``` sql

1. substring_index(str,delim,count) 字符串截取
  截取第二个 '.' 之前的所有字符。
  select substring_index('www.sqlstudy.com.cn', '.', 2);

  截取第二个 '.' （倒数）之后的所有字符。
  select substring_index('www.sqlstudy.com.cn', '.', -2);

2. substring(str, pos) 字符串截取
  substring(str, pos, len)
  select substring('sqlstudy.com', 4);


3. CONCAT('a','b','c')
  组合字符串
```


## 二、时间函数

- [优秀文章](http://blog.csdn.net/lwjnumber/article/details/7023566)

``` sql

1. UNIX_TIMESTAMP() 获取当前时间戳

  UNIX_TIMESTAMP("2015-06-01 12:12:00")  转换为时间戳


2. FROM_UNIXTIME() 格式化时间戳成需要的时间

  FROM_UNIXTIME(1218290027,'%Y-%m-%d %h:%i:%s');


3. str_to_date(str, format)  字符串转换为正常日期
  set time_zone='+00:00';
  str_to_date('30 9','%i %h');  09:30:00
  '%s %i %H'

  案例，把调度日期转换正常时间
  str_to_date(substring_index('30 9 * * *',' ',2),'%i %h') as schedule_seconds

4. 时间转换
  select time_to_sec('01:00:05'); -- 3605
  select sec_to_time(3605); -- '01:00:05'

5. 日期
  一天前日期
  WHERE p_dt = date_format(date_sub(now(), interval 1 day),'%Y-%m-%d')
  WHERE date(p_dt) = date_format(date_sub(now(), interval 1 day),'%Y-%m-%d')

  当天日期
  select date_format(now(),'%Y-%m-%d')

```


## 三、数据类型转换

``` sql
CAST(xxx AS 类型) , CONVERT(xxx,类型)，类型必须用下列的类型：

可用的类型：　   
  二进制,同带binary前缀的效果 : BINARY    
  字符型,可带参数 : CHAR()     
  日期 : DATE     
  时间: TIME     
  日期时间型 : DATETIME     
  浮点数 : DECIMAL      
  整数 : SIGNED     
  无符号整数 : UNSIGNED
```
