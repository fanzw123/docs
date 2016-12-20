# load gather 方案

## 一、需求

不适用 map reduce 导入 gather 库

## 二、测试方案

### 1.MySQL

```

mysql 查询数据到文件，类似于 db_sync 方案

优点：
  1.速度跟 db_sync 一样快
  2.全局 mysql-to-dump 导入脚本统一入口，方便维护升级
  3.完全不生成 map reduce

缺点
  1.run 需要查询 2 次 mysql，db_sync 一次 db_gather 一次。
  2.数据不一致，db_sync 查询后，db_gather 再查询数据会比 db_sync 多。

```

### 2.Hive

```

hive 中查询数据到文件，速度比 mysql 查询慢一倍左右

有点：
  1.数据一致性，比原始方案快
  2.完全不生成 map reduce

缺点
  1.比 mysql 方式快
```

## 三、测试结果

| 测试数据量 | 原始方式 | hive 方式 | MySQL 方式 |
| --- | --- | --- | --- | --- | --- |
| 5.5 MB , 15 万条  | 18 s  |  11 s  |  6 s |
| 50 MB , 200 万条  | 22 S  |  21 s  |  11 s |
| 500 MB , 1600 万条  | 38.61 S  |  71 s  |  51 s |



## 四、结果

```

1. 在数据量小的时候，跟 db_sync 一样，用 dump 方式查出数据到本地，上传结果文件到 db_gather
2. 在数据量大的的时候，从 db_sync 库查出数据到 db_gather 库

```
