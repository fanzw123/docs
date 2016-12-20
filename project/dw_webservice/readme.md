# dw_webservice

## 一、介绍

## 二、部署

- JDK 1.7 , Tomcat 1.7
- 基于 ssh 框架

``` sh

1. 下载代码
  cd ~/app/
  git clone git@git.corp.angejia.com:dw/dw_webservice.git
  cd dw_webservice

2. 构架开发环境
  1) 修改配置文件
    resources/hibernate/hibernate.properties
    resources/spring/common.properties
    到指定的服务环境
  2) mvn eclipse:eclipse 或者直接在 eclipse 导入 mvn 项目
  3) 解决 eclipse 报错
    右击项目 dw_webservice -> Properties -> Project Facets -> Runtimes -> 勾选 Apache Tomcat 7.0
                                                          -> Dynamic Web Module -> 2.3
                                                          -> java -> 1.7

3. 项目部署上线 (bi2)
  1) 修改配置文件
    resources/hibernate/hibernate.properties
    resources/spring/common.properties
    指定到 online 环境的 Mysql

  2) 编译
    cd ~/app/dw_webservice
    git pull --rebase origin master
    mvn clean package

  3) 部署到 Tomcat
    cd /usr/local/tomcat-7/webapps

    cp -f ~/app/dw_webservice/target/dw_webservice.war /usr/local/tomcat-7/webapps/dw_webservice.war
      OR
    cp -f ~/app/dw_webservice/target/dw_webservice-jar-with-dependencies.jar /usr/local/tomcat-7/webapps/dw_webservice.war

4. 测试环境部署(dwtest)
  mvn clean package  本地打包

  上传到测试服务器
  scp ~/app/dw_webservice/target/dw_webservice.war hadoop@dwtest:/usr/local/tomcat-7/webapps/dw_webservice.war


```
