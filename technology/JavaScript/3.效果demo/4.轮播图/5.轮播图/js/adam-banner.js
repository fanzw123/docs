;(function($){
	$.fn.adam_Eff = function(options) {
		var defaults = {
            speed: 400,
			def: 0,
			curr: "curr"
		};
		var options = $.extend(defaults,options);
		return this.each(function() {
			var $this = $(this),
				$tabslist = $("#adam-tabs",$this),
				$bigImg = $("ul",$this),
				$tabs = $tabslist.find("dd"),
				sTabsLen = $tabs.length,
				$count = $tabslist.find("dt"),
				$count_index = $count.find("span"),
				$count_sum = $count.find("samp"),
				$tabsCon = $("#adam-tabsContent",$this).children(),
				$tabsNews = $("div.adam-news"),
				$fstDD = $tabsCon.find("dd:first"),
				$perv = $("b.adam-scroll-prev",$this),
				$next = $("b.adam-scroll-next",$this),
				_LenArr = [],
				_maxLen = 5,
				_IDX = 0,
				_sImgIdx = 0,
				nBigWidth = $tabsCon.find("li:eq(0)").outerWidth(true),
				nSmallWidth = $tabsCon.find("dd:eq(0)").outerWidth(true);
			// 数据初始化
			$tabs.eq(options.def)
				 .addClass(options.curr);
			$tabsCon.find("dd:first")
			        .addClass(options.curr)
					.end()
					.eq(options.def)
					.show()
					.end()
					.find("b")
					.fadeTo(0,.5);
			(function(l,arr){
				for(var i = 0; i<l; i+=1){
					var $thisDD = $tabsCon.eq(i).find("dd");
					_LenArr.push($thisDD.length);
					if(i==0) {
						$count_index.text(i+1);
						$count_sum.text(_LenArr[0]);
					};
					$tabsNews.eq(i)
							 .find("div")
							 .text(arr.eq(i).find("a").attr("title"))
							 .show();
					$tabsNews.eq(i)
							 .find("p")
							 .text(arr.eq(i).find("a").attr("content"))
							 .show();
					
				};
			}(sTabsLen,$fstDD));
			// 绑定事件
			$tabs.bind("click",function(){
				_IDX = $(this).index();
				var $thisCon = $tabsCon.eq(_IDX),
					sImgIdx = $thisCon.find("dd."+options.curr).index()+1;
				$tabs.eq(_IDX)
				     .addClass(options.curr)
					 .siblings()
					 .removeClass(options.curr);
				if ($.browser.msie && !$.support.style){
					$thisCon.show()
							.siblings()
							.hide();
				} else {
					$thisCon.fadeIn(options.speed)
							.siblings()
							.fadeOut(200);
				};
				$count_index.text(sImgIdx);
				$count_sum.text(_LenArr[_IDX]);
			});
			function selectImg($t,$p,i,s,c){
				var $B = $p.find("ul"),
					$D = $p.find("dl"),
					$A = $t.find("a"),
					$N = $p.children().eq(1),
					_l = -nBigWidth*i;
				$count_index.text(i+1);
				$N.find("div")
				  .fadeOut(100,function(){
					$(this).text($A.attr("title"))
						   .fadeIn(200)					   
				  })
				  .end()
				  .find("p")
				  .fadeOut(100,function(){
					$(this).text($A.attr("content"))
						   .fadeIn(200);				   
				  });
				$t.addClass(c)
				   .siblings()
				   .removeClass(c);
				$B.stop().animate({
					"left": _l
				},s);
				if((i-2) >=0 ){
					$D.stop().animate({
						"left": -(i-2)*nSmallWidth-10	
					},s);
				};
			};
			$tabsCon.find("dd").bind("click",function(){
				_sImgIdx = $(this).index();
				var $me = $(this),
					$parent = $me.parent().parent().parent();
				selectImg( $me,
						   $parent,
						   _sImgIdx,
						   options.speed,
						   options.curr
						 );
			});
			$perv.bind("click",function(){
				var $me = $(this),
					$parent = $me.parent().parent().parent(),
					$dd = $parent.find("dd."+options.curr);
				_sImgIdx = $dd.index();
				if(_sImgIdx > 0 ){
					_sImgIdx -= 1;
					selectImg( $dd.prev(),
							   $parent,_sImgIdx,
							   options.speed,
							   options.curr
							 );
				};
			});
			$next.bind("click",function(){
				var $me = $(this),
					$parent = $me.parent().parent().parent(),
					$dd = $parent.find("dd."+options.curr);
				_sImgIdx = $dd.index();
				if(_sImgIdx < parseInt($count_sum.text())-1){
					_sImgIdx += 1;
					selectImg( $dd.next(),
							   $parent,
							   _sImgIdx,
							   options.speed,
							   options.curr
							 );
				};
			});
			return false;
		});
	};
})(jQuery)