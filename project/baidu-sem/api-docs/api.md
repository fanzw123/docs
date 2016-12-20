# API 文档

## API

### 1、申请条件

- 需要百度 api 支持,获取所有投放到百度的关键词数据
 - [申请 api 条件](http://yingxiao.baidu.com/support/api/detail_10933.html)
- 需要了解:
 - [搜索推广本身文档](http://yingxiao.baidu.com/support/fc/index.html)


### 2、API 相关

#### 2.1 基本文档

- [文档地址](http://dev2.baidu.com/docs.do?product=2#page=)
- [Web Service 和 SOAP](http://baike.baidu.com/view/67105.htm?fromtitle=Web%E6%9C%8D%E5%8A%A1&fromid=2837593&type=syn)


#### 2.2 详细文档

- [v4文档](http://dev2.baidu.com/docs.do?product=2#page=File5)


## Service 概括

目前我们用到的是
- 计划服务 CampaignService
- 单元服务 AdgroupService
- 关键词服 务KeywordService
- 报告服务 ReportService


``` docs
账户服务AccountService：

获取账户ID，投资、消费、余额等财务数据、推广域名和开放域名； 获取和设置账户日预算和周预算、推广地域、IP排除等；

计划服务CampaignService：

通过增加、删除、修改、查询计划的信息，用于管理账户下的任意的推广计划，包括计划的名称、预算、投放地域、IP排除、否定关键词、暂停时段、暂停/启动，或者设置投放设备、设置移动出价比例等。


单元服务AdgroupService：

通过增加、删除、修改、查询单元的信息，用于管理计划下的任意的推广单元，包括单元的名称、预算、投放地域、IP排除、否定关键词、暂停时段、暂停/启动，或者设置投放设备、设置移动出价比例等。


关键词服务KeywordService：

通过增加、删除、修改、查询关键词的信息，用于管理账户下任意的关键词； 例如，您可以批量获取和修改某些关键词的出价、PC访问URL、移动访问URL、匹配模式、暂停/启用、激活状态等属性。


创意服务CreativeService：

通过增加、删除、修改、查询创意的信息，用于管理账户下任意的创意； 例如，您可以批量获取和修改某些创意的标题、描述、PC访问与显示URL、移动访问与显示URL、暂停/启用等属性。


新创意（蹊径）服务NewCreativeService： 通过增加、删除、修改、查询蹊径的信息，用于管理账户下任意的蹊径创意； 例如，您可以批量获取和修改某些蹊径创意的标题、描述、PC访问与显示URL、移动访问与显示URL、暂停/启用等属性。


批量工具服务BulkJobService：

按照指定范围打包获取目前计划、单元、关键词、创意、新创意的计算机和无线推广信息； 按照指定范围打包获取从某天至今有变化的计划、单元、关键词、创意、新创意的计算机和无线推广信息。


报告服务ReportService：

通过设定时间、统计类型与范围、报告类型、统计时间单位等信息，获取相应的报告； 目前支持的报告类型有：账户报告、计划报告、单元报告、关键词报告、创意报告、配对报告、地域报告、搜索词报告。


关键词工具服务KRService：

提供自动分组功能


搜索服务SearchService：

提供账户结构搜索功能


监控文件夹服务FolderService：

通过增加、删除、修改、查询监控文件夹的信息，用于管理账户下任意的监控文件夹； 例如，您可以批量获取和修改监控文件夹所含的监控关键词。


搜索再营销服务SearchRemarketService：

完成对搜索再营销的新增、修改、删除操作，包括新建再营销计划、新建搜索人群、修改人群、修改人群和计划的绑定关系，删除搜索人群等。 获取搜索再营销的信息，包括全部再营销计划信息、全部人群信息、搜索人群信息。
```
