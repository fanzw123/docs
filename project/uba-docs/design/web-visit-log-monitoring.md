# web-visit-log 日志监控

监控：每日的运行脚本的信息，回馈给监控者

报警：出错后报警回馈给监控者

## 一、说明
针对 web-visit-log 日志进行的监控

文档地址：
[web-visit-log 文档](web-visit-log.md)

## 二、设计

### 1、监控日志文件是否传送到 hdfs 中
每次跑过 log-to-hdfs.sh 这个脚本后，如正常日志就移动到了 hadoop hdfs 中，但有时会发生一些无法预料的事情，这时我们需要一个监控脚本保证我们的数据是正常导入的。

```
#记录日志文件目录
{date} = 20150320;

ls /var/log/uba/
/var/log/uba/uba_web_visit_{date}.log

hadoop dfs -ls /user/hive/uba_log/uba_web_log/uba_web_visit_log/uba_web_visit_log_{date}/uba_web_visit_{date}.log

验证{date}日志文件和 hdfs 中的文件是否一样，如果缺少一个 emial 报警邮件
```

### 2、监控日志文件条数和 hive 数据条数
若文件完整性是没有问题的，需要验证导入的数据的行数正确性
```
grep -c "" /var/log/uba/uba_web_visit_{date}.log

#注 grep -c "" 和  wc -l 都可以
hadoop dfs -ls /user/hive/uba_log/uba_web_log/uba_web_visit_log/uba_web_visit_log_{date}/uba_web_visit_{date}.log | wc -l


2 个数据文件行数一样即可，不一样则报警
```

### 3、回滚操作
当出现了错误，我们需要一个脚本去重新跑这个脚本
```
#检测文件是否存在，若不存在，则重跑 log-to-hdfs.sh 脚本
hadoop dfs -ls /user/hive/uba_log/uba_web_log/uba_web_visit_log/uba_web_visit_log_{date}/uba_web_visit_{date}.log

```

### 4、邮件报警
http://blog.163.com/a12333a_li/blog/static/87594285201212042332551/

http://www.4wei.cn/archives/1001468
