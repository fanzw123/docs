# mysq2hive数据同步监控步骤

## 1.mysql中所有需要同步的表加锁
    获取msyql各同步表的数据行数
        
## 2.同步脚本执行
    释放锁
    
## 3.检查 hive db-sync中所有表的修改时间是否正确
    检查db_sync中各表数据行是否与对应的mysql表的数据行数是否一致
    
## 4.检查db_sync与db_snapshoot数据是否一致