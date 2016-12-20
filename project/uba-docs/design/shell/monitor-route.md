# 监控 git 路由设计

- [概要设计](http://www.processon.com/view/link/5566d1d6e4b07104f5a07e77)
- [详细设计](http://www.processon.com/view/link/5566d1b7e4b07104f5a07c48)


## 获取文件变动时间

```
计算一个文件的详细变动时间

方案一
stat ./readme.md | grep Modify | awk '{
  split($3,var,".");
  printf $2;
  printf " ";
  printf var[1];
}';

返回结果
2015-05-28 16:50:53


方案二
stat ./readme.md   -c %y
2015-05-28 16:50:53.544119805 +0800

```


## 运行时间以及部署时间
```
运行时间：
中午 12:00
下午 15:00
晚上 21:00

部署环境 dw_admin

```

## 新增需求

```
显示修改内容

OR

修改连接
```
