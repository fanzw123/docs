# node_socket_server - Web socket 通讯

## 介绍

- 通过 node.js 的一个socket.io 的模块，开启一个长连接来读取日志文件数据到 HTML 中

## 环境搭建

- [github 参考](https://github.com/plhwin/nodejs-socketio-chat)

``` sh
1.下载 Node.js
  https://nodejs.org/en/download/
  Linux Binaries (.tar.gz)

2.解压安装
  cd [node-versions]/lib

  安装 socket.io 模块
  ./[node-versions]/bin/npm install --save socket.io

3.启动 (一般已经配置好了，无需操作)
  git clone tools 仓库代码后

  通过启动脚本
    node ~/app/tools/dw_script/node_socket_server/node_server.js

  挂起服务
    ~/app/tools/dw_script/node_socket_server/node_server_restart.sh

  查看进程
    ps -aux | grep node_server

4.通过 nginx 代理转发配置
  server {
      listen 80;
      # 请求的域名
      server_name dwtest.angejia.club;

      location /socket.io {
          # 转发的 ip 或域名的端口号
          proxy_pass http://dwtest.angejia.club:8000;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "Upgrade";
      }
  }
```
