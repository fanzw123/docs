# 全市交易数据文档

## 一、概括

- 上海市交易数据与安个家房源进行匹配，得出已售卖房源、爆盘率等核心指标

- 请按照如下流程进行

### 1. 导入交易数据 test.dw_business

- 上海市交易数据收集,通过 excel 导入到 test.dw_business 作为数据部内部的基础数据,以 sheet 作为月份日期区分

- 导入 excel 注意事项
 - sheet 第一列需要增加当月日期 , 如 201512
 - sheet 的 reg_date (登记日期) 和 sign_date (签约日期) 日期格式转换成 yyyy-mm-dd (如 2015-12-01)
 - 如果转换成 CSV 格式

    ``` sql
     1. 必须把 excel 中的 ',' 号,替换成 ';' 号 。
     2. 字符编码问题1 : 蕰川路 导入会变成 _川路 的乱码
     3. 字符编码问题2 : 月 导入会变成 / 的乱码
      解决:
        1) 在 excel 中替换 (_川路) -> (xxxxxx)
        2) 导入到 mysql 后执行
        -- 蕰川路 导入会变成 _川路 的乱码
        UPDATE
          test.business
        SET
          address=REPLACE (address,'xxxxxx','蕰川路')
        WHERE
          sheet='201610' AND address Like 'xxxxxx%';

        -- 解决  月 导入会变成 / 的乱码
        UPDATE
          test.business
        SET
          address=REPLACE (address,'/','月')

            WHERE
          sheet='201610' AND address Like '/%';


    导入后查看数据
    SELECT sheet,COUNT(*) FROM test.business GROUP BY sheet;
    ```


## 二、执行抽取脚本，分析脚本

- [transaction_run 成交分析脚本](http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=256)

- 执行完成后查看数据

  ```
  SELECT sheet,COUNT(*) FROM dw_db.dw_business GROUP BY sheet
  ```


## 三、执行以下 ETL

``` sh

1. 导入原始成交数据到 hive
  ~/app/dw_etl/index.py --service extract --mo extract_run --parameter '{"dbServer":"dw","sourceDb":"dw_db","sourceTb":"dw_business","targetDb":"dw_db","targetTb":"dw_business","extractType":"1","extractTool":"1","mapReduceNum":"1"}'


2. 导入成交数据到 hive
  1) house_transaction.lane_communities 表
  ~/app/dw_etl/index.py --service extract --mo extract_run --parameter '{"dbServer":"product","sourceDb":"house_transaction","sourceTb":"lane_communities","targetDb":"db_sync","targetTb":"house_transaction__lane_communities","extractType":"1","extractTool":"1","mapReduceNum":"1"}'

  跑脚本: http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=111

  检查: show partitions dw_db.dw_business_lane_communities;

  2) house_transaction.lanes 表
  ~/app/dw_etl/index.py --service extract --mo extract_run --parameter '{"dbServer":"product","sourceDb":"house_transaction","sourceTb":"lanes","targetDb":"db_sync","targetTb":"house_transaction__lanes","extractType":"1","extractTool":"1","mapReduceNum":"1"}'

  跑脚本: http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=112

  检查: show partitions dw_db.dw_business_lanes;


  3) house_transaction.records 表
  ~/app/dw_etl/index.py --service extract --mo extract_run --parameter '{"dbServer":"product","sourceDb":"house_transaction","sourceTb":"records","targetDb":"db_sync","targetTb":"house_transaction__records","extractType":"1","extractTool":"1","mapReduceNum":"1"}'

  跑脚本: http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=113

  检查: show partitions dw_db.dw_business_records;


3. 房东成交接口数据
  1) 跑脚本:  http://dw.corp.angejia.com/monitor/getSchedulerJobAction?schedulerId=205

    检查: SELECT * FROM da_db.da_business_fangdongphone LIMIT 1;

  2) minireport: http://dw.corp.angejia.com/monitor/mini/report/edit?id=1112

```
