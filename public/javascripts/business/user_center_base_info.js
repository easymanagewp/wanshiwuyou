require(['form','utils','http','jquery'],function($form,$utils,$http){

    $form.init('#reset_pwd_form',{
        putUrl : $utils.parseUrl('/user_center/base_info.do'),
        method : 'put',
        filter : {
            afterSubmit : function(err, response){
                if (err) {
                    $utils.alert('无法连接到服务器');
                } else if ($http.ValidateResp.success(response)) {
                    $utils.alert(response.message);
                } else {
                    $utils.alert(response.message);
                }
            }
        }
    });

    $('#reset_pwd_form').validate({
        rules : {
            login_name : {required:!0},
            nickname : { required : !0}
        },
        messages : {
            login_name : { required : "请填写您的登录名称，登录名可以为QQ，邮箱或者手机号中的任意一个"},
            nickname : { required : "请填写您在万事无忧的昵称"}
        }
    });
})