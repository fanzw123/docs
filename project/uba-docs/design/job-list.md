# 所有 Job 列表

## 业务介绍

- uba log
 - uba web log
 - uba access log
- mysql data
  - sync 同步库
  - snapshoot 快照库
  - gather 聚合库


## uba log 相关

### 部署机器

```
dw_admin
10.10.2.91

```

### 相关 Job

调度时间 ：每天 00:01 运行一次

```
run.sh
启动脚本

creat-daily-table.sh
创建 uba_web table 和 access table

log-to-hdfs.sh
导入文本日志到 hadoop hdfs 中

analysis-hive-to-result-hive.sh
通过 hive uba log 和 hive access log 生成 hive gather 表

hive-to-mysql.sh
把 hive gather table 解析后的数据导入到 mysql table 中

monitoring.sh
监控 uba log 和 access log 数据量，发送报警邮件
```


## mysql data

### 部署机器
```
dw_admin
10.10.2.91

```

### 相关 job

调度时间 ：每天 01:00 运行一次

```
sync-run.sh
启动脚本


mysql-to-hive-sync.sh
导入 mysql 到 hive table 中，按照需求生成快照表


ather-table.sh
把每天的快照表，生成为聚合表

```

## 其他

### 监控 hiveServer2 状态

调度时间 ：每 5 分钟运行一次

```
monitoring-hiveServer2.sh
心跳检测 hiveServer2 连接状态
```

## 相关负责人请看

[查看](http://www.processon.com/view/link/5549cb4ae4b0cc33deaed814) 密码 ： angejiadocs
