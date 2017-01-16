

flume 启动

flume-ng agent -c /etc/flume-ng/conf -f /etc/flume-ng/conf/flume.conf -n agentDw

sudo service flume-ng-agent restart


flume-ng agent -c /etc/flume-ng/conf -f /etc/flume-ng/conf/flume.conf -n agentDw
\ --classpath /usr/lib/flume-ng/lib/dw_flume-1.0.0.jar
