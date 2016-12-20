# mysql 管理和配置

## 一、管理命令

``` sh

-- 查看 Mysql 进程列表
  SHOW PROCESSLIST;

-- 杀死指定进程
  kill [id]

-- 查看变量配置
  show variables like "%lower_case_table_names%";
```

## 二、配置模板

``` sh

-- my.conf

# 不区分大小写
lower_case_table_names = 1

# innodb缓冲池大小  4294967296 字节 = 4 G
innodb_buffer_pool_size = 4294967296

[mysqld]
datadir=/data/mysql
socket=/var/lib/mysql/mysql.sock
user=mysql
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

max_connections = 150
max_connect_errors = 10
read_rnd_buffer_size = 4M
max_allowed_packet = 4M
table_cache = 1024
myisam_sort_buffer_size = 32M
thread_cache = 16
query_cache_size = 16M
tmp_table_size = 64M

log-bin=mysql-bin

innodb_file_per_table=1
wait_timeout = 1200
thread_concurrency = 8
innodb_data_file_path = ibdata1:10M:autoextend
innodb_additional_mem_pool_size = 32M
innodb_thread_concurrency = 16

log-slow-queries=/data/mysql/slow.log
long_query_time=1
log-queries-not-using-indexes
log-slow-admin-statements

```
