$(function(){
    $('.mosaic-block').mosaic({
        animation   :   'slide',    //fade or slide
        anchor_y    :   'bottom'
    });
    
    $('#id-signup-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#inputPassword"
            },
            agree: "required"
        },
        messages: {
            email: "请输入有效Email地址",
            password: {
                required: "请输入密码",
                minlength: "密码至少5个字符"
            },
            confirm_password: {
                required: "请输入确认密码",
                minlength: "密码至少5个字符",
                equalTo: "与密码不一致"
            },
            agree: "请同意协议"
        }
    });

	$('#id-signin-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
                maxlength:100
            },
            pwd: {
                required: true,
                minlength:5,
                maxlength:32
            }
        },
        messages: {
            email: "请输入有效Email",
            pwd: {
                required: "请输入密码",
                minlength: "密码至少5个字符"
            }
        }
    });
	
	//提交之前先加密
	$("#loginBtn").click(function(){
	     pwd = $("#inputPassword").val();
		 
		 //密码不为空时才Hash
		 if($.trim(pwd) != ""){
			pwdHash = hex_md5(pwd);
			$("#hashPwd").val(pwdHash);
		 }
		 
		 $("#id-signin-form").submit();
	});
	
    //Ajax校验输入Email是否已经存在
    $("#inputEmail").blur(function(){
		email = $(this).val();
		
		if(/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(email)){
			$(this).siblings().each(function(){
				$(this).remove();
			});
			$(this).parent().append('<label class="ajax_loader" style="display:inline"></label>');
			$.ajax({
				url:"checkEmailExist",
				method:"POST",
				dataType:"JSON",
				data:{
					'email':email
				},
				success:function(data){
					if(data){
						html = '<label for="inputEmail" class="error">Email地址已被注册</label>';
						$("#inputEmail").siblings().each(function(){
							$(this).remove();
						});
						$("#inputEmail").parent().append(html);
						$("#inputEmail").val("").focus();
					}else {
						$("#inputEmail").siblings().each(function(){
							$(this).remove();
						});
					}
				},
				error:function(){
					$("#inputEmail").siblings().each(function(){
							$(this).remove();
					});
				}
			});
		}
	}).focus();
	
	//更换验证码
	$("#change_img_code").click(function(){
		url = $("#img_code").attr("src");
		url = url.split("?")[0];
		$("#img_code").attr("src",url+"?"+(Math.random()));
	});
	
	//修改密码的表单
	$('#change_pwd_form').validate({
        rules: {
            pwd: {
                required: true,
                minlength:5,
                maxlength:32
            },
			confirmPwd: {
                required: true,
                minlength: 5,
                equalTo: "#inputPassword"
            },
			captcha :{
				 required: true
			}
        },
        messages: {
            pwd: {
                required: "请输入密码",
                minlength: "密码至少5个字符"
            },
			confirmPwd: {
                required: "请输入确认密码",
                minlength: "密码至少5个字符",
                equalTo: "与密码不一致"
            },
			captcha :{
				required: "请输入验证码"
			}
        }
    });
	//提交修改密码的
	$('#sendResetForm').validate({
        rules: {
            email: {
                required: true,
                email: true,
                maxlength:100
            },
			captcha :{
				required: true
			}
        },
        messages: {
            email: "请输入有效Email",
			captcha :{
				required: "请输入验证码"
			}
        }
    });
	//判断是否已经登录
	$.ajax({	
		url:"/dnspai/Login/userIsLogined",
		dataType:"JSON",
		success:function(data){
			if(data === true){
				$("#loginTip").text("记录管理");
			}
		},
		error:function(){
		
		}
	});
});
