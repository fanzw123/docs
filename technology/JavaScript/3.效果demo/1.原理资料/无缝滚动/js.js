window.onload = function () {
	var oDiv = document.getElementById('div1');
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var aLi  = oUl.getElementsByTagName('li');
	
	var oDiv2 = document.getElementById('diva');
	var oA = oDiv2.getElementsByTagName('a');
	
	var timer = '';//定时器对象
	var iSpeed = 2;//运动速度与方向		
	var i = '';

	oUl.innerHTML += oUl.innerHTML;	//复制ul标签中的子标签
	//UL的长度 = li的当前长度 * li的个数
	oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
	
		function fnMove() {
			//如果ul中的left的像素位置 < -ul总长度的 二分之一
			if (oUl.offsetLeft < -oUl.offsetWidth / 2 ) {
				oUl.style.left = 0;								//为UL重新定位
			} else if (oUl.offsetLeft >0) {
				var left = -oUl.offsetWidth/2;
				oUl.style.left = left+ 'px';
			} 
			oUl.style.left = oUl.offsetLeft + iSpeed +'px';//改变ul位置
		}	
	
	timer = setInterval(fnMove,30);//开启定时器

	
	//左右移动
	oA[0].onclick = function () {
		iSpeed = 0;
	}
	oA[1].onclick = function () {
		iSpeed = 2;
	}
	
	//定时器开关
	oDiv.onmouseover = function () {
		clearInterval(timer);					//关闭
	}
	oDiv.onmouseout = function () {
		timer = setInterval(fnMove,30);//再开启
	}
}