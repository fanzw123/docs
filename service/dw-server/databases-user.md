# 数据库账号

## 一、线下环境


### 1.dw 线下测试数据库
```
cdh-manager.angejia.club
hadoop
angejia888
```

### 2.业务测试数据库

```
develop 开发环境
192.168.160.53
angejia
angejia123


alpha 联调准备上线环境(线下 hadoop 集群使用的 mysql 数据源)
192.168.160.54
angejia
angejia123


master 产品测试使用环境
192.168.160.55
angejia
angejia123
```


## 二、线上数据库

- 线上数据库连接需要通过跳板机连接，并且需要本机 ssh 公钥登录 dwadmin 权限
- 10.10.2.91 bastion-host 本地 ssh 转发 ，端口 22, 连接数据库

### 1. angejia-bi-db(10.10.64.146) 数据部内部数据库

- 数据部内部人员登录账号密码

 ```
 // 映射端口
 10.10.46.92  23307
 ```

- 提供对外接口数据库

 ```
 -* mysql用户名：readonly
 -* mysql密码：R_+an|gejiaY
 -* mysql权限：SELECT
 ```


### 2. agjdb2-bi(10.10.39.153) 业务 slave 数据库

- 登录账号

  ```
  10.10.39.153
  找 Leader 申请
  ```
