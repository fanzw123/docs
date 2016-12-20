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



//获取对象当前行间样式（计算后的CSS样式），返回字符串
function getStyle(obj,attr) {//对象，属性
	if (obj.currentStyle) {
		return obj.currentStyle[attr];	//IE模式
	} else {
		return getComputedStyle(obj,false)[attr];//FF模式
	} 
}


//完美运动框架
function startMove(oBject,json,fn) {	//对象,json数组,执行函数
	var oText = document.getElementById('text');
	if(oBject.timer) clearInterval(oBject.timer);	//如果定时器开启则关闭
	
	oBject.timer= setInterval(function(){		//每隔30毫秒执行一次
		var oStop = true;//		所用运动结束，设置为true
		
	//1.取当前值
		for (var key in json) {	//同时改变json数组中的所有值
			//获取对象当前计算过后的CSS样式中的某一属性值。
			var iCur = '';	//转换样式string为number
			switch (key) {	
				case 'opacity':
					//计算机对小数处理，会出现各种问题，比如不能整除的数，会出现bug，所有，尽量用整数代替小数
					iCur = parseInt(parseFloat(getStyle(oBject,key))*100); //取整
					//oText.value += iCur+'\n';
					break;
				case 'background':	
					iCur = json[key];
					break;
				default:
					iCur = parseInt(getStyle(oBject,key));	//获取对象当前CSS行间样式中属性的值(取整)
			}
			
	//2.算速度
			//CSS样式属性改变值幅度  
			//速度 = (目标距离 - 对象当前位置) / 码数  
			var iSpeed = (json[key] - iCur) / 7;				
			//把+-小数取整
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			
	//3.检测停止。
			if (iCur != json[key]) {	//对象当前值不是目标值
				oStop=false;			//设置为false
			}
			
			//改变对象行间样式
			switch (key) {		
				case 'opacity':	//相片透明度
					//FF下
					oBject.style.opacity = (iCur+iSpeed) / 100;		
					//oBject.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';	//IE模式				
					break;			
				case 'background'://背景
					oBject.style[key] = json[key];		
					break;
				default:	//数字样式
					//对象行间样式 = 对象当前样式+速度
					oBject.style[key] = iCur+iSpeed+'px';					
			}
		}

		//循环结束后，才关闭定时器
		if(oStop) {	
			clearInterval(oBject.timer);	//结束执行
			//alert('');
			if (fn) {	//链式运动
				fn();
			}
		}
				
	},30);
}