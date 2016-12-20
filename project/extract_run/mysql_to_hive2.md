
# mysql to hive 导入测试

## 导入测试

| type | table | rows | size | mr_num | inc | seconds |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| sqoop | inventory_extend | 65W | 80M | 5 | 1 | 41
| mysql_dump | inventory_extend | 65W | 80M | 5 | 1 | 16
| direct | inventory_extend | 65W | 80M | 5 | 1 | 33
| sqoop | image | 165W | 145M | 5 | 1 | 36
| mysql_dump | image | 165W | 145M | 5 | 1 | 18
| direct | image | 165W | 145M | 5 | 1 | 38
| dataX | image | 165W | 145M | 5 | 1 | 21
| sqoop | bureau_properties | 116W | 193M | 5 | 1 | 36
| mysql_dump | bureau_properties | 116W | 193M | 5 | 1 | 35
| direct | bureau_properties | 116W | 193M | 5 | 1 | 36
| sqoop | inventory_developments | 256W | 223M | 5 | 1 | 45
| mysql_dump | inventory_developments | 256W | 223M | 5 | 1 | 27
| direct | inventory_developments | 256W | 223M | 5 | 1 | 40
| sqoop | house_dicts | 458W | 279M | 5 | 1 | 47
| mysql_dump | house_dicts | 458W | 279M | 5 | 1 | 41
| direct | house_dicts | 458W | 279M | 5 | 1 | 55
| dataX | house_dicts | 458W | 279M | 5 | 1 | 41
| sqoop | log_sync_angejia_to_ecosphere | 11w | 365M | 5 | 1 | 34
| mysql_dump | log_sync_angejia_to_ecosphere | 11w | 365M | 5 | 1 | 26
| direct | log_sync_angejia_to_ecosphere | 11w | 365M | 5 | 1 | 46
| sqoop | member_inventory_view | 393w | 367M | 5 | 1 |47
| mysql_dump | member_inventory_view | 393w | 367M | 5 | 1 | 54
| direct | member_inventory_view | 393w | 367M | 5 | 1 | 43
| sqoop | sms | 186W | 402M | 5 | 1 | 40
| mysql_dump | sms | 186W | 402M | 5 | 1 | 36
| 增量 | sms | 186W | 402M |  |  | 37
| direct | sms | 186W | 402M | 5 | 1 | 38
| dataX | sms | 186W | 402M | 5 | 1 | 21
| sqoop | notify | 2122W | 1.2G | 5 | 1 | 113
| mysql_dump | notify | 2122W | 1.2G | 5 | 1 | 176
| 增量 | notify | 2122W | 1.2G |  |  | 153
| direct | notify | 2122W | 1.2G |  |  | 108
| sqoop | msg_ext | 645W | 2.3G | 5 | 1 | 86
| mysql_dump | msg_ext | 645W | 2.3G | 5 | 1 | 166
| 增量 | msg_ext | 645W | 2.3G |  |  | 64
| direct | msg_ext | 645W | 2.3G |  |  | 85
| dataX | msg_ext | 645W | 2.3G |  |  | 71
| sqoop | demand_log | 839W | 8.4G | 5 | 1 | 111
| mysql_dump | demand_log | 839W | 8.4G | 5 | 1 | 513
| 增量 | demand_log | 839W | 8.4G |  |  | 259
| direct | demand_log | 839W | 8.4G |  |  | 102
| dataX | demand_log | 839W | 8.4G |  |  | 181


## 测试结果

* 数据表的行数对导入速度影响较小
* 文件小于 400M 时，mysql_dump 快，大于 400M 时 sqoop 快
* 增量数据在部分场景下, 速度受到表的行数影响较大, (100W - 1000W 条, 400MB左右) 速度是最快的 , 但如果超过这个边界则就没有优势了
* sqoop 加入 direct 参数没有明显改变效果（导入存在中文乱码问题目前没有解决方案）
* dataX 在400M以下跟mysqldump没有区别，400M以上跟sqoop差异较小

* 建议
 - 文件小于 400MB, 使用 mysql_dump 导入
 - 条数 100W - 1000W 条, 400MB - 2G 左右, 增量有部分优势
 - 数据条数超过 1000 W, 源文件大于 2G , 使用 sqoop 导入
