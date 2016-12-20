# uba 用户日志收集设计说明

## 一、概述
网站日志文件是网站数据分析的基础，长期的日志收集有利于阶段性对网站进行数据分析，提高网站设计的合理性。


## 二、设计图

![image](../../imgs/web-visit-log.png)
![image](imgs/web-visit-log.png)


## 三、设计步骤

### 1、前端请求
js 请求 php 异步脚本，把 query string 和 parameter ，发送给日志服务器(s.angejia.com)

### 2、日志服务器
日志服务器由 nginx + php-fpm 构成，调用 uba.php 程序处理

### 3、uba.php 程序处理
```
1) 合并 $_GET,$_POST


2) 验证参数
注：{date} 表示当天日期，如 20150316
a) 成功
   写入 uba_web_visit_{date}.log

b) 失败
  写入 uba_web_visit_invalid_{date}.log

每行写入的格式如下。
{a:2,b:3,c:4}
```

### 4、shell 脚本发送 log to hdfs
```
在日志文件服务器中
每天 00.05 分把前天的日志放到 hadoop hdfs 下

{last_date} 表示昨天的日期，如 20150315

线下
uba_basic_dir=hdfs://192.168.160.45:8020/user/hive/uba_log
${uba_basic_dir}/uba_web_log/uba_web_visit_log/uba_web_visit_log_${last_date};

线上：
uba_basic_dir=/umr-jdlg4d/hive/uba_log
${uba_basic_dir}/uba_web_log/uba_web_visit_log/uba_web_visit_log_${last_date};
```

### 5、hadoop 集群导入 {last_date} 的日志到 hive table 中
hive 解析日志文件的每行 json 数据，然后根据 json 的 key 写入到对应的字段中。


##四、代码实现

### 1、uba.php 处理脚本
* [uba.php 统一入口文件](https://git.corp.angejia.com/dw/uba/tree/master/scripts/service/uba.php)
* [Web.class.php ](https://git.corp.angejia.com/dw/uba/tree/master/scripts/service/lib/Web.class.php)
* [Core.class.php](https://git.corp.angejia.com/dw/uba/tree/master/scripts/service/lib/Core.class.php)

### 2、shell 脚本处理
* [creat-daily-table 创建表](https://git.corp.angejia.com/dw/uba/tree/master/scripts/shell/uba/creat-daily-table.sh)
* [log-to-hdfs.sh 导入日志到hdfs](https://git.corp.angejia.com/dw/uba/tree/master/scripts/shell/uba/log-to-hdfs.sh)
