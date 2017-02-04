# HDFS 操作命令

## 一. 用户命令

``` json
1) 列出文件列表
  hdfs dfs –ls [文件目录]
  hdfs dfs -ls /
  hdfs dfs -ls hdfs://ip:8020/user/

2) 打开某个文件
  hdfs dfs –cat [file_path]
  hdfs dfs -cat /user/hive/warehouse/jason_test.db/student/student.txt
  hdfs dfs -text adult/adult.txt.snappy | head  读取压缩文件

3) 将本地文件存储至 hdfs
  hdfs dfs –put [本地地址] [hdfs目录]
  hdfs dfs -put ./example.log /user/test/a.log

4) 将本地文件夹存储至 hdfs
  hdfs dfs –put [本地目录] [hdfs目录]
  hdfs dfs –put /home/t/dir_name /user/test/
  hdfs dfs -put /data/soj_log/aaa.log hdfs://ip:8020/user/test/

5) 下载 hdfs 文件到我本地
  hdfs dfs -get [文件目录] [本地目录]
  hdfs dfs –get /user/test/a.log ./

6) 删除 hdfs 上指定文件
  hdfs dfs –rm [文件地址]
  hdfs dfs –rm /user/test/a.log

7) 删除 hdfs 上指定文件夹（包含子目录等）
  hdfs dfs –rmr [目录地址]
  hdfs dfs –rmr /user/test

8) 在 hdfs 指定目录内创建新目录
  hdfs dfs –mkdir /user/test/aaa

9) 在 hdfs 指定目录下新建一个空文件
  hdfs dfs -touchz  /user/test/new.txt

10) 将 hdfs 上某个文件重命名
  hdfs dfs –mv [原目录地址] [新目录地址]
  hdfs dfs –mv /user/test/new.txt  /user/test/new1.txt

11) 将hdfs指定目录下所有内容保存为一个文件，同时下载至本地
  hdfs dfs –getmerge [原目录地址] [本地目录地址]
  hdfs dfs –getmerge /user/test/ ./

12) hdfs dfs -count -q /  

  hdfs dfs -count -q -h /

  QUOTA（命名空间的限制文件数）: 8.0 E
  REMAINING_QUATA(剩余的命名空间): 8.0 E
  SPACE_QUOTA(限制空间占用大小): none
  REMAINING_SPACE_QUOTA(剩余的物理空间): inf
  DIR_COUNT(目录数统计): 81.4 K
  FILE_COUNT(文件数统计): 272.6 K
  CONTENT_SIZE: 258.6 G
  FILE_NAME :  /

13) 查看目录使用情况
  hdfs dfs -du -s -h /

14) 获取配置
  hdfs getconf -confKey [key]  配置参数

15) 查看各个 DataNode 存储情况
  hdfs dfsadmin -report

16) balancer 存储平衡器
  设置负载的带宽 (字节)
  hdfs dfsadmin -setBalancerBandwidth 524288000

  开始均衡 threshold 一般5， 即各个节点与集群总的存储使用率相差不超过10%，我们可将其设置为5%
  $HADOOP_HOME/sbin/start-balancer.sh -threshold 5

17) 查看文件系统中的文件由哪些块组成
  hdfs fsck /  -files -blocks


18) 归档 (减少小文件, 不能解决压缩格式问题)
  hadoop archive -archiveName [归档名.har] -p [需要归档的父目录] [归档的文件] [归档存放目录]
  例如:
  hadoop archive -archiveName foo.har -p /user/hive/dw_db_temp/jason_test_1 000000_* /user/hive/dw_db_temp/jason_test_1
```


## 二. 挂载 hdfs 目录到本地，实现云存储到 hadoop hdfs

- [安装 JDK 包，下载地址](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)

``` json
$(lsb_release -cs)  linux内核版本

1) 找到源
  (1) Ubuntu
  wget  http://archive.cloudera.com/cdh5/one-click-install/$(lsb_release -cs)/amd64/cdh5-repository_1.0_all.deb

  dpkg -i cdh5-repository_1.0_all.deb

  sudo apt-get update

  apt-get install hadoop-hdfs-fuse


  (2) Centos6
  yum 包源
  wget http://archive.cloudera.com/cdh5/redhat/6/x86_64/cdh/cloudera-cdh5.repo

  cp ./cloudera-cdh5.repo /etc/yum.repos.d/

  导入key
  rpm --import http://archive.cloudera.com/cdh5/redhat/6/x86_64/cdh/RPM-GPG-KEY-cloudera

  yum install hadoop-hdfs-fuse


2) 挂载
  hadoop-fuse-dfs dfs://<name_node_hostname>:<namenode_port> <mount_point>

  mkdir -p /data/hdfs/
  chown -R hdfs:hdfs /data/hdfs/

  hadoop-fuse-dfs dfs://192.168.160.45:8020/ /data/hdfs/

  umount /data/hdfs/ 卸载分区

```
