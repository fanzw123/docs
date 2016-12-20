# sqoop 客户端配置

## 常见问题
```
1.出现 org.apache.sqoop.Sqoop 找不到主类

解决 : 把 sqoop 目录下的 sqoop-1.4.4.jar 拷贝到 hadoop 的 lib 目录下
cd /opt/cloudera/parcels/CDH/lib/hadoop
sudo ln -s ../../jars/sqoop-1.4.5-cdh5.3.3.jar ./

2.mysql 类加载不到

解决 : 下载 mysql JDBC 放到 hadoop 目录下即可
cd /opt/cloudera/parcels/CDH/lib/hadoop
sudo ln -s ../../jars/mysql-connector-java-5.1.31.jar ./


3. HADOOP_MAPRED_HOME is /usr/lib/hadoop-mapreduce 找不到
ERROR tool.ImportTool: Imported Failed: Parameter 'directory' is not a directory

解决 : sudo ln -s /opt/cloudera/parcels/CDH/lib/hadoop-mapreduce /usr/lib/hadoop-mapreduce

```
