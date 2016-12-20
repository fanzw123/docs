# 安个家ART报表底层数据整理


```
本文主题是解析ART报表展示时，MYSQL、Hive、ETLJOB及其依赖之间的关系

```



| 报表名称 | MYSQL表 | HIVE表 | JOB | 依赖JOB |备注 |
| ---| --- | ---  | --- | --- | --- | --- ||集团ScoreCard|	dw_scorecard_summary_daily | dw_scorecard_summary_daily | scorecard	| dw_broker_summary_basis_info_daily ||集团ScoreCard|	dw_scorecard_summary_daily | dw_scorecard_summary_daily | scorecard	| summary_hive_dw_mobile_user_browsing_metrics_daily ||市场ScoreCard|	dw_scorecard_summary_daily | dw_scorecard_summary_daily | scorecard	| dw_broker_summary_basis_info_daily ||市场ScoreCard|	dw_scorecard_summary_daily | dw_scorecard_summary_daily | scorecard	| summary_hive_dw_mobile_user_browsing_metrics_daily ||APP分渠道 |	dw_user_summary_user_browsing_metrics_daily	| dw_user_summary_user_browsing_metrics_daily | summary_hive_dw_mobile_user_browsing_metrics_daily | 无|PC付费渠道 | dw_sem_summary_basis_info_daily | dw_sem_summary_basis_info_daily	| summary_hive_dw_sem_summary_basis_info_daily | 无|PC网盟 | dw_sem_summary_basis_info_daily | dw_sem_summary_basis_info_daily | summary_hive_dw_sem_summary_basis_info_daily | 无|TW付费渠道 | dw_sem_summary_basis_info_daily | dw_sem_summary_basis_info_daily | summary_hive_dw_sem_summary_basis_info_daily | 无|TW网盟 |	dw_sem_summary_basis_info_daily | dw_sem_summary_basis_info_daily | summary_hive_dw_sem_summary_basis_info_daily | 无|经纪人日报 | dw_broker_summary_basis_info_daily | dw_broker_summary_basis_info_daily | dw_broker_summary_basis_info_daily | 无|经纪人活动轨迹 | dw_broker_summary_basis_info_daily | dw_broker_summary_basis_info_daily | dw_broker_summary_basis_info_daily | 无
