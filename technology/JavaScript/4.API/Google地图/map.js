
//地图
function codeAddress(address) {    

	 var geocoder;    //地图初始化对象
 	 var map;    		 //地图实体对象
 	 var address =address;		//地址
 	 
	geocoder = new google.maps.Geocoder();    	//初始化
	
	var latlng = new google.maps.LatLng(139.69170639999993,35.6894875);      	//位置等等

 	//把地图放入一个html的div中
	var htmldiv = document.getElementById("map_canvas");	
 	map =new google.maps.Map(htmldiv, {           //google地图实体对象
		 zoom: 15,           		//缩放等级 
		 center: latlng,           	//中心坐标
		 mapTypeId:google.maps.MapTypeId.ROADMAP      	//地图类型：如卫星地图
 	});
  
	
	//geocoder.geocode把地址传入地图对象中，获取经纬度
	geocoder.geocode({ 'address': address }, function(results, status) {        //通过地址获取经纬度    
	 	if(status == google.maps.GeocoderStatus.OK) {		//如果能找到地址
	 	
			/**
			 * 定位地图，并且添加坐标到指定地点
			 * results[0].geometry.location.lat()		//纬度
			 * results[0].geometry.location.lng()		//经度
			 */
			map.setCenter(results[0].geometry.location);      	//定位到中间
			this.marker =new google.maps.Marker({                   
			 	title: address,                  
			 	map: map,                  
			 	position:results[0].geometry.location                
 			});    
			
			
			//********在坐标点上方显示一个提示框
			/**
			var infowindow =new google.maps.InfoWindow({                 
				//显示内容
				 content: '<strong>'+ address +'</strong><br/>'+'经度: '+ results[0].geometry.location.lat() +'<br/>纬度: '+ results[0].geometry.location.lng()                
			 });              
	 		infowindow.open(map, marker);        
			 */
	 	} else {              
	 		alert("没有找到地点:"+ status);          
		}           
 	});
} 