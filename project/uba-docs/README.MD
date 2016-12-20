## uba -- 用户行为采集系统

### 系统相关名称
* 系统名称：uba（User behavior acquisition）
* 日志名称：uba_log
* 发音：[juba:]

### 系统定义：
* 通过接口形式收集用户的行为数据
* 将数据过滤并且格式化存储本地文件
* 将本地log文件上传至hdfs中
* 通过hive提供该日志文件的查询

### log层级关系
* 第一层：所有的log统称为uba_log，因此是最高层级
* 第二层：按照平台划分，web和app
* 第三层：按照log种类划分，visit和action
* hdfs存储uba_log次层级关系
* 层级见下图：

```
|-uba_log
	|-uba_web_log
		-uba_web_visit_log
		-uba_web_action_log
	|-uba_app_log
		-uba_app_action_log

```
### 系统架构
* [构架图](design/web-visit-log.md)
* [创建表](design/create-hive-table.md)
* [监控报警](design/web-visit-log-monitoring.md)
* [hive to mysql ](design/hive-to-mysql.md)



### 接口定义
* [webVisitApi](api/web-visit.md)
* [appActionLogApi](api/app-action-log.md)


### 三方约定（input、service、output）
* [TouchWeb](contract/web-contract.md)
* [appActionLog](contract/app_action_log.md)

### 其他
* [模块负责人](http://www.processon.com/view/link/5549cb4ae4b0cc33deaed814)，密码：angejiadocs
* [功能图](http://www.processon.com/view/link/5549d4bde4b0cc33deafa6c3), 密码：angejiadocs
* [job list](design/job-list.md)
