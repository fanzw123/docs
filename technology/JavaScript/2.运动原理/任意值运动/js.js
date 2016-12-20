//获取对象当前样式（计算后的CSS样式），(IE、FF兼容模式)。
function getStyle(obj,attr) {//对象，属性
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj,false)[attr];
	} 
}


//触发对象
window.onload = function() {
	var oDiv = document.getElementsByTagName('div');
	for (var i=0;i<oDiv.length;i++) {
		//对象自定义属性值：用来保存对象本身唯一属性
		oDiv[i].timer = null;		
		
		//对象独立事件			
		oDiv[i].onmouseover = function () {
			startMove(this,300,'width',8);	//this表示指本对象：oDiv[i]
		};
		oDiv[i].onmouseout = function () {
			startMove(this,100,'height',8);
		};
	}
};


//运动框架
function startMove(oBject,iTarget,attr,num) {

	clearInterval(oBject.timer);	//关闭对象时间函数
	oBject.timer= setInterval(function(){		//设置对象时钟
		var iCur = parseInt(getStyle(oBject,attr));	//获取对象当前CSS样式
		var iSpeed = (iTarget - iCur) / num;
		iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if (iCur == iTarget)	{
			clearInterval(oBject.timer);
		} else {
			oBject.style[attr] = iCur+iSpeed+'px';
		}
	},30);
}