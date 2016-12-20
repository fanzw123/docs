<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ckeditor编辑器</title>
<script type="text/javascript" src="ckeditor/ckeditor.js" ></script>
</head>
<body>



<form method="post" action="?s=/Home/Index/ckeditor" enctype="multipart/form-data" style="text-align:center;margin:30px;">
<textarea name="content" id="TextArea1" class="ckeditor"><?php echo ($content); ?></textarea>
<input type="submit" name="send" value="上传" />
</form>

</body>
</html>