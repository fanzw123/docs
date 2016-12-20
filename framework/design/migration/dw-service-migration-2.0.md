# 数据部迁移到新集群中

## 一 、数据迁移

- 10.10.2.91 -> angejia-bi-db

### 1.mysql 迁移

``` sh
1. 从 bi0 迁移数据到 angejia-bi-db 中

  nohup mysqldump -hbi0 -uhadoop -pangejia888 dw_monitor -F > ./dw_monitor.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 dw_monitor -v -f < ./dw_monitor.sql 2>&1 &

  nohup mysqldump -hbi0 -uhadoop -pangejia888 dw_db -F > ./dw_db.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 dw_db -v -f < ./dw_db.sql 2>&1 &

  nohup mysqldump -hbi0 -uhadoop -pangejia888 da_db -F > ./da_db.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 da_db -v -f < ./da_db.sql 2>&1 &

  nohup mysqldump -hbi0 -uhadoop -pangejia888 dm_db -F > ./dm_db.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 dm_db -v -f < ./dm_db.sql 2>&1 &

  nohup mysqldump -hbi0 -uhadoop -pangejia888 dw_explorer -F > ./dw_explorer.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 dw_explorer -v -f < ./dw_explorer.sql 2>&1 &

  nohup mysqldump -hbi0 -uhadoop -pangejia888 dw_temp_angejia -F > ./dw_temp_angejia.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 dw_temp_angejia -v -f < ./dw_temp_angejia.sql 2>&1 &

  nohup mysqldump -hbi0 -uhadoop -pangejia888 hadoop_test -F > ./hadoop_test.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 hadoop_test -v -f < ./hadoop_test.sql 2>&1 &

  nohup mysqldump -hbi0 -uhadoop -pangejia888 jasperserver -F > ./jasperserver.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 jasperserver -v -f < ./jasperserver.sql 2>&1 &

  nohup mysqldump -hbi0 -uhadoop -pangejia888 spagobi -F > ./spagobi.sql 2>&1 &
  nohup mysql -hangejia-bi-db -uhadoop -pangejia888 spagobi -v -f < ./spagobi.sql 2>&1 &

```


### 2. hive 数据迁移

``` sh


hive 元数据
  vim hive.sql
  umr-jdlg4d -> user
    :1,$s/umr-jdlg4d/user/g

  UCloudcluster > Ucluster
    :1,$s/UCloudcluster/Ucluster/g

  uhivetayokf/warehouse/dw_temp_angejia.db ->  hive/dw_temp_angejia
    :1,$s/uhivetayokf\/warehouse\/dw_temp_angejia.db/hive\/dw_temp_angejia/g

  uhivetayokf/warehouse/dw_db_temp.db -> hive/dw_db_temp
    :1,$s/uhivetayokf\/warehouse\/dw_db_temp.db/hive\/dw_db_temp/g

  uhivetayokf/warehouse -> hive/warehouse
    :1,$s/uhivetayokf\/warehouse/hive\/warehouse/g

  nohup mysql -huhadoop-ociicy-master1 -uhadoop -pangejia888 hive -v -f < ./hive.sql  2>&1 &

HDFS

  1.下载数据 (bi2)
    cd /data/tmp/old_cluster
    hadoop dfs -get /umr-jdlg4d/ ./
    watch -n1 du -sh ./*

  2.上传到新集群 (bi2)
    vim ~/.bashrc 切换到线上 hadoop 环境
    hadoop dfs -put ./umr-jdlg4d /user/old_cluster/20151014/
    watch -n3  hadoop dfs -du -s -h /user/old_cluster/20151014/

  3.bi3 cp 备份数据到指定目录下
    1) cp 复制所有数据到 hive
      hadoop dfs -cp -f  /user/old_cluster/20151014/umr-jdlg4d/hive/* /user/hive/
      watch -n3  hadoop dfs -du -s  /user/hive/


    2) 其他库表特殊处理
     dw_temp_angejia
     hadoop dfs -cp -f /user/old_cluster/20151014/umr-jdlg4d/uhivetayokf/warehouse/dw_temp_angejia.db/* /user/hive/dw_temp_angejia/

     hadoop dfs -cp -f /user/old_cluster/20151014/umr-jdlg4d/uhivetayokf/warehouse/dw_db_temp.db/* /user/hive/dw_db_temp/

```

### 3. 一些业务脚本

```
http://dw.angejia.club/monitor/getSchedulerJobAction?schedulerId=20
  /usr/local/java1.7/bin/java -jar /home/dwadmin/app/uba/scripts/baidu-sem/baidu-sem.jar

http://dw.angejia.club/monitor/dev/task/edit-script?id=29
  hdfs://Ucluster/user/jars/GetLn.jar
```

### 问题

```
dw_app_access_log
  alter table dw_app_access_log drop partition(p_dt='2015-04-01');
  alter table dw_app_access_log drop partition(p_dt='2015-04-02');
  alter table dw_app_access_log drop partition(p_dt='2015-04-03');
  alter table dw_app_access_log drop partition(p_dt='2015-04-04');
  alter table dw_app_access_log drop partition(p_dt='2015-04-05');
  alter table dw_app_access_log drop partition(p_dt='2015-04-06');

```

## 二、基础服务

### 1.dw_monitor

``` sh
tail -f /usr/local/tomcat-7/logs/catalina.out

~/app/monitor/script/monitor-restart.sh

注意把修改邮件的功能也加上去
```

### 2.dw_scheduler_agent

``` sh
tail -f /data/log/dwlogs/schedule_log/schedule_info.log

~/app/tools/dw_script/scheduler_restart.sh
```

### 3.dw_hive_server

```
tail -f /data/log/dwlogs/jetty_log/hive-server.out

~/app/dw_hive_server/dwetl/dw-server-restart.sh

```




## nginx 配置

- [nginx 规划设计图](https://www.processon.com/view/link/561cbf25e4b07efc017bde96)

###  1. app-bi-new (for bi 0)
``` sh
server {

  listen 80;
  server_name dw.angejia.club;

  #monitor
  location /monitor {
       proxy_pass http://bi3:9080;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  #node js socket.io
  location /socket.io {
       proxy_pass http://bi3:8000;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "Upgrade";
   }

   #explorer
   location /explorer {
        proxy_pass http://bi3:9081;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
   }


   # 下面的待定
   location /internal.service/map/ {
       proxy_pass http://bi1:30000/;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }

   location /SpagoBI {
       proxy_pass http://bi2:8088;
   }

   location /dw_index {
        proxy_pass http://bi1:9080;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }

}

#hue
server {
    listen 80;
    server_name hue.angejia.club;

    location / {
      proxy_pass http://bi2:8888/;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
    }
}

```


### 2. app-bi-old (from bi1)

```sh
server {
    listen 80;
    server_name dwms.corp.angejia.com;

    location / { proxy_pass http://bi0:8080/; }
    charset utf-8;
}
server {
    listen 80;
    server_name bi.corp.angejia.com;
    location / {
    proxy_pass http://bi1:9080/dw_index/;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    charset utf-8;
}
server {
    listen 80;
    server_name art.corp.angejia.com;

    location / {
      proxy_pass http://bi2:8088/;
    }
}

server {
    listen 80;
    server_name dw.corp.angejia.com;

    location /SpagoBI {
        proxy_pass http://bi2:8088;
    }

    location /monitor {
        proxy_pass http://bi1:9080;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /dw_index {
        proxy_pass http://bi1:9080;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /socket.io {
        proxy_pass http://bi1:8000;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }

    location /explorer {
        proxy_pass http://bi2:9081;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
    location /internal.service/map/ {
        proxy_pass http://bi1:30000/;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
