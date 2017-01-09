# Centos Yum 方式安装

## 准备步骤

### 1. 时区配置

``` sh
yum install ntp

同步时间
ntpdate time.nist.gov
```

### 2. 系统服务

``` sh
关闭防火墙
  service iptables stop

关闭selinux
  setenforce 0

需要重启
  vim /etc/selinux/config
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
  vim /etc/yum.repos.d/cloudera.repo
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
1. mysql 上建立 scm 数据库
  授权 mysql 用户(root 权限下执行)

  GRANT ALL PRIVILEGES ON cmf.* TO 'hadoop'@'%' WITH GRANT OPTION;

2. 安装数据库
/usr/share/cmf/schema/scm_prepare_database.sh mysql -hdw0 -uhadoop -p2345.com --scm-host dw0 scm scm scms
#---格式是:  scm_prepare_database.sh 数据库类型  数据库 服务器 用户名 密码  --scm-host  Cloudera_Manager_Server 所在的机器



```
