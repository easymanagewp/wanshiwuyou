/*
 * 用户注册 - 第一步
 * */
require(['jquery','form','utils','http','location'],function($,$form,$utils,$http,$$Location){

    var FORM_ID = '#login',
        SUBMIT_BTN = '#submit',
        POST_URL = '',
        form = $form.init(FORM_ID,{
            url : $utils.parseUrl("/login.do"),
            submitBtn : SUBMIT_BTN,
            filter: {
                afterSubmit: function (err, response) {
                    if (err) {
                        $utils.alert('无法连接到服务器');
                    } else if ($http.ValidateResp.success(response)) {
                        var redirecturl = $$Location.params.redirecturl;
                        if(redirecturl){
                            $utils.next(decodeURIComponent(redirecturl));
                        }else{
                            $utils.next($utils.parseUrl('/'));
                        }
                    } else {
                        $utils.alert(response.message);
                    }
                }
            }
        });

    $(FORM_ID).validate({
        rules : {
            login_name : { required : !0},
            password : { required : !0},
            validate_code : {required : !0}
        },
        messages : {
            login_name : { required : "请填写登录名"},
            password : { required : "请填写登录密码"},
            validate_code : {required:"请填写验证码"}
        }
    });

    $('.validate_code_imgs').on('click',function(){
        var inthis = $(this);
        $http.Get('/captcha.do').success(function(data){
           inthis.attr('src',data);
        }).go();
    });
    $('.validate_code_imgs').click();
});

