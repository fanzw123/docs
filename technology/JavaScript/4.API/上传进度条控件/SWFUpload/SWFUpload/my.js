
/*
HTML部分

<div id="divFileProgressContainer" ></div>

button_placeholder_id : divFileProgressContainer

 */

$(function () {
	
	var settings = {
		flash_url : "Home/Public/swfupload/swfupload.swf",			//flash控件文件地址
		flash9_url : "Home/Public/swfupload/swfupload_fp9.swf",
		debug: false,																			//是否调试模式
	
		upload_url: "?s=/Enter/imgupload/",		//上传服务器地址
		post_params: {	//POST提交给服务器文件的参数
			'image_type' : 1,
		},	//上传参数
		file_post_name : 'Filedata',	//是POST过去的$_FILES的数组名
		//triggerUpload	
		custom_settings : {
			upload_target : "jiantingID",	//上传监听id
			cancelButtonId : "btnCancel",							//取消动作id
			thumbnail_height: 300, 
            thumbnail_width: 300, 
            thumbnail_quality: 100 
		},
		
		// 上传文件设置
		file_size_limit : "10 MB",		//允许上传文件大小
		file_types : "*.jpg;*.png",		//允许上传文件类型		(*.*是所有，*.txt只能上传文本)
		file_types_description : "JPG Images; PNG Image",			//文件类型描述
		file_upload_limit : 0,				//限定用户一次性最多上传多少个文件，在上传过程中，该数字会累加，如果设置为“0”，则表示没有限制	
		
		//上传按钮设置
	//	button_image_url : "",	//按钮图片
		button_placeholder_id : "divFileProgressContainer",					//上传按钮id
		button_width: 65,		//按钮长度
		button_height: 29,		//按钮高度
		//button_text : '',			//图片文本
		//button_text_style : '',
		button_text_top_padding: 0,
		button_text_left_padding: 0,
		button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor: SWFUpload.CURSOR.HAND,
		
		// 上传事件
		swfupload_preload_handler : preLoad,						//浏览器不兼容flash时，执行函数
		swfupload_load_failed_handler : loadFailed,				//flash加载失败触发
		file_queue_error_handler : fileQueueError,					//上传文件错误时触发 
		file_dialog_complete_handler : fileDialogComplete,	//上传文件弹出窗口，窗口关闭触发
		upload_progress_handler : uploadProgress,				//开始上传触发
		upload_error_handler : uploadError,							//上传错误触发
		
		upload_success_handler : uploadSuccess,				//上传成功触发	去服务器取得图片文件
		upload_complete_handler : uploadComplete,			//完成后触发
		//queue_complete_handler : queueComplete,				
		
	}	
	var swfu = new SWFUpload(settings);
	
	
	
	
});
