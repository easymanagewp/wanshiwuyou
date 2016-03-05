var $$Response = require('../../expand_models/response'),
    $$Cache = require('../../expand_models/MapCache'),
    $$Socket = require('../socket'),
    $$AnswerDao = require('../../dao/answer'),
    $$UserDao = require('../../dao/user'),
    $$Promise = require('bluebird'),
    $$ConversationDao = require('../../dao/conversation');

//获取交流信息
module.exports = function(req,res){
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,"userInfo");
    // 问题ID
    var _UserId = _UserInfo._id;
    // 获取交流信息
    $$ConversationDao.findAsync({receive_user:_UserId,is_read : !1,_Type : {$exists:true}}).then(function(conversations){
        for(var iIndex=0;iIndex<conversations.length;iIndex++){
            var conversation = conversations[iIndex];
            if(conversation._Type) {
                $$Socket.$sendMessage(conversation);
            }else{
                console.info(conversation);
            }
        }
        res.json($$Response.create($$Response.STATUS.SUCCESS,{},''));
    }).catch(function(err){
        res.json($$Response.create($$Response.STATUS.FAIL,{},''));
    });
};