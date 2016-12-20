# dw_member_summary_detail_info_daily 会员详细信息日表

- [构架图](http://www.processon.com/view/link/558bcfa4e4b09bd4b8d4bfe3)

## 字段

``` sql

-- dw_member_summary_basis_info 会员基础信息表
member_id '会员ID'

member_source_id '注册渠道 id'

member_source_name '注册渠道名称'

member_created_at '注册时间'

member_phone '会员手机号码'

-- dw_member_summary_brower_info 会员 brower 信息
member_web_guid 'WEB guid 设备ID (若有多个用,分格) | guid'

member_web_brower_type '浏览器类型(若有多个用,分格) | brower_type'

member_web_os_type 'web 操作系统(若有多个用,分格) | os_type'

member_web_os_version 'web 操作系统版本(若有多个用,分格) | os_version'

-- dw_member_summary_commission_info 会员委托信息
member_commission_intraday '会员当天委托'

member_commission_history '会员历史委托'

-- dw_member_summary_device_info 会员 device 信息表
member_device_ids 'APP 设备 id (若有多个用,分格)| device_id'

member_device_type '手机型号 | device_type'

member_app_name 'APP类型 | app_name'

member_device_platform '手机操作系统类型 | platform'

member_device_os_version '手机操作系统版本 | os_version'

member_app_version ' App 版本 | app_version'

member_app_channels_code 'App 渠道号代码 | delivery_channels'

member_app_channel_name 'App 渠道号名称'

-- dw_member_summary_inventory_info 会员房源相关
member_inventory_collect_intraday '会员当天收藏房源数'

member_inventory_collect_history '会员历史收藏房源数'

-- dw_member_summary_request_info 会员请求信息
-- web 相关字段
member_pv_web_day '会员 web 日 PV'

member_pv_pc_inventory_list_day  '会员找房列表页 pv pc'

member_pv_pc_inventory_page_day '房源单页 pv PC'

member_pv_tw_inventory_list_day '会员找房列表页 pv tw'

member_pv_tw_inventory_page_day '房源单页 pv TW'

member_pv_tw_community_page_day '小区单页 pv TW'

member_web_requset_first_time 'WEB 首次访问时间'

member_web_requset_last_time 'WEB 最后一次访问时间'
-- app 相关字段
member_pv_app_api_day '会员 App 调用 api 次数'

member_pv_app_inventory_list_day '会员找房列表页 pv app'

member_pv_app_inventory_page_day '房源单页 pv app'

member_pv_app_community_page_day '小区单页 pv App'

member_app_requset_first_time 'APP 首次访问时间'

member_app_requset_last_time 'APP 最后一次访问时间'

-- dw_member_summary_tag_info 会员标签信息
member_basic_demand_location '用户基本需求地点(多个 @ 分割 )'

member_basic_demand_house_type '用户基本需求户型 (多个 @ 分割)'

member_basic_demand_budget '用户基本需求预算(多个 @ 分割)'

member_like_tag '用户喜欢类型(多个 @ 分割)'

member_dislike_tag '用户不喜欢类型(多个 @ 分割)'

-- dw_member_summary_tel_info 会员电话量相关
member_tel_m2b_all '用户打给经纪人所有'

member_tel_m2b_distinct '用户打给经纪人去重'

-- dw_member_summary_visit_info 会员带看信息
member_visit_sponsor_intraday '会员当天主动发起带看'

member_visit_sponsor_history '会员历史主动发起带看'

member_visit_real_intraday '今日实际带看'

member_visit_real_history '历史实际带看'

-- dw_member_summary_web_from_entrance_info 会员 web 来源表
member_web_from_entrance '会员第一次来源 (sem:百度投放, direct:会员浏览器输入 ,seo:其他网页)'

-- dw_member_summary_wechat_message_info 会员微聊相关
member_wechat_message_m2b_distinct '会员发送给经纪人，去重'

member_wechat_message_m2b_all '会员发送给经纪人微聊，所有'


```

## HQL
- [member summary](service/data-warehouse/db-design/dw/dw_summary/table-design/member/)
- [dw_member_summary_detail_info_daily](http://git.corp.angejia.com/dw/dw_sql/tree/master/member/dw_member_summary_detail_info_daily.sql)



## * 上线注意事项

- hive 添加字段是替换操作，所以要特别注意，不要替换错了
- 操作前，先备份原始数据表
- 数据表的名字不能换
- 在原基础上添加字段

### 1、备份源数据库

``` sql
HIVE

#数据表上线流程
# 上线流程：备份 -> 添加字段
    # 调用方式: ./table-online-process.sh source_table=[db_name.table_name] run_date=[备份运行时间,默认昨天.如(20150701)] add_fields=[需要添加的字段,为空则不追加字段,如(t_1,t_2,t_3,t_4)] table_type=[数据表类型:0普通表，1分区表] partition_field=[分区表字段名:默认:p_dt] source_db_type=[数据库类型:[dw | slave],默认 dw]

# 回滚流程: 删除添加字段
    # 回滚方式: ./table-online-process.sh is_reset=1 source_table=[db_name.table_name] run_date=[备份运行时间,默认昨天.如(20150701)] add_fields=[回滚删除的字段,如(t_1,t_2,t_3,t_4)] table_type=[数据表类型:0普通表，1分区表] partition_field=[分区表字段名:默认:p_dt] source_db_type=[数据库类型:[dw | slave],默认 dw]


  -- 备份数据
  ./migrate-hive-tabel.sh source_table=dw_db.dw_member_summary_detail_info_daily target_table=dw_history_db.dw_member_summary_detail_info_daily_20150706

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_member_summary_detail_info_daily;
  select count(*) from dw_history_db.dw_member_summary_detail_info_daily_20150706;

MYSQL
  -- 备份数据
  USE dw_db;
  CREATE TABLE
    dw_member_summary_detail_info_daily_20150706
  LIKE
    dw_member_summary_detail_info_daily;

  INSERT INTO
    dw_member_summary_detail_info_daily_20150706
  SELECT
    *
  FROM
    dw_member_summary_detail_info_daily;

  -- 验证记录条数,是否一致
  select count(*) from dw_db.dw_member_summary_detail_info_daily;
  select count(*) from dw_db.dw_member_summary_detail_info_daily_20150706;  
```



### 2、添加字段后，导入新分区，要把原来的就分区删除掉

``` sql
HIVE
  ALTER TABLE
    dw_db.dw_member_summary_detail_info_daily
  DROP PARTITION (
    p_dt = '2015-07-05'
  );

MYSQL
  USE dw_db;
  DELETE FROM
    dw_member_summary_detail_info_daily
  WHERE
    p_dt = '2015-07-05'
```
