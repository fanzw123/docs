# 从hive元数据表，生成dw结果表

## 解析uba_log

## 结果表建表语句
	CREATE  TABLE dw_web_visit_traffic_log (
    user_id   string,
    selection_city_id   string,
    client_time   string,
    user_based_city_id   string,
    referer_full_url   string,
    referer_page   string,
    referer_page_id   string,
    referer_page_name   string,
    current_full_url   string,
    current_page   string,
    current_page_id   string,
    current_page_name   string,
    channel_code   string,
    page_param   string,
    client_param   string,
    guid   string,
    client_ip   string,
    os_type   string,
    os_version   string,
    brower_type   string,
    brower_version   string,
    phone_type   string,
    server_time   string)
	partitioned by (p_dt string);
## 导入数据
	add jar hdfs://NameNode:8020/user/jars/ParseUserAgent.jar;
	create temporary function parse_user_agent as 'com.angejia.hive.udf.parse.ParseUserAgent';
	INSERT INTO TABLE dw_stage.dw_web_visit_traffic_log 	partition(p_dt=20150401)
	select 
	if(length(uid)>0,uid,0) AS user_id,
	ccid as selection_city_id,
	client_time as client_time,
	'' as user_based_city_id,
	if(length(referer)>0,referer,'') as referer_full_url,
	coalesce(parse_url(referer,'PATH'),'') as referer_page,
	'' as referer_page_id,
	'' as referer_page_name,
	if(length(url)>0,url,'') as current_full_url,
	coalesce(parse_url(url,'PATH'),'') as current_page,
	'' as current_page_id,
	'' as current_page_name,
	'' as channel_code,
	page_param as page_param,
	client_param as client_param,
	guid as guid,
	ip as client_ip,
	parse_user_agent(agent,0) as os_type,
	parse_user_agent(agent,1) as os_version,
	parse_user_agent(agent,2) as brower_type,
	parse_user_agent(agent,3) as brower_version,
	parse_user_agent(agent,4) as phone_type,
	server_time as server_time
	from uba_web_visit_log.uba_web_visit_log_20150401;