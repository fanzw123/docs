# Cloudera 5.8 Yum 方式安装

- 安装流程
- 1. 首选配置系统环境
- 2. 安装 Cloudera Manager Server
  - 2.1 配置 yum 源, 执行安装流程
  - 2.2 配置 SCM 数据库
  - 2.3 启动 Cloudera Manager Server 服务(监控报错日志)
  - 2.4 打开 http://hostname:7180 端口, 跳过所有安装步骤, 直接添加 Cloudera Management Service 服务
- 3. 安装 Cloudera Manager Agent (不要使用 Cloudera Manager Server 安装  Cloudera Manager Agent)
  - 3.1 配置 yum 源, 执行安装流程
  - 3.2 修改配置 Cloudera Manager Agent 服务指向 Cloudera Manager Server 服务所在的 host
  - 3.3 启动 Cloudera Manager Agent 服务(监控报错日志)
- 4. Cloudera Manager Server 和 Cloudera Manager Agent 安装完成后再配置集群
- 5. 向集群添加主机
  - 5.1 Cloudera Manager Agent 正常向 Cloudera Manager Server 汇报后
  - 5.2 管理界面, 点击添加主机到集群中

## * 系统环境配置

### 1. 环境属性
``` sh
1. 创建用户 cloudera-scm, 给与免密码 sudo 权限
  vim /etc/sudoers
  # 以下注释取消
  %wheel  ALL=(ALL)       NOPASSWD: ALL

  1) 方法 1
    userdel cloudera-scm
    useradd -m -s /bin/bash -g  wheel cloudera-scm

    useradd -m -s /bin/bash -g  wheel hadoop

  2) 方法 2
    %cloudera-scm ALL=(ALL) NOPASSWD: ALL  账号其他配置

  *) sudo 权限附属配置
    vim /etc/sudoers
    # 确认包含如下
    Defaults secure_path = /sbin:/bin:/usr/sbin:/usr/bin

    vim /etc/pam.d/su
    # 确保包含如下行
    session         required        pam_limits.so


2. 同步系统时区
  yum install ntp
  ntpdate -d time.nist.gov
  或者 ntpdate -d pool.ntp.org

  ntpdate -d dw0


3. 关闭防火墙
  service iptables stop
  chkconfig iptables off

  service ip6tables stop
  chkconfig ip6tables off


4. 关闭 selinux
  # 临时生效
  setenforce 0
  # 永久失效
  vi /etc/selinux/config
  SELINUX=disabled

5. 安装 scp
  yum -y install openssh-clients
```

### 2. 服务属性

``` sh
1. 禁用大透明页
  cat /sys/kernel/mm/redhat_transparent_hugepage/defrag
    [always] never 表示已启用透明大页面压缩。
    always [never] 表示已禁用透明大页面压缩。

  如果启用, 请关闭
  echo 'never' > /sys/kernel/mm/redhat_transparent_hugepage/defrag

  加入开机启动中
  vim /etc/rc.local
  # 禁用大透明页
  echo 'never' > /sys/kernel/mm/redhat_transparent_hugepage/defrag

2. vm.swappiness Linux 内核参数
  # 默认为 60 , 用于控制将内存页交换到磁盘的幅度, 介于 0-100 之间的值；值越高，内核寻找不活动的内存页并将其交换到磁盘的幅度就越大。
  cat /proc/sys/vm/swappiness

  # 设置为 0
  sysctl -w vm.swappiness=0

3. 集群挂载的文件系统,不使用 RAID 和 LVM 文件系统

4. 最大打开的文件数
  sysctl -a | grep fs.file

  如果比 65535 下, 则设置如下参数
  sudo vim /etc/security/limits.conf
  hdfs soft nofile 65535


```


## 一、安装 Cloudera Manager Server

``` sh
* 登录 cloudera-scm 账号

1. 添加 cloudera-manager.repo 源(所有节点)
  sudo wget http://archive.cloudera.com/cm5/redhat/6/x86_64/cm/cloudera-manager.repo --directory-prefi=/etc/yum.repos.d

  更新 yum
  yum update


1.1. 安装 JAVA
  # PS 这个包在 CM 的源中, 请转到下面的配置源方法中
  yum install oracle-j2sdk1.7

1.2. 加入环境变量

vim /etc/profile
# JDK
export JAVA_HOME=/usr/java/jdk1.7.0_67-cloudera
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH


2. 下载安装组件
  sudo yum install cloudera-manager-daemons
  sudo yum install cloudera-manager-server

3. 安装 scm 数据库
  1)方法 1 使用脚本配置
    /usr/share/cmf/schema/scm_prepare_database.sh mysql -hdw0 -P3306 -uroot -p2345.com scm hadoop 2345.com

    具体参数看配置 : /usr/share/cmf/schema/scm_prepare_database.sh --help

  2)方法 2 编写配置文件 /etc/cloudera-scm-server/db.properties
    com.cloudera.cmf.db.type=mysql
    com.cloudera.cmf.db.host=dw0:3306
    com.cloudera.cmf.db.name=scm
    com.cloudera.cmf.db.user=hadoop
    com.cloudera.cmf.db.password=2345.com
    com.cloudera.cmf.db.setupType=EXTERNAL


4. root 权限登录 Mysql 查看账户
  SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;


5. 下载  mysql-connector-java-5.1.40.jar
  sudo wget http://central.maven.org/maven2/mysql/mysql-connector-java/5.1.40/mysql-connector-java-5.1.40.jar --directory-prefi=/usr/share/java/


6. 监控启动服务
  tail -f /var/log/cloudera-scm-server/cloudera-scm-server.log

  # 给与目录权限
  sudo chmod 774 -R /opt/cloudera/parcel-repo/
  sudo chmod 774 -R /var/lib/cloudera-scm-server

  # 启动 cm 服务
  sudo service cloudera-scm-server restart

  # 查看 服务状态
  service cloudera-scm-server status

  # 监控端口
  netstat -tunlp

  7180 : Http Web 服务

  7182 : 监控通讯服务
```


## 二、安装 Cloudera Manager Agent

``` sh
* 登录 cloudera-scm 账号


1. 下载安装组件
  sudo yum install cloudera-manager-daemons
  sudo yum install cloudera-manager-agent


2. 修改配置文件
  sudo vim /etc/cloudera-scm-agent/config.ini

  # 改成这里 server 的主机地址
  server_host=dw0

3. 监控启动服务

  # 监控日志
  tail -f /var/log/cloudera-scm-agent/cloudera-scm-agent.log

  # 给与目录权限
  sudo chown cloudera-scm:cloudera-scm -R /var/lib/cloudera-scm-agent
  sudo chown cloudera-scm:cloudera-scm -R /var/run/cloudera-scm-agent

  # 创建 /opt/cloudera/parcels 目录
  mkdir -p /opt/cloudera
  sudo chown cloudera-scm:cloudera-scm -R /opt/cloudera

  # 启动 agent 服务, 开启端口
  sudo service cloudera-scm-agent restart

  # 查看运行状态
  service cloudera-scm-agent status

  # 查看监控端口
  netstat -tunlp

  9000 : HTTP （调试）端口
  19001 : supervisord 状态和控制端口；用于 Agent 和 supervisord 之间的通信；仅内部打开（本地主机上）


4. 从 cm 拉取 /opt/cloudera/parcel-repo 中的 CDH 软件包, 或者官网拉去
  scp cloudera-scm@dw0:/opt/cloudera/parcel-repo/* /opt/cloudera/parcel-repo/

*. 注册可能遇到的问题

  1. 时间与 cm 相差太多导致无法 agent 无法向 cm 注册

  2. host 与 ip 设置错误

```

## 三、授权数据库服务

``` sql
-- hive
CREATE DATABASE `hive` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON hive.* TO 'hadoop'@'%' WITH GRANT OPTION;
flush privileges;


-- hue
CREATE DATABASE `hue` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON hue.* TO 'hadoop'@'%' WITH GRANT OPTION;
flush privileges;


-- oozie
CREATE DATABASE `oozie` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON oozie.* TO 'hadoop'@'%' WITH GRANT OPTION;
flush privileges;

```


## 四、重新安装,删除所有组件

``` sh
# 删除组件
sudo yum remove cloudera-manager-daemons
sudo yum remove cloudera-manager-server
sudo yum remove cloudera-manager-server-db-2
sudo yum remove cloudera-manager-agent


# server
sudo rm -rf /var/lib/cloudera-manager-server
sudo rm -rf /var/run/cloudera-manager-server

# agent
sudo rm -rf /var/lib/cloudera-scm-agent
sudo rm -rf /var/run/cloudera-scm-agent
```

## 五、常见问题

oozie 找不到 mysql-connector.jar

> 把 mysql-connector.jar 复制到 /var/lib/oozie 中.
cp /path/mysql-connector-java-5.1.40.jar /var/lib/oozie  中
