require([
   'jquery',
    'utils',
    '$$Login',
    'http'
],function(
    $$jQuery,
    $$utils,
    $$login,
    $$http
){
    /* 联系方式 */
    var _CONTACT_INFORMATION = $$jQuery('#contact_information'),
    /* 反馈内容 */
    _CONTENT = $$jQuery('#content'),
    /* 提交按鈕 */
    _SUBMIT_BTN = $$jQuery('#submit'),
    /* 数据提交地址 */
    _SUBMIT_URL = "/feedback.do",

    /* 提交反饋信息 */
    submit = function(){
        /* 获取提交数据 */
        var _ContentInformationVal = _CONTACT_INFORMATION.val(),
            _ContentVal = _CONTENT.val(),

            /* 提交的数据 */
            _Params = {};

        /* 验证数据 */
        if($$utils.strIsBlankOrNull(_ContentVal)){
            $$utils.alert('请填写您要反馈的内容');
            return !1;
        }

        _Params['content'] = _ContentVal;

        if($$utils.strIsBlankOrNull(_ContentInformationVal)){
            /* 是否登录？ */
            if(!$$login.$ValidateLogin()){
                /* 尚未登录，必须填写联系方式 */
                $$utils.alert('请填写您的联系方式，或者登录之后再进行建议反馈！！');
                return !1;
            }
        }

        _Params['contact_information'] = _ContentInformationVal;

        /*  数据提交*/
        $$http.Post(_SUBMIT_URL).params(_Params).success(function(_Resp){
            if($$http.ValidateResp.success(_Resp)){
                $$utils.alert('您的反馈已经提交到系统后台，我们会尽快审核处理，感谢您对万事无忧的支持！');
            }else{
                $$utils.alert(_Resp.message);
            }
        }).error(function(_Error){
            $$utils.alert('提交数据失败，请检查您的网络是否连接');
        }).go();
    };


    /* 绑定提交事件 */
    _SUBMIT_BTN.on('click',submit)

});