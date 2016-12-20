# 推荐数据接口


## 一、接口相关


- offline : http://127.0.0.1:8080
- offline : http://ds.corp.angejia.com

### 1、用户房源推荐接口

- 接口地址
 - /recommendapi/user/1011.json?city_id=1
- 逻辑表
 - da_user_inventory_recommend_cbcf   cbcf 用户画像推荐出来的数据
 - da_user_inventory_recommend_ubcf   ubcf 算法推荐数据


### 2、房源推荐接口

- 接口地址
 - /recommendapi/inventory/169036.json
- 逻辑表
 - da_property_inventroy_recommend


### 3、顾问配盘接口

- 接口地址
 - 老接口 : /recommendapi/broker_mate_inventory/103929/140079.json?city_id=1
 - 新接口 : /recommendapi/broker/broker_mate_inventory/103929/140079.json?city_id=1
- 逻辑表
 - da_broker_user_mate_inventory


### 4、用户画像接口
- 新的接口
  - 老接口: /recommendapi/user_portrait/100191.json?city_id=1
  - 新接口: /recommendapi/user/user_portrait/100191,100192.json?city_id=1
- 逻辑表
  - da_db.da_user_portrait



## 二、部署

- JDK 1.7 , Tomcat 1.7
- 基于SpringMVC RESTful [Spring4 MVC Demo](http://www.yiibai.com/spring_mvc/spring-mvc-tutorial-for-beginners.html)

``` sh

1. 下载代码
  git clone git@git.corp.angejia.com:dw/recommend.git
  cd recommend/recommendapi

2. 构架开发环境
  1) 修改配置文件 spring-beans.xml 指定到 offline 环境的 Mysql
  2) mvn eclipse:eclipse 或者直接在 eclipse 导入 mvn 项目
  3) 解决 eclipse 报错
    右击项目 recommendapi -> Properties -> Project Facets -> Runtimes -> 勾选 Apache Tomcat 7.0

3. 项目部署上线 (bi2)
  1) 修改配置文件 spring-beans.xml 指定到 online 环境的 Mysql
  2) 编译
    cd ~/app/recommend/recommendapi
    git pull --rebase origin master
    mvn clean package
  3) 部署到 Tomcat
    cd /usr/local/tomcat-7/webapps
    ln -s ~/app/recommend/recommendapi/target/recommendapi-1.0.war

4. 测试环境部署(dwtest)
  mvn clean package  本地打包

  上传到测试服务器
  scp ~/app/recommend/recommendapi/target/recommendapi-1.0.war hadoop@dwtest:/home/hadoop/app/recommend/recommendapi/target/recommendapi-1.0.war   

  Tomcat 上运行
  cp -f ~/app/recommend/recommendapi/target/recommendapi-1.0.war  /usr/local/tomcat-7/webapps/recommendapi.war

    OR

  使用 jetty 运行
  /usr/local/jdk1.8.0_45/bin/java -jar ~/app/run/jetty-runner-9.3.8.v20160314.jar --path /recommendapi ~/app/recommend/recommendapi/target/recommendapi-1.0.war &

```
