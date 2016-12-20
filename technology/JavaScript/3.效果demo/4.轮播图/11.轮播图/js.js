$(function() {
	//原理思路
	//1.为每个li加入事件，计算li的索引值。点击相应的li改变ul的top
	//2.开启定时器，每个2000执行一次。
	//设置一个变量作为上限，定时器每运行，这个上限加1
	// 当这个上限超过按钮的数量，则把这个上限设为0
	
	
	var aBtn = $('#play').find('ol').find('li');	//返回一个对象
	var oUl = $('#play').find('ul');
	var aLi = oUl.find('li');
	
	var iNow = 0;	//次数
	var timer = null;
	
	//点击
	aBtn.click(function () {
		iNow = $(this).index();	//算出按钮的在同级元素中的位置
		tab();
	});
	
	//运动函数
	 function tab() {
	 	aBtn.attr('className','');	//所有按钮清除样式
	 	//为当前的Dom对象，添加样式
		aBtn.eq (iNow).attr('className','active');
		oUl.animate({top:-150*iNow});//UL运动位置
	 }
	  
	//自动播放
	 function fortab() {
	 	iNow++;
	 	if (iNow  == aBtn.size()) {
	 		iNow = 0;
	 	}
	 	tab();
	 }
	 
	  //自动播放
	 timer = setInterval(fortab,2000);
	 
	 //移入移出开关定时器
	 $('#play').hover(function() {
	 	clearInterval(timer); 	
	 },function() {
	 	timer = setInterval(fortab,2000);
	 });
	 
});