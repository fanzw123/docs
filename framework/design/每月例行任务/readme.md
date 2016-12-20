# 每个月例行任务

## 一、清理 HDFS 数据

``` sh

hdfs dfsadmin -report  查看阶段总存储情况

start :
  hdfs dfs -du -h -s /  查看总量: 上次查看 : 1.5 T  4.6 T /


1. yarn 日志
  a) 查看容量
  hdfs dfs -du -s -h /var/log/hadoop-yarn/apps/*  

  b) 清除目录
  hdfs dfs -rmr /var/log/hadoop-yarn/apps/dwadmin/*
  hdfs dfs -rmr /var/log/hadoop-yarn/apps/hadoop/*
  hdfs dfs -rmr /var/log/hadoop-yarn/apps/jason/*
  hdfs dfs -rmr /var/log/hadoop-yarn/apps/huazhiqiang/*
  hdfs dfs -rmr /var/log/hadoop-yarn/apps/bobo/*




2. 清理 /tmp 目录
  a) 查看容量
  hdfs dfs -du -s -h /tmp

  b) 删除
  hdfs dfs -rmr /tmp/hive/*
  hdfs dfs -rmr /tmp/hive-dwadmin/*
  hdfs dfs -rmr /tmp/hive-hadoop/*


4. 清理 hive 存储
  hdfs dfs -du -s -h /user/hive/*


3. 清理 /user 用户目录
  a) 查看容量
  hdfs dfs -du -s -h /user/*

  b) 清理各大账号的回收站和暂存目录
  ps : dwadmin 账号
  hdfs dfs -rmr /user/dwadmin/.Trash/*
  hdfs dfs -rmr /user/dwadmin/.staging/*

  hdfs dfs -rmr /user/bobo/*

  hdfs dfs -rmr /user/huazhiqiang/*

  hdfs dfs -rmr /user/zhiwenjiang/*

  hdfs dfs -rmr /user/jason/*



  ps : hadoop 账号
  hdfs dfs -rmr /user/hadoop/.Trash/*

end :
  hdfs dfs -du -s -h /  清理后总量 : 973.2 G  2.9 T  /

```

## 二、数据表统计

```

```
