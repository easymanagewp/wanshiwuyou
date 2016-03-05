/*
 * 用户注册 - 第一步
 * */
require(['jquery','form','utils','http','jquery.validate.zh'],function($,$form,$utils,$http){

    var FORM_ID = '#register_1',
        SUBMIT_BTN = '#submit',
        POST_URL = '',
        form = $form.init(FORM_ID,{
            url : $utils.parseUrl("/register_1.do"),
            submitBtn : SUBMIT_BTN,
            filter: {
                afterSubmit: function (err, response) {
                    if (err) {
                        $utils.alert('无法连接到服务器');
                    } else if ($http.ValidateResp.success(response)) {
                        $utils.next($utils.parseUrl('/register_2.html'));
                    } else {
                        $utils.alert(response.message);
                    }
                }
            }
        });

    $(FORM_ID).validate({
        rules : {
            login_name : {required:!0},
            nickname : { required : !0},
            password : { required : !0},
            password_confim : { equalTo : ':input[name="password"]'}
        },
        messages : {
            login_name : {required :"请填写您的登录名称，可以为QQ，邮箱或者电话号码"},
            nickname : { required : "请填写您在万事无忧的昵称"},
            password : { required : "请填写您的登录密码"},
            password_confim : { equalTo : "两次密码输入不一致，请重新输入"}
        }
    });
});

