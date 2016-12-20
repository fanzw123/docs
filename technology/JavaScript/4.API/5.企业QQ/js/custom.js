$(document).ready(function() {
	
	//悬浮客服
	$("#scrollsidebar").fix({
		float : 'left',	//default.left or right
		//minStatue : true,
		skin : 'white',	//default.gray or yellow 、blue 、green 、orange 、gray 、white
		durationTime : 600
	});

  	//悬浮客服
	$("#scrollsidebar2").fix({
		float : 'right',	//default.left or right
		minStatue : true,
		skin : 'gray',	//default.gray or yellow 、blue 、green 、orange 、gray 、white
		durationTime : 1000
	});

});