# 数据部服务器清单

## 一、online 服务器

### 1. Hadoop 集群服务器

| host_name | IP | explain |
| --- | --- | --- |
| uhadoop-ociicy-master1 | 10.10.7.102 | master |
| uhadoop-ociicy-master2 | 10.10.20.223 | master |
| uhadoop-ociicy-core1 | 10.10.129.13 | datanode |
| uhadoop-ociicy-core8 | 10.10.144.96 | datanode |
| uhadoop-ociicy-core9 | 10.10.140.201 | datanode |
| uhadoop-ociicy-core10 | 10.10.121.97 | datanode |
| uhadoop-ociicy-core11 | 10.10.138.171 | datanode |
| uhadoop-ociicy-core12 | 10.10.115.202 | datanode |
| uhadoop-ociicy-task3 | 10.10.229.183 | tasknode |
| uhadoop-ociicy-task4 | 10.10.234.131 | tasknode |


### 2. 应用级别服务器

| host_name | IP | explain |
| --- | --- | --- |
|	bi0 | 10.10.2.91 |  |
|	bi1 | 10.10.91.51 |  |
|	bi2 | 10.10.111.226 |  |
|	bi3 | 10.10.64.232 |  |
|	bi4 | 10.10.235.204 |  |
|	bi5 | 10.10.187.75 |  |
|	bi6 | 10.10.235.31 |  |
|	devbi0 | 106.75.33.135 |  |


### 3. Mysql 服务器

| host_name | IP | explain |
| --- | --- | --- |
| angejia-bi-db | 10.10.64.146 | 数据部内部服务器  |
| agjdb2-bi | 10.10.39.153 | 生产 to 数据部 slave 服务器 |



## 二、offline 服务器

### 1. Hadoop 集群服务器

| host_name | IP | explain |
| --- | --- | --- |
| DataNode01 | 192.168.160.41 |  |
| SecondaryNameNode | 192.168.160.42 |  |
| DataNode02 | 192.168.160.43 |  |
| CDH-Manager | 192.168.160.44 |  |
| NameNode | 192.168.160.45 |  |
| DataNode03 | 192.168.160.46 |  |
| dwtest | 192.168.160.49 |  |
| DataNode04 | 192.168.160.56 |  |

### 2. 应用级别服务器

| host_name | IP | explain |
| --- | --- | --- |
| dwtest | 192.168.160.49 | 应用测试服务器 |


### 3. Mysql 服务器

| host_name | IP | explain |
| --- | --- | --- |
| dwtest | 192.168.160.49 | 测试 mysql |

## 三、配置环境

### 1. 配置 host

``` sh
sudo vim /etc/hosts

# dw server
10.10.2.91      bi0
10.10.91.51     bi1
10.10.111.226   bi2
10.10.64.232    bi3
10.10.235.204   bi4
10.10.187.75    bi5
10.10.235.31    bi6
106.75.33.135   devbi0
10.10.2.91      bastion-host

# dw database
10.10.64.146    angejia-bi-db
10.10.39.153    agjdb2-bi

# hadoop 集群
# master
10.10.7.102     uhadoop-ociicy-master1
10.10.20.223    uhadoop-ociicy-master2
# data
10.10.129.13    uhadoop-ociicy-core1
10.10.144.96    uhadoop-ociicy-core8
10.10.140.201   uhadoop-ociicy-core9
10.10.121.97    uhadoop-ociicy-core10
10.10.138.171   uhadoop-ociicy-core11
10.10.115.202   uhadoop-ociicy-core12

# task
10.10.229.183   uhadoop-ociicy-task3
10.10.234.131   uhadoop-ociicy-task4

# kafka 集群
10.10.140.28 ukafka-uiu1lt-1-bj03.service.ucloud.cn
10.10.140.173 ukafka-uiu1lt-2-bj03.service.ucloud.cn
10.10.114.34 ukafka-uiu1lt-3-bj03.service.ucloud.cn

```

### 2. 环境变量配置

``` sh
vim ~/.bashrc

# dw server
alias bi0="ssh -t dwadmin@bastion-host"
alias bi1="ssh -t dwadmin@bastion-host '/usr/bin/ssh dwadmin@bi1'"
alias bi2="ssh -t dwadmin@bastion-host '/usr/bin/ssh dwadmin@bi2'"
alias bi3="ssh -t dwadmin@bastion-host '/usr/bin/ssh dwadmin@bi3'"
alias bi4="ssh -t dwadmin@bastion-host '/usr/bin/ssh dwadmin@bi4'"
alias bi5="ssh -t dwadmin@bastion-host '/usr/bin/ssh dwadmin@bi5'"
alias bi6="ssh -t dwadmin@bastion-host '/usr/bin/ssh dwadmin@bi6'"
alias devbi0="ssh -t dwadmin@bastion-host '/usr/bin/ssh dwadmin@devbi0'"


# dw_service
alias uhadoop-ociicy-master1="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-master1'"
alias uhadoop-ociicy-master2="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-master2'"

alias uhadoop-ociicy-core1="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-core1'"
alias uhadoop-ociicy-core8="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-core8'"
alias uhadoop-ociicy-core9="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-core9'"
alias uhadoop-ociicy-core10="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-core10'"
alias uhadoop-ociicy-core11="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-core11'"
alias uhadoop-ociicy-core12="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-core12'"

alias uhadoop-ociicy-task3="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-task3'"
alias uhadoop-ociicy-task4="ssh -t dwadmin@bastion-host '/usr/bin/ssh  hadoop@uhadoop-ociicy-task4'"


# log server
alias log0="ssh -t dwadmin@bastion-host '/usr/bin/ssh angel@log0'"
alias log1="ssh -t dwadmin@bastion-host '/usr/bin/ssh angel@log1'"


# 生效
source ~/.bashrc

```
