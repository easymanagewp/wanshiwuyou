var $$Response = require('../../expand_models/response'),
    $$Cache = require('../../expand_models/MapCache'),
    $$UserDao = require('../../dao/user'),
    $$Promise = require('bluebird'),
    $$ConversationDao = require('../../dao/conversation');

//��ȡ������Ϣ
module.exports = function(req,res){
    var _id = req.params.id;
    console.info("======================================");
    console.info(_id);
    console.info("======================================");
    // ��ȡ������Ϣ
    $$ConversationDao.updateAsync({_id:_id},{$set:{is_read:!0}},{}).then(function(){
        res.json($$Response.create($$Response.STATUS.SUCCESS,{},''));
    }).catch(function(err){
        res.json($$Response.create($$Response.STATUS.FAIL,{},''));
    });
};