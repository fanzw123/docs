<?php
header('Content-Type:text/html;charset=utf-8');
require_once 'PHPExcel/Reader/Excel2007.php';
require_once 'PHPExcel/Reader/Excel5.php';
include 'PHPExcel/IOFactory.php';	//读取控制

error_reporting(E_ALL);

function excelToArray($file){
	
	$objReader = PHPExcel_IOFactory::createReader('Excel5');

	$objReader->setReadDataOnly(true);

	$objPHPExcel = $objReader->load($file);//读取文件

	$objWorksheet = $objPHPExcel->getActiveSheet(0);//读取excel文件中的第一个工作表

	$highestRow = $objWorksheet->getHighestRow();//计算总行数
	
	$highestColumn = $objWorksheet->getHighestColumn();//取得列数中最大的字母。如(J)
	$highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn);//通过字母计算总列数
	
	$excelData = array();//存放读取的数据

	for ($row = 2; $row <= $highestRow; ++$row) {//从第二行开始读取数据

		for ($col = 0; $col <= $highestColumnIndex; ++$col) {//读取每行中的各列
			//把读取的数据放入数组中
			$excelData[$row-2][] = $objWorksheet->getCellByColumnAndRow($col, $row)->getValue();
		}

	}

	return $excelData;
}

print_r(excelToArray('csat.xls'));
//iconv('utf-8','gb2312', $val)//出现乱码解决方法

?>