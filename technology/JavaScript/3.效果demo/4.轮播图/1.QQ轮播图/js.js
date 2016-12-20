$(function() {
	
	var aPicLi =	 document.getElementById('pic_list').getElementsByTagName('li');
	var aTxtLi = document.getElementById('text_list').getElementsByTagName('li');
	var aIcoLi = document.getElementById('ico_list').getElementsByTagName('li');
	var oIcoUl = document.getElementById('ico_list').getElementsByTagName('ul')[0];
	var oDiv = document.getElementById('box');

	var oBtnPrev = document.getElementById('btn_prev');	
	var oBtnNext = document.getElementById('btn_next');
	var i = 0;
 	var iNow = 0;				//当前li的缩索引
 	var iNowUlLeft = 0;		//li当前的位置个数
 	
 	oBtnPrev.onclick = function () {
 		if (iNowUlLeft == 0) {	
 			oBtnPrev.className = 'btn';
 			return;
 		} else {
 			iNowUlLeft--;
 			//oIcoUl.style.left = -aIcoLi[0].offsetWidth * iNowUlLeft+ 'px';	
 			startMove(oIcoUl,{'left':-aIcoLi[0].offsetWidth * iNowUlLeft},MIAOV_MOVE_TYPE.BUFFER);
 			oBtnNext.className = 'btn showBtn';	
 		}		
 	};
 	
 	//下一张
 	oBtnNext.onclick = function () {
 		//li 总个数 - 可以显示个数  就限制了iNowUlLeft的最大移动个数
 		if (iNowUlLeft >= aIcoLi.length - 7) {	
 			oBtnNext.className = 'btn';
 			return;
 		} else {
 			iNowUlLeft++;
 			//oIcoUl.style.left = -aIcoLi[0].offsetWidth * iNowUlLeft+ 'px';	
 			startMove(oIcoUl,{'left':-aIcoLi[0].offsetWidth * iNowUlLeft},MIAOV_MOVE_TYPE.BUFFER);
 			oBtnPrev.className = 'btn showBtn';	
 		}
 	};
 	
	//小图事件
	for (i=0;i<aIcoLi.length;i++) {
		aIcoLi[i].index = i;
		aIcoLi[i].onclick = function () {
			
			if (iNow == this.index) return;
			iNow = this.index;
			
			//切换
			tab() ;
		};	
	}
	
	
	//改变样式
	function tab() {
		for (i=0;i<aIcoLi.length;i++) {
				aIcoLi[i].className = '';								//小图
				aPicLi[i].style.filter = 'alpha(opacity:0)';	//大图	IE
				aPicLi[i].style.opacity = 0;							//大图	FF
				stopMove(aPicLi[i]);									
				aTxtLi[i].getElementsByTagName('h2')[0].className = '';	//文字
			}
			aIcoLi[iNow].className = 'active';
			startMove(aPicLi[iNow],{'opacity':100},MIAOV_MOVE_TYPE.BUFFER);
			aTxtLi[iNow].getElementsByTagName('h2')[0].className = 'show';
	}
	
	//自动运动
	function start() {
		iNow++; 
		if (iNow >=aIcoLi.length) iNow = 0;
		
		if (iNow <= 6) {
			iNowUlLeft =iNow;
		} else {
			iNowUlLeft = aIcoLi.length - 7;
		}

		if (iNowUlLeft == 0) {	
 			oBtnPrev.className = 'btn';
 			oBtnNext.className = 'btn showBtn';	
 		} else if (iNow == aIcoLi.length-1){
 			oBtnPrev.className = 'btn showBtn';
 			oBtnNext.className = 'btn';	
 		} else {
 			oBtnPrev.className = 'btn showBtn';
 			oBtnNext.className = 'btn showBtn';		
 		}
		startMove(oIcoUl,{'left':-aIcoLi[0].offsetWidth * iNowUlLeft},MIAOV_MOVE_TYPE.BUFFER);
		tab();
		
	}
	
	
	var timer = setInterval(start,3000);
	
	oDiv.onmouseover = function () {
		clearInterval(timer);
	};
	oDiv.onmouseout = function () {
		timer = setInterval(start,3000);
	};
	
});