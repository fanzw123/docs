# 服务端

``` sh
beeline -u jdbc:hive2://dw2:10000/default -nhadoop -phadoop

set mapreduce.reduce.memory.mb=4096;


flume 启动

flume-ng agent -c /etc/flume-ng/conf -f /etc/flume-ng/conf/flume.conf -n agentDw

sudo service flume-ng-agent restart

hive --hiveconf  hive.root.logger=DEBUG,console
```
