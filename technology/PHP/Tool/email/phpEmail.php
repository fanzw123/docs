<?php 

$fromname = "nomizu@razona.jp";							//发件人邮箱
$user_email = 'zhanglin492103904@qq.com';			//收件人

//邮件标题
$subject = "【我是标题】我是标题";
$subject = "=?utf-8?B?".base64_encode($subject)."?=";

//头部文件
$title = "Content-Type: text/plain;charset=utf-8\r\n";
$title .= "Content-Transfer-Encoding: 7bit\r\n";
$title .= "MIME-Version: 1.0\r\n";
$title .= "X-Mailer:PHP/" . phpversion() . "\r\n";				//发送时间
$title .= "From: \"" . $fromname . "\" <" .  $fromname. ">";	//

//邮箱内容
$content = "\n\n";
$content .= "admin\n";
$content .= "admin2\n\n";


//收件人,邮件标题，邮件内容，邮件抬头
mail($user_email,$subject,$content,$title);

?>