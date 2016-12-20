# dw 数据仓库设计

## 结构

- [数据库设计说明](db-desgin.md)
- [HQL 语法规范](example.md)
- [dw 字典](dictionary.md)


### [dw](dw/) 结构
- [da_db](dw/da_db/) 应用层(MYSQL)
- [dw_db](dw/dw_db/) ETL 过程处理后的数据
  - [dw_summary](dw/dw_summary/) 各主题指标处理逻辑
- [dw_temp_angejia](dw/dw_temp_angejia/) minireport 用到的临时库

### [source](source/) 数据源
- [mysql](source/mysql) 业务 mysql 数据源
  - [db_sync](source/mysql/db_sync) 每日同步库
  - [db_gather](source/mysql/db_gather) 每日聚合快照数据库
- [log](source/log) 日志文件
  - [access_log](source/log/access_log) nginx access log
  - [uba_app_action_log](source/log/uba_app_action_log) app 用户行为日志
  - [uba_web_action_log](source/log/uba_web_action_log) web 用户行为日志
  - [uba_web_visit_log](source/log/uba_web_visit_log) web 用户访问行为日志
