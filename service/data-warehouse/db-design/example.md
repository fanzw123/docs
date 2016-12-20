# HQL 案例

## 设计目的

- 提高可读性
- 语法规范
- 统一语法

## HQL 规范


### 1、关键字

- 所有关键字大写

``` sql
INSERT OVERWRITE TABLE

SELECT

CASE
  WHEN bs.status = 1
    THEN '待入职'
END

等等
```


### 2、书写结构

- 创建语句

``` sql
CREATE TABLE IF NOT EXISTS default.demo1 (
  id STRING,
  name STRING
)
;

```


- 联合查询

``` sql

INSERT OVERWRITE TABLE
  default.demo
SELECT
  t_1.id
  t_2.id
  t_3.id
FROM
  default.demo_1 AS t_1

LEFT JOIN
  default.demo_2 AS t_2
    ON
  t_2.id = t_1.id

LEFT JOIN
  default.demo_3 AS t_3
    ON
  t_3.id = t_1.id
;

```


- 子查询

``` sql


SELECT
  bs.user_id AS broker_id,
  t_1.num,
  t_2.num
FROM
  default.demo_1 AS t_1

LEFT JOIN (
  SELECT
    s_1.id,
    COUNT(s_1.age) AS age
  FROM
    default.tmp_1 AS s_1
  GROUP BY
    s_1.id
  ) AS t_1
  ON
    t_1.id = t_2.id
;
```


- HQL 注释

``` sql
1、一整段的逻辑使用，项目名称 + 开始标记符，标记范围 (使用 --- 作为注释)
2、针对 HQL 某一段使用 (--) 作为注释


--- project start  ---

-- 创建语句
CREATE TABLE IF NOT EXISTS default.demo1 (
  id STRING,
  name STRING
)
;

--- project end ---

```
