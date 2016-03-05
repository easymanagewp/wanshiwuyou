var $$Response = require('../../expand_models/response'),
    $$Cache = require('../../expand_models/MapCache'),
    $$UserDao = require('../../dao/user'),
    $$Promise = require('bluebird'),
    $$ConversationDao = require('../../dao/conversation');

//获取交流信息
module.exports = function(req,res){
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,"userInfo");
    // 问题ID
    var _UserId = _UserInfo._id;
    // 获取交流信息
    $$ConversationDao.countAsync({receive_user:_UserId,is_read : !1,_Type : {$exists:true}}).then(function(count){
        res.json($$Response.create($$Response.STATUS.SUCCESS,count,'交流信息获取成功111'));
    }).catch(function(err){
        res.json($$Response.create($$Response.STATUS.FAIL,{},'交流信息获取失败111'));
    });
};