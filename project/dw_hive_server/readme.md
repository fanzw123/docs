# dw_hive_server 服务

## 介绍

- 代理，把 HQL 请求，通过本服务转发到集群的 hiveServer 后返回给客户端

## 环境搭建

- [sbt 安装文档](technology/scala/sbt.md)


### 2.下载和编译(sbt)项目

``` sh

1. 创建工作目录
  mkdir ~/app
  cd ~/app

2. 克隆最新代码到本地, dw_hive_server 所在仓库
  cd ~/app/
  git clone git@git.corp.angejia.com:dw/dw_hive_server.git;
  cd dw_hive_server

3. 因为代码本身不放配置文件，所以要导入 conf 仓库的配置文件

  1) ~/.bashrc 配置环境变量

    # APP PATH
    export ANGEJIA_APP_PATH=~/app
    export DW_CONF=$ANGEJIA_APP_PATH/conf
    export DW_HIVE_SERVER_HOME=$ANGEJIA_APP_PATH/dw_hive_server

  2) 配置 conf 仓库
    conf 仓库有 2 个分支，分别是 master 线上分支，和 develop 开发分支，分别放了线上和线下的配置参数, 软链配置目录

    ln -s $DW_CONF/dw_hive_server/resources $DW_HIVE_SERVER_HOME/src/main/resources

4. 编译运行

  编译后的项目会在 $DW_HIVE_SERVER_HOME/target/scala-2.10/dw-hive-server_2.10-0.0.1.war 目录中
    cd $DW_HIVE_SERVER_HOME
    sbt clean package

  * 运行
    java -DDW_HIVE_SERVER_HOME=$DW_HIVE_SERVER_HOME -jar $DW_HIVE_SERVER_HOME/scripts/jetty-runner-8.1.11.v20130520.jar --port 8082 --path /hive-server $DW_HIVE_SERVER_HOME/target/scala-2.10/dw-hive-server_2.10-0.0.1.war


5. 后台持久运行

  $DW_HIVE_SERVER_HOME/scripts/dw-server-restart.sh

  tail -f /data/log/dwlogs/jetty_log/hive-server.out  查看日志

  ps -aux | grep dw-hive-server  查看运行进程

  netstat -talp | grep 8082 查看运行端口
  netstat -talp | grep 2552 查看 akka.remote.netty.port 端口


```
