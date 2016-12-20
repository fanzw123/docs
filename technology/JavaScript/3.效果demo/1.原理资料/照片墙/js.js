window.onload = function () {
	var oUl = document.getElementById('ul1');
	var ali = oUl.getElementsByTagName('li');
	var aPos = new Array();//储存每张图片的位置
	var iMinZindex = 2;			//图层zIndex
	var i = 0;
	
	//布局转换(文档流->定位流)
	for (i=0;i<ali.length;i++) {	//存储位置
		aPos[i] = { 
						left : ali[i].offsetLeft,
						top : ali[i].offsetTop		
						}
	}
	for (i=0;i<ali.length;i++) {	//设置位置
		ali[i].style.position = 'absolute';
		ali[i].style .margin = '0';
		ali[i].style.left = aPos[i].left + 'px';
		ali[i].style.top = aPos[i].top + 'px';	
		ali[i].index = i;		//加索引，用于指定身份
	}
	
	//加事件
 	for (i=0;i<ali.length;i++) {
		setDrag(ali[i]);
	}
	

	//拖拽事件
	function setDrag(obj) {
		var scrollx = scroll('x');	//滚轮距离顶部的位置
		var scrolly = scroll('y');	//滚轮距离顶部的位置
	
		//鼠标按下
		obj.onmousedown = function (ev) {		
			clearInterval(obj.timer);
			obj.style.zIndex = iMinZindex++;//每次点击都累加
			var oEvent = ev || event;
			//Event.clientX与oEvent.clientY，当前可视区窗口的x与y轴
			var disX = oEvent.clientX + scrollx - obj.offsetLeft;
			var disY = oEvent.clientY + scrolly - obj.offsetTop;
			
			//鼠标移动
			obj.onmousemove = function (ev) {	
				var oEvent = ev || event;
				obj.style.left = oEvent.clientX + scrollx - disX + 'px';
				obj.style.top = oEvent.clientY + scrolly - disY + 'px';			
				
				//清空样式
				for (i=0;i<ali.length;i++) {		
					ali[i].className = '';			
				}
				
				//碰撞检测
				var oNear = minObj(obj,ali);		
				 if (oNear) {	//如果碰上了，并且是最小的那个，加上样式
				 	oNear.className = 'active';
				 }  
			};
			
			//鼠标抬起
			obj.onmouseup = function () {
				var oNear = minObj(obj,ali);	//碰撞检测
				if (oNear) {//碰上了
				 
				 	//互换位置												
					$(obj).animate(aPos[oNear.index]);		
					$(oNear).animate(aPos[obj.index]);
					
					//互换索引位置
					var box;		
					box = obj.index;
					obj.index = oNear.index;
					oNear.index = box;
						
				} else { //没有碰上
				
					//回到原来位置
					$(obj).animate(aPos[obj.index]);			
				}
				//清空对象
				obj.onmousemove = null;
				obj.onmouseup = null;	
				obj.releaseCapture();
			};
			
	 
			obj.setCapture();	//时间
			return false; 
		};
		
		
	}	
	
	
	
	
	
	
};