## access_log相关约定


### hive表字段
* `request_time` (0.058) - 请求响应时长
* `upstream_response_time` (0.050) - 后端处理时长
* `remote_addr` (123.151.42.46) - 用户ip
* `request_length` (1006) - 请求主体的长度
* `upstream_addr` (10.10.46.70:8004) - 服务器IP:端口
* `server_date` (2015-03-23) - 服务器日期
* `server_time` (06:44:30) - 服务器时间
* `hostname` (m.angejia.com) - 域名
* `method` (GET) - 请求类型
* `request_uri` (/verify/phone) - 请求地址
* `http_code` (200) - 请求状态码
* `bytes_sent` (1572) - 响应字节
* `http_referer` - 前一个访问地址
* `user_agent` - 用户客户端信息
* `gzip_ratio` (2.29) - 压缩比例
* `http_x_forwarded_for` (119.48.124.96) - 转发代理信息
* `auth` (参见:Angejia-Auth) - 用户身份认证的Token
* `mobile_agent` (参见:Angejia-MobileAgent) - 移动设备信息

```
最后两个参数为请求HEADER参数，详情请参见：
http://git.corp.angejia.com/service/design/wikis/Mobile-API/Spec
其中的说明
```

#### example

```
0.058 0.050 123.151.42.46 1006 10.10.46.70:8004 [23/Mar/2015:06:44:30 +0800] m.angejia.com "GET /verify/phone?redirect=%2Fscore%2F HTTP/1.1" 200 1572 "-" "Mozilla/5.0 (Linux; U; Android 4.2.2; zh-cn; X909T Build/JDQ39) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.4 TBS/025411 Mobile Safari/533.1 MicroMessenger/6.1.0.66_r1062275.542 NetType/WIFI" "2.29" "119.48.124.96"
```