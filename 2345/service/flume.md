

flume 启动

flume-ng agent -c /etc/flume-ng/conf -f /etc/flume-ng/conf/flume.conf -n agentDw


flume-ng agent -c /etc/flume-ng/conf -f /etc/flume-ng/conf/flume.conf -n agentDw
\ --classpath /usr/lib/flume-ng/lib/dw_flume-1.0.0.jar



``` sh
# 安全卫士(0 日志)
mkdir -p /var/log/flume/safe_use/monitor/0/20160930
cp /opt/client_txt_log/pcsafe/text_data/statistics_new/2016/0/2016-09-30* /var/log/flume/safe_use/monitor/0/20160930

# 安全卫士(1 日志)
mkdir -p /var/log/flume/safe_use/monitor/1/20160930
cp /opt/client_txt_log/pcsafe/text_data/statistics_new/2016/1/2016-09-30



```
