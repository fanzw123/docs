/*
 * jQuery - jcFrame v1.00
 * Copyright(c) 2012 by Riddick-Design 
 * Date: 2012-08-22
 */
;(function($){
	$.fn.jcFrame = function(options) {
		var defaults = {
			property : "rel",
			speed : "fast"
		};
		var options = $.extend(defaults,options);
		return this.each(function() {
            var $this = $(this),
				arrHeight = [],
				ConIdx = 0,
				$content = $("#jcContent"),
				$sideList = $("#jcSide").find("li"),
				$conList = $content.children("dt"),
				conListLen = $conList.length,
				sPro = $sideList.eq(ConIdx).find("a[rel]").attr(options.property);
			$this.width($(window).width()).height($(window).height());
			for(var h = 0; h < conListLen; h++){
				arrHeight.push($conList.eq(h).position().top);
			};
			$conList.wrapAll("<div id='jcConWraper'></div>");
			var $Wraper = $("#jcConWraper");
			$this.delegate("a["+ options.property +"]","click",function(){
				sPro = $(this).attr(options.property);
				var offsetTop = $("#"+sPro,$content).children("div.jcTitle").position().top;
				ConIdx = $sideList.index($(this).parent());
				ListScroll(offsetTop,sPro);
				return false;
			});
			function ListScroll(val,pro){
				$("a[rel=" + pro +"]",$("#jcSide")).parent().addClass("select").siblings().removeClass("select");
				$("#"+pro,$content).addClass("select").siblings().removeClass("select");
				$Wraper.stop().animate({ "top":-val+50},options.speed);	
				return false;
			};
			function Down(){
				if(ConIdx < conListLen-1){
					++ConIdx;
				};
				Pro = $sideList.eq(ConIdx).find("a[rel]").attr(options.property);
				ListScroll(arrHeight[ConIdx]+50,Pro)
				return false;
			};
			function Up(){
				if(ConIdx > 0){
					--ConIdx;
				};
				Pro = $sideList.eq(ConIdx).find("a[rel]").attr(options.property);
				ListScroll(arrHeight[ConIdx]+50,Pro)
				return false;
			};
			function img_zoom(event){
				e = event.wheelDelta; 
				if (e == 120) {
					Up();
				}
				if (e == -120) {
					Down();
				}
				return false; 
			} 
			document.getElementById("jcContent").onmousewheel = function(){return img_zoom(event);} 
		});
	};
})(jQuery)