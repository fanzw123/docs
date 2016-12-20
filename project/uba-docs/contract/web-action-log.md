## Web相关约定


### 前端参数约定
* `payload` - web_action_log
* `uid` (user id) - 用户id
* `ccid` (customer city id) - 用户选择城市id
* `referer` - 来源页面
* `url ` - 当前页面url
*  `guid` - 用户唯一表示
* `client_time ` - 用户系统时间戳(秒级)
* `page_param` - 当前页面其他业务参数，如楼盘id等json字符串
* `client_param` - 用户端相关参数，如地理位置等json字符串
	* `geo` (geographic coordinates) - 用户所在经纬度，用逗号分割
* `action` - 产品定义

#### example
* /?payload=web_action_log,uid=1234,ccid=11,referer=http://www.baidu.com/,url=http://angejia.com/,client_time=2015-03-19 17:09:53,page_param={},client_param={'geo':'34.12,56.43'},action='UA_PROP_CLICK_CALL'

### HIVE表额外字段（以上参数全部映射未hive表字段）
* `client_time ` - 代替：用户系统时间戳转换成字符串（2015-03-19 17:09:53）
* `server_time` - 服务器时间（2015-03-19 17:09:53）
* `ip` - 用户ip
* `agent` (user agent) - 浏览器ua

### HIVE表名
* uba_web_log_yyyymmdd
