window.onload = function() {
	var oDiv = document.getElementsByTagName('div');
	for (var i=0;i<oDiv.length;i++) {
		//对象自定义属性值：用来保存对象本身唯一属性
		oDiv[i].timer = null;		
		
		//对象独立事件			
		oDiv[i].onmouseover = function () {
			startMove(this,300,8);	//this表示指本对象：oDiv[i]
		};
		oDiv[i].onmouseout = function () {
			startMove(this,100,8);
		};
	}
};


 
function startMove(oBject,iTarget,num) {

	var oDiv = oBject;					//区块的对象
	clearInterval(oBject.timer);	//关闭对象时间函数
	oBject.timer= setInterval(function(){		//设置对象时钟
		var iSpeed = (iTarget - oDiv.offsetWidth) / num;
		iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if (oDiv.offsetWidth == iTarget)	{
			clearInterval(oBject.timer);
		} else {
			oDiv.style.width = oDiv.offsetWidth+iSpeed+'px';
		}
	},30);
}