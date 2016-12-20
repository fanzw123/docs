/*
* author：李奫冫
* date_end:2012-10-29 20:00
* date_end:2012-10-29 23:00
* qq:760031214
* Copyright(c) 2012 by liyunbing
*/
jQuery.fn.myWords=function(options){
	//初始化
	// alert("a");
	var defaults={
		obj_opts:"textarea",
		obj_Maxnum:400,
		obj_Lnum:".sns-num"
	}
	var opts=$.extend(defaults,options);
	return this.each(function(){
        // 找到相应对象
		var _this=$(this).find(opts.obj_opts);
		var num=parseInt(opts.obj_Maxnum/2);
		var _obj_Lnum=$(this).find(opts.obj_Lnum);
		$(_obj_Lnum).find("em").text(num);
		if(_this.val()!=""){
			//如果文本框的值不为空，防止刷新浏览器之后 对文本框里面文字个数判断失误
			var len= _this.val().replace(/[^\x00-\xff]/g, "**").length;//将两个字母转换为一个汉字
			var _num=num-parseInt(len/2);//parseInt这个方法 就是len/2转换为整数
			html="还能输入"+"<em>"+_num+"</em>"+"字";
			$(_obj_Lnum).html(html);
		}
		_this.focus(function(){
			var html;
			$(this).keyup(function(){
				//键盘输入
				var lend= $(this).val().replace(/[^\x00-\xff]/g, "**").length;//将两个字母转换为一个汉字
				// alert(len);
				var _num=num-parseInt(lend/2);//parseInt这个方法 就是len/2转换为整数
				html="还能输入"+"<em>"+_num+"</em>"+"字";
				$(_obj_Lnum).html(html);
				if(lend>opts.obj_Maxnum){
					html="已经超出"+"<em>"+(-_num)+"</em>"+"字";
					$(_obj_Lnum).html(html);
					$(_obj_Lnum).find("em").css("color","#C30");									
				}
				else{					
					// 移除css样式
					$(obj_Lnum).find("em").removeAttr("style");
				}
			});
		});
		
	});
}