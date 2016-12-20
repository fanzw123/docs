# dw_basis_dimension_tag_class 标签分类维度表

## 说明
根据目前所有的标签进行分类




## 字段
```
tag_id              	string              	标签ID
tag_name            	string              	标签名称
sub_id              	string              	二级分类ID
sub_name            	string              	二级分类名称
category_id         	string              	一级分类ID
category_name       	string              	一级分类名称

```

## HQL
```
insert overwrite table dw_db.dw_basis_dimension_tag_class
select
 c.id as tag_id
,c.name as tag_name
,b.id as sub_id
,b.name as sub_name
,a.id as category_id
,a.name as category_name
from db_sync.angejia__tag c
left join db_sync.angejia__tag_category b on c.category_id=b.id
left join db_sync.angejia__tag_category a on b.pid=a.id
```
