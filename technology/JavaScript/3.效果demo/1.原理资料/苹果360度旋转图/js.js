window.onload = function (){
	
	var oImg = document.getElementsByTagName('img')[0];		//获取第一张图片地址
	var aImg = document.getElementsByTagName('img');			//获取DOM创建的图片地址
	var oLastImg = oImg;		//保存上一张img对象
	var lastX = 0;					//
	var timer = null;				//定时器
	var iSpeed = 0;				//速度
	var x = 0;//截取点
	
	//创建77个img DOM节点
	for (var i=1;i<77;i++) {
		// (function (参数) {代码}) (传参);
		(function (oNewImg) {
			var oImg = new Image();					//1.预加载图片对象
			oImg.src = 'img/miaov ('+ i +').jpg';	//2.预先加载图片地址
			oImg.onload = function () {				//3.图像预加载完毕后执行
				oNewImg.src = this.src;					//4.执行代码：DOM图像的地址，就是当前图像对象的地址
			};
			oNewImg.style.display = 'none';
			document.body.appendChild(oNewImg);
		}) (document.createElement('img'));
	}
	
	//按下
	document.onmousedown = function (ev) {
		var oEvent = ev || event;
		var disX = oEvent.clientX - x;	
		clearInterval(timer);//关闭定时器
		//移动	
		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			x = oEvent.clientX - disX;	//移动的总数值
				
			//计算平移值
			var l = parseInt(-x / 10);
			if (l>0) {	//如果是正数
				l = l % 77;		//取余	
			} else {		//如果是负数	
				//把 l 乘到正数
				l = l + (-Math.floor(l / 77) * 77);			
			}

			//切换DOM标签
			if (oLastImg != aImg[l]) {	//当最后张和当前张不等时
				oLastImg.style.display = 'none';
				aImg[l].style.display = 'block';
				oLastImg = aImg[l];
			}
			
			//计算运动速度
			iSpeed = x - lastX; //速度 = 拉动的频率 - 上一次拉动的频率
			lastX = x;					//上次的x拉动频率
			
			return false;
		};
		
		//抬起
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		//开启定时器	
			timer = setInterval(function() {
				x += iSpeed;	//x拉动的频率 累加速度	
				if (iSpeed >0) {		
					iSpeed--			
				} else {
					iSpeed++;
				}
				if (iSpeed == 0) {
					clearInterval(timer);
				}	
				
				//计算平移值
				var l = parseInt(-x / 10);
				if (l>0) {	//如果是正数
					l = l % 77;		//取余	
				} else {		//如果是负数	
					//把 l 变成乘到正数
					l = l + (-Math.floor(l / 77) * 77);			
				}
	
				//切换DOM标签
				if (oLastImg != aImg[l]) {	//当最后张和当前张不等时
					oLastImg.style.display = 'none';
					aImg[l].style.display = 'block';
					oLastImg = aImg[l];
				}
				
			},30);
		}
		
		return false;
	};
	
	
	
	
	
	
	
};