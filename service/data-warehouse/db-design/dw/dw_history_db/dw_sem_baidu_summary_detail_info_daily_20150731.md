# dw_sem_baidu_summary_detail_info_daily  sem 百度日统计表

## 字段

``` sql

-- sem_baidu_log
sem_account '百度 sem 账号'

sem_campaign_id '计划 id'

sem_campaign_name '计划 name'

sem_adgroup_id '单元 id'

sem_adgroup_name '单元 name'

sem_keyword_id '关键字 id'

sem_keyword_name '关键字 name'

sem_pc_destination_url 'pc 地址页'

sem_mobile_destination_url 'mobile 地址页'


sem_pc_destination_url  'PC 投放 URL'

sem_pc_utm_term_and_pi 'PC 投放 URL 中的 utm_term 和 pi'

sem_mobile_destination_url 'mobile 投放 URL'

sem_mobile_utm_term_and_pi 'mobile 投放 URL 中的 utm_term 和 pi'

--sem_pc_utm_term 'PC URL 搜索关键字'

--sem_mobile_utm_term 'mobile URL 搜索关键字'

--sem_pc_community_name 'pc url 小区名'

--sem_mobile_community_name 'mobile url 小区名'

-- dw_temp_angejia.dw_sem_summary_url_request_info
sem_pv 'pv'

sem_uv 'uv'

sem_vppv 'vppv'

sem_vpuv 'vpuv'

guid_count 'guid 总访问次数'

-- 日期分区
p_dt '分区日期 yyyy-mm-dd 格式'

```

## HQL
- [sem summary](service/data-warehouse/db-design/dw/dw_summary/table-design/sem/)
- [dw_sem_baidu_summary_detail_info_daily.sql](http://git.corp.angejia.com/dw/dw_sql/tree/master/sem/dw_sem_baidu_summary_detail_info_daily.sql)


## MYSQL
``` sql
CREATE TABLE `dw_sem_baidu_summary_detail_info_daily` (
  `sem_account` varchar(100) NOT NULL DEFAULT '',
  `sem_campaign_id` varchar(255) NOT NULL DEFAULT '',
  `sem_campaign_name` varchar(255) NOT NULL DEFAULT '',
  `sem_adgroup_id` varchar(255) NOT NULL DEFAULT '',
  `sem_adgroup_name` varchar(255) NOT NULL DEFAULT '',
  `sem_keyword_id` varchar(255) NOT NULL DEFAULT '',
  `sem_keyword_name` varchar(255) NOT NULL DEFAULT '',
  `sem_pc_destination_url` varchar(2500) NOT NULL DEFAULT '',
  `sem_pc_utm_term_and_pi` varchar(2500) NOT NULL DEFAULT '',
  `sem_mobile_destination_url` varchar(2500) NOT NULL DEFAULT '',
  `sem_mobile_utm_term_and_pi` varchar(2500) NOT NULL DEFAULT '',
  `sem_pv` int(10) NOT NULL DEFAULT '0',
  `sem_uv` int(10) NOT NULL DEFAULT '0',
  `sem_vppv` int(10) NOT NULL DEFAULT '0',
  `sem_vpuv` int(10) NOT NULL DEFAULT '0',
  `sem_guid_count` int(10) NOT NULL DEFAULT '0',
  `p_dt` varchar(20) NOT NULL DEFAULT '',
  KEY `idx_p_dt` (`p_dt`(10))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='sem 百度日统计表';
```
