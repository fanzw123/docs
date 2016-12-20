# 重跑脚本设计

## 功能目标

- 给予开始日期，结束日期
- 给予开始日期，日期天数

## 详细设计

### 入参

- 脚本路径
- 开始日期
- 结束日期

### 逻辑

#### 方案一
```
#转换日期为时间戳
start_time_timestamp=$(date -d "${start_time}" +"%s");
over_time_timestamp=$(date -d "${over_time}" +"%s");

#计算相差天数
diff_date=$((($over_time_timestamp-$start_time_timestamp)/86400));

for((i=0; i<=$diff_date; i++));
    do
        #format 当期天数
        now_date=`date -d "${start_time} +${i} day " +%Y%m%d`;

        #执行脚本，并且把{date}替换成当前日期
        /bin/bash ${shell_dir/"{date}"/"${now_date}"}

    done;
```
