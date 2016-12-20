文件说明
swfupload.js  核心文件

swfupload.queue.js 列队上传文件

handlers.js 上传事件文件(定义上传事件)(开始上传、取消、停止上传等)

//核心文件
swfupload.js  

//计算上传速度的插件包
swfupload.queue.js  

//flash插件文件
swfupload_fp9.swf
swfupload.swf			

//handlers.js  上传事件文件(定义上传事件)(开始上传、取消、停止上传等)

//my.js   自定义业务流程及流程说明  

步骤：
引入
swfupload.js  
handlers.js
my.js

html部分
<!-- 上传按钮定义 -->
<div style="width:62px;position:absolute;z-index:2;top:32px;">
	<span id="spanButtonPlaceholder"></span>
</div>

上传进度监听
<div id="divFileProgressContainer" ></div>
