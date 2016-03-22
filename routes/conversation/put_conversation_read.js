var $$Response = require('../../expand_models/response'),
    $$Cache = require('../../expand_models/MapCache'),
    $$UserDao = require('../../dao/user'),
    $$Promise = require('bluebird'),
    $$ConversationDao = require('../../dao/conversation');

//获取交流信息
module.exports = function(req,res){
    var _id = req.params.id;
    console.info("======================================");
    console.info(_id);
    console.info("======================================");
    // 获取交流信息
    $$ConversationDao.updateAsync({_id:_id},{$set:{is_read:!0}},{}).then(function(){
        res.json($$Response.create($$Response.STATUS.SUCCESS,{},''));
    }).catch(function(err){
        res.json($$Response.create($$Response.STATUS.FAIL,{},''));
    });
};