var $$QuestionDao = require('../../dao/question'),
    $$ConversationDao = require('../../dao/conversation'),
    $$Promise = require('bluebird'),
    $$Cache = require('../../expand_models/MapCache');
    $$Response = require('../../expand_models/response');

module.exports = function(req,res){
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,'userInfo');
    var _CurrentUserId = _UserInfo._id;
    /* 获取问题列表 */
    $$QuestionDao.countAsync({send_user:_CurrentUserId,is_del:!1}).then(function(count){
        res.json($$Response.create($$Response.STATUS.SUCCESS,count,"获取提问信息成功"));
    }).catch(function(_Error){
        res.json($$Response.create($$Response.STATUS.FAIL,{},"获取提问信息失败"));
    });
};