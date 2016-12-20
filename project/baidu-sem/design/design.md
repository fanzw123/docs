# 百度 SEM 推广文档

## 需求

- 根据客户输入的关键词，点击进入我们安个家站内后，统计这个关键词的
  - PV
  - UV
  - VPUV
  - VPPV
- 需要定位关键词所在，计划-分组-关键词(关键词是最细的统计力度)


## 设计思路

流程

```
1、通过 API 获取数据
  获得其中的展示量、计划、分组、关键词、以及目标 URL 中 百度 pi (市场会维护 url 中的百度 pi)

2、计算 hive 中
  包含百度 pi 的访问记录，计算这个 pi 的 pv,uv,vpuv,vppv 按照按照 pi 分组

3、把 API 的数据和 hive 中的数据，按照 pi 关联，组合成一张百度搜索词数据表

```

java 伪代码

``` java
//如何初始化Service
CommonService factory = ServiceFactory.getInstance();
	factory.setServerUrl("https://api.baidu.com");
        factory.setUsername("yourname");
        factory.setPassword("yourpwd");
	factory.setToken("yourtoken");
        factory.setTarget("yourtaget");
	factory.setAccessToken("youraccesstoken");
	CampaignService service = factory.getService(CampaignService.class);


//CommonService factory = ServiceFactory.getInstance();
  //获取数据信息
	GetAllCampaignIdRequest parameters = new GetAllCampaignIdRequest();
	GetAllCampaignIdResponse res = service.getAllCampaignId(parameters);


//循环获取数据
  for (int i=0;i<=res.size();i++) {
    String campaignId = String.valueOf(res.get(i).getCampaignId());
    String campaignName = res.get(i).getCampaignName();
  }

```
