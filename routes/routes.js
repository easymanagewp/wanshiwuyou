module.exports = {
    "/" : [
        require('./answer/answer'),
        require('./business_type/business_type'),
        require('./users/users'),
        require('./extension_apply/extension_apply'),
        require('./index/index'),
        require('./question/question'),
        require('./upload/upload'),
        require('./conversation/conversation'),
        require('./feedback/feedback'),
        require('./notice/notice'),
        require('./site/site'),
        require('./tongzhi/tongzhi')
    ],
    "/admin" : [
        require('./admin/main/main'),
        require('./admin/business_type/business_type'),
        require('./admin/user/user'),
        require('./admin/extension_apply/extension_apply'),
        require('./admin/login/login'),
        require('./admin/account/account'),
        require('./admin/feedback/feedback'),
        require('./admin/notice/notice'),
        require('./admin/site/site')
    ]
};