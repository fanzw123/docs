# Uba App Action Log

### Basic Info

- Maintainer ：维护者 <jason@angejia.com>
- Description：Uba APP 日志收集  api

### Request

```
POST http://s.angejia.com/uba?payload=app_action

测试：
POST http://192.168.160.45/uba?payload=app_action
```

##### Authentication:

- 无

##### Parameters：

* [详细字段约定](project/uba-docs/contract/app_action_log.md)

http head :
- Content-type:application/json

post data :

``` json
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
    "ver": "1.0.0"
  },
  "usages": [
    {
      "uid": "uid1",
      "net": "net1",
      "ip": "ip1",
      "ccid": "ccid1",
      "gcid": "gcid1",
      "geo" : "12312331.13-234324234.123",
      "logs": [
        {
          "action": "action1",
          "clickTime": "123123123213",
          "extend": {
            "vpid": "12",
            "bp": "12323",
            "appOpenTime":"2015-07-06 16:35:18",
            "appCloseTime":"2015-07-06 16:45:18"
          }
        },
        {
          "action": "action12",
          "clickTime": "2423423432",
          "extend": {
            "vpid": "234234",
            "bp": "24234"
          }
        }
      ]
    },

    {
      "uid": "uid2",
      "net": "net2",
      "ip": "ip2",
      "geo" : "12312331.13-234324234.123",
      "logs": [
        {
          "action": "action2",
          "clickTime": "123123123213",
          "extend": {
            "vpid": "12",
            "bp": "12323",
            "appOpenTime":"2015-07-06 16:46:18",
            "appCloseTime":"2015-07-06 16:52:18"
          }
        },
        {
          "action": "action22",
          "clickTime": "2423423432",
          "extend" : {}
        }
      ]
    }
  ]
}

```



### Response

无

### Changelog
