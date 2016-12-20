window.onload = function () {
	var oBtnShow = document.getElementById('but');	//展开按钮
	var oBtnclose = document.getElementById('btn_close');//收起
	var oBottom = document.getElementById('miaov_bottom');	//下面的div
	var oBox = document.getElementById('miaov_box');
	oBtnShow.onclick = function () {	//展开
		startMove(oBottom,'right',0,function() {
			oBox.style.display = 'block';
			startMove(oBox,'bottom',0);			
		});
		;
	}
	oBtnclose.onclick = function () {	//收起
		startMove(oBox,'bottom',-315,function() {
			oBox.style.display = 'none';
			startMove(oBottom,'right',-165);
		});
	}
}