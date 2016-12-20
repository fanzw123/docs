window.onload = function () {

	var oUl = document.getElementById('ul');
	//var oLi = oUl.getElementsByTagName('li');
	var img = oUl.getElementsByTagName('img');
	var oText = document.getElementById('text');
	var i = '';
	var iNowZend=2;		//图片层次
	
	//第一个循环，获得Left和Top值
	for (i=0;i<img.length;i++) {	
		img[i].style.left = img[i].offsetLeft+'px';
		img[i].style.top = img[i].offsetTop+'px';	
	}
	//第二个循环，为每个对象都加上绝对定位
	for (i=0;i<img.length;i++) {	
		img[i].style.position = 'absolute';
		img[i].style.margin = '0px';
	}		
	
	//运动事件
	for (i=0;i<img.length;i++) {
		img[i].index = i;
		img[i].onmouseover = function () {
			this.style.zIndex = iNowZend;
			startMove(this,{'width':200,'height':200,'marginLeft':-50,'marginTop':-50});	
			oText.value = this.index;
		}
	}
	for (i=0;i<img.length;i++) {
		 img[i].onmouseout = function () {
			this.style.zIndex = '';
			startMove(this,{'width':100,'height':100,'marginLeft':0,'marginTop':0});
		}
	}


	

};