/**
 * 放大图
 */
var xxx = function(){	
	var oDiv = $('#div1')[0];					//外层DIV	
	var oFloat = $('.float_layer')[0]; 		//浮动层
	var oMark = $('.mark')[0]; 				//小图遮罩层
	var oBig = $('.big_pic')[0]; 				//大图区块
	var oSmall = $('.small_pic')[0]; 			//小图
	var oImg = $('div.big_pic img')[0];		 //大图
	
	oMark.onmouseover = function(){
		oFloat.style.display = 'block';
		oBig.style.display = 'block';
		
	};
	oMark.onmouseout = function(){
		oFloat.style.display = 'none';
		oBig.style.display = 'none';
	};
	
	oMark.onmousemove = function(ev){
		var oEvent = ev || evevt;
		var width = oFloat.offsetWidth / 2;
		var height = oFloat.offsetHeight / 2;
		var l = oEvent.clientX - oDiv.offsetLeft - oSmall.offsetLeft - width;
		var t = oEvent.clientY - oDiv.offsetTop - oSmall.offsetTop - height;
		
		if (l < 0) {
			l = 0;
		}
		else 
			if (l > oMark.offsetWidth - oFloat.offsetWidth) {
				l = oMark.offsetWidth - oFloat.offsetWidth;
			}
		if (t < 0) {
			t = 0;
		}
		else 
			if (t > oMark.offsetHeight - oFloat.offsetHeight) {
				t = oMark.offsetHeight - oFloat.offsetHeight;
			}
		
		oFloat.style.left = l + 'px'; //区块左上角位置x
		oFloat.style.top = t + 'px'; //区块左上角位置y
		// 										div可以移动到的最大位置	
		//计算比例	div当前位置 / （区块总宽 - div本身的宽度）
		var imgleft = l / (oMark.offsetWidth - oFloat.offsetWidth);
		var imgtop = t / (oMark.offsetHeight - oFloat.offsetHeight);
		
		//-比例 * 大图的长度 - 区块的长度
		oImg.style.left = -imgleft * (oImg.offsetWidth - oBig.offsetWidth) + 'px';
		oImg.style.top = -imgtop * (oImg.offsetHeight - oBig.offsetHeight) + 'px';
		//document.title = -imgleft * (oImg.offsetWidth - oBig.offsetWidth);
	};
}	

