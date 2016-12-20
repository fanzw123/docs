# DW 工作流程

## 确立需求

- 需求方提出需求后
- 与需求方确认，是否要其他人员参与到此项目中，确认所有需要参与的人
- 找齐需要的人员，一起与需求方研究、讨论，搞清楚需求
- 确认需求、确认参与人员

## 技术执行

- 所有参与的人员一起评估出所需的时间，通知 BI 部门
- 分配任务模块给参与人员
- 设计，开发大模块需要做到 2 版设计
 - 构架设计 ：这个需求总的设计流程图，做到其他工程师看到你的设计，就可以知道是做什么的
 - 代码设计 ：分析代码书写层面，会出现的各种技术问题，并且把解决方案写到设计里面
- 动手书写
 - 按照设计来书写、按照设计流程规范你的代码
 - 书写完成，提交代码给小组人员 code review ，改进
 - code review 复审后，修改复审，直到通过为止
- 测试
 - 首先你要完成自测，这样可以避免大部分问题，不测试的代码绝对不可以上线
 - 如跨部门，大项目，需要的测试，联系 QA 部门统一测试
- 上线
 - 对代码进行过 code review，自测或 QA 确认的代码
 - 具体上线流程，请查看 [git 上线流程](technology/git-docs/git-doc.md)
- 监控
  - 如需要每天执行的脚本，每个脚本的负责人，负责监控自己的脚本的运行状态
  - 出现问题及时解决，思考为何出现问题的源头，解决

## 通告通知

- 代码上线后，邮件方式通知需求方
- 提供技术指导或文档，给需求方
- 及时处理需求方使用过程中的问题


## 更详细的规范
- [查看 specification](specification.md)
- [优秀文章](http://mp.weixin.qq.com/s?__biz=MjM5MDI1ODUyMA==&mid=209388935&idx=1&sn=ddd722155fb55fef3fcc5e13992343ef&scene=1&key=af154fdc40fed0032a7d8f5b730d1fdb0de8acc8ba3cd085572f39789ba501ed78b5b12aca7df63cb1a806410ec08f2f&ascene=0&uin=MTQyOTE3MDk4MA%3D%3D&devicetype=iMac+MacBookPro11%2C1+OSX+OSX+10.10.3+build(14D136)&version=11020012&pass_ticket=YTgmKfS3CuxkX6oswMvi5Wo1lVrAW45Whx0FHHHdDup4W1xJ8qmlIb0k8gsFh06S)
