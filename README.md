# 数据部文档

## `* Core 导读`

### 1、[数据仓库框架](framework/)

- [DW Service](framework/design/dw-service.md)
- [运行时间约定](framework/convention/run-time.md)

### 2、dw 数据仓库设计

- [数据仓库设计](service/data-warehouse/db-design/readme.md)
- [dw_db 固化层](service/data-warehouse/db-design/dw/dw_db)
- [da_db 应用层](service/data-warehouse/db-design/dw/da_db)

### 3、设计图

- [安个家 Log 收集体系](https://www.processon.com/view/link/582d82a9e4b06bc83a12082d)
- [安个家 应用服务分布](https://www.processon.com/diagraming/562756aee4b0da22d0957a05)
- [安个家 Flume 日志高可用收集](https://www.processon.com/view/link/5821bbd2e4b0826f839a4309)
- 安个家推荐系统
 - [CBCF](https://www.processon.com/view/link/56d3b2e7e4b0f9ea1683e1e5)
 - [UBCF](https://www.processon.com/view/link/572b224be4b0c3c749748e14)
 - [IBCF](https://www.processon.com/view/link/57397e57e4b06d79095044ad)
- [安个家 数据部规划](http://www.processon.com/mindmap/566a7d1ee4b0add117b3c531)
- 安个家 DB 数据抽取
 - [安个家 db 数据抽取](https://www.processon.com/view/link/57d8e4ede4b0e72a8d042d45)
 - [安个家 抽取流程控制](https://www.processon.com/view/link/57e9eb82e4b06bcb4cdf380e)
- 数据平台
 - [Yarn 工作原理图解](https://www.processon.com/view/link/56643e61e4b026a7ca2ac271)
 - [HDFS 工作原理图解](https://www.processon.com/view/link/56629a87e4b01db999f2f337)
 - [Hadoop 1.x Mapreduce 原理图解](https://www.processon.com/view/link/5664347fe4b026a7ca2a71a6)
 - [Mapreduce Shuffle 原理图解](https://www.processon.com/view/link/566d79e4e4b0187009265f4a)
 

## 一、[DW 服务相关文档](service)

### 1、[dw 数据仓库](service/data-warehouse/)

- [dw 数据仓库](service/data-warehouse/readme.md)
- [生产数据库设计](service/design/wikis/data/database)

### 3、[dw 流程](service/dw-process/)

- [dw 新人 todo list](service/dw-process/todo-list)
- [DW 工作流程](service/dw-process/todo.md)
- [dw 执勤蓝皮书](service/dw-process/accident-treatment.md)


## 二、[DW 项目工程文档](project/)

- [angejia_logs](project/angejia_log/) (安个家 项目文档)
- [uba-docs](project/uba-docs/) (uba 项目文档)
- [extract_run](project/extract_run/) (抽取脚本 项目文档)
- [baidu-sem](project/baidu-sem/) (baidu-sem 项目文档)
- [dw-monitor](project/monitor) 报表系统
- [dw-explore](project/dw-explore) 查询系统
- [dw_hive_server](project/dw_hive_server) Hive Server Master 服务
- [dw_scheduler_agent](project/dw_scheduler_agent) 调度服务
 - [node_socket_server](project/dw_scheduler_agent/node_socket_server) nodeJS socket_server 服务, 提供查询调度运行日志的服务
- [dw_general_loader](project/dw_general_loader) 项目开发组件
- [dw-hive-udf](project/dw-hive-udf)
- [dw_webservice](project/dw_webservice/) (数据接口文档)
 - [api](project/dw_webservice/api.md) (数据接口文档)
- [recommend](project/recommend/) (推荐系统 项目文档)
 - [user](project/recommend/user) (推荐系统 user 主题)
 - [inventory](project/recommend/inventory) (推荐系统 inventory 主题)
- [bi-portal](project/bi-portal/) (bi-portal)
 - [bi-portal 首页](project/bi-portal/index.md)
 - [action-log 体系](project/bi-portal/action-log.md)
- [report_design](project/report_design/) (成交地图项目)
- [business](project/business) 成交数据
- [finebi](project/finebi) finebi 报表工具

## 三、[DW 技术文档](technology/)

- [hadoop-docs](technology/hadoop-docs/) (大数据数据平台生态文档)
  - [hadoop](technology/hadoop-docs/sub-project/hadoop) (hadoop)
  - [hbase](technology/hadoop-docs/sub-project/hbase) (hbase)
  - [hive](technology/hadoop-docs/sub-project/hive) (hive)
  - [hue](technology/hadoop-docs/sub-project/hue) (hue)
  - [spark](technology/hadoop-docs/sub-project/hbase) (spark)
  - [sqoop](technology/hadoop-docs/sub-project/hbase) (sqoop)
  - [zookeeper](technology/hadoop-docs/sub-project/hbase) (zookeeper)
  - [kafka](technology/hadoop-docs/sub-project/kafka) (kafka)
  - [flue](technology/hadoop-docs/sub-project/flume) (flume)
- [Java-docs](technology/Java/) (java 文档)
  - [jvm](technology/Java/jvm.md) (jvm 文档)
- [Scala-docs](technology/scala/) (scala 文档)
  - [sbt](technology/scala/sbt.md) (jvm 文档)
- [python-docs](technology/python/) (python 文档)
- [shell-docs](technology/Shell/) (shell 文档)
- [git-docs](technology/git-docs/) (git使用文档)
- [Server](technology/Server/) (Linux 服务器文档)
- [Database](technology/Database/) (各类数据库文档)
- [algorithm](technology/algorithm/) (各算法文档)


## 四、[DW 工具](tools/)
- [etl-tool](tools/etl-tool) shell hive elt 脚本工具


## 其他
- [imgs](imgs/) (存放所有文档用到的图片)
- [files](files/) (存放所有文档用到的文件)
