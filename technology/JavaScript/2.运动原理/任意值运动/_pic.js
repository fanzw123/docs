window.onload = function() {
	var oDiv = document.getElementById('div1');
	oDiv.onmouseover = function () {
		startMove(oDiv,'opacity',100,8);
	};
	oDiv.onmouseout = function () {
		startMove(oDiv,'opacity',30,8);
	};
};



//获取对象当前样式（计算后的CSS样式），(IE、FF兼容模式)。
function getStyle(obj,attr) {//对象，属性
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj,false)[attr];
	} 
}


//运动框架
function startMove(oBject,attr,iTarget,num) {

	clearInterval(oBject.timer);					//关闭对象时间函数
	oBject.timer= setInterval(function(){		//设置对象时钟
		
		//获取对象当前计算过后的CSS样式中的某一属性值。
		var iCur = '';	//转换样式string为number
		switch (attr) {	
			case 'opacity':
				//计算机对小数处理，会出现各种问题，比如不能整除的数，会出现bug，所有，尽量用整数代替小数
				iCur = parseInt(parseFloat(getStyle(oBject,attr))*100) //获取对象当前CSS样式中某一属性的值(取小数)	
				break;
			default:
				iCur = parseInt(getStyle(oBject,attr));	//获取对象当前CSS样式中某一属性的值(取整)
		}
		
		//CSS样式属性改变值幅度    速度 = (目标距离 - 对象当前位置) / 码数
		var iSpeed = (iTarget - iCur) / num;	
		iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);//取整数
		
		//Div样式改变
		if (iCur == iTarget)	{
			clearInterval(oBject.timer);
		} else {
			switch (attr) {	
				case 'opacity':
					oBject.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';	
					oBject.style.opacity = (iCur+iSpeed) / 100;	
					break;
				default:
					//对象行间样式 = 对象当前样式+速度
					oBject.style[attr] = iCur+iSpeed+'px';	
			}
			
		}
	},30);
}