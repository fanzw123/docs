# Flume Develop

- Flume-OG 老版本
- Flume-NG 重构后的新版本
- 本文档以 Flume-NG 说明


## 一、什么是 Flume

- 收集日志发送到 HDFS,Kafka,本地文件


## 二、安装

``` sh
1. 下载 flume
  mkdir -r /data/usr/src
  mkdir -r /data/usr
  cd /data/usr/src
  wget http://archive.cloudera.com/cdh5/cdh/5/flume-ng-1.5.0-cdh5.4.4.tar.gz

2. 安装
  cd /data/usr/src
  tar -zxvf flume-ng-1.5.0-cdh5.4.4.tar.gz
  mv apache-flume-1.5.0-cdh5.4.4-bin /data/usr
  sudo ln -s /data/usr/apache-flume-1.5.0-cdh5.4.4-bin /usr/local/flume

3. 环境配置
  vim ~/.bashrc

  # Flume
  export FLUME_HOME=/usr/local/flume

  export PATH=$FLUME_HOME/bin:$PATH

4. 生效
  source ~/.bashrc

5. 启动脚本
  ${FLUME_HOME}/bin/flume-ng agent --conf ${FLUME_HOME}/conf/ -f ${FLUME_HOME}/conf/flume.conf -n agentBi0 -Dflume.root.logger=DEBUG,console
```


## 三、Flume 结构

- Event：一个数据单元，带有一个可选的消息头
- Flow：Event从源点到达目的点的迁移的抽象
- Client：操作位于源点处的Event，将其发送到Flume Agent
- Agent：一个独立的Flume进程，包含组件Source、Channel、Sink
- Source：用来消费传递到该组件的Event
- Channel：中转Event的一个临时存储，保存有Source组件传递过来的Event
- Sink：从Channel中读取并移除Event，将Event传递到Flow Pipeline中的下一个Agent（如果有的话）

- [Flume Source](http://flume.apache.org/FlumeUserGuide.html#flume-sources) 收集各种数据源
  - avro、exec、netcat、spooling-directory、syslog 等
  - [Flume Source Interceptors](http://flume.apache.org/FlumeUserGuide.html#flume-interceptors)  将 source event(每行/条) 数据提取出来, 加入到 header 中
    - Timestamp Interceptor 将当前时间戳（毫秒）加入到 events header 中，key 名字为：timestamp，value 值 : 为当前时间戳
    - Host Interceptor  主机名拦截器。将运行Flume agent的主机名或者IP地址加入到events header中，key名字为：host（也可自定义）
    - Static Interceptor  静态拦截器，用于在events header中加入一组静态的key和value。
    - UUID Interceptor  在每个events header中生成一个UUID字符串，例如：b5755073-77a9-43c1-8fad-b7a586fc1b97。生成的UUID可以在sink中读取并使用
    - Morphline Interceptor  使用 Morphline 对每个 events 数据做相应的转换
    - Search and Replace Interceptor  将 events 中的正则匹配到的内容做相应的替换
    - Regex Filtering Interceptor  使用正则表达式过滤原始 events 中的内容
    - Regex Extractor Interceptor  使用正则表达式抽取原始 events 中的内容，并将该内容加入 events header 中

- [Flume Channel](http://flume.apache.org/FlumeUserGuide.html#flume-channels) 负责传输和暂时储存
  - JDBC、file-channel、custom-channel 等
  - [Channel Selectors 通道选择器](http://flume.apache.org/FlumeUserGuide.html#flume-channel-selectors) 复制和多路传输
   - Replicating Channel Selector (default): 复制就是不对日志进行分组，而是将所有日志都传输到每个通道中，对所有通道不做区别对待
   - Multiplexing Channel Selector: 多路传输就是根据指定的header将日志进行分类，根据分类规则将不同的日志投入到不同的channel中，从而将日志进行人为的初步分类

- [Flume Sink](http://flume.apache.org/FlumeUserGuide.html#flume-sinks) sink为目的地，将采集到的日志保存到目的地
  - HDFS, File, Kafka 等
  - [Flume Sink Processors](http://flume.apache.org/FlumeUserGuide.html#flume-sink-processors) 在 slink 对日志处理
    - default 默认规则
    - Failover Sink Processor 故障转移处理器
    - Load balancing Sink Processor 负载平衡处理器
    - Custom Sink Processor 定义接收处理器, 暂时不支持

- [Flume 模板配置](http://flume.apache.org/FlumeUserGuide.html#more-sample-configs)


### 1. spooldir -> hdfs 的配置

``` sh

* Conf 配置

agentBi0.sources = SrcAccessLog
agentBi0.channels = ChAccesslog
agentBi0.sinks = SinkAccesslog

# set SrcAccessLog
# 监控类型
agentBi0.sources.SrcAccessLog.type = spooldir
# 监控的目录
agentBi0.sources.SrcAccessLog.spoolDir = /data/log/uba/access_log
# 指定发送的 channels
agentBi0.sources.SrcAccessLog.channels = ChAccesslog
agentBi0.sources.SrcAccessLog.fileHeader = false


# set ChAccesslog
# 保存类型
agentBi0.channels.ChAccesslog.type = file
agentBi0.channels.ChAccesslog.checkpointDir = /data/log/test/checkpoint
agentBi0.channels.ChAccesslog.dataDirs = /data/log/test/data
# 设置最大线程数
agentBi0.channels.ChAccesslog.threads = 10


# SinkAccesslog 设置
agentBi0.sinks.SinkAccesslog.type = hdfs
agentBi0.sinks.SinkAccesslog.channel = ChDwAccesslog
agentBi0.sinks.SinkAccesslog.hdfs.path = hdfs://uhadoop-ociicy-master2:8020/flume/test/access_log_%Y%m%d
# hdfs 创建文件前缀
agentBi0.sinks.SinkAccesslog.hdfs.filePrefix = access_log
# hdfs 创建文件后缀
agentBi0.sinks.SinkAccesslog.hdfs.fileSuffix = .log

# 临时写入时的前缀  
agentBi0.sinks.SinkAccesslog.hdfs.inUsePrefix = .
agentBi0.sinks.SinkAccesslog.hdfs.inUseSuffix = .tmp

# 时间戳应四舍五入
agentBi0.sinks.SinkAccesslog.hdfs.round = true
# 四舍五入到最高的倍数
agentBi0.sinks.SinkAccesslog.hdfs.roundValue = 10
# 下舍入值的单位 second, minute or hour.
agentBi0.sinks.SinkAccesslog.hdfs.roundUnit = minute

# 复制块, 用于控制滚动大小
agentBi0.sinks.SinkAccesslog.hdfs.minBlockReplicas=1
# 文件大小来触发滚动(字节), 0: 永远不触发
agentBi0.sinks.SinkAccesslog.hdfs.rollSize = 0
# 文件条数来触发滚动(数量), 0:永远不触发
agentBi0.sinks.SinkAccesslog.hdfs.rollCount = 0
# 滚动前等待的秒数(秒), 0:没有时间间隔, 每隔多少秒产生一个新文件
agentBi0.sinks.SinkAccesslog.hdfs.rollInterval = 60

# 写入格式
agentBi0.sinks.SinkAccesslog.hdfs.writeFormat = Text
# 文件格式 :  SequenceFile, DataStream(数据不会压缩输出文件) or CompressedStream
agentBi0.sinks.SinkAccesslog.hdfs.fileType = DataStream
# 批处理达到这个上限, 写到 HDFS
agentBi0.sinks.SinkAccesslog.hdfs.batchSize = 100
# hdfs 打开、写、刷新、关闭的超时时间, 毫秒
agentBi0.sinks.SinkAccesslog.hdfs.callTimeout = 60000
# 使用本地时间
agentBi0.sinks.SinkAccesslog.hdfs.useLocalTimeStamp = true

```


### 2. syslogtcp -> file 配置

- 必须先启动 Flume, 开启 TCP|UDP 端口, 保证 Syslog 可以通过指定端口发送日志数据


``` sh

agentBi0.sources = SrcUbaAppActionLog
agentBi0.channels = ChUbaAppActionLog
agentBi0.sinks = SinkUbaAppActionLog

# UbaAppActionLog source 配置
agentBi0.sources.SrcUbaAppActionLog.type = syslogtcp
agentBi0.sources.SrcUbaAppActionLog.port = 10001
agentBi0.sources.SrcUbaAppActionLog.host = 0.0.0.0
agentBi0.sources.SrcUbaAppActionLog.channels = ChUbaAppActionLog

# UbaAppActionLog channels 配置
agentBi0.channels.ChUbaAppActionLog.type = file
agentBi0.channels.ChUbaAppActionLog.checkpointDir = /var/log/flume/uba_app_action/checkpoint
agentBi0.channels.ChUbaAppActionLog.dataDirs = /var/log/flume/uba_app_action/data
agentBi0.channels.ChUbaAppActionLog.threads = 2

# UbaAppActionLog sinks 配置
agentBi0.sinks.SinkUbaAppActionLog.channel = ChUbaAppActionLog
agentBi0.sinks.SinkUbaAppActionLog.type = thrift
agentBi0.sinks.SinkUbaAppActionLog.hostname = log1
agentBi0.sinks.SinkUbaAppActionLog.port = 18889
```


### 3. flume 多端口写入写出  

``` sh
# Name the components on this agent
a1.sources = r1 r2
a1.sinks = k1 k2
a1.channels = c1 c2

# 定义两个 sources 分别来自 syslogtcp 的 44441 和 44442 端口
a1.sources.r1.type = syslogtcp
a1.sources.r1.bind = localhost
a1.sources.r1.port = 44441

a1.sources.r2.type = syslogtcp
a1.sources.r2.bind = localhost
a1.sources.r2.port = 44442

# 定义两个 sinks 分别写入到 hdfs 中的不同目录下。
a1.sinks.k1.type = hdfs
a1.sinks.k1.hdfs.path = hdfs://localhost:9000/flume/events1/%y-%m-%d/
a1.sinks.k1.hdfs.fileType=DataStream
a1.sinks.k1.hdfs.writeFormat=Text
a1.sinks.k1.hdfs.filePrefix = events-
a1.sinks.k1.hdfs.rollCount= 0
a1.sinks.k1.hdfs.rollSize= 0
a1.sinks.k1.hdfs.rollInterval= 300
a1.sinks.k1.hdfs.batchSize = 10000
a1.sinks.k1.hdfs.useLocalTimeStamp = true

a1.sinks.k2.type = hdfs
a1.sinks.k2.hdfs.path = hdfs://localhost:9000/flume/events2/%y-%m-%d/
a1.sinks.k2.hdfs.fileType=DataStream
a1.sinks.k2.hdfs.writeFormat=Text
a1.sinks.k2.hdfs.filePrefix = events-
a1.sinks.k2.hdfs.rollCount= 0
a1.sinks.k2.hdfs.rollSize= 0
a1.sinks.k2.hdfs.rollInterval= 300
a1.sinks.k2.hdfs.batchSize = 10000
a1.sinks.k2.hdfs.useLocalTimeStamp = true


# 定义两个 channels 因为需要两个 sinks 进行消费
a1.channels.c1.type = memory
a1.channels.c1.capacity = 1000
a1.channels.c1.transactionCapacity = 100

a1.channels.c2.type = memory
a1.channels.c2.capacity = 1000
a1.channels.c2.transactionCapacity = 100

# Bind the source and sink to the channel
a1.sources.r1.channels = c1
a1.sources.r2.channels = c2

a1.sinks.k1.channel = c1
a1.sinks.k2.channel = c2
```

### 4. flume 一个 sources 多个 sinks

- 这里举例 flume 同时写入到 hdfs 和 kafka   

``` sh
a2.sources = r1
a2.sinks = k1 k2
a2.channels = c1 c2

# 定义数据源来自 spooldir
a2.sources.r1.type = spooldir
a2.sources.r1.channels = c1
a2.sources.r1.spoolDir = ~/work/test/flume_source
a2.sources.r1.fileHeader = true

# 写入到 kafka 端口为 9092 server 中的 test topic 中
a2.sinks.k1.type = org.apache.flume.sink.kafka.KafkaSink
a2.sinks.k1.channel = c1
a2.sinks.k1.kafka.topic = test
a2.sinks.k1.kafka.bootstrap.servers = localhost:9092
a2.sinks.k1.kafka.flumeBatchSize = 20
a2.sinks.k1.kafka.producer.acks = 1
a2.sinks.k1.kafka.producer.linger.ms = 1
#a2.sinks.ki.kafka.producer.compression.type = snappy

# 写入到 hdfs 目录下
a2.sinks.k2.type = hdfs
a2.sinks.k2.channel = c2
a2.sinks.k2.hdfs.path = hdfs://localhost:9000/flume/events/%y-%m-%d/%H%M/%S
a2.sinks.k2.hdfs.fileType=DataStream
a2.sinks.k2.hdfs.writeFormat=Text
a2.sinks.k2.hdfs.filePrefix = events-
a2.sinks.k2.hdfs.round = true
a2.sinks.k2.hdfs.roundValue = 10
a2.sinks.k2.hdfs.roundUnit = minute
a2.sinks.k2.hdfs.useLocalTimeStamp = true

# 两个 sink 就要对应 两个 channels
a2.channels.c1.type = memory
a2.channels.c1.capacity = 1000
a2.channels.c1.transactionCapacity = 100

a2.channels.c2.type = memory
a2.channels.c2.capacity = 1000
a2.channels.c2.transactionCapacity = 100
# Bind the source and sink to the channel
a2.sources.r1.channels = c1 c2
```


### 5. 负载均衡和故障转义

``` sh

# 配置需要处理的 srouce channels slinks
agentBi0.sources = SrcDwAccessLog
agentBi0.channels = ChDwAccesslog
agentBi0.sinks = SinkDwAccesslog1 SinkDwAccesslogKafka

# 对所有的出口 slink 做 Load balancing Sink Processor 负载平衡处理器配置, 防止远端单点故障
agentBi0.sinkgroups = SinkGroupSinkDwAccesslog


# --- DwAccessLog  配置 Start --- #

# SrcDwAccessLog source 配置
agentBi0.sources.SrcDwAccessLog.type = syslogudp
agentBi0.sources.SrcDwAccessLog.port = 10004
agentBi0.sources.SrcDwAccessLog.host = 0.0.0.0
agentBi0.sources.SrcDwAccessLog.channels = ChDwAccesslog

# SrcDwAccessLog Interceptors 配置
agentBi0.sources.SrcDwAccessLog.interceptors = in1 in2
# SrcDwAccessLog Search and Replace Interceptor 配置
agentBi0.sources.SrcDwAccessLog.interceptors.in1.type = search_replace
# 正则替换 ^[a-zA-Z_]+\:[ ]{1} 或者 ^lb_access\:[ ]{1}
agentBi0.sources.SrcDwAccessLog.interceptors.in1.searchPattern = ^[a-zA-Z_]+\:[ ]{1}
agentBi0.sources.SrcDwAccessLog.interceptors.in1.replaceString =
agentBi0.sources.SrcDwAccessLog.interceptors.in1.charset = UTF-8
# SrcDwAccessLog Timestamp Interceptor 配置
agentBi0.sources.SrcDwAccessLog.interceptors.in2.type = timestamp
agentBi0.sources.SrcDwAccessLog.interceptors.in2.preserveExisting = true

# ChDwAccesslog channels 配置
agentBi0.channels.ChDwAccesslog.type = file
agentBi0.channels.ChDwAccesslog.checkpointDir = /var/log/flume/dw_access_log/checkpoint
agentBi0.channels.ChDwAccesslog.dataDirs = /var/log/flume/dw_access_log/data
agentBi0.channels.ChDwAccesslog.threads = 2

# SinkDwAccesslog To File sinks 配置
#agentBi0.sinks.SinkDwAccesslog.channel = ChDwAccesslog
#agentBi0.sinks.SinkDwAccesslog.type = file_roll
#agentBi0.sinks.SinkDwAccesslog.sink.directory = /var/log/flume/dw_access_log/test

# SinkDwAccesslogKafka To Kafka 配置
#agentBi0.sinks.SinkDwAccesslogKafka.channel = ChDwAccesslog
#agentBi0.sinks.SinkDwAccesslogKafka.type = org.apache.flume.sink.kafka.KafkaSink
#agentBi0.sinks.SinkDwAccesslogKafka.kafka.bootstrap.servers = bi4:9092
#agentBi0.sinks.SinkDwAccesslogKafka.kafka.topic = accessLogTest
#agentBi0.sinks.SinkDwAccesslogKafka.kafka.flumeBatchSize = 20
#agentBi0.sinks.SinkDwAccesslogKafka.kafka.producer.acks = 1
#agentBi0.sinks.SinkDwAccesslogKafka.kafka.producer.linger.ms = 1

# SinkDwAccesslog0 To thrift sinks 配置
agentBi0.sinks.SinkDwAccesslog0.channel = ChDwAccesslog
agentBi0.sinks.SinkDwAccesslog0.type = thrift
agentBi0.sinks.SinkDwAccesslog0.hostname = log0
agentBi0.sinks.SinkDwAccesslog0.port = 18889
# 批量提交的个数
agentBi0.sinks.SinkDwAccesslog0.batch-size = 1000
# 请求超时时间, 单位毫秒
agentBi0.sinks.SinkDwAccesslog0.request-timeout = 20000
# 连接超时时间, 单位毫秒
agentBi0.sinks.SinkDwAccesslog0.connect-timeout = 3000
# 重新连接 source 的时间, 单位秒, 用于后端负载均衡的轮询时间
# 重接秒数, 如在故障转移模式时, 当前的 slinks 故障时间超过阈值, 就会转移到另外一个 slinks 处理
agentBi0.sinks.SinkDwAccesslog0.connection-reset-interval = 300

# SinkDwAccesslog1 To thrift sinks 配置
agentBi0.sinks.SinkDwAccesslog1.channel = ChDwAccesslog
agentBi0.sinks.SinkDwAccesslog1.type = thrift
agentBi0.sinks.SinkDwAccesslog1.hostname = log1
agentBi0.sinks.SinkDwAccesslog1.port = 18889
agentBi0.sinks.SinkDwAccesslog1.batch-size = 1000
agentBi0.sinks.SinkDwAccesslog1.request-timeout = 20000
agentBi0.sinks.SinkDwAccesslog1.connect-timeout = 3000
agentBi0.sinks.SinkDwAccesslog1.connection-reset-interval = 300

# SinkGroupSinkDwAccesslog 负载均衡
#agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.sinks = SinkDwAccesslog0 SinkDwAccesslog1
#agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.processor.type = load_balance
#agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.processor.backoff = true
#agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.processor.selector = random

# SinkGroupSinkDwAccesslog 故障转义
agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.sinks = SinkDwAccesslog0 SinkDwAccesslog1
agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.processor.type = failover
agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.processor.priority.SinkDwAccesslog0 = 1
agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.processor.priority.SinkDwAccesslog1 = 100
agentBi0.sinkgroups.SinkGroupSinkDwAccesslog.processor.maxpenalty = 10000


# SinkDwAccesslog2 To HDFS
#agentBi0.sinks.SinkDwAccesslog1.type = hdfs
#agentBi0.sinks.SinkDwAccesslog1.channel = ChDwAccesslog
# 写入目录和文件规则
#agentBi0.sinks.SinkDwAccesslog1.hdfs.path = hdfs://uhadoop-ociicy-master2:8020/flume/dw_access_log/dw_access_log_%Y%m%d
#agentBi0.sinks.SinkDwAccesslog1.hdfs.filePrefix = dw_access_log
#agentBi0.sinks.SinkDwAccesslog1.hdfs.fileSuffix = .log

# 写入文件前缀规则
#agentBi0.sinks.SinkDwAccesslog1.hdfs.inUsePrefix = .
#agentBi0.sinks.SinkDwAccesslog1.hdfs.inUseSuffix = .tmp
#
#agentBi0.sinks.SinkDwAccesslog1.hdfs.round = true
#agentBi0.sinks.SinkDwAccesslog1.hdfs.roundValue = 10
#agentBi0.sinks.SinkDwAccesslog1.hdfs.roundUnit = minute

# 复制块, 用于控制滚动大小
#agentBi0.sinks.SinkDwAccesslog1.hdfs.minBlockReplicas=1
#agentBi0.sinks.SinkDwAccesslog1.hdfs.rollSize = 0
#agentBi0.sinks.SinkDwAccesslog1.hdfs.rollCount = 0
#agentBi0.sinks.SinkDwAccesslog1.hdfs.rollInterval = 300

# 写入格式
#agentBi0.sinks.SinkDwAccesslog1.hdfs.writeFormat = Text
# 文件格式 :  SequenceFile, DataStream(数据不会压缩输出文件) or CompressedStream
#agentBi0.sinks.SinkDwAccesslog1.hdfs.fileType = DataStream
# 批处理达到这个上限, 写到 HDFS
#agentBi0.sinks.SinkDwAccesslog1.hdfs.batchSize = 100
# hdfs 打开、写、刷新、关闭的超时时间, 毫秒
#agentBi0.sinks.SinkDwAccesslog1.hdfs.callTimeout = 60000
# 多少秒没有写入就关闭这个文件, 0 不关闭
#agentBi0.sinks.SinkDwAccesslog1.hdfs.idleTimeout = 0
# 使用本地时间
#agentBi0.sinks.SinkDwAccesslog1.hdfs.useLocalTimeStamp = true

# --- DwAccessLog  配置 End --- #

```
