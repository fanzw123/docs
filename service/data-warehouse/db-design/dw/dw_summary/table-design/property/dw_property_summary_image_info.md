# dw_property_summary_image_info 房源图片信息

## 字段

``` sql

image_counter '房源图片总量'

has_image '是否有图'

```

## HQL

依赖

- db_sync.angejia__inventory_image

``` sql

--image指标--

drop table if exists dw_db_temp.eric_inventory_image_metrics_tmp;

create table dw_db_temp.eric_inventory_image_metrics_tmp
as
select inventory_id
      ,(case when type = '1' then '房源图'
             when type = '2' then '小区图'
        else '无图' end) as has_image
      ,count(case when type = '1' then image_id end) as house_image_counter
      ,count(case when type = '2' then image_id end) as community_image_counter
from db_sync.angejia__inventory_image
where to_date(created_at) = ${dealDate}
group by inventory_id
        ,(case when type = '1' then '房源图'
               when type = '2' then '小区图'
          else '无图' end);

```
