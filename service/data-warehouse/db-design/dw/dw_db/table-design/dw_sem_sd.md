# dw_sem_sd SEM每日信息汇总表


## 字段:2015-06-01为例
``` sql
pc_sem_uv_baidu    int    百度来源的uv    **pi=baidu-cpc-esfpc**
pc_sem_uv_haosou   int    360来源的uv     **pi=haosou-cpc-esfpc**
pc_sem_uv_sogou    int    sogou来源的uv   **pi=sogou-cpc-esfpc**

pc_wm_uv_jingzan   int    晶赞来源的uv    **pi=jingzan-wm-esfpc**
pc_wm_uv_baidu     int    百度来源的uv    **pi=baidu-wm-esfpc**
pc_wm_uv_sogou     int    sogou来源的uv   **sogou-wm-esfpc**
pc_wm_uv_haosou    int    360来源的uv     **pi=haosou-wm-esfpc**

pc_sem_vppv_baidu    int  百度来源的vppv    **pi=baidu-cpc-esfpc**
pc_sem_vppv_haosou   int  360来源的vppv     **pi=haosou-cpc-esfpc**
pc_sem_vppv_sogou    int  sogou来源的vppv   **pi=sogou-cpc-esfpc**

pc_wm_vppv_jingzan   int  晶赞来源的vppv   **pi=jingzan-wm-esfpc**
pc_wm_vppv_baidu     int  百度来源的vppv   **pi=baidu-wm-esfpc**
pc_wm_vppv_sogou     int  sogou来源的vppv  **sogou-wm-esfpc**
pc_wm_vppv_haosou    int  360来源的vppv    **pi=haosou-wm-esfpc**

pc_sem_vpuv_baidu    int  百度来源的vpuv     **pi=baidu-cpc-esfpc**
pc_sem_vpuv_haosou   int  360来源的vpuv     **pi=haosou-cpc-esfpc**
pc_sem_vpuv_sogou    int  sogou来源的vpuv   **pi=sogou-cpc-esfpc**

pc_wm_vpuv_jingzan   int  晶赞来源的vpuv   **pi=jingzan-wm-esfpc**
pc_wm_vpuv_baidu     int  百度来源的vpuv   **pi=baidu-wm-esfpc**
pc_wm_vpuv_sogou     int  sogou来源的vpuv  **sogou-wm-esfpc**
pc_wm_vpuv_haosou    int  360来源的vpuv    **pi=haosou-wm-esfpc**

pc_sem_loss_baidu    int   百度来源的蹦失率
pc_sem_loss_haosou   int   360来源的蹦失率
pc_sem_loss_sogou    int   sogou来源的蹦失率

pc_wm_loss_jingzan   int   晶赞来源的蹦失率
pc_wm_loss_baidu     int   百度来源的蹦失率
pc_wm_loss_sogou     int   sogou来源的蹦失率
pc_wm_loss_haosou    int   360来源的蹦失率

touch_sem_uv_baidu    int    百度来源的uv    **pi=baidu-cpc-esfpc**
touch_sem_uv_haosou   int    360来源的uv     **pi=haosou-cpc-esfpc**
touch_sem_uv_sogou    int    sogou来源的uv   **pi=sogou-cpc-esfpc**
touch_sem_uv_uc       int    uc来源的uv      **pi=uc-cpc-esfpc**

touch_wm_uv_jingzan   int    晶赞来源的uv    **pi=jingzan-wm-esfpc**
touch_wm_uv_baidu     int    百度来源的uv    **pi=baidu-wm-esfpc**
touch_wm_uv_sogou     int    sogou来源的uv   **sogou-wm-esfpc**
touch_wm_uv_haosou    int    360来源的uv     **pi=haosou-wm-esfpc**

touch_sem_vppv_baidu    int  百度来源的vppv    **pi=baidu-cpc-esfpc**
touch_sem_vppv_haosou   int  360来源的vppv     **pi=haosou-cpc-esfpc**
touch_sem_vppv_sogou    int  sogou来源的vppv   **pi=sogou-cpc-esfpc**
touch_sem_vppv_uc       int  uc来源的vppv      **pi=uc-cpc-esfpc**

touch_wm_vppv_jingzan   int  晶赞来源的vppv   **pi=jingzan-wm-esfpc**
touch_wm_vppv_baidu     int  百度来源的vppv   **pi=baidu-wm-esfpc**
touch_wm_vppv_sogou     int  sogou来源的vppv  **sogou-wm-esfpc**
touch_wm_vppv_haosou    int  360来源的vppv    **pi=haosou-wm-esfpc**

touch_sem_vpuv_baidu    int  百度来源的vpuv    **pi=baidu-cpc-esfpc**
touch_sem_vpuv_haosou   int  360来源的vpuv     **pi=haosou-cpc-esfpc**
touch_sem_vpuv_sogou    int  sogou来源的vpuv   **pi=sogou-cpc-esfpc**
touch_sem_vpuv_uc       int  uc来源的vpuv      **pi=sogou-cpc-esfpc**

touch_wm_vpuv_jingzan   int  晶赞来源的vpuv   **pi=jingzan-wm-esfpc**
touch_wm_vpuv_baidu     int  百度来源的vpuv   **pi=baidu-wm-esfpc**
touch_wm_vpuv_sogou     int  sogou来源的vpuv  **sogou-wm-esfpc**
touch_wm_vpuv_haosou    int  360来源的vpuv    **pi=haosou-wm-esfpc**

touch_sem_loss_baidu    int  百度来源的蹦失率
touch_sem_loss_haosou   int  360来源的蹦失率
touch_sem_loss_sogou    int  sogou来源的蹦失率
touch_sem_loss_uc       int  uc来源的蹦失率

touch_wm_loss_jingzan   int  晶赞来源的蹦失率
touch_wm_loss_baidu     int  百度来源的蹦失率
touch_wm_loss_sogou     int  sogou来源的蹦失率
touch_wm_loss_haosou    int  360来源的蹦失率

pc_wm_uv_baidu_wenzi     int    百度文字来源的uv    **pi=baidu-wm-esfpc-sh-wenzi**
pc_wm_uv_baidu_tupian     int    百度文字来源的uv    **pi=baidu-wm-esfpc-sh-tupian**
pc_wm_uv_baidu_tuwen     int    百度文字来源的uv    **pi=baidu-wm-esfpc-sh-tuwen**

pc_wm_uv_baidu_wenzi     int    百度文字来源的uv    **pi=baidu-wm-esfpc-sh-wenzi**
pc_wm_uv_baidu_tupian     int    百度文字来源的uv    **pi=baidu-wm-esfpc-sh-tupian**
pc_wm_uv_baidu_tuwen     int    百度文字来源的uv    **pi=baidu-wm-esfpc-sh-tuwen**



p_dt string  统计日期
```


## HQL
```
--sem渠道--
drop table if exists dw_db_temp.eric_sem_guid_channel_tmp;
create table dw_db_temp.eric_sem_guid_channel_tmp
as
select guid
      ,pi_code
from
(select guid
       ,regexp_extract(current_full_url,'pi=([\\w-]+)',1) as pi_code
       ,row_number() over (partition by guid order by server_time) as number
 from dw_db.dw_web_visit_traffic_log
 where regexp_extract(current_full_url,'pi=([\\w-]+)',1) <> ''
   and p_dt=${dealDate}
) a
where a.number = 1;

--sem指标--
drop table if exists dw_db_temp.eric_sem_tmp;
create table dw_db_temp.eric_sem_tmp
as
select
--uv begin--
--Touch--
 count(distinct case when current_full_url like 'http://m.angejia.com%' and brower_type not in ('MicroMessenger') and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-cpc-esfwap%' then guid end) as touch_sem_uv_baidu
,count(distinct case when current_full_url like 'http://m.angejia.com%' and brower_type not in ('MicroMessenger') and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-cpc-esfwap%' then guid end) as touch_sem_uv_360
,count(distinct case when current_full_url like 'http://m.angejia.com%' and brower_type not in ('MicroMessenger') and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-cpc-esfwap%' then guid end) as touch_sem_uv_sogou
,count(distinct case when current_full_url like 'http://m.angejia.com%' and brower_type not in ('MicroMessenger') and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%uc-cpc-esfwap%' then guid end) as touch_sem_uv_uc

,count(distinct case when current_full_url like 'http://m.angejia.com%' and brower_type not in ('MicroMessenger') and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfwap%' then guid end) as touch_wm_uv_jingzan
,count(distinct case when current_full_url like 'http://m.angejia.com%' and brower_type not in ('MicroMessenger') and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-wm-esfwap%' then guid end) as touch_wm_uv_baidu
,count(distinct case when current_full_url like 'http://m.angejia.com%' and brower_type not in ('MicroMessenger') and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-wm-esfwap%' then guid end) as touch_wm_uv_sogou
,count(distinct case when current_full_url like 'http://m.angejia.com%' and brower_type not in ('MicroMessenger') and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-wm-esfwap%' then guid end) as touch_wm_uv_360

--PC--
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-cpc-esfpc%' then guid end) as pc_sem_uv_baidu
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-cpc-esfpc%' then guid end) as pc_sem_uv__360
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-cpc-esfpc%' then guid end) as pc_sem_uv_sogou

,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc%' then guid end) as pc_wm_uv_jingzan
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-wm-esfpc%' then guid end) as pc_wm_uv_baidu
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-wm-esfpc%' then guid end) as pc_wm_uv_sogou
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-wm-esfpc%' then guid end) as pc_wm_uv_360
--uv end--

--vppv begin--
--Touch--
,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-cpc-esfwap%' then guid end) as touch_sem_vppv_baidu
,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-cpc-esfwap%' then guid end) as touch_sem_vppv_360
,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-cpc-esfwap%' then guid end) as touch_sem_vppv_sogou
,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%uc-cpc-esfwap%'then guid end) as touch_sem_vppv_uc

,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfwap%' then guid end) as touch_wm_vppv_jingzan
,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-wm-esfwap%' then guid end) as touch_wm_vppv_baidu
,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-wm-esfwap%' then guid end) as touch_wm_vppv_sogou
,count(case when current_page_id = '10035' and brower_type <> 'MicroMessenger' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-wm-esfwap%'then guid end) as touch_wm_vppv_360
--PC--
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-cpc-esfpc%' then guid end) as pc_sem_vpuv_baidu
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-cpc-esfpc%' then guid end) as pc_sem_vpuv_360
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-cpc-esfpc%' then guid end) as pc_sem_vpuv_sogou

,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc%' then guid end) as pc_wm_vpuv_jingzan
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-wm-esfpc%' then guid end) as pc_wm_vpuv_baidu
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-wm-esfpc%' then guid end) as pc_wm_vpuv_sogou
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-wm-esfpc%' then guid end) as pc_wm_vpuv_360
--vppv end--

--vpud begin--
--touch--
,count(distinct case when current_full_url like 'http://m.angejia.com/sale/sh/%html%'  and current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-cpc-esfwap%'  then guid end) as touch_sem_vpud_baidu
,count(distinct case when current_full_url like 'http://m.angejia.com/sale/sh/%html%'  and current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-cpc-esfwap%'  then guid end) as touch_sem_vpud_360
,count(distinct case when current_full_url like 'http://m.angejia.com/sale/sh/%html%'  and current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-cpc-esfwap%'  then guid end) as touch_sem_vpud_sogou
,count(distinct case when current_full_url like 'http://m.angejia.com/sale/sh/%html%'  and current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%uc-cpc-esfwap%'  then guid end) as touch_sem_vpud_uc

,count(distinct case when current_full_url like 'http://m.angejia.com/sale/sh/%html%'  and current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfwap%'  then guid end) as touch_wm_vpud_jingzan
,count(distinct case when current_full_url like 'http://m.angejia.com/sale/sh/%html%'  and current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-wm-esfwap%'  then guid end) as touch_wm_vpud_baidu
,count(distinct case when current_full_url like 'http://m.angejia.com/sale/sh/%html%'  and current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-wm-esfwap%'  then guid end) as touch_wm_vpud_sogou
,count(distinct case when current_full_url like 'http://m.angejia.com/sale/sh/%html%'  and current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-wm-esfwap%'  then guid end) as touch_wm_vpud_360

--PC--
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-cpc-esfpc%' then guid end) as pc_sem_vppv_baidu
,count(distinct case when current_page_id = '20008'  and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-cpc-esfpc%' then guid end) as pc_sem_vppv_360
,count(distinct case when current_page_id = '20008'  and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-cpc-esfpc%' then guid end) as pc_sem_vppv_sogou

,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc%' then guid end) as pc_wm_vppv_jingzan
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%baidu-wm-esfpc%' then guid end) as pc_wm_vppv_baidu
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%sogou-wm-esfpc%' then guid end) as pc_wm_vppv_sogou
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%haosou-wm-esfpc%' then guid end) as pc_wm_vppv_360

--wm jingzan--
--vppv--
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke%' then guid end) as pc_wm_vppv_jingzan_agj
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-ajk%' then guid end) as pc_wm_vppv_ajk
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-zdh%' then guid end) as pc_wm_vppv_jingzan_zdh
,count(case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-dmp%' then guid end) as pc_wm_vppv_jingzan_dmp

,count(case when current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke%' then guid end) as touch_wm_vppv_jingzan_agj
,count(case when current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-ajk%' then guid end) as touch_wm_vppv_ajk
,count(case when current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-zdh%' then guid end) as touch_wm_vppv_jingzan_zdh
,count(case when current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-dmp%' then guid end) as touch_wm_vppv_jingzan_dmp

--vpud--
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke%' then guid end) as pc_wm_vpud_jingzan_agj
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-ajk%' then guid end) as pc_wm_vpud_ajk
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-zdh%' then guid end) as pc_wm_vpud_jingzan_zdh
,count(distinct case when current_page_id = '20008' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-dmp%' then guid end) as pc_wm_vpud_jingzan_dmp

,count(distinct case when current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke%' then guid end) as touch_wm_vpud_jingzan_agj
,count(distinct case when current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-ajk%' then guid end) as touch_wm_vpud_ajk
,count(distinct case when current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-zdh%' then guid end) as touch_wm_vpud_jingzan_zdh
,count(distinct case when current_page_id = '10035' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-dmp%' then guid end) as touch_wm_vpud_jingzan_dmp
--uv--
,count(case when regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke%' then guid end) as pc_wm_uv_jingzan_agj
,count(case when regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-ajk%' then guid end) as pc_wm_uv_ajk
,count(case when regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-zdh%' then guid end) as pc_wm_uv_jingzan_zdh
,count(case when regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-dmp%' then guid end) as pc_wm_uv_jingzan_dmp

,count(case when current_full_url like 'http://m.angejia.com%' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke%' then guid end) as touch_wm_uv_jingzan_agj
,count(case when current_full_url like 'http://m.angejia.com%' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-ajk%' then guid end) as touch_wm_uv_ajk
,count(case when current_full_url like 'http://m.angejia.com%' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-zdh%' then guid end) as touch_wm_uv_jingzan_zdh
,count(case when current_full_url like 'http://m.angejia.com%' and regexp_extract(current_full_url,'pi=([\\w-]+)',1) like '%jingzan-wm-esfpc-sh-huitouke-dmp%' then guid end) as touch_wm_uv_jingzan_dmp
,${dealDate} as p_dt
from dw_db.dw_web_visit_traffic_log
where p_dt = ${dealDate};

--计算蹦失数--
drop table if exists dw_db_temp.eric_sem_loss_tmp;
create table dw_db_temp.eric_sem_loss_tmp
as  
select
 count(case when b.pi_code = 'baidu-cpc-esfwap' and a.counter=1 then b.guid end) touch_sem_loss_baidu
,count(case when b.pi_code = 'haosou-cpc-esfwap' and a.counter=1 then b.guid end) touch_sem_loss_360
,count(case when b.pi_code = 'sogou-cpc-esfwap' and a.counter=1 then b.guid end) touch_sem_loss_sogou
,count(case when b.pi_code = 'uc-cpc-esfwap' and a.counter=1 then b.guid end) touch_sem_loss_uc

,count(case when b.pi_code = 'jingzan-wm-esfwap' and a.counter=1 then b.guid end) touch_wm_loss_jingzan
,count(case when b.pi_code = 'baidu-wm-esfwap' and a.counter=1 then b.guid end) touch_wm_loss_baidu
,count(case when b.pi_code = 'sogou-wm-esfwap' and a.counter=1 then b.guid end) touch_wm_loss_sogou
,count(case when b.pi_code = 'haosou-wm-esfwap' and a.counter=1 then b.guid end) touch_wm_loss_360

,count(case when b.pi_code = 'baidu-cpc-esfpc' and a.counter=1 then b.guid end) pc_sem_loss_baidu
,count(case when b.pi_code = 'haosou-cpc-esfpc' and a.counter=1 then b.guid end) pc_sem_loss_360
,count(case when b.pi_code = 'sogou-cpc-esfpc' and a.counter=1 then b.guid end) pc_sem_loss_sogou

,count(case when b.pi_code = 'jingzan-wm-esfpc' and a.counter=1 then b.guid end) pc_wm_loss_jingzan
,count(case when b.pi_code = 'baidu-wm-esfpc' and a.counter=1 then b.guid end) pc_wm_loss_baidu
,count(case when b.pi_code = 'sogou-wm-esfpc' and a.counter=1 then b.guid end) pc_wm_loss_sogou
,count(case when b.pi_code = 'haosou-wm-esfpc' and a.counter=1 then b.guid end) pc_wm_loss_360

,count(case when b.pi_code = 'jingzan-wm-esfpc-sh-huitouke' and a.counter=1 then b.guid end) pc_wm_loss_jingzan_agj
,count(case when b.pi_code = 'jingzan-wm-esfpc-sh-huitouke-ajk' and a.counter=1 then b.guid end) pc_wm_loss_jingzan_ajk
,count(case when b.pi_code = 'jingzan-wm-esfpc-sh-huitouke-zdh' and a.counter=1 then b.guid end) pc_wm_loss_jingzan_zdh
,count(case when b.pi_code = 'jingzan-wm-esfpc-sh-huitouke-dmp' and a.counter=1 then b.guid end) pc_wm_loss_jingzan_dmp

,count(case when b.pi_code = 'jingzan-wm-esfwap-sh-huitouke' and a.counter=1 then b.guid end) touch_wm_loss_jingzan_agj
,count(case when b.pi_code = 'jingzan-wm-esfwap-sh-huitouke-ajk' and a.counter=1 then b.guid end) touch_wm_loss_jingzan_ajk
,count(case when b.pi_code = 'jingzan-wm-esfwap-sh-huitouke-zdh' and a.counter=1 then b.guid end) touch_wm_loss_jingzan_zdh
,count(case when b.pi_code = 'jingzan-wm-esfwap-sh-huitouke-dmp' and a.counter=1 then b.guid end) touch_wm_loss_jingzan_dmp

,count(case when b.pi_code = 'baidu-wm-esfpc-sh-wenzi' and a.counter=1 then b.guid end) pc_wm_loss_baidu_wenzi
,count(case when b.pi_code = 'baidu-wm-esfpc-sh-tupian' and a.counter=1 then b.guid end) pc_wm_loss_baidu_tupian
,count(case when b.pi_code = 'baidu-wm-esfpc-sh-tuwen' and a.counter=1 then b.guid end) pc_wm_loss_baidu_tuwen

,count(case when b.pi_code = 'baidu-wm-esfwap-sh-wenzi' and a.counter=1 then b.guid end) touch_wm_loss_baidu_wenzi
,count(case when b.pi_code = 'baidu-wm-esfwap-sh-tupian' and a.counter=1 then b.guid end) touch_wm_loss_baidu_tupian
,count(case when b.pi_code = 'baidu-wm-esfwap-sh-tuwen' and a.counter=1 then b.guid end) touch_wm_loss_baidu_tuwen
,${dealDate} as p_dt
from
(
    --计算出没一个guid访问网站的次数
    select
        guid
       ,count(1) as counter
    from
        dw_db.dw_web_visit_traffic_log
    where
        p_dt=${dealDate}
    group by guid
)as a
join
    dw_db_temp.eric_sem_guid_channel_tmp b
on a.guid=b.guid;

--计算总UV--
drop table if exists dw_db_temp.eric_sem_uv_tmp;
create table dw_db_temp.eric_sem_uv_tmp
as
select count(distinct guid) uv
      ,${dealDate} as p_dt
from dw_db_temp.eric_sem_guid_channel_tmp;

--计算蹦失率--
drop table if exists dw_db_temp.eric_loss_rate_tmp;
create table dw_db_temp.eric_loss_rate_tmp
as
select
 round(a.touch_sem_loss_baidu/b.uv,2) as touch_sem_loss_baidu
,round(a.touch_sem_loss_360/b.uv,2) as touch_sem_loss_360
,round(a.touch_sem_loss_sogou/b.uv,2) as touch_sem_loss_sogou
,round(a.touch_sem_loss_uc/b.uv,2) as touch_sem_loss_uc
,round(a.touch_wm_loss_jingzan/b.uv,2) as touch_wm_loss_jingzan
,round(a.touch_wm_loss_baidu/b.uv,2) as touch_wm_loss_baidu
,round(a.touch_wm_loss_sogou/b.uv,2) as touch_wm_loss_sogou
,round(a.touch_wm_loss_360/b.uv,2) as touch_wm_loss_360
,round(a.pc_sem_loss_baidu /b.uv,2) as pc_sem_loss_baidu
,round(a.pc_sem_loss_360/b.uv,2) as pc_sem_loss_360
,round(a.pc_sem_loss_sogou /b.uv,2) as pc_sem_loss_sogou
,round(a.pc_wm_loss_jingzan/b.uv,2) as pc_wm_loss_jingzan
,round(a.pc_wm_loss_baidu/b.uv,2) as pc_wm_loss_baidu
,round(a.pc_wm_loss_sogou/b.uv,2) as pc_wm_loss_sogou
,round(a.pc_wm_loss_360/b.uv,2) as pc_wm_loss_360
,round(a.pc_wm_loss_jingzan_agj/b.uv,2) as pc_wm_loss_jingzan_agj
,round(a.pc_wm_loss_jingzan_ajk/b.uv,2) as pc_wm_loss_jingzan_ajk
,round(a.pc_wm_loss_jingzan_zdh/b.uv,2) as pc_wm_loss_jingzan_zdh
,round(a.pc_wm_loss_jingzan_dmp/b.uv,2) as pc_wm_loss_jingzan_dmp
,round(a.touch_wm_loss_jingzan_agj/b.uv,2) as touch_wm_loss_jingzan_agj
,round(a.touch_wm_loss_jingzan_ajk/b.uv,2) as touch_wm_loss_jingzan_ajk
,round(a.touch_wm_loss_jingzan_zdh/b.uv,2) as touch_wm_loss_jingzan_zdh
,round(a.touch_wm_loss_jingzan_dmp/b.uv,2) as touch_wm_loss_jingzan_dmp
,round(a.pc_wm_loss_baidu_wenzi/b.uv,2) as pc_wm_loss_baidu_wenzi
,round(a.pc_wm_loss_baidu_tupian/b.uv,2) as pc_wm_loss_baidu_tupian
,round(a.pc_wm_loss_baidu_tuwen/b.uv,2) as pc_wm_loss_baidu_tuwen
,round(a.touch_wm_loss_baidu_wenzi/b.uv,2) as touch_wm_loss_baidu_wenzi
,round(a.touch_wm_loss_baidu_tupian/b.uv,2) as touch_wm_loss_baidu_tupian
,round(a.touch_wm_loss_baidu_tuwen/b.uv,2) as touch_wm_loss_baidu_tuwen
,${dealDate} as p_dt
from dw_db_temp.eric_sem_loss_tmp a
join dw_db_temp.eric_sem_uv_tmp b
  on a.p_dt=b.p_dt;

insert overwrite table dw_sem_summary_basis_info_daily partition(p_dt＝${dealDate})
select
 a.touch_sem_uv_baidu
,a.touch_sem_uv_360  
,a.touch_sem_uv_sogou
,a.touch_sem_uv_uc
,a.touch_wm_uv_jingzan
,a.touch_wm_uv_baidu
,a.touch_wm_uv_sogou
,a.touch_wm_uv_360
,a.pc_sem_uv_baidu
,a.pc_sem_uv__360
,a.pc_sem_uv_sogou
,a.pc_wm_uv_jingzan  
,a.pc_wm_uv_baidu
,a.pc_wm_uv_sogou
,a.pc_wm_uv_360
,a.touch_sem_vppv_baidu
,a.touch_sem_vppv_360
,a.touch_sem_vppv_sogou
,a.touch_sem_vppv_uc
,a.touch_wm_vppv_jingzan
,a.touch_wm_vppv_baidu
,a.touch_wm_vppv_sogou
,a.touch_wm_vppv_360
,a.pc_sem_vpuv_baidu
,a.pc_sem_vpuv_360
,a.pc_sem_vpuv_sogou
,a.pc_wm_vpuv_jingzan
,a.pc_wm_vpuv_baidu  
,a.pc_wm_vpuv_sogou  
,a.pc_wm_vpuv_360
,a.touch_sem_vpud_baidu
,a.touch_sem_vpud_360
,a.touch_sem_vpud_sogou
,a.touch_sem_vpud_uc
,a.touch_wm_vpud_jingzan
,a.touch_wm_vpud_baidu
,a.touch_wm_vpud_sogou
,a.touch_wm_vpud_360
,a.pc_sem_vppv_baidu
,a.pc_sem_vppv_360
,a.pc_sem_vppv_sogou
,a.pc_wm_vppv_jingzan
,a.pc_wm_vppv_baidu
,a.pc_wm_vppv_sogou
,a.pc_wm_vppv_360
,a.pc_wm_vppv_jingzan_agj
,a.pc_wm_vppv_ajk
,a.pc_wm_vppv_jingzan_zdh
,a.pc_wm_vppv_jingzan_dmp
,a.touch_wm_vppv_jingzan_agj
,a.touch_wm_vppv_ajk
,a.touch_wm_vppv_jingzan_zdh
,a.touch_wm_vppv_jingzan_dmp
,a.pc_wm_vpud_jingzan_agj
,a.pc_wm_vpud_ajk
,a.pc_wm_vpud_jingzan_zdh
,a.pc_wm_vpud_jingzan_dmp
,a.touch_wm_vpud_jingzan_agj
,a.touch_wm_vpud_ajk
,a.touch_wm_vpud_jingzan_zdh
,a.touch_wm_vpud_jingzan_dmp
,a.pc_wm_uv_jingzan_agj
,a.pc_wm_uv_ajk
,a.pc_wm_uv_jingzan_zdh
,a.pc_wm_uv_jingzan_dmp
,a.touch_wm_uv_jingzan_agj
,a.touch_wm_uv_ajk
,a.touch_wm_uv_jingzan_zdh
,a.touch_wm_uv_jingzan_dmp
,b.touch_sem_loss_baidu
,b.touch_sem_loss_360  
,b.touch_sem_loss_sogou
,b.touch_sem_loss_uc
,b.touch_wm_loss_jingzan
,b.touch_wm_loss_baidu
,b.touch_wm_loss_sogou
,b.touch_wm_loss_360
,b.pc_sem_loss_baidu
,b.pc_sem_loss_360
,b.pc_sem_loss_sogou
,b.pc_wm_loss_jingzan  
,b.pc_wm_loss_baidu
,b.pc_wm_loss_sogou
,b.pc_wm_loss_360
,b.pc_wm_loss_jingzan_agj
,b.pc_wm_loss_jingzan_ajk
,b.pc_wm_loss_jingzan_zdh
,b.pc_wm_loss_jingzan_dmp
,b.touch_wm_loss_jingzan_agj
,b.touch_wm_loss_jingzan_ajk
,b.touch_wm_loss_jingzan_zdh
,b.touch_wm_loss_jingzan_dmp
,b.pc_wm_loss_baidu_wenzi
,b.pc_wm_loss_baidu_tupian
,b.pc_wm_loss_baidu_tuwen
,b.touch_wm_loss_baidu_wenzi
,b.touch_wm_loss_baidu_tupian
,b.touch_wm_loss_baidu_tuwen
from dw_db_temp.eric_sem_tmp a
join dw_db_temp.eric_loss_rate_tmp b
  on a.p_dt=b.p_dt;

```
