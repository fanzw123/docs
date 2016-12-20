<?php
if (!defined('THINK_PATH'))exit();
//Admin分组配置
//数据库
$setdb = array (
	//数据库连接信息
	'DB_TYPE'               => 'mysql',     		// 数据库类型
    'DB_HOST'               => 'localhost', 		// 服务器地址
    'DB_NAME'               => 'thinkphp',         	 // 数据库名
    'DB_USER'               => 'root',      			// 数据库用户名
    'DB_PWD'                => '',          			// 数据库密码
    'DB_PORT'               => '3306',    		   	 // 端口
    'DB_PREFIX'             => 'think_',   		 // 数据库表前缀
    'DB_FIELDTYPE_CHECK'    => false,     // 是否进行字段类型检查
    'DB_FIELDS_CACHE'       => true,        // 启用字段缓存
    'DB_CHARSET'            => 'utf8',    		// 数据库编码默认采用utf8
);

//其他设置
$config = array (
	'URL_MODEL'             => 3,					//URL重写，兼容模式  如：home.php?s=/User/user   或者  home.php/User/user

	//设置项目分组，Lib目录下Action中建立文件夹Home和Admin，存放不同分组的控制器
	//Tpl目录下建立文件夹Home和Admin，存放不同分组的视图
	//访问：入库文件?s=/Home/User/user/		
	'APP_GROUP_LIST'        => 'Home,Admin',      // 项目分组设定,多个组之间用逗号分隔,例如'Home,Admin'
	'DEFAULT_GROUP'         => 'Home',  // 默认分组
);


//合并数组，返回出去
return array_merge($setdb, $config);

/*		系统常量 (手册附录)
		echo __SELF__  . '<br />';					//当前URL所有参数
		echo __URL__  . '<br />';						//当前模块地址(控制器地址)
		echo __APP__	. '<br />';						//当前项目入口文件	
		echo __ACTION__  . '<br />';				//当前模块控制器地址 (当前模块控制器地址)	
		echo ACTION_NAME . '<br />'; 			//当前方法名称
		
		echo '<br />';
		
		echo APP_PATH . '<br />'; 					//当前项目目录
		echo APP_NAME . '<br />'; 					//当前项目名称
		echo APP_TMPL_PATH . '<br />'; 		//当前项目模板路径
		echo APP_PUBLIC_PATH . '<br />'; 	//项目公共文件目录
		echo CACHE_PATH . '<br />'; 				//当前项目编译缓存文件

*/

/*		数据库跨库操作 
 * 		
 * 
 * 
 * 
 */
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
?>