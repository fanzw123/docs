<?php
/**
 * 上传调用文件
 */

header('Content-Type:text/html;charset=utf-8');

//引入核心类
require_once 'qqFileUploader.php';
$uploader = new qqFileUploader();


//制定上传文件的扩展名  ex. array("jpeg", "xml", "bmp")
$uploader->allowedExtensions = array('jpg');	//留空可以允许所有文件

//设置上传文件字节大小
$uploader->sizeLimit = 10 * 1024 * 1024;

// 指定在JavaScript中输入名称。
//Specify the input name set in the javascript.	
$uploader->inputName = 'qqfile';

// 如果你想使用恢复功能，上传，指定要保存的文件夹。
//If you want to use resume feature for uploader, specify the folder to save parts.
$uploader->chunksFolder = 'chunks';

// 以指定的名称保存上传，的第二个参数设置。
//To save the upload with a specified name, set the second parameter.
$result = $uploader->handleUpload('uploads/',$uploader->getName());	//已引用入口文件地址为准

//返回一个用于上传文件，你可以使用下面的行名称。 
//To return a name used for uploaded file you can use the following line.
$result['uploadName'] = $uploader->getUploadName();

header("Content-Type: text/plain");

echo json_encode($result);

?>