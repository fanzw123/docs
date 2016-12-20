$(document).ready(function()
{
	
	$("#green_monster").mlens(
	{
		imgSrc: $("#green_monster").attr("data-big"),
		lensShape: "circle",
		lensSize: 180,
		borderSize: 4,
		borderColor: "#fff"
	});
	
	$("#form_button").click(function(e)
	{
		e.preventDefault();
		var $new_settings = [];
		$("#real_time_form select, #real_time_form input").each(function(index)
		{
			$new_settings[index] = $(this).val();
		});
		
		$("#green_monster").mlens("update",0,
		{
			imgSrc: $("#green_monster").attr("data-big"),
			lensShape: $new_settings[0],
			lensSize: $new_settings[1],
			borderSize: $new_settings[2],
			borderColor: $new_settings[3],
			borderRadius: $new_settings[4]
		});
		
		var $risposta = "<p>&larr; New values setted, try now!</p>";
		$("#risposta").html($risposta).show().fadeOut(4000);
	
	});
	
	$("#form_button_reset").click(function(e)
	{
		$("#green_monster").mlens("update",1,
		{
			imgSrc: $("#green_monster").attr("data-big"),
			lensShape: "circle",
			lensSize: 180,
			borderSize: 4,
			borderColor: "#fff"
		});
	});

	$(window).unload(function()
	{
		$("#form_button_reset").click();
	});
});