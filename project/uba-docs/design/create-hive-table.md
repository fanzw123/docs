## 定期创建HIVE表

### 思路
* 建表需要的json.jar已经加载进ucloud提供的hive
* 先创建模板表
* 每天根据模板表克隆未来三天的表

### 添加jar
* 文档：https://code.google.com/p/hive-json-serde/wiki/GettingStarted
* 让beeline可用该jar：

```
/etc/hive/conf/hive-site.xml
  <property>
    <name>hive.aux.jars.path</name>
    <value>file:///etc/hive/auxlib/hive-json-serde-0.2.jar</value>
  </property>
  
```
### beeline连接线上hiveservice2
* !connect jdbc:hive2://10.10.3.11:10000/default;principal=hive/uhivetayokf@UCLOUD.CN
* !connect jdbc:hive2://10.10.3.11:10000/uba_web_visit_log;principal=hive/uhivetayokf@UCLOUD.CN

### 定时执行sheel脚本
* 每次执行建立三天的表
* 先生称hql语句文件
* 用beeline -f 命令执行该文件
* 数据库名可以配置，配制后为该库简历3天的表

---

## uba_web_visit_log
### 建立hdfs目录
* 线上环境
	* dfs -mkdir /umr-jdlg4d/hive/uba_log/uba_web_log/uba_web_visit_log
* 线下环境
	* dfs -mkdir /user/hive/uba_log/uba_web_log/uba_web_visit_log


### 数据库建立
* [log层级关系](../../README.MD#)
* 建数据库语句

```
create database uba_web_visit_log 
LOCATION '/umr-jdlg4d/hive/uba_log/uba_web_log/uba_web_visit_log';
```

### 模板表建立

```
CREATE TABLE IF NOT EXISTS uba_web_visit_log_model (
uid string, 
ccid string, 
referer string, 
url string,
guid string,
client_time string,
page_param string,
client_param string,
server_time string,
ip string,
agent string 
) ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.JsonSerde';
```

### 日期表建立

```
CREATE TABLE IF NOT EXISTS uba_web_visit_log_yyyymmdd like uba_web_visit_log_model;
```

---

## access_log

### 建立hdfs目录
* 线上环境
	* dfs -mkdir /umr-jdlg4d/hive/access_log/
* 线下环境
	* dfs -mkdir /user/hive/access_log/

### 数据库建立
* 建数据库语句

```
线上：
create database access_log 
LOCATION '/umr-jdlg4d/hive/access_log';
线下：
create database access_log 
LOCATION '/user/hive/access_log';
```

### 模板表建立

```
CREATE TABLE access_log_model (
    request_time string,
    upstream_response_time string,
    remote_addr string,
    request_length string,
    upstream_addr string,
    server_date string,
    server_time string,
    hostname string,
    method string,
    request_uri string,
    http_code string,
    bytes_sent string, 
    http_referer string,
    user_agent string,
    gzip_ratio string,
    http_x_forwarded_for string,
    auth string,
    mobile_agent string
    )
row format SERDE 'org.apache.hadoop.hive.contrib.serde2.RegexSerDe'
WITH SERDEPROPERTIES ("input.regex" = "([^\\t]*)\\t([^\\t]*)\\t([^\\t]*)\\t([^\\t]*)\\t([^\\t]*)\\t\\[(.+?)T(.+?)\\+.*?\\]\\t([^\\t]*)\\t([^\\s]*)\\s([^\\s]*)\\s[^\\t]*\\t([^\\t]*)\\t([^\\t]*)\\t([^\\t]*)\\t([^\\t]*)\\t([^\\t]*)\\t([^\\t]*)\\t([^\\t]*)\\t([^\\t]*).*","output.format.string" = "%1$s %2$s %3$s %4$s %5$s %6$s %7$s %8$s %9$s %10$s %11$s %12$s %13$s %14$s %15$s %16$s %17$s %18$s")
STORED AS TEXTFILE;
```

### 时间问题的解决
	时间（yyyy-mm-dd H:i:s）被拆成2个字段，日期和时间
	如果需要完整的，请使用concat(date,' ',time)

### 日期表建立

```
CREATE TABLE IF NOT EXISTS access_log_yyyymmdd like access_log_model;
```

### 日志文件存放路径

```
线上：
/umr-jdlg4d/hive/access_log/access_log_yyyymmdd
线下：
/user/hive/access_log/access_log_yyyymmdd
```