# DW Service

## 一、Service 构架

- [Service 1.0](https://www.processon.com/view/link/56028961e4b00d52cf623417)
- [Service 2.0](https://www.processon.com/view/link/562894b7e4b070f8ccca5863)

## 二、DATABASE 分层
[DATABASE 分层](https://www.processon.com/view/link/55cc7d74e4b0b966bebcb44e)


## 三、内存占用情况

| 服务 | 内存 | 机器 |
| ------ | ------ | ------ |
| dw_explore | 382~3455M | bi1 |
| dw_monitor、dw_index(tomcat) | 475~3455M | bi1 |
| 地图(node_server) | 60~938M | bi1 |
| jasper-server | 1419~200M | bi2 |
| hue | 249~945M | bi2 |
| spagoBi | 1395~4325M | bi2 |
| dw_hive_server | 747~2000M | bi3 |
| dw_general_loader | 179~1000M | bi3 |
| dw_scheduler_agent | 179~2000M | bi3 |
| node_server(查看日志) | 32~100M | bi3 |
