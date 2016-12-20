# Hive 使用遇到的问题

## 一、注意事项

- hive table 读取文件前，默认的分隔符是 \001 (就是 8 进制的 \t)
- hive table 的分隔符号很重要，在规划文件、建表的时候就要把字段和行的分割符号定义好
- hive table 在做出导出文件的时候，最好也指定好字段和行的分隔符
- hive table 有时会使用 sqoop 导入导出数据，注意查看表结构，分隔符指定好给 sqoop


## 二、HQL 问题

### 1、报错找不到类

```
问题:
	ClassNotFoundException: Class org.apache.hadoop.hive.contrib.serde2.RegexSerDe not found


解决:

	sudo ln -s /opt/cloudera/parcels/CDH-5.3.2-1.cdh5.3.2.p0.10/lib/hive/lib /etc/hive/auxlib

	CM配置：
		Hive 辅助 JAR 目录：
			/etc/hive/auxlib
		hive-env.sh 的 Gateway 客户端环境高级配置代码段（安全阀）：
			HIVE_AUX_JARS_PATH=/etc/hive/auxlib

参考:
	http://blog.csdn.net/sptoor/article/details/9838691
	http://blog.csdn.net/xiao_jun_0820/article/details/38302451
```


### 2、SerDe 支持 json

- 下载第三方json的jar包、挂载
- 资源文档：https://code.google.com/p/hive-json-serde/wiki/GettingStarted
-  加载jar包的方式：http://www.cnblogs.com/tangtianfly/archive/2012/11/06/2756745.html
- 自己编写jar包：http://blog.cloudera.com/blog/2012/12/how-to-use-a-serde-in-apache-hive/

```
下载包
	wget https://hive-json-serde.googlecode.com/files/hive-json-serde-0.2.jar


添加jar包
	add jar /home/heyuan.lhy/develop/wanke_http_test/hive-json-serde-0.2.jar;

	CREATE TABLE test_json
	(
		id BIGINT,
	  text STRING,
	)
	ROW FORMAT SERDE 'org.apache.hadoop.hive.contrib.serde2.JsonSerde'
	STORED AS TEXTFILE
	;
	LOAD DATA LOCAL INPATH "test.json" OVERWRITE INTO TABLE test_json;
```


### 3、第三方类库需要在 beeline 生效

```
问题 :
 	On the Beeline client machine, in /etc/hive/conf/hive-site.xml, set the hive.aux.jars.path property to a comma-separated list of the fully-qualified paths to the JAR file and any dependent libraries.

解决 :
	- 修改配置问题 /etc/hive/conf/hive-site.xml
	- 在下次重启时，自动生效

  <property>
    <name>hive.aux.jars.path</name>
    <value>file:///etc/hive/auxlib/hive-json-serde-0.2.jar</value>
  </property>

重启服务
	sudo service hive-metastore restart
	sudo service hive-server2 restart
	sudo service hiveserver restart
```

### 4、RegexSerDe 支持正则表达式

```
问题:
	row format SERDE 'org.apache.hadoop.hive.contrib.serde2.RegexSerDe'

解决:
	add jar hdfs://UCloudcluster/umr-jdlg4d/jars/hive-contrib-0.12.0-cdh5.1.0.jar;
```


## 二、 版本升级导致的问题

### 1、desc table [table name]返回不一致

- 0.10之前不返回分区信息，0.11和0.12版本强制返回分区信息，并且不可配置。0.13之后可以通过配置设置不返回

```
Version information — partition & non-partition columns
Icon
In Hive 0.10.0 and earlier, no distinction is made between partition columns and non-partition columns while displaying columns for DESCRIBE TABLE. From Hive 0.12.0 onwards, they are displayed separately.
In Hive 0.13.0 and later, the configuration parameter hive.display.partition.cols.separately lets you use the old behavior, if desired (HIVE-6689). For an example, see the test case in the patch for HIVE-6689.
```

## 2、hive1.1版本load data问题

```
LOAD DATA INPATH ‘filepath’ INTO TABLE xxx, 语句，filepath中的文件如果是（_）或者（.）开头的，将不会被load
* 同样，LOAD DATA INPATH ‘/filepath/filename’ INTO TABLE xxx, 语句，filename如果是（_）或者（.）开头的，也不会被load
```
