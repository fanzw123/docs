# DW Service 独立集群迁移

- <共享集群> (表示 ucloud 的集群)
- <独立集群> (表示本身的独立集群)

## * 目标

- 平滑无缝迁移到 <独立集群>

## UBA 服务

### * 全局配置文件 (Jason 负责)

``` sh
1. bi1  切换全局配置文件
  cd ~/app/conf
  git fetch origin feature-newDwService-20150930:feature-newDwService-20150930
  git checkout feature-newDwService-20150930
```

### 1. uba log 迁移

``` sh
1. 在 Bi1 部署 uba (Jason 负责)
  1) 使用分支 feature-newDwService-20150930
    cd ~/app/uba
    git fetch origin feature-newDwService-20150930:feature-newDwService-20150930
    git checkout feature-newDwService-20150930

2. uba 中涉及到到的 udf 修改 (以林负责)
  1) 使用分支 feature-newDwService-20150930
  2) 其中 udf 中包含 umr-jdlg4d 字符串的，替换成 user
  3) 把代码改好，打成同名 jar 包,上传到 bi1 服务的 /data/jars 目录中
  4) 改好注意跑数据
    一、analysis-hive-to-result-hive.sh 脚本
    1.dw_web_visit_traffic_log:
      select
        '(get_page_info)',referer_page_id,referer_page_name,current_page_id,current_page_name,channel_code,
        '(parse_user_agent)',os_type,os_version,brower_type,brower_version,phone_type
       from dw_db.dw_web_visit_traffic_log where p_dt='2015-10-06' limit 10;

    2.dw_app_access_log
      select
        '(parse_mobile_agent)',app_name,app_version,selection_city_id,location_city_id,network_type,platform,device_type,os_version,device_id,delivery_channels,
        '(parse_mobile_token)',user_id,
        '(get_page_info)',request_page_id,request_page_name
      from dw_db.dw_app_access_log where p_dt='2015-10-06' limit 100;

    二、analysis-action-detail-log-table.sh 脚本
    3.dw_web_action_detail_log
      select
        '(get_page_info)',referer_page_id,referer_page_name,current_page_id,current_page_name,
        '(parse_user_agent)',os_type,os_version,brower_type,brower_version,phone_type
      from
        dw_db.dw_web_action_detail_log where p_dt='2015-10-06'
     limit 10;

    4.dw_app_action_detail_log
    select
      longtitude,latitude,bp_id
    from
      dw_db.dw_app_action_detail_log where p_dt='2015-10-06' limit 10;


3. bi0 服务，部署新的 hadoop 客户端，指向到 <独立集群> (Jason 负责)
  1) vim ~/.bashrc
    注释全部
export PATH=/home/dwadmin/usr/hadoop-2.3.0-cdh5.1.0/bin:$PATH
#export PATH=/home/dwadmin/usr/hive-0.12.0-cdh5.1.0/bin:$PATH
export PATH=/home/dwadmin/usr/apache-hive-1.1.0-bin/bin:$PATH
export PATH=/home/dwadmin/usr/sqoop-1.4.4-cdh5.1.0/bin:$PATH
export PATH=/home/dwadmin/usr/sbt:$PATH

    添加 <独立集群 hadoop 配置>
# Environment variables required by hadoop
#export JAVA_HOME=/usr/java/latest
export HADOOP_HOME_WARN_SUPPRESS=true
export HADOOP_HOME=/usr/local/hadoop
export HADOOP_PREFIX=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export YARN_HOME=$HADOOP_HOME
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export YARN_CONF_DIR=$HADOOP_HOME/etc/hadoop

export PATH=$HADOOP_HOME/bin:$PATH
#libs
export LD_LIBRARY_PATH=$HADOOP_HOME/lib/native

  2) 生效
    source ~/.bashrc
```

### 2. m2h 服务迁移

``` sh
1. 在 bi1 部署 <独立集群> (Jason 负责)

  vim ~/.bashrc

  1) 注释老的
#export PATH=/home/dwadmin/usr/hadoop-2.3.0-cdh5.1.0/bin:$PATH
#export PATH=/home/dwadmin/usr/apache-hive-1.1.0-bin/bin:$PATH
#export PATH=/home/dwadmin/usr/sqoop-1.4.4-cdh5.1.0/bin:$PATH


  2) 在 bi1 部署 hadoop、hive、sqoop、spark
# Environment variables required by hadoop
#export JAVA_HOME=/usr/java/latest
export HADOOP_HOME_WARN_SUPPRESS=true
export HADOOP_HOME=/usr/local/hadoop
export HADOOP_PREFIX=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export YARN_HOME=$HADOOP_HOME
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export YARN_CONF_DIR=$HADOOP_HOME/etc/hadoop

# Hive
export HIVE_HOME=/usr/local/hive
export HIVE_CONF_DIR=$HIVE_HOME/conf

# spark
export SPARK_HOME=/usr/local/spark
export SPARK_CONF_DIR=$SPARK_HOME/conf

# Sqoop
export SQOOP_HOME=/usr/local/sqoop


export PATH=$HADOOP_HOME/bin:$HIVE_HOME/bin:$SPARK_HOME/bin:$SQOOP_HOME/bin:$PATH
umask 022

#libs
export LD_LIBRARY_PATH=$HADOOP_HOME/lib/native

  3) 生效
  source ~/.bashrc
```

### 3. sem_log

``` sh
1. 使用分支 feature-newDwService-20150930

2. 修改配置代码

  private static String hdfs_dir = "/user/hive/sem_log";

  private static String HADOOP_HOME = "/usr/local/hadoop";

  private static String HIVE_HOME = "/usr/local/hive";

3.打包成 run jar baidu-sem.jar
```


## 二、基础平台服务

### 1.dw_hive_server (Jason 负责)

``` sh
1. 备份原来的 jar 包
  cd ~/app/dw_hive_server
  cp -arip ./target/scala-2.10/dw-hive-server_2.10-0.0.1.war ./target/scala-2.10/dw-hive-server_2.10-0.0.1.war_20150930

2. bi1 上使用新分支打包 jar

  1) 切换分支
  cd ~/app/dw_hive_server
  git fetch origin feature-newDwService-20150930:feature-newDwService-20150930
  git checkout feature-newDwService-20150930

  2) 修改配置文件成为 <独立集群的配置文件>
    #yarn.resourcemanager.address
    hadoop.jobtracker=uhadoop-ociicy-master2:23140
    hadoop.hiveserver2=uhadoop-ociicy-master2:10000/default
    hadoop.sharkserver2=uhadoop-ociicy-master2:10000/default

  3) 打包、运行
  sbt package
  ./dwetl/dw-server-restart.sh

  tail -f /data/log/dwlogs/jetty_log/hive-server.out

  4) 查看是否运行成功
  ps -aux | grep dw-hive-server  查看运行进程
  netstat -ta | grep 8082 查看运行端口
  netstat -ta | grep 2552 查看 akka.remote.netty.port 端口
```


### 2.dw_scheduler_agent (Jason 负责)

``` sh
1.bi1 切换分支
  cd ~/app/tools
  git fetch origin feature-newDwService-20150930:feature-newDwService-20150930
  git checkout feature-newDwService-20150930

2.修改 zookeeper 服务到 <独立集群 > 的 zookeeper 上
  scheduler.zookeeper.hosts: "uhadoop-ociicy-master1:2181,uhadoop-ociicy-master2:2181,uhadoop-ociicy-core1:2181"

3.备份原始 dw_scheduler_agent.jar
  cd ~/app/tools
  cp -arip ./dw_script/run_jar/dw_scheduler_agent.jar ./dw_script/run_jar/dw_scheduler_agent.jar_20150930

4. 本地打包成 dw_scheduler_agent.jar 上传到 bi1
  cd ~/app/tools
  scp ./dw_script/run_jar/dw_scheduler_agent.jar dwadmin@10.10.91.51:/home/dwadmin/app/tools/dw_script/run_jar/dw_scheduler_agent.jar

5.启动服务
  1) 查看日志
    tail -f /data/log/dwlogs/schedule_log/schedule_info.log

  2) 启动调度
    ~/app/tools/dw_script/scheduler_restart.sh
```


### 3.dw_general_loader (Jason 负责)

``` sh
1. bi1 跟 tools 是一个分支共同使用分支 feature-newDwService-20150930
  cd ~/app/tools

2. 修改配置文件
  <property name="dwHiveBinPath" value="/usr/local/hive/bin"/>

3. 备份原始 dw_general_loader.jar
  cp -airp ./dw_script/run_jar/dw_general_loader.jar ./dw_script/run_jar/dw_general_loader.jar_20150930

4. 测试运行
  ./tools/dw_script/dw_general_loader.jar  da_broker_summary_basis_info_daily 20150930

```


### 4.monitor (以林负责)

``` sh
1. 使用分支 feature-newDwService-20150930

2. 修改配置文件
  1) resources.hibernate.hibernate.properties
## C3P0 configuration
hibernate.connection.hive.driver_class=org.apache.hive.jdbc.HiveDriver
hibernate.connection.hive.url=jdbc:hive2://uhadoop-ociicy-master2:10000/default?useUnicode=true&characterEncoding=utf-8
hibernate.connection.hive.username=hadoop
hibernate.connection.hive.password=hadoop

  2) resources.spring.common.properties
    hive.udf.path=hdfs://uhadoop-ociicy-master1:8020/user/jars/

3. 使用 feature-newDwService-20150930 放入 tomcat 测试

4. 测试完成合并到 master 上线

```


### 5.dw_explorer (以林负责)

```
使用分支 feature-newDwService-20150930

hiveServer 新地址
  hive2://uhadoop-ociicy-master2:10000

```


### 6.ART 报表 (以林负责)

```
使用分支 feature-newDwService-20150930

检测需要修改的配置文件
```


### 6.SpagoBI (双燕负责)

```
使用分支 feature-newDwService-20150930

检测需要修改的配置文件
```


### 7. 重跑所有调度脚本检测异常

```
http://dw.corp.angejia.com/monitor/searchSchdulerJobAction
```


## HDFS 数据迁移和 Hive 元数据迁移

```

1. hdfs 迁移
  1) 10:00 开始通知 cloud 迁移 hdfs 数据到 <独立集群中>，对应根目录下

  2) 迁移 hive
   1>.元数据
    umr-jdlg4d -> user
      :1,$s/umr-jdlg4d/user/g

    UCloudcluster > Ucluster
        :1,$s/UCloudcluster/Ucluster/g

    mysql -huhadoop-ociicy-master1 -uhadoop -pangejia888 hive -v -f < ./hive1.sql

   2>.其他
      hive -e "use dw_db;show tables;" | awk '{printf "export table %s to @/data/tmp/hive-export/%s@;\n",$1,$1}' | sed "s/@/'/g" > export.sql

      export table dw_db.dw_basis_dimen_action_id_name_lkp to '/data/tmp/hive-export/dw_basis_dimen_action_id_name_lkp';



  4) 上传最新最新的 jars 到独立集群 <独立集群>
    在 bi1 上传 /data/jars/ 目录中的 jar (以林打包好后的)  
    hadoop dfs -put /data/jars/xxx /user/jars/xxx


2. hive 元数据迁移
  把迁移后的源数据出现 umr-jdlg4d 的字符替换成 user

hive -e "use dw_db;show tables;" | awk '{printf "export table %s to @/data/tmp/
hive-export/%s@;\n",$1,$1}' | sed "s/@/'/g" > export.sql


3. 分别检测 dw_db、da_db、db_sync、db_gather 数据的完整性

```


## 后续要做的工作

```
1. python 重构 uba 服务，支持 Spark 查询

2. 使用 Hue 代替 dw_explorer
```
