<?php
if (!defined('THINK_PATH'))exit();
//Home分组配置
//数据库
$setdb = array (
	//数据库连接信息
	'DB_TYPE'               => 'mysql',     		// 数据库类型
    'DB_HOST'               => '127.0.0.1', 		// 服务器地址
    'DB_NAME'               => 'thinkphp',         	 // 数据库名
    'DB_USER'               => 'root',      			// 数据库用户名
    'DB_PWD'                => '514591',          			// 数据库密码
    'DB_PORT'               => '3306',    		   	 // 端口
    'DB_PREFIX'             => 'think_',   		 // 数据库表前缀
    'DB_FIELDTYPE_CHECK'    => false,     // 是否进行字段类型检查
    'DB_FIELDS_CACHE'       => true,        // 启用字段缓存
    'DB_CHARSET'            => 'utf8',    		// 数据库编码默认采用utf8	
);

//角色权限控制RBAC
$Project = array (

		'SESSION_AUTO_START' => true,	
		'DB_FIELDS_CACHE'=>false,			//关闭字段缓存
		
		'USER_AUTH_ON'              =>  true,				//开启用户认证
		'USER_AUTH_TYPE'			=>  2,				// 默认认证类型 1 登录认证 2 实时认证
		'USER_AUTH_KEY'             =>  'authId',		// 用户认证SESSION标记（用户的id）
		'ADMIN_AUTH_KEY'			=>  'administrator',	//管理员标示,有所有访问权限
		'USER_AUTH_MODEL'           =>  'User',		// 默认查找的用户表
		'AUTH_PWD_ENCODER'          =>  'md5',	// 用户认证密码加密方式
		'USER_AUTH_GATEWAY'         =>  '/Home/Public/login',	// 默认认证网关,用户无法登陆或验证失败去寻找的方法
		'NOT_AUTH_MODULE'           =>  'Public',				// 默认无需认证模块
		'NOT_AUTH_ACTION'           =>  'image',				// 默认无需认证操作
		
		'REQUIRE_AUTH_MODULE'       =>  '',			// 默认需要认证方法
		'REQUIRE_AUTH_ACTION'       =>  '',			// 默认需要认证操作
		
		'GUEST_AUTH_ON'             =>  false,    			// 是否开启游客授权访问(没有登陆的游客也可以进行访问)
		'GUEST_AUTH_ID'             =>  0,        			// 游客的用户ID
		
		'DB_LIKE_FIELDS'            =>  'title|remark',		//数据库Like匹配字段
		
		//RBAC设置关系表
		'RBAC_ROLE_TABLE'           =>  'think_role',				//组
		'RBAC_USER_TABLE'           =>  'think_role_user',	//用户隶属组
		'RBAC_ACCESS_TABLE'         =>  'think_access',	//组权限
		'RBAC_NODE_TABLE'           =>  'think_node',			//项目功能
		'SHOW_PAGE_TRACE'           =>  1//显示调试信息	
);


//合并数组，返回出去
return array_merge($setdb, $Project);


	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
?>