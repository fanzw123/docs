# Uba Log 文档

- [安个家 log 收集 - 1.0](https://www.processon.com/view/link/582d8290e4b06bc83a1206b4)
- [安个家 log 收集 - 2.0](https://www.processon.com/view/link/582d82a9e4b06bc83a12082d)

## 一、介绍

- Uba Log 通过 php 脚本收集 HTTP 请求把数据格式化成 json 后, 保存到本地, 并发送一份到 syslog-ng 中, 通过 syslog-ng 发送到 flume 中
- 或者通过 Flume 的 HTTP 接口, 让 PHP 通过 CURL 按照 Flume HTTP 源的协议发送日志(本文使用这种方案)


## 二、配置与部署

### 1. 使用 syslog 方式发送日志给 Flume

- [Uba Log 发送日志给 Syslog-ng 配置](https://git.corp.angejia.com/dw/conf/blob/master/uba/syslog-ng/uba-syslog-ng.conf) uba syslog 配置

- [Flume 收集 Syslog 中的 Uba Log 配置](https://git.corp.angejia.com/dw/conf/blob/master/uba/flume/uba-flume.properties) uba flume 配置



### 2. 使用 http 方式发送日志给 Flume

- [Flume 收集 Syslog 中的 Uba Log 配置](https://git.corp.angejia.com/dw/conf/blob/master/uba/flume/uba-flume.properties) syslog 方式注释打开即可

``` sh
测试向 http source 传送数据
  curl -X POST -d'[{"headers":{"h1":"v1","h2":"v2"},"body":"hello body"}]' http://10.10.2.91:10001

```


## 三、启动部署

- 必须先启动 Flume, 开启 TCP|UDP 端口, 保证 Syslog 可以通过指定端口发送日志数据

``` sh

部署:
  ${FLUME_HOME}/bin/flume-ng agent --conf ${FLUME_HOME}/conf/ -f ${FLUME_HOME}/conf/uba-flume.properties -n agentBi0 &

调试
  ${FLUME_HOME}/bin/flume-ng agent --conf ${FLUME_HOME}/conf/ -f ${FLUME_HOME}/conf/uba-flume.properties -n agentBi0 -Dflume.root.logger=DEBUG,console

```
