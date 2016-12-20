/* 配置文件
 * config.language = 'zh-cn';//设置界面字符集
 * config.width = 400; //设置长度
 * config.height = 400; //设置高度
 * config.skin = 'v2'; //有三种样式：'kama'（默认）、'office2003'、'v2'
 * config.uiColor = '#FFF';//自定义背景颜色
 * 
 * 配置与开启图片上传功能。'../config/ckeup.php?type=img'; 表示用哪张页面来处理图像文件
 * config.filebrowserImageUploadUrl = '../config/ckeup.php?type=img';
 * 
 */

CKEDITOR.editorConfig = function( config )
{
	config.language = 'zh-cn';
	config.uiColor = '#FFF';
	config.filebrowserImageUploadUrl = '?s=/Home/Index/editor';
};
