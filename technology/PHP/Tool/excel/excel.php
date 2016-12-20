<?php 
header('Content-Type:text/html;charset=utf-8');
$_mysqli = new mysqli('127.0.0.1','root','514591','thinkphp',3306);

if (mysqli_connect_errno()) {//容错处理
	echo '数据库连接错误!错误代码'.mysqli_connect_errno();
	exit();
}
$_mysqli->set_charset('utf8');

$_sql = "select * from think_node";

$_result = $_mysqli->query($_sql);
$_html = array();
while (!!$_objects = $_result->fetch_object()) {//把sql语句中的所有结果赋值给变量
	//返回出所有结果集，把对象数组，赋值给变量数组，返回出一个变量对象数组。
	$_html[] = $_objects;//$_html[0]、$_html[1]......每次循环都把一条（结果集数组对象）放在$_html[]这个数组中。
}





error_reporting(E_ALL);

include_once 'PHPExcel.php';
include_once 'PHPExcel/Writer/Excel5.php';//PHPExcel_Writer_Excel2003用于创建xls文件


$objPHPExcel = new PHPExcel();//创建表对象

// 设置表信息
$objPHPExcel->getProperties()->setCreator("Admin");//创建人
$objPHPExcel->getProperties()->setLastModifiedBy("Admin");//最后修改人
$objPHPExcel->getProperties()->setTitle("Office 2007 XLSX Test Document");//标题
$objPHPExcel->getProperties()->setSubject("Office 2007 XLSX Test Document");//题目
$objPHPExcel->getProperties()->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.");//描述

//设置表信息
//$objPHPExcel->createSheet(0);			// 添加新的工作表 
//$sheet = $phpexcel->getSheet(0);		//	获取已有编号的工作表 
$objPHPExcel->setActiveSheetIndex(0);	//设置当前激活的工作表编号
$objPHPExcel->getActiveSheet()->setTitle('sheet1');//默认工作薄名字

//样式扩展
//$objPHPExcel->getActiveSheet()->mergeCells('I1:I2');		//合并单元格：
//$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'XXX');//设置合并单元格后的值
//$objActSheet->unmergeCells('B1:C22');								//分离单元格
//$sheet->getCell("A5")->getValue();	// 获取单元格A5的值


//设置表中内容
//标题
$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'ID');
$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'name');
$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'title');
$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'status');
$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'remark');
$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'sort');
$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'pid');
$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'level');
$objPHPExcel->getActiveSheet()->setCellValue('J1', '=SUM(A2:A3)');
//具体内容
foreach ($_html as $key=>$val) {
	$key += 2;
	$objPHPExcel->getActiveSheet(0)->SetCellValue("A$key", $val->id);
	$objPHPExcel->getActiveSheet(0)->SetCellValue("B$key", $val->name);
	$objPHPExcel->getActiveSheet(0)->SetCellValue("C$key",$val->title);
	$objPHPExcel->getActiveSheet(0)->SetCellValue("D$key", $val->status);
	$objPHPExcel->getActiveSheet(0)->SetCellValue("E$key", $val->remark);
	$objPHPExcel->getActiveSheet(0)->SetCellValue("F$key", $val->sort);
	$objPHPExcel->getActiveSheet(0)->SetCellValue("G$key", $val->pid);
	$objPHPExcel->getActiveSheet(0)->SetCellValue("H$key", $val->level);
}



//$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);	把内容写入 Excel 2007 文件
$objWriter = new PHPExcel_Writer_Excel5($objPHPExcel);	//把内容写入  Excel 2005 文件
//$objWriter->save(str_replace('.php', '.xls', __FILE__));

$time =  date('y-m-d',time());
if (sizeof($_POST)) {
	header("Pragma: public");
	header("Expires: 0");
	header("Cache-Control:must-revalidate,post-check=0,pre-check=0");
	header("Content-Type:application/force-download");
	header("Content-Type:application/vnd.ms-execl");
	header("Content-Type:application/octet-stream");
	header("Content-Type:application/download");
	header("Content-Disposition:attachment;filename=$time.xls");//自定义写入格式
	header("Content-Transfer-Encoding:binary");
	$objWriter->save("php://output");
}

?>



<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Excel</title>
</head>
<body>
<form method="post" action="">
	<input type="submit" name="dc" value="导出"  />
</form>
</body>
</html>




