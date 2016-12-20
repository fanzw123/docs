# 2015 故障总结

## 一、2015 发生了

```
1. 系统级别
HDFS
  数据容量超过预期增长，导致提前进入系统的存储瓶颈

MaprReduce 类的错误
  JVM 内存溢出

Zookeeper
  连接超时，死锁

Hive
  metastore 服务器负载过高，导致崩溃

Spark
  过快上 Spark ,导致占用过多资源，整个集群的不稳定

2. 应用级别
HiveServer2
  多个应用部署在一台服务器上，导致 HiveServer2 堵塞卡死

dw scheduler
  底层 python 脚本本身逻辑 bug，导致调度机制出现问题


3. 使用级别
  改过的脚本，没有严谨测试就上线，导致第二天相关依赖的 etl 全部失败


4. 其他部门影响
  技术团队,修改了 nginx 配置,mysql 密码,数据表结构,没有通知到我们,导致我们的服务无法访问、etl 失败等


```

## 二、故障总结

```
2015 下半年估计发生了 13 次故障

系统级别 : 5 次,大部分是由于 Ucloud 的系统平台有部分缺陷导致

应用级别 : 2 次,本身软件潜在的一些 Bug 导致

使用级别 : 3 次,没有严谨按照测试流程上线,导致的问题

其他部门影响 : 3次,技术部修改了、或者本身的 Bug 间接影响
```


## 三、反思与成长

```
1. 对于系统级别的需要事先搞清楚产品架构，产品缺点、优点、使用场景，以及可能存在的问题，详细分析利弊

2. 对于应用级别，需要做好设计方案、CodeReview、线下测试一段时间后再放到线上

3. 使用级别,需要制定好 CodeReview ,至少需要 2 个人以上同意才可以上到生产环境中,改过的 etl 脚本必须亲自测试一下,才能上线

4. 其他部门影响,需要跟技术部门沟通解决这个问题,当有重大变动、调整，需要邮件、或者点对点通知到影响的负责人
```