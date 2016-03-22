var $$QuestionDao = require('../../dao/question'),
    $$ConversationDao = require('../../dao/conversation'),
    $$Promise = require('bluebird'),
    $$Cache = require('../../expand_models/MapCache'),
    $$Response = require('../../expand_models/response');

module.exports = function(req,res){
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,'userInfo');
    var _CurrentUserId = _UserInfo._id;
    /* 获取问题列表 */
    $$QuestionDao.findAsync({send_user:_CurrentUserId,is_del:!1},{},{sort:[{'send_time':-1}]}).then(function(_Questions){
        /* 获取所有问题的交流数量 */
        var queue  = [];
        for(var _iIndex=0;_iIndex<_Questions.length;_iIndex++){
            var _Question = _Questions[_iIndex];
            queue.push(function(){
                var inthis = this;
                return $$ConversationDao.countAsync({$or:[{question:_Question._id,receive_user:_CurrentUserId},{question:_Question._id,send_user:_CurrentUserId}]}).then(function(count){
                    inthis._doc['count'] = count;
                    return inthis;
                })
            }.apply(_Question));
        }
        return $$Promise.all(queue);
    }).then(function(_Questions){
        res.json($$Response.create($$Response.STATUS.SUCCESS,_Questions,"获取提问信息成功"));
    }).catch(function(_Error){
        res.json($$Response.create($$Response.STATUS.FAIL,{},"获取提问信息失败"));
    });
};