# 地图项目环境搭建

## 一、Map 基于 express 部署

- 代码地址: https://git.corp.angejia.com/dw/report_design/tree/master/amap

- [先安装 NodeJs express](technology/Node.js/express)

## 二、环境搭建

``` sh
1. 安装 nodejs
	sudo apt-get install nodejs

2. clone 代码
	git clone git@git.corp.angejia.com:dw/report_design.git

3. 进入代码目录
  cd amap

4. 启动
  // 测试开发项目
  supervisor bin/www

  // 部署
	nohup node bin/www &   

5. 安全退出终端
	exit

```
