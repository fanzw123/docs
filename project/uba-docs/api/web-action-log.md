## Uba 日志收集 web action log api

### Basic Info

- Maintainer ：维护者 <jason@angejia.com>
- Description：Uba Web 用户行为日志

### Request

```
POST http://s.angejia.com/uba?payload=web_action_log

测试
POST http://192.168.160.45/uba?payload=web_action_log

client_time=1479270134&referer=&url=http%3A%2F%2Fsh.angejia.com%2F&uid=37324&guid=4583c2d8-6bc7-4fa3-8c5f-1418baa46439
&ccid=1&page_param=%7B%7D&client_param=%7B%7D&action=xxxxx
```

##### Authentication:

- 无

##### Parameters：
- `ccid` (customer city id) - 用户选择城市id
- `uid`  (user id) - 用户id
- `referer` - 来源页面
- `url`  - 当前页面url
- `guid` - 用户唯一表示
- `client_time` - 用户系统时间戳
- `page_param` - 当前页面其他业务参数，如楼盘id等json字符串
- `client_param` - 用户端相关参数，如地理位置等json字符串
  -  `geo` (geographic coordinates) - 用户所在经纬度，用逗号分割
- `action` - 动作，待产品定义

### Response



### Changelog
