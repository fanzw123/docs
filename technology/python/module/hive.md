# python 操作 hive

- [官方文档](https://cwiki.apache.org/confluence/display/Hive/Setting+Up+HiveServer2#SettingUpHiveServer2-PythonClientDriver)

## 方法一

> 安装 pip 工具

``` sh
sudo apt-get install libsasl2-dev

sudo pip install pyhs2
```

> 案例

``` python

#coding=utf-8

import pyhs2

class HiveModel:

    def __init__(self):

       self.hiveServer2("show tables")

    def hiveServer2(self,sql):
        with pyhs2.connect(host='uhadoop-ociicy-master2',
                   port=10000,
                   authMechanism="PLAIN",
                   user='dwadmin',
                   password='dwadmin',
                   database='default') as conn:
            with conn.cursor() as cur:
                #Show databases
                print cur.getDatabases()

                #Execute query
                cur.execute("select * from inventory_all")

                #Return column info from query
                print cur.getSchema()

                #Fetch table results
                for i in cur.fetch():
                    print i


```

## 方法二 (配置繁琐)

- 通过 git 方式 [git 链接](https://github.com/BradRuderman/pyhs2)
