(function($){
   $.extend({
     "toSelect"  : function(textid,ulid,bgcolor,textcolor){ 	//input、ul、li颜色、其他颜色、同步元素
	    if(bgcolor==undefined){		//li颜色
		   bgcolor = "#ccc";
		}
		if(textcolor==undefined){
		   textcolor = "#ffffff";
		}
		//����ȫ�ֱ���
		
	
	    var $text = $("#"+textid);
		var showtext = $text.text();
		var $ul = $("#"+ulid);
	    var textOffset = $text.offset();
		var top = textOffset.top + $text.height() + 5;
		var width = $text.width() + 3;
		var $div = $("<div></div>").css({"position":"absolute","background-color":"#ffffff","display":"none","cursor":"default","left":textOffset.left,"top":top,"width":width,"border-width":"1px","border-color":$text.css("border-color"),"border-style":"solid","overflow-y":"auto","overflow-x":"hidden"});
		var $table = $("<table></table>").css({"cursor":"default","border":"none","width":width});
		$ul.css("display","none").children().each(function(){
		//修1：加入了同步data-value="+$(this).data('value')+"
		  $table.append($("<tr style='width:" + width + "'></tr>").append($("<td style='height:17px;font-size:13px'>"+$.trim($(this).text())+"</td>")));
		});
		//��div�����������Ƴ��¼�
		$div.append($table);
		var $tr = $table.children().children();
		//������ϱ�ɫ
		$tr.mouseover(function(){
		  $(this).css({"background-color":bgcolor,"color":textcolor}).attr("selected","selected").siblings().css({"background-color":"#ffffff","color":"#000000"}).attr("selected","");
		 //������ֵ���浽�ı�����
		}).mousedown(function(){
		  $text.val($(this).children("td").text());


		  
		});
		//�ı����ȡ�����¼�
		$text.focus(function(){
		  var height = $table.children().children(":visible").size() > 10 ? 250 : $table.children().children(":visible").size()*24;
		  $div.css("height",height).show().children().children().children(":visible").eq(0).mouseover();
		 //��������ʱɾѡ
		}).click(function(){
			$(this).focus();
		}).keyup(function(event){
		  $table.children().children().hide().filter(":contains('"+$.trim($(this).val())+"')").show();
		  var height = $table.children().children(":visible").size() > 10 ? 250 : $table.children().children(":visible").size()*24;
		  $div.css("height",height).show();
		  if(event.keyCode!=13 && event.keyCode!=38 && event.keyCode!= 40 && event.keyCode!=37&&event.keyCode!=39){
			$table.children().children(":visible").eq(0).mouseover();
		  }
		}).mousedown(function(){
		  $(this).keyup();
		}).click(function(){
		  $(this).keyup();
		}).blur(function(){
		  $div.hide();
		}).keydown(function(event){
			if(event.keyCode==38){
		     $table.children().children("[selected='selected']").prevAll(":visible:first").mouseover();
		     $div.scrollTop($div.scrollTop()-17);
		   }
		   if(event.keyCode==40){
		     $table.children().children("[selected='selected']").nextAll(":visible:first").mouseover();
		     $div.scrollTop($div.scrollTop()+17);
		   }
		   if(event.keyCode==13){
		     if(window.document.activeElement==$text[0]){
		       $text.val( $table.children().children("[selected='selected']").children().text());
			   
			   $text.blur();
			 }
		   }
		});
		
		$("body").append($div);
	 }
   });
})(jQuery);