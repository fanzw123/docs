//所有标签对象中，取得特定的class名
function getByClass(oParent, sClass) {	//对象节点,className
	var aEle=document.getElementsByTagName('*');	//选取所有标签对象
	var aResult=[];	//数组，保存class名
	for(var i=0;i<aEle.length;i++){				//遍历所有标签对象
		if(aEle[i].className==sClass) {			//如果标签中含有选定的class名
			aResult.push(aEle[i]);					//把class=规定值，的标签对象放入数组中
		}
	}
	return aResult;//对象返回数组
}



//获取对象当前行间样式（计算后的CSS样式），(IE、FF兼容模式)。
//返回字符串
function getStyle(obj,attr) {//对象，属性
	if (obj.currentStyle) {
		return obj.currentStyle[attr];	
	} else {
		return getComputedStyle(obj,false)[attr];
	} 
}


//运动框架
function startMove(oBject,attr,iTarget,fn) {

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
		
		//CSS样式属性改变值幅度  
		//速度 = (目标距离 - 对象当前位置) / 码数  
		var iSpeed = (iTarget - iCur) / 7;	
		//把+-小数取整
		iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		//改变对象行间样式
		if (iCur == iTarget)	{//当前属性值与目标属性值相同
			clearInterval(oBject.timer);	//结束执行
			if (fn) {
				fn();
			}
		} else {
			switch (attr) {		
				case 'opacity':
					//对象行间样式 = 对象当前样式+速度
					oBject.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';		//IE模式下透明度
					oBject.style.opacity = (iCur+iSpeed) / 100;						
					break;
				default:
					//对象行间样式 = 对象当前样式+速度
					oBject.style[attr] = iCur+iSpeed+'px';	
			}
			
		}
	},30);
}