$(function () {
//	var oDiv = $('div');
//	var aLi = oDiv.find('input');
//	var oli = aLi.eq(0);

	
	var oDiv = document.getElementsByTagName('div')[0];
	var ali = oDiv.getElementsByTagName('input');
	var oli = oDiv.getElementsByTagName('input')[0];
	var oBtn = document.getElementById('btn1');
	
	
	
	oli.onblur = function () {
		var i = null;
		for (i=1;i<ali.length;i++) {
			ali[i].value = parseInt(ali[i-1].value) +1; 
		}	
	}
	
	
});