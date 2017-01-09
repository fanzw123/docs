# Centos Yum 方式安装

## 准备步骤

### 1. 时区配置

``` sh
yum install ntp

ntpdate -d time.nist.gov
ntpdate -d pool.ntp.org
```

### 2. 系统服务

``` sh
关闭防火墙
  service iptables stop
  chkconfig iptables off

  service ip6tables stop
  chkconfig ip6tables off

关闭selinux
  setenforce 0
  vi /etc/selinux/config
  SELINUX=disabled
```

### 3. 创建集群用户(hadoop)

``` sh
创建 hadoop 用户
  groupadd -r hadoop
  useradd -g hadoop hadoop

每台服务器 hadoop 生成 ssh 公钥
  ssh-keygen -t rsa -P ""
```


## 一、安装 cloudera-manager

- 管理集群的节点

### 1. cloudera-manager yum 源

``` sh
1. 添加 cloudera-manager.repo 源
  vim /etc/yum.repos.d/cloudera-manager.repo
  http://archive.cloudera.com/cm5/redhat/5/x86_64/cm/cloudera-manager.repo

2. 更新 yum
  yum update
```

### 2. 下载安装各个组件

``` sh
yum install java-1.7.0-openjdk
yum install cloudera-manager
yum install cloudera-manager-agent
yum install cloudera-manager-server-db
安装 mysql(5.6 或者以上, 不区分大小写) 默认你已经安装

```

### 3. 启动服务

``` sh
1. 安装 cm 数据库(root 权限)
  a) 使用脚本配置
    /usr/share/cmf/schema/scm_prepare_database.sh mysql -hdw0 -P3306 -uroot -p2345.com --scm-host dw0 scm scm scm
    #---格式是:  scm_prepare_database.sh 数据库类型  数据库 服务器 用户名 密码  --scm-host  Cloudera_Manager_Server 所在的机器
    具体参数看配置 : /usr/share/cmf/schema/scm_prepare_database.sh --help

  b) 编写配置文件 /etc/cloudera-scm-server
    com.cloudera.cmf.db.type=mysql
    com.cloudera.cmf.db.host=dw0:3306
    com.cloudera.cmf.db.name=scm
    com.cloudera.cmf.db.user=scm
    com.cloudera.cmf.db.password=scm
    com.cloudera.cmf.db.setupType=EXTERNAL

2. root 权限登录 Mysql 查看账户
  SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;


3. 启动服务
  监控日志: tail -f /var/log/cloudera-scm-server/cloudera-scm-server.log

  启动 cm 服务, 开启端口在 7180, http 的服务
  service cloudera-scm-server restart

4. 关机服务
  http://host:7180
  user: admin
  pass: admin

```

## 二、安装
scp /etc/yum.repos.d/cloudera-manager.repo root@dw1:/etc/yum.repos.d/cloudera-manager.repo
