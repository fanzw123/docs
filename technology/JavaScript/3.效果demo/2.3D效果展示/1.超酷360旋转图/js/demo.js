var Effect = function( a, w, h, s, p, x, y )
{
	var _3Deffect = function( array , width, height, stage, per, x, y  )
	{	
		this.oDoc = document;
		
		this.stage = stage;
		
		this.width = width;
		
		this.height = height;
		
		this.path = array;
		
		this.domStr = "<dt id=\"shadow\"></dt>";
		
		this.perspective = per,
		
		this.rotateX = x,
		
		this.rotateY = y,
		
		this.speedX=0,
		
		this.speedY=0;
		
	}
	
	_3Deffect.prototype = {
		
		transform : function( elem, value, key )
		{
			key = key || "transform";
			
			[ "-webkit-", "-moz-", "-ms-", "-o-", "" ].forEach( function( pre )
			{
				elem.style[ pre + key ] = value;
			});	
			
			return elem;
		},
		
		piece : function( value, key )
		{
			var str = "";
			
			key = key || "transform";
			
			[ "-webkit-", "-moz-", "-ms-", "-o-",  "" ].forEach( function( pre )
			{
				str += ( key + ":" + pre + value );
				return false;
			});	
			
			return str;
		},
		
		addEvent : function ( obj, sEvent, fn )
		{
			if( obj.attachEvent )
			{
				obj.attachEvent( "on" + sEvent, fn );
			}
			else
			{
				obj.addEventListener( sEvent, fn, false );
			};
		},
		
		onMouseWheel : function( e )
		{
			var _o = this;
			if( e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0 )
			{
				if( _o.perspective < 4000 )
				{
					_o.perspective += 150;
				};

			}
			else
			{
				if( _o.perspective > 350 )
				{
					_o.perspective -= 150;
				};
			};
			
			_o.transform( _o.stage[0], "perspective(" + _o.perspective + "px) rotateX("+ _o.rotateX +"deg) rotateY(" + _o.rotateY +"deg)" );
			
			if( e.preventDefault )
			{
				e.preventDefault();
			};
			
			return false;
		},
		
		startMove : function startMove( obj )
		{
			var _o = this;
			
			obj.timer = obj.timer || null;
			
			clearInterval( obj.timer );
			
			obj.timer = setInterval (function ()
			{
				_o.rotateX -= _o.speedY;
				_o.rotateY += _o.speedX;
				
				_o.speedY *= 0.93;
				_o.speedX *= 0.93;
				
				if( Math.abs( _o.speedX ) < 0.1 && Math.abs( _o.speedY ) < 0.1 )
				{
					_o.stopMove( obj.timer );
				};
				
				_o.transform( obj, "perspective(" + _o.perspective + "px) rotateX("+ _o.rotateX +"deg) rotateY(" + _o.rotateY +"deg)" );
				
			}, 30);
		},
		
		stopMove : function( t )
		{
			clearInterval( t );
		},
		
		init : function()
		{
			var _o = this;
			
			Aui.each( _o.path, function( i )
			{
				var shadow = _o.piece( "linear-gradient(top, rgb(0, 0, 0) 50%, rgba(255, 255, 255, 0)), url(" + this + ");", "background-image" ),
					shadow = "<div class=\"over\" style=\"" + shadow + "\"></div>";
						
				_o.domStr += "<dd style=\"background-image:url("+ this +");\">" + shadow + "</dd>";
			});
			
			Aui( _o.stage ).html( _o.domStr );
			
			var _oList = Aui( "dd",  _o.stage ),
			
				_sLen = _o.path.length,
				
				_deg = 360/_sLen,
				
				_tranZ = ( _o.width/2 + 40 ) / Math.tan( ( 360/_sLen/2 ) * Math.PI / 180 ),
				
				_i = _sLen;
			
			while( _i > 0 )
			{
				( function( d, len, _oList, _o )
				{
					setTimeout( function()
					{
						var idx = len - d,
							oThis = _oList[ idx ]

						oThis.children[0].style.opacity = 0.2;
						
						_o.transform( oThis, "rotateY(" + ( idx*_deg ) +"deg) translateZ(" + _tranZ + "px)" );
						
					}, d * 200 );
					
				})( _i-- , _sLen, _oList, _o );
			};
			
			var wheel = function( e )
			{
				_o.onMouseWheel.call( _o, e || window.event );
			};
			
			_o.addEvent( _o.oDoc, "mousewheel", wheel );
			_o.addEvent( _o.oDoc, "DOMMouseScroll", wheel );
			
			var AuiDoc = Aui( _o.oDoc );
			
			AuiDoc.mousedown( function( e )
			{
				var moveX = e.clientX,
					moveY = e.clientY;
					
				var startX = _o.rotateX;
				var startY = _o.rotateY;
				
				var lastX = moveX;
				var lastY = moveY;
				
				_o.speedX = _o.speedY = 0;
				
				AuiDoc.mousemove( function( e )
				{
					var x = e.screenX,
						y = e.screenY;
		
					_o.rotateY = startY + ( e.clientX - moveX )/10;
					_o.rotateX = startX - ( e.clientY - moveY )/10;
					
					_o.transform( _o.stage[0], "perspective("+ _o.perspective +"px) rotateX("+ _o.rotateX +"deg) rotateY(" + _o.rotateY +"deg)" );
					
					_o.speedX =( e.clientX - lastX )/5;
					
					_o.speedY =( e.clientY - lastY )/5;
					
					lastX = e.clientX;
					lastY = e.clientY;
					
				});
				
				AuiDoc.mouseup( function()
				{
					this.onmousemove = null;
					
					this.onmouseup = null;
					
					_o.startMove( _o.stage[0] );
				});
				
				_o.stopMove( _o.stage[0].timer );
				
				return false;
			} );
			
			return _o;
		}
		
	};
	
	return new _3Deffect( a, w, h, s, p, x, y );
};
