window.onload =function(){
	var oTxt = document.getElementById('text1');
	var oBtn = document.getElementById('btn1');
	var oDiv= document.getElementById('div1');
	

	
	oBtn.onclick = function(){
		//1.任意创建一个对象
		var oChildDiv = document.createElement('div'); 
					
		var allDiv = oDiv.getElementsByTagName('div');		//选取对象数量
	
		oChildDiv.innerHTML = oTxt.value;
		oTxt.value = '';
		
		//2.节点对象插入位置
		if(allDiv.length != '') {//如果不是空
			oDiv.insertBefore(oChildDiv,allDiv[0]);				//在某个位置插入一个对象
		} else {	//如果是空
			oDiv.appendChild(oChildDiv);							//在父标签中插入一个对象
		}
		
		//3.计算高度
		var iHeight = oChildDiv.offsetHeight;		//计算节点对象行间样式高度
		oChildDiv.style.height = 0;							//设置节点对象行间高度为0
		
		//4.运动
		startMove(oChildDiv,{height:iHeight},function () {//展开高度
			startMove(oChildDiv,{'opacity':100});//展开透明度
		});
		
	};
	
	
};