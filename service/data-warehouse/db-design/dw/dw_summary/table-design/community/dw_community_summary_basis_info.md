# dw_community_summary_basis_info 小区基本属性

## 字段

``` sql

community_id

community_name

city_id

city_name

district_id

district_name

block_id

block_name

address

lng

lat

builder_id

manage_company_id

label_id

use_type

area

manage_pay

house_total

contain_pert

carbarn_state

green_pert

intro

build_date  

```

## HQL

依赖
- db_sync.angejia__community

- db_sync.angejia__city

- db_sync.angejia__district

- db_sync.angejia__block

- db_sync.angejia__community_extend

``` sql

--Touchweb指标--

drop table if exists dw_db_temp.eric_community_basis_info_tmp;

create table dw_db_temp.eric_community_basis_info_tmp
as
select
----community基础信息---
       a.id as community_id
      ,a. name as community_name
      ,a.city_id
      ,b.`name` as city_name
      ,a.district_id
      ,c.`name` as district_name
      ,a.block_id
      ,d.`name` as block_name
      ,a.address
      ,a.lng
      ,a.lat

----community扩展信息---
      ,e.community_id
      ,e.builder_id
      ,e.manage_company_id
      ,e.label_id
      ,e.use_type
      ,e.area as 
      ,e.manage_pay
      ,e.house_total
      ,e.contain_pert
      ,e.carbarn_state
      ,e.green_pert
      ,e.intro
      ,e.build_date
from
  db_sync.angejia__community a
left join db_sync.angejia__city b
  on a.city_id = b.id
left join db_sync.angejia__district c
  on a.district_id = c.id
left join db_sync.angejia__block d
  on a.block_id = d.id
left join db_sync.angejia__community_extend e
  on a.id = e.community_id
where a.is_active = '1'
  and to_date(a.created_at) = ${dealDate};

```
