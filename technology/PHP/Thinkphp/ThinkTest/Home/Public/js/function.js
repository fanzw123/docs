//js函数库

/*格式化数字 (1)
 * @ s  num		数字参数
 * @ n  num		保留小数位数
 * return 			
 */
function setNum (s, n) {
 	n = n > 0 && n <= 20 ? n : 2;  
  	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
  	var l = s.split(".")[0].split("").reverse(),  
  	r = s.split(".")[1];  
  	t = "";  
  	for(i = 0; i < l.length; i ++ )  {  
    	t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
  	}  
  	return t.split("").reverse().join("") + "." + r;  
 }

 /* 格式化数字(可以对小数进行四舍五入) (2)
 * @ num 数字
 * @ pattern ：
 * 用法:
 * formatNumber(12345.999,'#,##0.00'); 	
 * formatNumber(12345.999,'#,##0.##'); 
 * formatNumber(123,'000000');
 */
function formatNumber(num,pattern){  
  var strarr = num?num.toString().split('.'):['0'];  
  var fmtarr = pattern?pattern.split('.'):[''];  
  var retstr='';  
  // 整数部分  
  var str = strarr[0];  
  var fmt = fmtarr[0];  
  var i = str.length-1;    
  var comma = false;  
  for(var f=fmt.length-1;f>=0;f--){  
    switch(fmt.substr(f,1)){  
      case '#':  
        if(i>=0 ) retstr = str.substr(i--,1) + retstr;  
        break;  
      case '0':  
        if(i>=0) retstr = str.substr(i--,1) + retstr;  
        else retstr = '0' + retstr;  
        break;  
      case ',':  
        comma = true;  
        retstr=','+retstr;  
        break;  
    }  
  }  
  if(i>=0){  
    if(comma){  
      var l = str.length;  
      for(;i>=0;i--){  
        retstr = str.substr(i,1) + retstr;  
        if(i>0 && ((l-i)%3)==0) retstr = ',' + retstr;   
      }  
    }  
    else retstr = str.substr(0,i+1) + retstr;  
  }  
  
  retstr = retstr+'.';  
  // 处理小数部分  
  str=strarr.length>1?strarr[1]:'';  
  fmt=fmtarr.length>1?fmtarr[1]:'';  
  i=0;  
  for(var f=0;f<fmt.length;f++){  
    switch(fmt.substr(f,1)){  
      case '#':  
        if(i<str.length) retstr+=str.substr(i++,1);  
        break;  
      case '0':  
        if(i<str.length) retstr+= str.substr(i++,1);  
        else retstr+='0';  
        break;  
    }  
  }  
  return retstr.replace(/^,+/,'').replace(/\.$/,'');  
}  



/*把有，分隔符的数字，还原成纯数字
 * @ s	 str 	字符串
 * return num 数字
 */
function rmoney(s)  
{  
   return parseFloat(s.replace(/[^\d\.-]/g, ""));  
} 



//获取对象CSS样式
function getStyle(obj,attr) {//对象，属性
	if (obj.currentStyle) {
		return obj.currentStyle[attr];	//IE模式
	} else {
		return getComputedStyle(obj,false)[attr];//FF模式
	} 
}

//事件绑定
function myAddEvent(obj,sEv,fn) {//对象,
	if (obj.attachEvent) { //IE 下 (ie下有bug会把绑定事件的对象this指针指向window)
		obj.attachEvent('on'+sEv,function() {
			//调用fn函数，并且把这个函数指定给传入的对象
			if (false == fn.call(obj)) {
				event.cancelBubble = true;	//防止事件冒泡
				return false;						//阻止浏览器默认事件
			}
				
		})	;
	} else {	//FF	下				  	
		obj.addEventListener(sEv,function (ev) {
			if (false == fn.call(obj,ev)) {
				ev.cancelBubble = true;			//防止事件冒泡
				ev.preventDefault();//FF事件绑定中  阻止浏览器默认事件
			}
		},false);
	}
}

//把数组二添加到数组一中
 function appendArr(arr1,arr2) {
 	var i = null;
 	for (i=0;i<arr2.length;i++) {
 		arr1.push(arr2[i]);
 	}
 }

//父级对象下，通过class选取对象
function getByClass(oParent,sClass) {//父级,className
	var aEle = oParent.getElementsByTagName('*');	//选取父级下所有元素
	var aResult = new Array();
	
	var re = new RegExp('\\b'+sClass+'\\b','i');	//匹配字符是否为独立单词

	for (var i=0;i<aEle.length;i++) {
		//如：box 在  box tab  中，正则匹配到，并且是个独立的单词
		if (re.test(aEle[i].className)) {//匹配
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

//获取同级元素的序号
function getIndex(obj) {
	//			  对象.      父级.           子级
	var all = obj.parentNode.children;		//对象同级的所有元素
	var i = null;
	for(i=0;i<all.length;i++) {
		if (all[i] == obj) {	//如果找到和自己一样的
			return i;
		}
	}	
	return null;
}


//碰撞检测九宫格	//obj1碰到obj2，返回true,反之false
function detection (obj1,obj2) {		//对象1，对象2
		//对象1九宫格
		var l1 = obj1.offsetLeft;											//左
		var r1 = obj1.offsetLeft + obj1.offsetWidth;			//右
		var t1 = obj1.offsetTop;											//上
		var b1 = obj1.offsetTop + obj1.offsetHeight;		//下
		//对象2九宫格
		var l2 = obj2.offsetLeft;											//左
		var r2 = obj2.offsetLeft + obj2.offsetWidth;			//右
		var t2 = obj2.offsetTop;											//上
		var b2 = obj2.offsetTop + obj2.offsetHeight;		//下
		
		//检测碰撞
		if (l1 > r2 || r1 < l2 || t1 > b2 ||  b1 < t2) {	//没有碰上
			return false;	
		} else {		//碰上了
			return true;
		}
}


//计算对象碰到物体后，对象离物体最近的那个 .return 被碰撞物体的obj
function minObj(obj,obj2) {	//对象，对象数组
		var i =0;
		var iMin = 999999999;				//最小距离初始值
		var iMinIndex = null;				//最小距离对象索引值
	
		//计算对象与物体距离最小的物体
		for (i=0;i<obj2.length;i++) {		
			if (obj == obj2[i]) continue;
			if (detection(obj,obj2[i])) {						//对象与指定物体碰上后	
			var count = getCount(obj,obj2[i]);			//计算对象与碰撞物体的距离
				if (count < iMin) {								//找出对象与碰撞物体，距离最近的
					iMin = count;											
					iMinIndex = i;							//把最近物体的在数组所在位置，放入变量中
				}	
			}
		}
		
		//如果找到，返回距离最小物体的对象
		if (iMinIndex != null) {
			return obj2[iMinIndex];
		} else {
			return null;
		}
}


//计算对象obj1到obj2之间的距离，(勾股定律)	//返回num
function getCount(obj1,obj2) {	//对象1，对象二
	var a = obj1.offsetLeft - obj2.offsetLeft;
	var b = obj1.offsetTop - obj2.offsetTop;
	return Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
		
}


//滚动条(可视区)，距离页面顶部的距离
function scroll(string) {
	switch (string) {
		case 'x' ://下边滚动条
			return document.documentElement.scrollLeft || document.body.scrollLeft;
			break;
		case 'y' ://有边滚动条
			return document.documentElement.scrollTop || document.body.scrollTop;
			break;															 
	}
}


//可视区窗口大小
function visual (string) {
	switch (string) {
		case 'w' ://可视区长度
			return document.documentElement.clientWidth;
			break;
		case 'h' ://可视区高度
			return  document.documentElement.clientHeight;
			break;
	}	
}
