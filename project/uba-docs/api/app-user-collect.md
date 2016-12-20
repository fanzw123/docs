# APP 用户收集接口

### Basic Info

- Maintainer ：维护者 <jason@angejia.com>
- Description：Uba APP 日志收集  api

### Request

- [详见 app-action-log](app-action-log.md)

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
    "dvid": "xxxxxxx",
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
      "uid": "uid2",
      "net": "net2",
      "ip": "ip2",
      "geo" : "12312331.13-234324234.123",
      "logs": [
        // 1. 用户使用的 APP
        {
          "action": "USER_USE_APP_OPEN",
          "clickTime": "123123123213",
          "extend": {
            "cols" : {
              "appPackage" : "xxx",
              "appName" : "xxx"
            }
          }
        },
        {
          "action": "USER_USE_APP_CLOSE",
          "clickTime": "123123123213",
          "extend": {
            "cols" : {
              "appPackage" : "xxx",
              "appName" : "xxx"
            }
          }
        },
        // 2. 用户安装的手机 APP
        {
          "action": "USER_INSTALL_APP_LIST",
          "clickTime": "2423423432",
          "extend": {
              "appPackage" : "Package1",
              "appName" : "appName1"
          }
        },
        {
          "action": "USER_INSTALL_APP_LIST",
          "clickTime": "2423423432",
          "extend": {
              "appPackage" : "Package2",
              "appName" : "appName2"
          }
        },
        {
          "action": "USER_INSTALL_APP_LIST",
          "clickTime": "2423423432",
          "extend": {
              "appPackage" : "Package3",
              "appName" : "appName3"
          }
        }

      ]
    }
  ]
}

```



### Response

无

### Changelog
