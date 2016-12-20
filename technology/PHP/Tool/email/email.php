<?php 
date_default_timezone_set("Asia/Shanghai"); //设定时区东八区 
error_reporting(E_ERROR | E_WARNING | E_PARSE);
require_once('class.phpmailer.php'); //发送email对象
include("class.smtp.php");  				//SMTP功能的对象
//技术参考http://www.xxlab.com/?post=76

//1系统设置
$mail = new PHPMailer();
$mail->IsSMTP();                 			// 启用SMTP
//$mail->IsMail();//或者启用Php内置的功能
$mail->Host = "smtp.qq.com";           //SMTP服务器
$mail->Port = 25;								//SMTP服务器端口
$mail->SMTPAuth = true;                  //开启SMTP认证
$mail->CharSet = "utf-8";					//设置字符编码
$mail->Encoding = "base64";			//设置邮件编码方式 可选："8bit","7bit","binary","base64",和"quoted-printable".
$mail->Username = "zhanglin492103904@qq.com";    // SMTP账户用户名
$mail->Password = "5ia1ab4ab5007xyz";                		// SMTP账户密码
$mail->From = "zhanglin492103904@qq.com";            //发件人email
$mail->FromName = "Admin";              							//发件人或团队名
$mail->AddReplyTo("492103904@qq.com", "Admin");  //邮箱回复地址，回复人名或团队名
$mail->WordWrap = 50;												//设置每行字符长度


//2收件人设置	
$mail->AddAddress("1227544322@qq.com", "Wade1"); 			//收件人地址,收件人名
//$mail->AddAddress("492103904@qq.com", "Wade2"); 				//收件人地址

//3$mail->AddAttachment("/var/tmp/file.tar.gz");   // 添加附件
$mail->AddAttachment("123.jpg", "new.jpg");   // 添加附件,并指定名称

//4内容设置
$mail->IsHTML(true);                 						// 用html格式发送
//$mail->IsMail(true);											//内置email函数发送

//邮箱主题
 $mail->Subject    = "=?UTF-8?B?" . base64_encode("UCDChina") . "?=";//解决中文主题乱码
//邮箱内容
$mail->Body = "
<html>
<head>
<meta http-equiv=\"Content-Language\" content=\"zh-cn\">
<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">
</head>
<body>
	你好<br />
	很高心认识你<br /><br />
	这是我的荣幸!
</body>
</html> 
";    
//不支持html时的备用显示 
$mail->AltBody = "备用.."; //邮件正文不支持HTML的备用显示

//5发送
if($mail->Send()) {
	echo "sendOK";
} else {
	echo "sendError";
	echo "Mailer Error: " . $mail->ErrorInfo;//返回邮件SMTP中的最后一个错误信息
	exit;
}
$mail->ClearAllRecipients();	//清除所有收件人
$mail->ClearAttachments();	//清除附件
$mail->SmtpClose();				//关闭SMTP连接

?> 