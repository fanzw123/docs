## 1. 数据库

``` sql
集群
hadoop
2345.com

应用和数据
dw_service
dw_service_818


CREATE DATABASE `dw_service` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON dw_service.* TO 'dw_service'@'%' IDENTIFIED BY 'dw_service_818' WITH GRANT OPTION;
flush privileges;

CREATE DATABASE `dw_monitor` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON dw_monitor.* TO 'dw_service'@'%' IDENTIFIED BY 'dw_service_818' WITH GRANT OPTION;
flush privileges;

CREATE DATABASE `dw_explorer` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON dw_explorer.* TO 'dw_service'@'%' IDENTIFIED BY 'dw_service_818' WITH GRANT OPTION;
flush privileges;


CREATE DATABASE `dw_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON dw_db.* TO 'dw_service'@'%' IDENTIFIED BY 'dw_service_818' WITH GRANT OPTION;
flush privileges;

CREATE DATABASE `dm_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON dm_db.* TO 'dw_service'@'%' IDENTIFIED BY 'dw_service_818' WITH GRANT OPTION;
flush privileges;


CREATE DATABASE `dim_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON dim_db.* TO 'dw_service'@'%' IDENTIFIED BY 'dw_service_818' WITH GRANT OPTION;
flush privileges;

CREATE DATABASE `da_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON da_db.* TO 'dw_service'@'%' IDENTIFIED BY 'dw_service_818' WITH GRANT OPTION;
flush privileges;


CREATE DATABASE `temp_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
GRANT ALL PRIVILEGES ON dw_temp_db.* TO 'dw_service'@'%' IDENTIFIED BY 'dw_service_818' WITH GRANT OPTION;
flush privileges;


-- monitor
scp ~/app/monitor/run/monitor.war hadoop@dw6:/home/hadoop/app/monitor/run
cp /home/hadoop/app/monitor/run/monitor.war /usr/local/tomcat-7/webapps

$TOMCAT_HOME/bin/shutdown.sh
$TOMCAT_HOME/bin/startup.sh

tail -f $TOMCAT_HOME/logs/catalina.out

-- hive_server
scp ~/app/dw_hive_server/target/scala-2.10/dw-hive-server_2.10-0.0.1.war hadoop@dw6:/home/hadoop/app/dw_hive_server/target/scala-2.10/

-- dw_general_loader
scp ~/app/dw_general_loader/scripts/dw_general_loader.jar hadoop@dw6:/home/hadoop/app/dw_general_loader/run/





```
