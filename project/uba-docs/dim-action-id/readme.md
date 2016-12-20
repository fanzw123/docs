# Action dim 维护


## 一、app action id 维护

``` sh

1. 导入 pm 的表到 hive dw_db 中
  ~/app/dw_etl/index.py --service extract --mo extract_run --par '{"dbServer":"dw","sourceDb":"pm","sourceTb":"dw_basis_dimen_action_id_name_lkp","targetDb":"dw_db","targetTb":"dw_basis_dimen_action_id_name_lkp","extractTool":"1","mapReduceNum":"1"}'

2.
```
