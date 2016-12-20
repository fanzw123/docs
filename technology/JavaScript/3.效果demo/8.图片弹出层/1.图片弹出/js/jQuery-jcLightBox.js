/*
 * jQuery - jcLightBox v1.12
 * Copyright(c) 2012 by Adam’
 * Date: 2012-09-01
 * qq : 1741498
 */
;(function($){
	$.fn.jcLightBox = function(options) {
		var defaults = {
			speed : 200,
			listSpeed : 200,
			setLood : {
				path : "img/loading.gif",
				width : 32,
				height : 32
			},
			setModal : {
				bgColor : "#000",
				opacity : .6
			},
			state : "fade"
		};
		var options = $.extend(defaults,options);
		return this.each(function(i,t) {
			var $this = $(this),
			    _self = this,
				$RelList = $("a[rel]",$this),
				$TitleList = $("a[title]",$this),
				$TitleGroup = $("a[group]",$this),
				$body = $("body"),
				$document = $(document),
				$window = $(window),
				nWinWidth = $window.width(),
				nWinHeight = $window.height(),
				nLoadPath = options.setLood.path,
				nLoadWidth = options.setLood.width,
				nLoadHeight = options.setLood.height,
				oloadDom = "<img src= \""+ nLoadPath + "\" height=\"" +nLoadHeight+ "\" width=\""+ nLoadWidth+"\"/>",
			    sBoxWrap = "<div id=\"jc-Mod\" style=\"background:"+options.setModal.bgColor+";display:none;height:"+$document.height()+"px;width:"+nWinWidth+"px;\"></div><div id=\"jc-Box\" style=\"position:fixed;width:"+ nLoadWidth +"px;height:"+ nLoadHeight +"px;display:none;\"><div id=\"box-close\" style=\"display:none;\"><a></a></div><div id=\"box-top\"> <div id=\"box-top-left\"></div><div id=\"box-top-right\"></div></div><div id=\"box-pn\" style=\"display:none;\"><div id=\"box-prev\"><a></a></div><div id=\"box-next\"><a></a></div></div><div id=\"box-cen\"><div id=\"box-cen-right\"><div id=\"box-cen-img\">{Boxtitle}</div></div> </div><div id=\"box-btm\"><div id=\"box-btm-left\"></div><div id=\"box-btm-right\"></div></div><div id=\"box-text\" style=\"display:none;\"><samp></samp><div id=\"box-text-left\"></div><div id=\"box-text-cen\">{Boxtitle}</div><div id=\"box-text-right\"></div></div></div>",
				fnAddBox = function(){
					if(!($body.find("#jc-Mod").is("div")&&$body.find("#jc-Box").is("div"))) {
						$body.append(sBoxWrap);
						return false;
					};
		     	},
				fnBoxMode = function(){
					this.view = viewMode;
					this.title = relMode;
				}, 
				fnState = function(){
					this.curr = currState;
					this.fade = fadeState;
					this.top = topState;
				},
				//获取预览图信息列表
				arrListInfo = fnReleach($RelList);
				
			fnState.prototype.SelectState = function(state,width,height){
				return this[state](width,height);
			};
			fnBoxMode.prototype.SelectBoxMode = function(mode,Dom,title){
				this[mode](Dom,title);
			};
			//新建元素
			fnAddBox();
			var $modal = $("#jc-Mod"),
			    $box = $("#jc-Box"),
				$boxCon = $("#box-cen-img"),
				$boxTextWrap = $("#box-text"),
				$boxText = $("#box-text-cen"),
				$closeBtn = $("#box-close"),
				$opera = $("#box-pn"),
				$boxPrev = $("#box-prev"),
				$boxNext = $("#box-next");
			//效果初始化
			var currMode = new fnBoxMode(),
			    arrImgObj = [];
			for(var h in arrListInfo){
				//匹配列表模式
				arrListInfo[h][1] == undefined?thisMode="view":thisMode="title";
				currMode.SelectBoxMode(thisMode,$RelList.eq(h),arrListInfo[h][1]);
				//创建所有Image()
				if(arrListInfo[h][1] == undefined){
					arrListInfo[h][1] = "";	
				};
				var oImg = new Image();
				oImg.src = arrListInfo[h][0];
				oImg.title = arrListInfo[h][1];
				oImg.width = arrListInfo[h][2];
				oImg.height = arrListInfo[h][3];
				arrImgObj.push(oImg);
			};
			//图片列表点击事件
			var fnCurrState = new fnState();
			$RelList.unbind("click").bind("click",function(){
				var othis = $(this),
					_idx = $RelList.index(othis),
				    othisGroup = othis.attr("group"),
					$thisGroup = $("a[group=\"" + othisGroup +"\"]",$this),
					arrLoadPos = fnCurrState.SelectState(options.state,nLoadWidth,nLoadHeight);
					arrTmpGroup = [];
				for(var n = 0; n < $thisGroup.length; n++ ){
					arrTmpGroup.push($RelList.index($thisGroup.eq(n)))
				};
				var TmpPos = 0;
				for(var a in arrTmpGroup){
					if(arrTmpGroup[a] == _idx){
						TmpPos = a;
					};
				};
				fnLoadImg(oloadDom,arrLoadPos,_idx,function(){
					var arrPos = fnCurrState.SelectState(options.state,this.width,this.height);
					fnSuccess(arrPos,$(this),this.title,$thisGroup.length);
				});
				//左右按钮
				$boxPrev.unbind("click").bind("click",function(){
					if(TmpPos > 0){
						TmpPos--;
						fnOpera(arrTmpGroup,TmpPos,arrImgObj,arrLoadPos);
					} else {
						return false;	
					};
				});
				$boxNext.unbind("click").bind("click",function(){
					if(arrTmpGroup.length-1 > TmpPos){
						TmpPos++;
						fnOpera(arrTmpGroup,TmpPos,arrImgObj,arrLoadPos);
					} else {
						return false;	
					};
				});
				return false;
			});
			//左右按钮切换
			function fnOpera(groupArr,Pos,objArr,loadpos){
				if(groupArr[Pos]!=undefined){
					fnLoadImg(oloadDom,loadpos,groupArr[Pos],function(){
						var arrPos = fnCurrState.SelectState(options.state,this.width,this.height);
						$boxCon.html("")
						       .animate({ "height":arrPos[3]
										},options.speed,function(){
											var oimg = objArr[groupArr[Pos]];
											//console.log(oimg)
											$(this).html(oimg).find("img").fadeTo(0,0);
										});
						$box.animate({"width":arrPos[2],
									  "height":arrPos[3],
									  "left":arrPos[1],
									  "top":arrPos[0]
									 },options.speed,function(){
										$boxCon.find("img").fadeTo(options.speed,1);	
										$closeBtn.fadeIn(options.speed);
										if(groupArr.length){
											$opera.fadeIn(options.speed);
										};
										if(objArr[groupArr[Pos]].title!=""){
											$boxText.text(objArr[groupArr[Pos]].title);
											var textWidth = $boxTextWrap.width();
											$boxTextWrap.css({"left":(arrPos[2]-textWidth)/2,"top": arrPos[3]+50}).fadeIn(options.speed);
										};
									 });
					});
				};
				return false;
			};
			//预览图加载完毕位置
			function fnSuccess(size,$img,title,groupBool){
				$boxCon.html("").animate({
					"height":size[3]
				},options.speed,function(){
					$(this).html($img).find("img").fadeTo(0,0);
				});
				$box.animate({"width":size[2],
							  "height":size[3],
							  "left":size[1],
							  "top":size[0]
							 },options.speed,function(){
								$boxCon.find("img").fadeTo(options.speed,1);
								$closeBtn.fadeIn(options.speed);
								if(groupBool){
									$opera.fadeIn(options.speed);
								};
								if(title!=""){
									$boxText.text(title);
									var textWidth = $boxTextWrap.width();
									$boxTextWrap.css({"left":(size[2]-textWidth)/2,"top": size[3]+50}).fadeIn(options.speed);
								};
							 });
			};
			//关闭预览图
			$closeBtn.bind("click",function(){
				closeBox($box);
				setTimeout(function(){
					closeBox($modal);	
				},options.speed);
			});
			$modal.bind("click",function(){
				setTimeout(function(){
					closeBox($box);
					setTimeout(function(){
						closeBox($modal);	
					},options.speed);
				},options.speed);
			});
			//图片列表bover动作
			$RelList.hover(function(){
				var $thisA = $(this);
				if($thisA.data("value") == "rel"){
					$thisA.find("span").fadeTo(options.listSpeed,.6).next().animate({"bottom":nTextBottom,"opacity":1},options.listSpeed);
					return false;
				};
				$thisA.find("div").fadeTo(options.listSpeed,.4).next().fadeTo(options.listSpeed,.7);
				return false;
			},function(){
				var $thisA = $(this);
				if($thisA.data("value") == "rel"){
					$thisA.find("b").animate({"bottom":0,"opacity":0},options.listSpeed).prev().fadeTo(options.listSpeed,0);
					return false;
				};
				$thisA.find("div").fadeTo(options.listSpeed,0).next().fadeTo(options.listSpeed,0);
				return false;
			});
			//盒子状态指针方法
			function currState(){
				alert("curr")
			};
			function fadeState(nw,nh){
				//var scrollTop = $window.scrollTop(),
					_w = nw,
					_h = nh,
					_l = (nWinWidth-_w)/2,
					_t = (nWinHeight-_h)/2;
				return [_t,_l,_w,_h];
			};
			function topState(){
				alert("top")
			};
			//预览图loading   
			function fnLoadImg(Dom,arrSize,index,callback){
				fnModal("open");
				$closeBtn.hide();
				$opera.hide();
				$boxTextWrap.hide();
				$boxCon.animate({
					"height":arrSize[3]
				},options.speed,function(){
					$(this).html(Dom);
				});
				$box.animate({"width":arrSize[2],
							  "height":arrSize[3],
				               "left":arrSize[1],
							   "top":arrSize[0]
                             },options.speed,function(){
							    $(this).fadeIn(options.speed,function(){
									oImg = arrImgObj[index];
									if (oImg.complete) {
										callback.call(oImg);
										return false; 
									};
									oImg.onload = function(){ 
										callback.call(oImg);
									};
									return false; 
								});
							 });
				return false;
			};
			//预览图模态
			function fnModal(state){
				var opa = 0;
				if(state == "open"){
					opa = options.setModal.opacity;
				};
				$modal.fadeTo(options.speed,opa);
			};
			//关闭预览图
			function closeBox(Dom){
				$opera.fadeOut(options.speed);
				$closeBtn.fadeOut(options.speed);
				$boxTextWrap.fadeOut(options.speed);
				Dom.delay(100).fadeOut(options.speed,function(){
					$(this).hide();
				});
			};
			//列表模式指针方法
            function viewMode(Dom,title){
				listHover = "<div></div><samp></samp>";
				Dom.data("value","view").append(listHover).find("div").fadeTo(0,0).next().fadeTo(0,0);
			};	
			function relMode(Dom,title){
				listHover = "<span></span><b>"+ title +"</b>";
				Dom.data("value","rel").append(listHover).find("span").fadeTo(0,0);
				nTextHeight = Dom.find("span").height();
				nTextBottom = parseInt(Dom.find("span").css("bottom"));
				Dom.find("b").css({"bottom":-nTextHeight,"opacity":0});
			};
			//遍历缩略图信息
			function fnReleach(list){
				var arrList = [];
				for(var c = 0; c < list.length; c++){
					var curr = list.eq(c),
						thisRel = curr.attr("rel"),
						thisTitle = curr.attr("title"),
                        thisHeight = parseInt(curr.attr("height")),
						thisWidth = parseInt(curr.attr("width"));
					arrList.push([thisRel,thisTitle,thisWidth,thisHeight]);
				};
				return arrList;
			};
			
			
			return false;
		});
	};
})(jQuery)