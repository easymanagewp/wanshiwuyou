var $$feedback = require('../../dao/feedback'),
    $$response = require('../../expand_models/response'),
    $$cache = require('../../expand_models/MapCache'),
    $$utils = require('../../expand_models/utils');

module.exports = function(req,res){
    /* 获取提交数据 */
    var _ContactInformationVal = req.body.contact_information,
        _Content = req.body.content,
        _UserInfo = $$cache.$GetCache(req.cookies.user_token,'userInfo'),
        _Feedback = {};

    /* 反馈内容不允许为空 */
    if($$utils.strIsBlank(_Content)){
        res.json($$response.create($$response.STATUS.FAIL,{},'请填写您的反馈内容'));
        return !1;
    }

    _Feedback['content'] = _Content;

    var _UserToken = req.cookies['user_token'];
    if((null == _UserToken || ''== _UserToken)
        || (null == _UserToken || null == {})
        || (null==_UserInfo)) {
        /* 尚未登录 */
        if($$utils.strIsBlank(_ContactInformationVal)){
            res.json($$response.create($$response.STATUS.FAIL,{},'请填写您的联系方式，或者登录之后再进行建议反馈，感谢您对万事无忧的支持！'));
            return !1;
        }
    }else{
        _Feedback['create_user'] = _UserInfo._id;
    }

    _Feedback['contact_information'] = _ContactInformationVal;
    _Feedback['create_time'] = new Date().getTime();
    _Feedback['process_status'] = !1;

    console.info(_Feedback);
    /* 保存 */
    $$feedback.saveAsync(_Feedback).then(function(_SavedFeedback){
        res.json($$response.create($$response.STATUS.SUCCESS,{},'您的问题已经提交到后台，我们再确认之后会及时进行处理，感谢您对万事无忧的支持！'));
    }).catch(function(err){
        console.info(err.message);
        res.json($$response.create($$response.STATUS.FAIL,{},'系统发生未知异常，如果确认您的网络没有问题之后，请稍后再进行尝试！'));
    });



};