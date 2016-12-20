# Hadoop Big Data

## 说明文档
- CDH
 - [CDH 说明](cdh/cloudera-info.md)
 - [CDH apt-get 方式安装](cdh/cloudera-ubuntu-packages.md)
 - [CDH tar 源码包方式安装](cdh/cloudera-centos-tar.md)
 - [CDH 升级](cdh/upgrading-cdh.md)  
 - [CDH 硬件](cdh/hardware.md)
- 子项目
 - [hadoop](sub-project/hadoop/)
 - [Spark](sub-project/spark/)
 - [flume](sub-project/flume/)
 - [hive](sub-project/hive/)
 - [sqoop](sub-project/sqoop/)
 - [zookeeper](sub-project/zookeeper/)

## 一、简介

### 1、Haoop 的 Cloudera 发行版本
```
1.1) Cloudera 是 Hadoop 整合后的一个稳定的版本，相对于 Apache Hadoop 来说更加稳定，更新更快，支持 Yum/apt-get tar rpm 包管理，官方建议使用 Yum/apt-get 管理，这样就无需寻找对应版本的 Hbase 等。

1.2) Hadoop的发行版除了社区的Apache hadoop外，cloudera，hortonworks，mapR，EMC，IBM，INTEL，华为等等都提供了自己的商业版本。商业版主要是提供了专业的技术支持，这对一些大型企业尤其重要。每个发行版都有自己的一些特点，本文就Cloudera发行版做介绍。

1.3) CDH5 版本介绍
CDH4在Apache Hadoop 2.0.0版本基础上演化而来的
CDH5，hadoop2.5

```

### 2、运行模式
Hadoop有三种运行模式：

| 1 | 2 | 3 |
| ------ | ------------ | -----|
| 单机（非分布）运行模式 | 伪分布运行模式 | 分布式运行模式|


### 3、分支
```
3.1) 其中从0.20.x 分支发展出来的是：hadoop1.0，CDH3

3.2) 从0.23.x 分支发展出来的是：hadoop-alpha，CDH4

3.3) cloudera CDH3基于hadoop稳定版0.20.2，并集成很多补丁（patch）

3.4) CDH4是基于Hadoop0.23的，但是它采用新的MapReduce，即MapReduce2.0，又叫Yarn。

3.5) CDH4的安装要求：64位的Red Hat Enterprise Linux5.7，CentOS5.7，Oracle Linux5.6,32位或64位的Red Hat Enterprise Linux6.2和CentOS6.2等。
```

## 二、Apache Hadoop 和 Hadoop 生态圈
基本都是小动物的名字，是不是很有爱。
ZooKeeper 动物园管理员O(∩_∩)O~

| 软件名称 | 解释说明 |
| ------ | ------------ |
| MapReduce | 分为map(寻址查询) reduce(计算统计)，把任务分割成很多块进行分批处理  |
| HDFS | hadoop 的分布式文件系统，hadoop的基础数据存储方案 |
| Pig | 数据流语言和编辑器，为 map 和 reduce 函数提供的封装操作，比如 Java 书写 mapreduce |
| Hive | 在大数据集合上的类SQL查询和表(关系型数据库) |
| Hbase | NoSql 数据库，面向列的分布式数据库，实时随机读/写超大规模数据集 |
| ZooKeeper | 是Hadoop的分布式协调服务，通讯协调工具 |
| Sqoop | 导入导出传统关系型数据库到Hadoop集群，从而可以进行分析 |
| Hue | 可视化 Hadoop 应用的用户接口框架和 SDK |
| Flume | 高可靠、可配置的数据流集合 |
| Chukwa | 定期抓去数据源到 Hadoop 中 |
| Oozie | Oozie是一个工作流引擎服务器,用于运行Hadoop Map/Reduce和Pig 任务工作流.同时Oozie还是一个Java Web程序,运行在Java Servlet容器中,如Tomcat. 参考：http://www.open-open.com/lib/view/open1328413117624.html |


## 三、Hadoop 分布式文件系统

### 1、HDFS概念
```
1.1) HDFS工作的块 > 单个磁盘的块，减少寻址时间

1.2) HDFS工作的块 < 集群的总节点块，会变得很慢
```

### 2、namenode 和 datanode
HDFS有2类工作节点
```
2.1) namenode 管理者
管理文件系统给的命名空间，维护文件系统的树及整棵树内所有的文件和目录(这个节点挂了基本就跪了,所以做好备份操作,切记！！！)

2.2) SecondaryNameNode 辅助 NameNode

SecondaryNameNode（下称SNN）的主要功能是工作是帮助NameNode（下称NN）合并编辑日志，然后将合并后的镜像文件copy回NN，以减少NN重启时合并编辑日志所需的时间。SNN不是NN的热备，但是通过以下步骤可以实现将SNN切换为NN的目的。首先，SNN节点上导入从NN Copy过来的镜像文件，然后修改SNN机器名和IP与NN一致，最后重启集群。

特别注意的是SNN的内存配置要与NN一致，因为合并编辑日志的工作需要将metadata加载到内存完成。另外，不仅仅是SNN，任何保存NN镜像的节点都可以通过上面步骤变为NN，只是SNN更适合罢了。

监控 HDFS 状态的辅助后台程序
每个集群都有一个
与 NameNode 进行通讯，定期保存 HDFS 元数据快照
当 NameNode 故障可以作为备用 NameNode 使用


注意：无法使用自动切换，需要手动切换。


2.3) datanode 工作者
是文件系统的工作节点，定期向namenode发送他们所存储块的列表
```

### 3、接口
```
3.1) Thrift
把Hadoop文件系统包装成一个Apache Thrift服务来弥补（除了java语言），其他语言的不足。
具有绑定(binding)的语言都能轻松访问Hadoop文件系统

支持的语言包括:
C++、Perl、PHP、Python、Ruby

3.2) C语言

3.3) FUSE 用户控件文件系统
通过挂载实现功能与HDFS的文件系统进行交互

3.4) WebDAV
通过扩展HTTP，支持文件的编辑语文件的更新。可以作为文件系统进行挂载。  

3.5) 其他的HFDS接口(50)
a) HTTP
嵌入在namenode中的Web服务器，运行在50070端口上，以XML格式提供目录列表服务。
嵌入在namedata中的Web服务器，运行在50075端口上，提供文件数据传输服务。

b) FTP
该接口允许使用FTP协议与HDFS进行交互
```


## 四、MapReduce的工作机制

### 1、运行机制
客户端：提交MapReduce作业

jobtracker : 协调作业的运行。

tasktracker: 运行作业划分后的任务。

分布式文件系统：一般为HDFS ，用来与其他实体间共享作业文件

```
jobtracker : 协调作业的运行，jobtracker 是一个 Java 应用程序，他的主类是 JobTracker。

tasktracker : 运行作业划分后的任务，tasktracker 是 Java 应用程序，他的主类是 TaskTracker
```

### 2、shuffle和排序
系统执行排序的过过称---将Map输出作为输入传给reduce---成为shuffle

如果需要优化MapReduce,shuffle属于不断被优化和改进的一部分。


### 3、注意MapReduce处理小文件的策略
```
尽量避免许多小文件，小文件增加寻址次数，大量的小文件会浪费namenode内存。
其中一个减少大量小文件的方法是使用 SequenceFile 将这些小文件合并成一个或者多个大文件。
```


## 五、构建Hadoop集群

### 1、硬件标准

| 组件 | 参数 |
| ------ | ------------ |
| 处理器 | 2个四核 2 ~ 2.5 GHz CPU |
| 内存 | 16 ~ 32 GB ECC RAM |
| 存储 | 4 x 1T SATA 硬盘 |
| 网络 | 千兆以太网 |

### 2、不要使用RAID
HDFS 已经有了一套分布式文件的管理策略，使用RAID反而会降低速度。


### 3、需要在unix环境下执行
这无需说什么


### 4、数据增长
假如数据每周增长 1TB，如果采用三路 HDFS 复制技术，曾每周需要增加 3TB 存数能力。再加上一些中间件和日志文件(约 30%)，基本相当于每周增加一台机器。以这种速度，保存2年的数据大约需要100太机器。

### 其他
使用ECC内存，根据部分一些资料和反馈，使用了非ECC内存时，会产生检验和错误。


### 优秀文章推荐
http://blog.fens.me/series-hadoop-family/
