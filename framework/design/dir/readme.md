# Dw 目录划分

## 一、层次结构

- 项目: 为了解决项目流程上提供的解决方案
- 组件: 为了解决项目流程中一组功能, 提供的解决方案
- 工具: 为了解决流程上, 组件中遇到遇到特定问题的解决方案

- 项目依赖于组件,组件依赖于工具

## 二、仓库划分

``` sh

├── monitor
├── recommend
├── dw_explorer
├── dw_webservice
├── dw_scheduler_agent
├── dw_hive_server
├── dw_hive_udf
├── dw_general_loader
    ├── dw_public_util
├── dw_etl
  ├── index.py
  ├── dw_core
  ├── uba_log
  ├── extract_mysql
  ├── monitor
├── dw_etl_java
  ├── baidu-sem
  ├── finebi


删除
├── recommend
    ├── dw_elasticsearch
├── report_design 成交地图
├── dw_etl
   ├── indicator_system
   ├── recommend
   ├── etl
   ├── clean

```
