<?php
//$config = require("config.inc.php");
if (!defined('THINK_PATH'))exit();
//公共配置文件

//公共数据库配置
$setdb = array (
		//数据库连接信息
		'DB_TYPE'               => 'mysql',     		// 数据库类型
		'DB_HOST'               => '127.0.0.1', 		// 服务器地址
		'DB_NAME'               => 'bund',         	 // 数据库名
		'DB_USER'               => 'root',      			// 数据库用户名
		'DB_PWD'                => '514591',          			// 数据库密码
		'DB_PORT'               => '3306',    		   	 // 端口
		'DB_PREFIX'             => 'think_',   		 // 数据库表前缀
		'DB_FIELDTYPE_CHECK'    => false,     // 是否进行字段类型检查
		'DB_FIELDS_CACHE'       => true,        // 启用字段缓存
		'DB_CHARSET'            => 'utf8',    		// 数据库编码默认采用utf8
);


//其他系统配置
$Project  = array(
		'SESSION_AUTO_START' => true,				//session常开
		'URL_MODEL'             => 3,							//URL重写，兼容模式  如：home.php?s=/User/user   或者  home.php/User/user
		//有0,1,2
		
		'DEFAULT_TIMEZONE'=>'Asia/Shanghai', 	// 设置默认时区
		'VAR_PAGE'=>'page',									//分页类URL标示
		'THINK_VERSION' =>THINK_VERSION,		//php版本号
		
		//项目分组
		'APP_GROUP_LIST'        => 'Home,Admin',  // 项目分组设定,多个组之间用逗号分隔,例如'Home,Admin'
		'DEFAULT_GROUP'         => 'Home',  			// 默认分组
		
		//语言包
		'LANG_SWITCH_ON'=> true,				//开启语言包功能
		'DEFAULT_LANG'=>'zh-cn',					//默认语言的文件夹是zh-cn
		'LANG_AUTO_DETECT'=> false,		//是否自动检测语言
		
		//模板配置
		//'DEFAULT_THEME' => 'default',
		//'TMPL_ACTION_SUCCESS' => 'public:success',
		//'TMPL_ACTION_ERROR' => 'public:error',
		
		//表单安全配置
		//'TOKEN_ON'=>true,  						// 是否开启令牌验证
		//'TOKEN_NAME'=>'__hash__',    		// 令牌验证的表单隐藏字段名称		
		//'TOKEN_TYPE'=>'md5',  					//令牌哈希验证规则 默认为MD5	
		//'TOKEN_RESET'=>true,  					//令牌验证出错后是否重置令牌 默认为true
		
		
		//缓存配置
		'DATA_CACHE_TYPE' =>'File',									//缓存类型
		'DATA_CACHE_PATH' =>'Home/Runtime/Temp/',		//缓存文件目录
		'DATA_CACHE_TIME'=>'60'	,									//缓存有效秒数	
		
);


//路由配置
$_url = array(
		'URL_ROUTER_ON'   => true, //开启路由
		'URL_HTML_SUFFIX' => '.html',	//URL伪静态
		
		//重写
		'URL_ROUTE_RULES' => array(
				'join' => array('/Public/register'),      //注册
				'index'=>array('?s=/Index/index'),//功能介绍

				'articles/:id'=>'home/Index/show',            //新闻详细页面
		)
		
);


//合并数组，返回出去
return array_merge($setdb,$Project);

/*		系统常量 (手册附录)
		echo __SELF__  . '<br />';					//当前URL所有参数
		echo __URL__  . '<br />';						//当前模块地址(控制器地址)
		echo __APP__	. '<br />';						//当前项目入口文件	
		echo __ACTION__  . '<br />';				//当前模块控制器地址 (当前模块控制器地址)	
		echo ACTION_NAME . '<br />'; 			//当前方法名称
		
		echo '<br />';
		
		echo APP_PATH . '<br />'; 					//当前项目目录
		echo APP_NAME . '<br />'; 					//当前项目名称
		echo APP_TMPL_PATH . '<br />'; 			//当前项目模板路径
		echo APP_PUBLIC_PATH . '<br />'; 		//项目公共文件目录
		echo CACHE_PATH . '<br />'; 				//当前项目编译缓存文件

*/



?>