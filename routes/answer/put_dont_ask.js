var $$Response = require('../../expand_models/response'),
    $$AnswerDao = require('../../dao/answer');

module.exports = function(req,res){
    var _AnswerId = req.params.answerId;

    $$AnswerDao.updateAsync({_id:_AnswerId},{$set:{is_del:!0}},{}).then(function(){
        res.json($$Response.create($$Response.STATUS.SUCCESS,{},'该问题以后将不再显示在您的回答列表内'));
    }).catch(function(){
        res.json($$Response.create($$Response.STATUS.FAIL,{},'系统异常'));
    });
};