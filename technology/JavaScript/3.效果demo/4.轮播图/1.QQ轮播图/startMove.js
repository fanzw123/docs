//获取，设置CSS样式
function css(obj, attr, value)
{
	if(arguments.length==2)//如果传二个参数，获取样式
	{
		if(attr!='opacity')
		{
			return parseInt(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
		}
		else
		{
			return Math.round(100*parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]));
		}
	}
	else if(arguments.length==3)//
		switch(attr)
		{
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
				break;
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=value+'px';
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}

//运动类型
var MIAOV_MOVE_TYPE={	
	BUFFER: 1,
	FLEX: 2
};

//关闭定时器函数
function stopMove(obj)	
{
	clearInterval(obj.timer);
}

//运动类型
function startMove(obj, oTarget, iType, fnCallBack, fnDuring)//对象,终点,类型,链式运动,运动函数
{
	var fnMove=null;
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	
	switch(iType)	//运动类型
	{
		case MIAOV_MOVE_TYPE.BUFFER:	//如果是1
			fnMove=miaovDoMoveBuffer;		//完美运动框架
			break;
		case MIAOV_MOVE_TYPE.FLEX:		//如果是2
			fnMove=miaovDoMoveFlex;			//弹性运动框架
			break;
	}
	
	//开启运动
	obj.timer=setInterval(function (){
		fnMove(obj, oTarget, fnCallBack, fnDuring);
	}, 30);
}

//完美运动框架
function miaovDoMoveBuffer(obj, oTarget, fnCallBack, fnDuring)//对象,json,
{
	var bStop=true;		//运动停止
	var attr='';				
	var speed=0;			//速度
	var cur=0;				//当前样式
	
	for(attr in oTarget)	//遍历josn
	{
		cur=css(obj, attr);		//获取CSS样式
		if(oTarget[attr]!=cur)	//如果当前值，不是目标值
		{
			bStop=false;
			
			//计算速度
			speed=(oTarget[attr]-cur)/5;		
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			css(obj, attr, cur+speed);//改变对象样式
		}
	}
	
	if(fnDuring)fnDuring.call(obj);	//与定时器一起执行的方法
	
	if(bStop)	//如果到达终点
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);	//链式运动
	}
}


//弹性运动框架
function miaovDoMoveFlex(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;		//当前位置
	
	for(attr in oTarget)
	{
		if(!obj.oSpeed)obj.oSpeed={};	//设置json
		if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
		cur=css(obj, attr);
		//目标位置-当前位置小于1，则够进     ||    当前的速度够小
		if(Math.abs(oTarget[attr]-cur)>=1 || Math.abs(obj.oSpeed[attr])>=1)	
		{
			bStop=false;
			
			obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
			obj.oSpeed[attr]*=0.7;
			
			css(obj, attr, cur+obj.oSpeed[attr]);//改变对象样式
		}
	}
	
	if(fnDuring)fnDuring.call(obj);//与定时器一起执行的方法
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);//链式运动
	}
}