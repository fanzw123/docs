# dw_block_summary_inventory 小区房源信息相关

## 字段
``` sql
district_id       '区域ID'
district          '区域名字'
block_id          '版块ID'
block             '版块名字'
inventory_num     '房源量'
survey_today      '实堪量'
inventory_image   '有图房源量'
community_image '无图房源量'
VPPV_exist_inventory_img_week_avg       '有(房源图)的房源周平均vppv'
VPPV_exist_block_inventory_img_week_avg '有(小区图)的房源周平均vppv'
VPPV_all_block_inventory_week_avg       '总的房源周均 vppv'

```


## HQL
``` sql
--- 小区房源相关 start ---

-- 房源主页访问总VPPV --
DROP TABLE IF EXISTS dw_temp_angejia.jason_exist_inventory_home_request_week;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_exist_inventory_home_request_week AS
SELECT
  t_1.inventory_id,
  COUNT(t_1.inventory_id) AS inventory_home_week_vppv
FROM (
  SELECT
    regexp_extract(s_1.current_page,'^/(sale/sh/|)([0-9]+)\.html$',2) AS inventory_id
  FROM
    dw_db.dw_web_visit_traffic_log AS s_1
  WHERE
    s_1.p_dt >= '2015-06-08'
  AND
    s_1.p_dt <= '2015-06-14'
  AND
    s_1.current_page_id in ('20008','10035')
) AS t_1
GROUP BY
  t_1.inventory_id
;


-- 1.有房源图的房源 --
DROP TABLE IF EXISTS dw_temp_angejia.jason_exist_inventory_img;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_exist_inventory_img AS
select
  a.property_id,
  d.name as district,
  d.id as district_id,
  e.id as block_id,
  e.name as block
from
  db_sync.property__inventory a
left outer join
  db_sync.property__property b on a.property_id=b.id
left outer join
  db_sync.property__house g on b.house_id = g.id
left outer join
  db_sync.angejia__community c on g.community_id=c.id
left outer join
  db_sync.angejia__district d on c.district_id=d.id
left outer join
  db_sync.angejia__block e on c.block_id=e.id
left outer join
  db_sync.angejia__inventory_image f on f.inventory_id=a.id
where
  a.status=2
  and a.city_id <> 3
  and b.status=1
  and g.is_real=1
  and a.is_real=1
  and f.type is not null
group by
  a.property_id,
  d.name,
  d.id,
  e.id,
  e.name
;

-- 1.计算有房源图的房源VPPV --
DROP TABLE IF EXISTS dw_temp_angejia.jason_exist_inventory_img_vppv;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_exist_inventory_img_vppv AS
SELECT
  t_1.district_id,
  t_1.block_id,
  ROUND(AVG(t_2.inventory_home_week_vppv),2) AS avg_inventory_home_week_vppv
FROM
  dw_temp_angejia.jason_exist_inventory_img AS t_1
LEFT JOIN
  dw_temp_angejia.jason_exist_inventory_home_request_week AS t_2
ON
  t_1.property_id = t_2.inventory_id
GROUP BY
  t_1.district_id,
  t_1.block_id
;


-- 2.有小区图的房源 --
DROP TABLE IF EXISTS dw_temp_angejia.jason_exist_block_inventory_img;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_exist_block_inventory_img AS
select
  a.property_id,
  d.name as district,
  d.id as district_id,
  e.id as block_id,
  e.name as block
from
  db_sync.property__inventory a
left outer join
  db_sync.property__property b on a.property_id=b.id
left outer join
  db_sync.property__house g on b.house_id = g.id
left outer join
  db_sync.angejia__community c on g.community_id=c.id
left outer join
  db_sync.angejia__district d on c.district_id=d.id
left outer join
  db_sync.angejia__block e on c.block_id=e.id
left outer join
  db_sync.angejia__inventory_image f on f.inventory_id=a.id
left outer join
  db_sync.angejia__community_image i on c.id=i.community_id
where a.status=2
  and a.city_id <> 3
  and b.status=1
  and g.is_real=1
  and a.is_real=1
  and  f.type is null
  and i.status=1
group by
  a.property_id,
  d.name,
  d.id,
  e.id,
  e.name
;

-- 2.计算有小区图的房源VPPV --
DROP TABLE IF EXISTS dw_temp_angejia.jason_exist_block_inventory_img_vppv;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_exist_block_inventory_img_vppv AS
SELECT
  t_1.district_id,
  t_1.block_id,
  ROUND(AVG(t_2.inventory_home_week_vppv),2) AS avg_inventory_home_week_vppv
FROM
  dw_temp_angejia.jason_exist_block_inventory_img AS t_1
LEFT JOIN
  dw_temp_angejia.jason_exist_inventory_home_request_week AS t_2
ON
  t_1.property_id = t_2.inventory_id
GROUP BY
  t_1.district_id,
  t_1.block_id
;


-- 3.所有房源 --
DROP TABLE IF EXISTS dw_temp_angejia.jason_all_block_inventory;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_all_block_inventory AS
select
  a.property_id,
  d.name as district,
  d.id as district_id,
  e.name as block,
  e.id as block_id
from
  db_sync.property__inventory a
left outer join
  db_sync.property__property b on a.property_id=b.id
left outer join
  db_sync.property__house g on b.house_id = g.id
left outer join
  db_sync.angejia__community c on g.community_id=c.id
left outer join
  db_sync.angejia__district d on c.district_id=d.id
left outer join
  db_sync.angejia__block e on c.block_id=e.id
where
  a.status=2
  and a.city_id <> 3
  and b.status=1
  and a.is_real=1
group by
  a.property_id,
  d.name,
  d.id,
  e.id,
  e.name
;

-- 3.所有房源vppv --
DROP TABLE IF EXISTS dw_temp_angejia.jason_all_block_inventory_vppv;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_all_block_inventory_vppv AS
SELECT
  t_1.district_id,
  t_1.block_id,
  ROUND(AVG(t_2.inventory_home_week_vppv),2) AS avg_inventory_home_week_vppv
FROM
  dw_temp_angejia.jason_all_block_inventory AS t_1
LEFT JOIN
  dw_temp_angejia.jason_exist_inventory_home_request_week AS t_2
ON
  t_1.property_id = t_2.inventory_id
GROUP BY
  t_1.district_id,
  t_1.block_id
;



-- 所有房源聚合统计临时表 --
DROP TABLE IF EXISTS dw_temp_angejia.jason_block_summary_inventory_result_tmp;
CREATE TABLE IF NOT EXISTS dw_temp_angejia.jason_block_summary_inventory_result_tmp as
select
  d.name as district
  ,e.name as block
  ,c.district_id
  ,c.block_id
  ,coalesce(count(distinct a.property_id),0) as inventory_num
  ,coalesce(count(distinct case when a.survey_status=2 then a.property_id end),0) as survey_today
  ,count(distinct case when f.type is not null then a.property_id end) as inventory_image
  ,count(distinct case when f.type is null and i.status=1 then a.property_id end) as community_image
from
  db_sync.property__inventory a
left outer join
  db_sync.property__property b on a.property_id=b.id
left outer join
  db_sync.property__house g on b.house_id = g.id
left outer join
  db_sync.angejia__community c on g.community_id=c.id
left outer join
  db_sync.angejia__district d on c.district_id=d.id
left outer join
  db_sync.angejia__block e on c.block_id=e.id
left outer join
  db_sync.angejia__inventory_image f on f.inventory_id=a.id
left outer join
  db_sync.angejia__community_image i on c.id=i.community_id
where
  a.status=2
  and a.city_id <> 3
  and b.status=1
  and g.is_real=1
  and a.is_real=1
group by
  d.name,
  e.name,
  c.district_id,
  c.block_id
;  



-- 组合结果 --
DROP TABLE IF EXISTS dw_db.dw_block_summary_inventory;
CREATE TABLE IF NOT EXISTS dw_db.dw_block_summary_inventory as
SELECT
  bs.district_id,
  bs.district,
  bs.block_id,
  bs.block,
  bs.inventory_num,
  bs.survey_today,
  bs.inventory_image,
  bs.community_image,
  t_1.avg_inventory_home_week_vppv AS VPPV_exist_inventory_img_week_avg,
  t_2.avg_inventory_home_week_vppv AS VPPV_exist_block_inventory_img_week_avg,
  t_3.avg_inventory_home_week_vppv AS VPPV_all_block_inventory_week_avg
FROM
  dw_temp_angejia.jason_block_summary_inventory_result_tmp AS bs
LEFT JOIN
  dw_temp_angejia.jason_exist_inventory_img_vppv AS t_1
    ON
  bs.district_id = t_1.district_id
    AND
  bs.block_id = t_1.block_id
LEFT JOIN
  dw_temp_angejia.jason_exist_block_inventory_img_vppv AS t_2
    ON
  bs.district_id = t_2.district_id
    AND
  bs.block_id = t_2.block_id
LEFT JOIN
  dw_temp_angejia.jason_all_block_inventory_vppv AS t_3
    ON
  bs.district_id = t_3.district_id
    AND
  bs.block_id = t_3.block_id
;


--- 小区房源相关 end ---  

```
