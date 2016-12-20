Aui.ready( function()
{
	xxx();
});


var xxx = function () {
	var oDemo = Aui( "#demo" );
	var opt = {		
		smallSrc : "http://www.jq-school.com/upload/small.jpg",
		smallWidth : 350,
		smallHeight : 350,
		
		bigSrc : "http://www.jq-school.com/upload/big.jpg",
		bigWidth : 800,
		bigHeight : 800
	};
	var oWin = Aui( window );
	var owraper = Aui( "#wraper" )
	var oSmall = Aui( "#small" );
	var oBig = Aui( "#big" );
	var obg = Aui( "#bg" );
	var oMask = Aui( "#mask" );
	
	var oBigImg = null;
	var oBigImgWidth = opt.bigWidth;
	var oBigImgHeight = opt.bigHeight;
	
	var iBwidth = oBig.width();
	var iBheight = oBig.height();
	
	oBig.setStyle( "display", "none" );

	var iTop = owraper.top();
	var iLeft = owraper.left();
	var iWidth = owraper.width();
	var iHeight = owraper.height();
	var iSpeed = 200;
	
	var setOpa = function( o )
	{
		o.style.cssText = "opacity:0;filter:alpha(opacity:0);"
		return o;
	};

	var imgs = function( opt )
	{
		if( Aui.typeOf( opt ) !== "object" ) return false;

		var oBig = new Image();

		oBig.src = opt.bigSrc;
		oBig.width = opt.bigWidth;
		oBig.height = opt.bigHeight;
		
		var oSmall = new Image();
		oSmall.src = opt.smallSrc;
		oSmall.width = opt.smallWidth;
		oSmall.height = opt.smallHeight;
		
		oBigImg = Aui( oBig );
		
		return {
			bigImg : setOpa( oBig ),
			smallImg : setOpa( oSmall )
		};
	};
	
	var append = function( o, img )
	{
		o.append( img );
		
		Aui( img ).fx(
		{
			opacity : 1
		}, iSpeed*2, null , function()
		{
			this.style.cssText = "";
		});
	};
	
	var eventMove = function( e )
	{
		var e = e || window.event;
		
		var w = oMask.width();
		var h = oMask.height();
		var x = e.clientX - iLeft + oWin.scrollLeft() - w/2;
		var y = e.clientY - iTop + oWin.scrollTop() - h/2;

		var l = iWidth - w - 10;
		var t = iHeight - h - 10;

		if( x < 0 )
		{
			x = 0;	
		}
		else if( x > l )
		{
			x = l;
		};
		
		if( y < 0 )
		{
			y = 0;	
		}
		else if( y > t )
		{
			y = t;
		};

		oMask.setStyle(
		{
			left : x < 0 ? 0 : x > l ? l : x,
			top : y < 0 ? 0 : y > t ? t : y
		});
		
		var bigX = x / ( iWidth - w );
		var bigY = y / ( iHeight - h );
		
		oBigImg.setStyle(
		{
			left : bigX * ( iBwidth - oBigImgWidth ),
			top : bigY * ( iBheight - oBigImgHeight )
		});

		return false;
	};
	
	var eventOver = function()
	{
		oMask.show();
		obg.stop()
			.fx(
			{
				opacity : .1
			}, iSpeed );
		oBig.show()
			.stop()
			.fx(
			{
				opacity : 1	
			}, iSpeed/2 );
		
		return false;
	};
	
	var eventOut = function()
	{
		oMask.hide();
		obg.stop()
			.fx(
			{
				opacity : 0
			}, iSpeed/2);
			
		oBig.stop()
			.fx(
			{
				opacity : 0
			}, iSpeed, null, function()
			{
				Aui( this ).hide();
			});
		
		return false;
	};
	
	var _init = function( object, oB, oS, callback )
	{
		var num = 0;
		
		oBig.setStyle( "opacity",0 );
		
		append( oB, object.bigImg );
		append( oS, object.smallImg );
		
		object.bigImg.onload = function()
		{
			num += 1;
			
			if( num === 2 )
			{ 
				callback.call( object.smallImg );
			};
		};
		
		object.smallImg.onload = function()
		{
			num += 1;
			
			if( num === 2 )
			{ 
				callback.call( object.smallImg );
			};
		};
	};
	
	// 初始化  继续写
	_init( imgs( opt ), oBig, oSmall, function()
	{
		//绑定事件
		oWin.resize( function()
		{
			iTop = owraper.top();
			iLeft = owraper.left();
			iWidth = owraper.width();
			iHeight = owraper.height();

		});
		oSmall.hover( eventOver, eventOut )
			  .mousemove( eventMove );
	});
}
