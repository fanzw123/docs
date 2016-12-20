//面向对象
$ (function () {
	$(document).bind('mousemove',function (ev) {	//发生事件的对象方法里传入时间对象
			var oEvent = ev || event;
			var oDiv = document.getElementsByTagName('div')[0].offsetTop;
			$('img').apple(oEvent,0,oDiv);
	});	
});


//面向过程

//window.onload = function () {
//	
//	document.onmousemove = function(ev) {
//		
//		var oEvent = ev || event;
//		document.title = 'x:' + oEvent.clientX + 'y:' + oEvent.clientY;
//		var aImg = document.getElementsByTagName('img');
//		var aTex = document.getElementsByTagName('input');
//		var oDiv = document.getElementsByTagName('div')[0];
//		var i = null;
//		 
//		 for (i=0;i<aImg.length;i++) {
//		 	//图片中心，距离网页边界的位置
//		 	var x = aImg[i].offsetLeft + (aImg[i].offsetWidth /2);	
//		 	var y = aImg[i].offsetTop + oDiv.offsetTop + (aImg[i].offsetHeight /2);;
//
//		 	//求出鼠标坐标到图片坐标的长度
//		 	var a = x - oEvent.clientX;//图片坐标x - 鼠标的坐标x
//		 	var b = y - oEvent.clientY;//图片坐标y - 鼠标的坐标y
//		 	
//		 	//var zzz= Math.pow(-10,2);	//求出10的二次方(幂)，为多少。结果为+- 100 
//		 	//Math.sqrt(36);		//计算数的平方根,可以有几次方
//		 	var c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));	//数据距离图片中心的位置
//		 	
//		 	//除以任意数，取得百分比 。
//		 	var scale = 1- (c / 100);		
//		 	
//		 	if (scale < 0.5) scale = 0.5;	//限制比例
//		 	
//		 	aImg[i].style.width = scale * 128 + 'px'; 	//设置图像宽度倍数
//		 	
//		 	aTex[i].value = scale.toFixed(2);
//		 	
//		 } 	
//	}
//
//};
//
