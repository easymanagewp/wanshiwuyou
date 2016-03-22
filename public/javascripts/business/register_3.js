/*
 * 用户注册 - 第一步
 * */
require(['jquery','form','utils','http','image-upload'],function($,$form,$utils,$http,$imgUpload){

    $imgUpload.init('#business_card_select',"#business_card_view",':input[name="business_card"]');
    $imgUpload.init('#selectHeadImg','#viewHeadImg',':input[name="head_img"]');

    var FORM_ID = '#register_3',
        SUBMIT_BTN = '#submit',
        POST_URL = '',
        form = $form.init(FORM_ID,{
            url : $utils.parseUrl("/register_3.do"),
            submitBtn : SUBMIT_BTN,
            filter: {
                afterSubmit: function (err, response) {
                    if (err) {
                        $utils.alert('无法连接到服务器');
                    } else if ($http.ValidateResp.success(response)) {
                        $utils.next($utils.parseUrl('/login.html'));
                    } else {
                        $utils.alert(response.message);
                    }
                }
            }
        });

    $(FORM_ID).validate({
        rules : {
            business_card : { required : !0},
            head_img : { required : !0}
        },
        messages : {
            business_card : { required : "请上传您的个人名片"},
            head_img : { required : "请上传您的个人头像"}
        }
    });
});

