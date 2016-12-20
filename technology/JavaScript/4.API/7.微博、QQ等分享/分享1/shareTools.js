/**************************************************************
 @Name : jQuery-shareTools 0.1 开发版
 @author: 红叶
 @date: 2012-11-11
 @QQ: 237420759
 @blog:
 @微博:
 @Description: 这个插件是在别人的基础上改进的，主要是用于自己的www.haojoke.com的。
 			   但是既然写出来了，那我就还是共享下！
			   共同研究，共同进步！
 *************************************************************/ 
 
/*
 * @Description: 分享至
 * @param shar_to 分享至名称
 * @param  strSpace  内容容器
 * @return imageSpace 图片容器
 */
function share_to(share_to,strSpace,imageSpace,myUrl) {
	switch(share_to){
		//分享至新浪微博
		case "sina":
			var param = {
				url:location.href,
				title:getbodyStr(strSpace,share_to), /**分享的文字内容(可选，默认为所在页面的title)*/
				pic:getbodyImage(imageSpace,share_to,myUrl), /**分享图片的路径(可选)*/
				language:'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
				searchPic:'true',
				rnd:new Date().valueOf()
		    }
		  var temp = [];
		  for( var p in param ){
			temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
			
		  }
		  _u='http://v.t.sina.com.cn/share/share.php?' + temp.join('&');
		  window.open( _u,'', 'width=106, height=24, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		  break;
		//分享至腾讯微博
		case "tencent":
			var _url = encodeURIComponent(location.href);
			var _pic = encodeURI(getbodyImage(imageSpace,share_to,myUrl));//（例如：var _pic='图片url1|图片url2|图片url3....）
			var _t =encodeURI(getbodyStr(strSpace,share_to));//标题和描述信息
			var _u = 'http://share.v.t.qq.com/index.php?c=share&a=index&url='+_url+'&appkey=801068415&pic='+_pic+'&assname=haojoke&title='+_t;
			window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
			break;
		//分享至搜狐微博
		case "sohu":
		var f='http://t.sohu.com/third/post.jsp?';
		var u=encodeURIComponent(location.href);
		var tit=encodeURI(getbodyStr(strSpace,share_to));
		var p=['&url=',u,'&title=',tit,'&content=',tit].join('');
		function a()
		{
		if(!window.open([f,p].join(''),'sohu',['toolbar=0,status=0,resizable=1,width=660,height=470,left=',(screen.width-660)/2,',top=',(screen.height-470)/2].join('')))
		u.href=[f,p].join('');
		 }
		
		if(/Firefox/.test(navigator.userAgent))
		setTimeout(a,0);
		else a();
		break;
		//分享至网易微博
		case  "netease":
		(function() {
			var url = 'link=http://www.shareto.com.cn/&source='+ encodeURIComponent(document.location.href) + '&info='+ encodeURIComponent(getbodyStr(strSpace,share_to)) + ' '+ encodeURIComponent(document.location.href);
			window.open('http://t.163.com/article/user/checkLogin.do?'+ url + '&' + new Date().getTime(),'netease',',width=626,height=436,top='+ (screen.height - 436)/ 2+ ',left='+ (screen.width - 626)/ 2+ ', toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no');
		})()
	break;
		//分享至QQ空间
		case "qzone":
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+ encodeURIComponent(document.location+ "&title="+encodeURIComponent(getbodyStr(strSpace,share_to))), 'qzone','toolbar=0,status=0,width=900,height=760,left='+ (screen.width - 900) / 2 + ',top='+ (screen.height - 760) / 2);
	break;
		//分享至豆瓣
		case  "douban":
		void (function() {
			var d = document, e = encodeURIComponent, s1 = window.getSelection, s2 = d.getSelection, s3 = d.selection, s = s1 ? s1(): s2 ? s2() : s3 ? s3.createRange().text : '', r = 'http://www.douban.com/recommend/?url='+ e(d.location.href)+ '&title='+ e(getbodyStr(strSpace,share_to))+ '&sel='+ e(s) + '&v=1', x = function() {
				if (!window.open(r, 'douban','toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=355,left='+ (screen.width - 450) / 2 + ',top='+ (screen.height - 330) / 2))
					location.href = r + '&r=1'
			};
			if (/Firefox/.test(navigator.userAgent)) {setTimeout(x, 0)} else {x()}
		})();
	break;
		//分享至人人网
		case  "renren":
		 void ((function(s, d, e) {
		 if (/renren\.com/.test(d.location))
		 return;
		 var f = 'http://share.renren.com/share/buttonshare.do?link=', u =d.location, l = d.title, p = [e(u), '&title=', e(getbodyStr(strSpace,share_to)) ].join('');
		 function a() {
		 if (!window.open([ f, p ].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width - 626) / 2, ',top=',(s.height - 436) / 2 ].join('')))u.href = [ f, p ].join('');};
		 if (/Firefox/.test(navigator.userAgent))setTimeout(a, 0);else a();
		 })(screen, document, encodeURIComponent));
	break;
		//分享至开心网
		case  "kaixin001":
		window.open('http://www.kaixin001.com/repaste/bshare.php?rtitle='+ encodeURIComponent(getbodyStr(strSpace,share_to)) + '&rurl=' + encodeURIComponent(document.location.href)+ '&from=maxthon','kaixin001','toolbar=no,titlebar=no,status=no,menubar=no,scrollbars=no,location:no,directories:no,width=570,height=350,left='+ (screen.width - 570)/ 2+ ',top='+ (screen.height - 420) / 2);
	break;
		//分享至百度收藏
		case "baidu":
		window.open('http://cang.baidu.com/do/add?it='+ encodeURIComponent(document.title.substring(0, 76))+ '&iu=' + encodeURIComponent(location.href)+ '&fr=ien#nw=1', 'baidu','scrollbars=no,width=600,height=450,status=no,resizable=yes,left='+ (screen.width - 600) / 2 + ',top='+ (screen.height - 450) / 2);
	break;
		//分享至鲜果网
		case  "xianguo":
		void (function() {
			var d = document, e = encodeURIComponent, s1 = window.getSelection, s2 = d.getSelection, s3 = d.selection, s = s1 ? s1(): s2 ? s2() : s3 ? s3.createRange().text : '', r = 'http://xianguo.com/service/submitfav/?link='+ e(d.location.href)+ '&title='+ e(d.title)+ '&notes='
					+ e(s), x = function() {
				if (!window.open(r + '&r=0', 'xgfav','toolbar=0,resizable=1,scrollbars=yes,status=1,width=600,height=450,left='+ (screen.width - 600)/ 2+ ',top='+ (screen.height - 450) / 2))
					location.href = r + '&r=1'
			};
			if (/Firefox/.test(navigator.userAgent)) {setTimeout(x, 0)} else {x()}
		})()
	break;
		//分享至抓虾网
		case  'zhuaxia':
		window.open("http://www.zhuaxia.com/add_channel.php?&url="+ encodeURIComponent(document.location.href))
		break;
		//分享至QQ书签
		case "qqbookleaf":
		window.open('http://shuqian.qq.com/post?from=3&title='+ encodeURIComponent(document.title) + '&uri='+ encodeURIComponent(document.location.href)+ '&jumpback=2&noui=1','favit','width=930,height=470,toolbar=no,menubar=no,location=no,scrollbars=yes,status=yes,resizable=yes,left='+ (screen.width - 930) / 2 + ',top='+ (screen.height - 470) / 2);
		break;
		//分享至雅虎
		case  "yahoo":
		window.open('http://myweb.cn.yahoo.com/popadd.html?url='+ encodeURIComponent(document.location.href)+ '&title=' + encodeURIComponent(document.title),'Yahoo','scrollbars=yes,width=440,height=440,status=yes,resizable=yes,left='+ (screen.width - 440)/ 2+ ',top='+ (screen.height - 440) / 2);
		break;
	}
	return false;
			
}
	
	
/*
 * @Description:获取元素的内容
 * @param strSpace 内容容器ID
 * @param  share_to  分享至
 * @return content  内容
 */
function getbodyStr(strSpace,share_to){
	var content;
	if (typeof(strSpace) == "undefined"){
		return document.title;
	}
	if(document.getElementById(strSpace)!=null){
		content=document.getElementById(strSpace).innerHTML
	}else{	
		content=document.title;
	}
	//去除其中的html标签
	content= delHtmlTag(content);
	//内容过长只截取前127个字符(腾讯可以容纳127个字符)
	if(content.length > 127){
		content= content.substr(0,127)+'...';
	}
	return content;
}


/*
 * @Description: 获取元素的图片(暂时只能获取一张)
 * @param imageSpace 图片容器ID
 * @param  share_to  分享至
 * @return imageurl  图片路径
 */
function getbodyImage(imageSpace,share_to,myUrl){
	var imageurl;
	//如果没有传入图片容器默认为空
	if (typeof(imageSpace) == "undefined"){
		return '';
	}
	//是否传入了多个容器
	var imgArr=imageSpace.split("|");
	for(var i=0;i<imgArr.length;i++){
		if(document.getElementById(imgArr[i])!=null){
			//从图片容器里获取img
			var list=document.getElementById(imgArr[i]).getElementsByTagName("img");
			//如果获取不到子节点的img标签就那么就取当前容器的src
			if(list==null || list.length==0){
				if(i==0){
					imageurl=changeURL(document.getElementById(imgArr[i]).src)+"|";
				}else{
					imageurl +=changeURL(document.getElementById(imgArr[i]).src)+"|";
				}
			}else{
				for (var j = 0; j < list.length; j++) {
					var img=list[j];
					if(j==0){
						imageurl=changeURL(img.src)+"|";
					}else{
						imageurl +=changeURL(img.src)+"|";
					}	
				}
			}
	   }
	}
	//如果照片未获取到就返回空
	if(imageurl==null || (typeof(imageurl)=="undefined")){
		return '';
	}else{
		//腾讯微博允许分享多张图片，但是两张图片名称相同会合并成一张
		if(share_to.toLowerCase()=="tencent"){
			imageurl=imageurl.substr(0,imageurl.length-1);
		}else{
			var arr = imageurl.split('|');
			imageurl=arr[0];
		}
		return imageurl;
	}
}




/*
 * @Description: 去除内容中的的html标记和空格
 * @param str  要分享的内容 
 */
function delHtmlTag(str)
{
	var str=str.replace(/<\/?[^>]*>/gim,"");//去掉所有的html标记	
	var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
	return  result.replace(/\s/g,"");//去除文章中间空格
}


/*
 * @Description: 相对路径替换为绝对路径
 * @param oldURL 截取到的图片原路径
 * @param  myUrl  自己的网站URL 
 */
function changeURL(oldURL,myUrl)
{	
	if(myUrl == "undefined" ||myUrl == null || myUrl == ""){
		return  oldURL;
	}
	var reg = /^.*?images/igm;
	return oldURL.replace(reg,myUrl);
}



/*
 * showIndex：显示图标的坐标
 * liMargin：各个图标之间的间距，以像素为单位
 * bigImg：false是小图标，true是大图标
 * showFont：是否显示 “分享到：” 3个字 true为显示,false为不显示
 * imgUrl：图片放置的路径。 图片名为shareS.png
 */
$.fn.shareTools=function(opt){
		var config={
			showIndex:[0,1,2,3,4,5,6,7,8,9,10,11,12],
			liMargin:15,
			bigImg:false,
			showFont:true,
			imgUrl:'images/',
			share:[{name:'新浪微薄',share_to:'sina'},{name:'腾讯微博',share_to:'tencent'},{name:'搜狐微博',share_to:'sohu'},{name:'网易微博',share_to:'netease'},{name:'Qzone',share_to:'qzone'},{name:'豆瓣',share_to:'douban'},{name:'人人网',share_to:'renren'},{name:'开心网',share_to:'kaixin001'},{name:'百度搜藏',share_to:'baidu'},{name:'鲜果',share_to:'xianguo'},{name:'抓虾',share_to:'zhuaxia'},{name:'QQ书签',share_to:'qqbookleaf'},{name:'雅虎收藏',share_to:'yahoo'}],
			//设置内容容器
			strSpace:({}),
			//设置图片容器
			imageSpace:({})
			
		}
		opt = $.extend(config, opt);
		var imgsize=16; 					//图片大小
		var imgUrl=opt.imgUrl+'shareS.png'; //图片路径=传入的图片路径+图片名称
		var share=opt.share;				//分享
		var showIndex= opt.showIndex; 
		var appkey=opt.appkey;
		var strSpace=opt.strSpace;
		var imageSpace=opt.imageSpace;
		if(opt.bigImg){                     //大图标
			imgsize=32;	
			imgUrl=opt.imgUrl+'share.png'
		};
		
		//拼接展示层
		var htmlString = '<ul style="list-style: none; margin: 0; padding:0;height:'+imgsize+'px;width:';
		
		//是否显示分享到
		if(opt.showFont){
			htmlString+=((imgsize+opt.liMargin)*(showIndex.length)+50)+'px;overflow:hidden;" id="shareTools"><li style="float: left; display: inline; list-style: none; margin: 0; padding: 0;position:relative;width:50px;height:'+imgsize+'px;line-height:'+imgsize+'px;font-size:12px;">分享到：</li>';
		}else{
			htmlString+=(imgsize+opt.liMargin)*(showIndex.length)+'px;overflow:hidden;" id="shareTools">';
		}
		
		//遍历需要显示的分享
		for(var li=0;li<showIndex.length;li++){
			var share_to=share[showIndex[li]].share_to;
			htmlString+='<li style="float: left; display: inline; list-style: none; margin: 0; padding: 0;"><a href="javascript:void(0)" style="width: '+imgsize+'px;overflow:hidden; height: '+imgsize+'px; display: block; margin:0 '+opt.liMargin+'px 0 0; padding: 0; background: transparent url(\''+imgUrl+'\') no-repeat 0 -'+(imgsize)*showIndex[li]+'px" title="分享到'+share[showIndex[li]].name+'" onclick="share_to(\''+share_to+'\',\''+strSpace.spaceId+'\',\''+imageSpace.spaceId+'\',\''+imageSpace.myUrl+'\')"></a></li>'
		}
		
		//结束标签
		htmlString+='</ul>';
		//展示拼装内容
		$(this).html(htmlString);
		$('#shareTools a').hover(function(){
				$(this).css('backgroundPositionX','-'+imgsize+'px')
			},function(){
				$(this).css('backgroundPositionX','0px')
			}
		);
	}