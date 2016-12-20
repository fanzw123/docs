## APP端actionlog相关约定

### device
与设备相关的字段

* `mac` mac地址
* `dvid` 设备id
* `model` 设备名
* `os` 操作系统版本


### app
与应用相关的字段

* `name` app名称 eg a-angejia,a-broker,i-angejia,i-broker
* `ch` 渠道号
* `ver` app版本号

### usages
一段用户行为，当uid，net，ip等字段发生变化时，创建一个新的usage对象（用于减少数据的冗余）

* `uid` 用户id，未登录为0
* `ip` ip地址
* `net` 当前网络环境 eg:wifi 3G
* `ccid` 当前选择的城市
* `gcid` 当前定位到的城市
* `geo` 经纬度 格式：lat-lng

### logs
记录具体用户行为

* `action` 产品定义的actionId
* `clickTime` 动作发生的时间 格式yyyy-MM-dd HH:mm:ss eg：2015-05-19 15:01:15


### extends
扩展字段，包含业务逻辑

- `vpid` 房源id
- `bp` 前一个页面的pageId
- `chatUserId` 微聊对象user_id
- `brokerId` 经纪人id
- `visitId` 带看id
- `cols` {key:val,key:val}


### example

```
{
  "device": {
    "mac": "D0:22:BE:1D:DD:A9",
    "dvid": "",
    "model": "Android-GT-I9508",
    "os": "4.3"
  },
  "app": {
    "name": "a-angejia",
    "ch": "b01",
    "ver": "1.0.0",
  },
  "usages": [
    {
      "uid": "",
      "net": "",
      "ip": "",
      "ccid": "",
      "gcid": "",
      "geo":"",
      "logs": [
        {
          "action": "",
          "clickTime": "",
          "extend": {
            "vpid": "",
            "bp": "",
            "chatUserId":""
          }
        },
        {
          ...
        }
      ]
    },
    {
      ...
    }
  ]
}

```
