//博客
https://github.com/Widen/fine-uploader-server

//开发文档
http://www.cnblogs.com/chenkai/archive/2013/01/04/2844702.html

//demo
http://fineuploader.com/fine-uploader-with-jquery-wrapper-demo.html

http://blog.endlesscode.com/2010/03/26/swfupload%E6%B5%85%E6%9E%90/

fineuploader 	// 核心文件包
server             //服务器文件
index.html		//上传文件说明

onSubmit事件：文件开始提交.调用参数格式如下:onSubmit:  function(id,  fileName)  {}.
onUpload事件: 文件开始上传.调用参数格式如下:onUpload: function(id, fileName) {}.
onProgress事件: 文件正在上传.调用参数格式如下:onProgress:  function(id,  fileName,  loaded,  total)  {}.
onComplete事件: 文件上传成功. 调用参数格式如下:onComplete:  function(id,  fileName,  responseJSON)  {}.
onCancel事件: 取消文件上传.调用参数格式如下:onCancel:  function(id,  fileName)  {}.

如上五个事件基本覆盖整个上传文件操作中所有过程.完全以开放的形式可以再客户端操作.关于调用如上事件参数说明如下:
Id:表示第几个开始上传的文件.Fine Uploder定义是默认从0开始计数.
fileName：上传文件的文件名.
loaded：表示已经上传到服务器端数据的大小[byte].
total: 需要上传文件的大小.
responseJSON: 用来在上传操作完成后返回的Json格式的数据.通过Jquery反序列化出来对象.其中包含一个IsSuccess属性用来判断此次上传是否成功.

 $other = array(
 	'success' => 1,	//1成功，0失败
 	'uploadName' => 123
 );
