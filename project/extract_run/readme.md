# 抽取脚本

## 一、设计流程图

- [安个家 - ETL - 框架 UML](https://www.processon.com/view/link/57eb3c16e4b009c4aef96d65)
- [安个家 - ETL - 数据抽取脚本流程图](https://www.processon.com/view/link/57e9eb82e4b06bcb4cdf380e)
- [安个家 - ETL - 数据抽取数据流程图](https://www.processon.com/view/link/57d8e4ede4b0e72a8d042d45)

## 二、数据查看

``` sql

-- 查询待抽取表类型
SELECT
  a.id,
  a.db_server,
  a.db_name,
  a.tb_name,
  a.extract_type,
  a.extract_tool,
  a.is_gather,
  b.tb_id,b.primary_key,b.incremental_field,b.incremental_val,b.conditions

FROM dw_service.extract_table AS a
LEFT JOIN dw_service.extract_table_ext AS b
  ON a.id=b.tb_id
WHERE a.is_delete=0
 ORDER BY a.extract_type ASC,a.id ASC
;




-- 查询抽取日志情况
SELECT * FROM dw_service.extract_log
WHERE date(created_at) = date_format(date_sub(now(), interval 0 day),'%Y-%m-%d')
ORDER BY run_time DESC
;


-- 查询某张表当天最小 id
SELECT min(id)
FROM angejia.call_log
WHERE date(updated_at) = date_format(date_sub(now(), interval 0 day),'%Y-%m-%d');
;



-- 运行简单脚本
./index.py \
--service extract \
--mo extract_run \
--par '{"dbServer":"product","sourceDb":"angejia","sourceTb":"user_msg","targetDb":"db_sync","targetTb":"angejia__user_msg","extractType":"2","extractTool":"1","mapReduceNum":"1"}'  

```
