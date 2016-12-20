window.onload = function () {	var start = document.getElementById('start');	start.onclick = function() {		startMove(300);	};};function startMove(iTarget) {	var timer = null;		var oDiv = document.getElementById('div1');		clearInterval(timer)	;								//关闭运动函数	timer = setInterval(function () {				//计时器运动开始		//运动速度 = (最终位置- 当前区块位置) / 7 	这里除下去总有一次会变成-0.xxx或者+0.xxxx  再被函数取整后变成0.则停止运动		var iSpeed = (iTarget - oDiv.offsetLeft) / 7;	 		//速度取整 = 大于0去小数最大数 :  小于0去小数最小数		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);		if (oDiv.offsetLeft == iTarget) {			//停止计时器			clearInterval(timer)	;		} else {			oDiv.style.left = oDiv.offsetLeft+iSpeed+'px';		}			},30);}/*	鼠标拖拽div
window.onload = function() {
	var oDiv = document.getElementById('div1');//div对象
	var disX = 0;//鼠标距离物体左边的距离
	var disY = 0;
	
	//按下时，拖动区块
	oDiv.onmousedown = function (ev) {//DIV对象事件
		 var oEvent = ev || event;
	
		 //鼠标在坐标 - 区块在html实际top和left位置 = 鼠标坐标和区块位置的距离坐标
		 disX = oEvent.clientX-oDiv.offsetLeft;
		 disY = oEvent.clientY-oDiv.offsetTop; 	
		
		//拖动区块
		oDiv.onmousemove = function (ev) {
			var oEvent = ev || event;
			//鼠标坐标 - 鼠标距离区块坐标 = 区块当前坐标
			var x = oEvent.clientX-disX;
			var y = oEvent.clientY-disY;
			//区块溢出限制
			var ksx = document.documentElement.clientWidth;//页面可视区长度	
			if (x < 0) { //x轴
				x = 0;
			} else if (x > ksx - oDiv.offsetWidth) {//可视区长度 - 区块本身长度 = 区块最终能到达的位置
				x = ksx - oDiv.offsetWidth;
			}
				
			if (y < 0) {//y轴
				y = 0;
			} else if (y > ksx - oDiv.offsetHeight) {
				y = oDiv.offsetHeight;
			}
			
			//区块拖拽位置
			oDiv.style.left = x+'px';
			oDiv.style.top = y+'px';
		};
		
		//触发时，结束事件
		oDiv.onmouseup = function () {
			oDiv.onmousemove = null;
			oDiv.onmouseup = null;
		};
		
		return false;//组织浏览器默认行为
	};
};
*/

/* 鼠标跟随div
function getClassName(object,CssName) {
	var css = object.getElementsByTagName('*');
	var arr = [];
	for (var i=0;i<css.length;i++) {
		if (css[i].className == CssName) {
			arr.push(css[i]);
		}
	}

	return arr;	//返回匹配到的Class名，放在数组中
}
window.onload = function() {
	var ul = document.getElementById('ul');
	var classN = getClassName(ul,'text');
	for(var i=0;i<classN.length;i++) {
		classN[i].style.background = 'red';
		classN[i].style.width = '100px';
		classN[i].style.height = '100px';
	}	
};
*/