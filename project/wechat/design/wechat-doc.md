微聊正文解析设计
====

##1.解析设计

根据msg_ext及user_msg的content_type和account_type分别进行解析，汇总结果进入明细表。

使用msg_id作为明细表的主键

表名：dw_wechat_msg_detail_daily


字段：

| 编号 | 字段名称 | 字段类型 | 表 | 字段含义 |备注 |
| ---| --- | ---  | --- | --- | --- | --- | --- |
| 1 | msg_id  | string | user_msg | 消息ID |
| 2 | from_uid | string | user_msg | 发送方账户ID | 需要根据发送方类型判断是否用户或经纪人 |
| 3 | to_uid | string | user_msg | 接收方账户ID | 需要根据发送方类型判断是否用户或经纪人 |
| 4 | content_type | string | user_msg | 消息内容类型(数字) | 1-文本;2-图片;3-房源卡片;5-用户提示点击消息;6-买房需求卡片;106-系统提示消息 |
| 5 | content_name | string | user_msg | 消息内容类型(文字) | 1-文本;2-图片;3-房源卡片;5-用户提示点击消息;6-买房需求卡片;106-系统提示消息 |
| 6 | status | string | user_msg | 消息状态(数字) | 0-取消发送;1-等待发送;2-已发送;3-已接收;4-已读 |
| 7 | status_name | string | user_msg | 消息状态(文字) | 0-取消发送;1-等待发送;2-已发送;3-已接收;4-已读 |
| 8 | account_type | string | user_msg | 发送方(数字) | 0-发送方未知;1-用户发送;2-经纪人发送;4-公众号发送;100-系统发送 |
| 9 | account_name | string | user_msg | 发送方(文字) | 0-发送方未知;1-用户发送;2-经纪人发送;4-公众号发送;100-系统发送 |
| 10 | content | string | msg_ext | 聊天内容 |
| 11 | created_at | string | msg_ext | 创建日期 |
| 12 | updated_at | string | msg_ext | 更新日期 |
| 13 | p_dt | string | msg_ext | 统计日期 |

##2.解析逻辑

根据content_type类型解析content内容

例1.content_type为3

```

msg_id为75347的JSON内容

{"name":"安居古浪新苑",
 "price":"120万",
 "img":"http:\\/\\/7teb43.com3.z0.glb.qiniucdn.com\\/Fqt5FBtO6GXWS3K-CUv0w1T4C42S",
 "des":"2室1厅1卫 53.28平米",
 "url":"http:\\/\\/m.angejia.com\\/sale\\/sh\\/127144.html?from=weiliao"}

 select get_json_object(a.content, '$.name') as inventory_name
       ,regexp_extract(parse_url(get_json_object(a.content, '$.url'),'PATH'),'/(\\d+).html$',1) as inventory_id
       ,get_json_object(a.content, '$.price') as price
       ,get_json_object(a.content, '$.img') as img_url
       ,split(get_json_object(a.content, '$.des'),' ')[0] as site
       ,split(get_json_object(a.content, '$.des'),' ')[1] as area
       ,get_json_object(a.content, '$.url') as url
 from  dw_db.dw_wechat_detail_info_daily where p_dt =${dealDate} and content_type ='3' and  msg_id = '75347'


 ```

 ```
 msg_id为75432的JSON内容

 {"des":"2室2厅1卫 91平",
  "id":153942,
  "img":"http://7xjj27.dl1.z0.glb.clouddn.com/pic_wt.png",
  "jsonVersion":0,
  "name":"白沙东苑",
  "price":"100万",
  "tradeType":0,
  "url":"http://m.angejia.com/inventory/list/153942?from=weiliao"}

  select split(get_json_object(a.content, '$.des'),' ')[0] as site,
         split(get_json_object(a.content, '$.des'),' ')[1] as area,
         get_json_object(a.content, '$.id') as inventory_id,
         get_json_object(a.content, '$.img') as img_url,
         get_json_object(a.content, '$.jsonVersion') as json_version,
         get_json_object(a.content, '$.name') as inventory_name,
         get_json_object(a.content, '$.price') as price,
         get_json_object(a.content, '$.tradeType') as trade_type,
         get_json_object(a.content, '$.url') as url
  from  dw_db.dw_wechat_detail_info_daily where p_dt =${dealDate} and content_type ='3' and  msg_id = '75432'

```

```

 msg_id为75375的JSON内容

{"url":"http:\\/\\/m.angejia.com\\/sale\\/sh\\/170349.html?from=weiliao",
 "img":"http:\\/\\/7teb43.com3.z0.glb.qiniucdn.com\\/FjH_Ej3cVe67AvtmjQC3kKHawqUb",
 "name":"恒陇丽晶公寓",
 "price":"460万",
 "des":"2室1厅1卫 78平米"}

 select get_json_object(a.content, '$.url') as url,
        regexp_extract(parse_url(get_json_object(a.content, '$.url'),'PATH'),'/(\\d+).html$',1) as inventory_id,
        get_json_object(a.content, '$.img') as img_url,
        get_json_object(a.content, '$.name') as inventory_name,
        get_json_object(a.content, '$.price') as price,
        split(get_json_object(a.content, '$.des'),' ')[0] as site,
        split(get_json_object(a.content, '$.des'),' ')[1] as area
 from  dw_db.dw_wechat_detail_info_daily where p_dt =${dealDate} and content_type ='3' and msg_id='79709'

 ```

例2.content_type为6

```
ADD JAR hdfs://UCloudcluster/umr-jdlg4d/jars/Uni2Ch.jar;
CREATE TEMPORARY FUNCTION Unicode AS 'com.angejia.hadoop.hive_udf.Unicode2Chinese';

select a.msg_id
      ,Unicode(get_json_object(a.content, '$.title')) as demand
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[0],'$.name')) as demand_place
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[0],'$.value')) as place_value
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[1],'$.name')) as demand_site
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[1],'$.value')) as site_value
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[2],'$.name')) as demand_budget
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[2],'$.value')) as budget_value
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[3],'$.name')) as demand_other
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[3],'$.value')) as other_value
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[4],'$.name')) as demand_remark
      ,Unicode(get_json_object(split(regexp_replace(regexp_replace(get_json_object(a.content, '$.content'),'\\[|\\]',''),'\\},\\{','\\}&\\{'),'&')[4],'$.value')) as remark_value
from dw_db.dw_wechat_detail_info_daily where p_dt =${dealDate} and content_type ='6' msg_id='81659';

```
