# dw_db 层

## 说明

1、dw_db定义为数据仓库的汇总层，即DW_SUMMARY(DWS)

2、作用 明细层的汇总信息(基础指标类)、维度数据、数据字典(通用层数据)

3、数据粒度：汇总数据

4、命名规范：dw_[主题名称]_[描述]

## table design

- 房源主题
 - [dw_property_inventory](table-design/dw_property_inventory.md) 房源详细信息表(数据频率：天)
 - [dw_property_inventory_log_sd](table-design/dw_property_inventory_log_sd.md) 房源日志汇总表(数据频率：天)
 - [dw_property_inventory_sd](table-design/dw_property_inventory_sd.md) 房源汇总详细信息表(数据频率：天)
 - [dw_property_community_sd](table-design/dw_property_community_sd.md) 小区房源汇总信息表(数据频率：天)
 - [dw_block_sd](table-design/dw_block_sd.md) 板块房源汇总信息表(数据频率：天)
 - [dw_property_article_log_daliy](dw_property_article_log_daliy.md) 补文档


- 用户主题
 - [dw_user_browsing_metrics_sd](table-design/dw_user_browsing_metrics_sd.md) 用户当天浏览汇总信息表(数据频率：天)
 - [dw_user_conduct_sd](table-design/dw_user_conduct_sd.md) 用户行为汇总信息表(数据频率：天)
 - [dw_user_log_sd](table-design/dw_user_log_sd.md) 用户日志汇总信息表(数据频率：天)
 - [dw_user_mapping_relations](table-design/dw_user_mapping_relations.md) 用户与Guid映射信息表(数据频率：天)

- 经纪人
 - [dw_broker_sd](table-design/dw_broker_sd.md) 经纪人基本信息汇总表(数据频率：天)

- 连接
 - [dw_connection_sd](table-design/dw_connection_sd.md) 连接表

- 日志
 - [dw_app_access_log](table-design/dw_app_access_log.md) access_log
 - [dw_web_visit_traffic_log](table-design/dw_web_visit_traffic_log.md) uba_visit_log
 - [dw_sem_baidu_sd](table-design/dw_sem_baidu_sd.md) baiduSem 日 summary
 - [dw_sem_sd](table-design/dw_sem_sd.md) 请 check thanks

- 交易数据
 - [dw_business](table-design/dw_business.md)

- 维表

  - [dw_basis_common_data_dictionary](table-design/dw_basis_common_data_dictionary.md) 通用层数据字典
  - [dw_basis_dimen_action_id_name_lkp](table-design/dw_basis_dimen_action_id_name_lkp.md) 用户行为字典表
  - [dw_basis_dimen_action_page_lkp](table-design/dw_basis_dimen_action_page_lkp.md) 用户动作对应页面表
  - [dw_basis_dimension_app_dwudid_daily](table-design/dw_basis_dimension_app_dwudid_daily.md) app fud 维表
  - [dw_basis_dimension_delivery_channels_package](table-design/dw_basis_dimension_delivery_channels_package.md) 渠道维表
  - [dw_basis_dimension_filter_agent](table-design/dw_basis_dimension_filter_agent.md) 爬虫维表
  - [dw_basis_dimension_filter_ip](table-design/dw_basis_dimension_filter_ip.md) IP 黑名单表
  - [dw_basis_dimension_mobile_dwudid_daily](table-design/dw_basis_dimension_mobile_dwudid_daily.md) touch web fud 表
  - [dw_basis_dimension_pagename_lkp](table-design/dw_basis_dimension_pagename_lkp.md) page name 维表
  - [dw_cal_dt](table-design/dw_cal_dt.md) 日期维表(20150609废除,请使用新的 日期维度表 dw_cal)
  - [dw_cal](table-design/dw_cal.md) 日期维度表
  - [dw_basis_dimension_tag_class](table-design/dw_basis_dimension_tag_class.md) 标签分类维度表
  - [dw_basis_dimension_url_host](table-design/dw_basis_dimension_url_host.md) URL主域名分类
