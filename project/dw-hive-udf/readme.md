# Dw Hive Udf

## 一、创建项目

``` sh

1. 创建工作目录
  mkdir ~/app
  cd ~/app

2. 克隆最新代码到本地
  dw_hive_udf 所在仓库
  git clone git@git.corp.angejia.com:dw/dw_hive_udf.git


3. 配置环境变量
  ~/.bashrc
  export ANGEJIA_APP_PATH=~/app
  export DW_HIVE_UDF_HOME=${ANGEJIA_APP_PATH}/dw_hive_udf

4. 构架开发环境
  mvn eclipse:eclipse

  导入成为 maven 项目

5. 编译打包
  cd $DW_HIVE_UDF_HOME
  mvn clean install -U   下载依赖
  mvn clean compile package  打包


7. 部署

  jar-with-dependencies 尾部这个表示, 把所有依赖都打入到这个 jar 包中了, 生产环境中, 必须使用全部依赖打包

  Hive UDF 上传:
    hdfs dfs -put -f $DW_HIVE_UDF_HOME/target/dw_hive_udf-1.0-SNAPSHOT-jar-with-dependencies.jar /user/jars/dw_hive_udf-1.0-SNAPSHOT-hive.jar

  Spark UDF 上传:
    hdfs dfs -put -f $DW_HIVE_UDF_HOME/target/dw_hive_udf-1.0-SNAPSHOT-jar-with-dependencies.jar /user/jars/dw_hive_udf-1.0-SNAPSHOT-spark.jar

  下载到本地:
    hdfs dfs -get /user/jars/dw_hive_udf-1.0-SNAPSHOT-spark.jar /data/app/jars/dw_hive_udf-1.0-SNAPSHOT-spark.jar


```

## 二、Hive UDF 案例

``` sh

1. 解析 userId
  ADD JAR /path/dw_hive_udf-1.0-SNAPSHOT-spark.jar;
  CREATE  TEMPORARY  FUNCTION  parse_mobile_token as 'com.angejia.dw.hive.udf.parse.ParseMobileToken';

  SELECT parse_mobile_token("6CST8Fkf2b5WSX+GMWeuLw+FCbhHLVT1g6yBgKimgqZITrjEjCHhY6UPimpvNEqcc64ebrd632aiF/nTNClZJQbBClboFqyu+1E4iEAmSUU=","user_id");
```
