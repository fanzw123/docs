# saiku调研
## saiku 官方简介

  Saiku创建于2008年，最初作为一个代替 Cluncky JPivot的测试项目。，起初是基于 ` OLAP4J 库 ` 用GWT包装的一个前端分析工具。
  Saiku是一个轻量级的 ` OLAP分析引擎 `，可以方便的扩展、嵌入和配置。Saiku通过REST API连接OLAP系统 ，利用其友好的界面为用户提供直观的分析数据的方式。它的界面使用HTML、CSS和Javascript实现，从而使得它非常容易自定义。通过使用REST的标准，服务器可以很容易地集成到不同的用户界面和第三方应用程序上，唯一的要求是第三方应用程序可以发送和接受HTTP通信和接收JSON格式的数据。客户端程序不需要了解MDX和相关的查询语言。
  
Saiku offers a user friendly, ` web based analytics solution `  that lets users, quickly and easily ` analyse corporate data ` and ` create and share reports ` .
The solution connects to a range of OLAP Servers including `Mondrian`, Microsoft Analysis Services, SAP BW and Oracle Hyperion 

	  Saiku有两个版本：企业版SaikuEE、社区版SaiKuCE
 	  EE比CE多了个功能：Saiku Schema Designer（Cube设计工具）

## saiku到底是什么?
   从简介里得到的几个关键词 `JPivot `  ` LOAP4J `  ` OLAP分析引擎 ` `Mondrian` ` 基于web的分析工具 `  `创建、展示报表`

 1、 saiku的理解：saiku是建立在 ` mondrian ` 之上的基于web的OLAP分析工具。

 2、下图中右上脚的位置
 
 ![arch_mondrian](../imgs/arch_mondrian.png) 

## Saiku的功能

### 一、报表分析
查询界面

![query](../imgs/saiku-query.png  "saiku query")

展现方式

![query2](../imgs/saiku-query2.png  "saiku query2")


### 二、用户管理
1、in memory authentication

2、JDBC authentication

3、LDAP authentication：使用Spring  Securuty 框架实现