# 执行流程及故障处理


## `* 基础平台快速连接`

- [Scheduler 调度](http://dw.corp.angejia.com/monitor/findSchedulerListAction)
- [MiniReport](http://dw.corp.angejia.com/monitor/mini/report/list)
- [extract_run 同步 mysql](http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=31)
- [uba_log 日志](http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=36)


## 一、执勤流程

- 每天 6.30 查看监控邮件
- 一人一周, 轮询, 如有特殊情况提前交接

### 1. 监控邮件

``` xml
1) 监控 - scheduler 日报 2.0

2) 监控 - extract 日报 1.0

3) 监控 - 数据质量 1.5

4) 监控 - minireport 日报
```

### 2. 出现意外情况通知人员

- Jason
- 志强
- ray
- 周治

```
每次排查后，发送邮件到 bi 邮件组

报告内容：
  1.监控邮件报告(警告、报错的内容)
  2.JOB 运行状态报告 (出错的 job 异常、错误的脚本名称和地址)
  3.MiniReport (出错的的报表名称和地址)
  4.报告日期，移交给下次执勤人要注意的事项
```


## 二、事故排查流程

### 1、JOB 调度排查(bi3)

``` sh
1) 无调度日志 (http://dw.corp.angejia.com/monitor/searchSchedulerLogsAction)
  解决方案 :
  1.查看 bi3 调度系统 log ,分析大致原因
    ssh -t dwadmin@10.10.2.91 '/usr/bin/ssh dwadmin@bi1'
    tail -f /data/log/dwlogs/schedule_log/schedule_info.log
  2.解决后重启调度
    ~/app/tools/dw_script/scheduler_restart.sh

2) 查看 "出错" 调度的日志的报错内容
 可能出现的问题:
 1.HQL 存储过程错误
  排查依赖，修改 HQL 存储过程
 2.HIVE 服务错误
  参照 1) 解决


3) 基础 etl 数据不存在
  uba log 无数据
    重跑：http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=36
  extract_run 无数据
    重跑：http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=31
```


### 2、MiniReport 排查(bi1)

``` sh
1) 存储过程表不存在，或者无数据
  排查依赖，修改 HQL 存储过程

2) 系统错误，查看日志
  根据错误日志决定重启的脚本
  tail -f /usr/local/tomcat-7/logs/catalina.out 查看日志
  ~/app/monitor/script/monitor-restart.sh   重启 MiniReport

```

### 3、dw_hive_server 排查(bi3)

``` sh
1、hvie server master 日志，根据错误日志决定重启的脚本
  tail -f /data/log/dwlogs/jetty_log/hive-server.out  

2、尝试重启 dw_hive_server  
  ~/app/dw_hive_server/dwetl/dw-server-restart.sh   重启 hive server master 服务

3、分析错误日志，联系 ucloud 的负责人
  1.紧急负责人
   王冬冬 电话 (186 2126 8125)
  2.或者 QQ 群
```


## 三、事故影响消除流程

### 通告需求方

```
1、确定大致问题原因
2、确定影响数据范围（房源数据，经纪人数据等）
3、发送邮件说明以上问题，（mgr; 产品经理们; 市场部邮件组; 业务运营邮件组; 业务中心邮件组; BI）
4、邮件内容：
    hi，all
    由于 *** 原因，导致 *** 数据出现问题，
    数据会在 *** 恢复, 带来的不便敬请见谅
```
