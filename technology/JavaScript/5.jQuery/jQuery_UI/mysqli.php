<?php 

//过程连接数据库
header('Content-Type:text/html;charset=utf-8');
$_mysqli = new mysqli('127.0.0.1','root','514591','bund',3306);

if (mysqli_connect_errno()) {//容错处理
	echo '数据库连接错误!错误代码'.mysqli_connect_errno();
	exit();
} 
$_mysqli->set_charset('utf8');	//设置字符集

if (isset($_POST['term'])) {
	$term= $_POST['term'];
	$_sql = "SELECT 
								name,
								nameEn,
								introduceCn,
								introduceEn
				 	FROM 
				 				ptk_selection_name
				WHERE
								name LIKE '%$term%'
						OR
								nameEn LIKE '%$term%'
						OR
								introduceCn LIKE '%$term%'
						OR
								introduceEn LIKE '%$term%' ";
	$_result = $_mysqli->query($_sql);//资源句柄
	
	$_html = array();
	while (!!$_objects = $_result->fetch_object()) {	//返回结果集
	
		$_html[] = $_objects;//保存在数组中
	}

	$_result->free();	//销毁资源句柄
	$_result = null;	//销毁对象
	$_mysqli->close();//关闭数据库
	$_mysqli = null;	//销毁对象
} 


echo (json_encode($_html));

?>