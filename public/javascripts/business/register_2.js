/*
 * 用户注册 - 第一步
 * */
require(['jquery','form','utils','http'],function($,$form,$utils,$http){

    var FORM_ID = '#register_2',
        SUBMIT_BTN = '#submit',
        POST_URL = '',
        form = $form.init(FORM_ID,{
            url : $utils.parseUrl("/register_2.do"),
            submitBtn : SUBMIT_BTN,
            filter: {
                afterSubmit: function (err, response) {
                    console.info(response);
                    if (err) {
                        $utils.alert('无法连接到服务器');
                    } else if ($http.ValidateResp.success(response)) {
                        $utils.next($utils.parseUrl('/register_3.html'));
                    } else {
                        $utils.alert(response.messages);
                    }
                }
            }
        });

    $(FORM_ID).validate({
        rules : {
            business : { required : !0},
            advertisement : { required : !0},
            home_page : { required : !0,url:true}
        },
        messages : {
            business : { required : "请填写您的业务信息，以便有需求的人能快速的找到您"},
            advertisement : { required : "请填写您的广告词"},
            home_page : { required : "请填写您的个人主页或公司网址"}
        }
    });
});

