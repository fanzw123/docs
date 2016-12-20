window.onload = function() {
	
	var oUl = document.getElementById('ul1');
	var aLi = oUl.getElementsByTagName('li');
	var oBg = aLi[aLi.length-1];
	var i = '';
	
	for (i=0;i<aLi.length-1;i++) {	//事件
		aLi[i].onmouseover = function() {
			
			startMove(oBg,this.offsetLeft);
		};
	}
	
	
	
}; 


function startMove(obj,iTarget) {//对象，目标值
var ot = document.getElementsByTagName('textarea')[0];
	var iSpeed = 0;
	var left = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
	//1.计算运动值公式
		//运动变化值 iSpeed += (iTarget - obj.offsetLeft) /5;	
		if (obj.offsetLeft < iTarget) {//小于目标值，递增
			//不断增加运动速度 ： 速度 += 目标点 - 对象当前位置 / 5
			iSpeed += (iTarget - obj.offsetLeft) /5;	
			ot.value = iSpeed+'\n';
		} else {//大于目标值做递减
			//不断减小运动速度 ： 速度 -= 当前对象位置 - 目标值 / 5
			iSpeed -= (obj.offsetLeft - iTarget) /5;	
		}
		iSpeed *= 0.7;	//(乘以一个小于1的数，会越来越小)，以此计算运动产生的摩擦力
		
		left +=iSpeed;	//改变位置
		
 	//2.改变样式	
 		//当速度最小  &&  距离目标值最小
		if (Math.abs(iSpeed) <1 && Math.abs(iTarget - left) < 1) {
			clearInterval(obj.timer);		//关闭定时器
			obj.style.left = iTarget;		//矫正
		} else {
			obj.style.left = left+ 'px';
		}	
	},30);
}