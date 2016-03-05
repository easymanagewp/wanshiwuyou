var $$Response = require('../../expand_models/response'),
    $$QuestionDao = require('../../dao/question');

module.exports = function(req,res){
    var $questionId = req.params.questionId;

    $$QuestionDao.updateAsync({_id:$questionId},{$set:{is_del:!0}},{}).then(function(){
        res.json($$Response.create($$Response.STATUS.SUCCESS,{},'该问题以后将不再显示在您的提问列表内'));
    }).catch(function(){
        res.json($$Response.create($$Response.STATUS.FAIL,{},'系统异常'));
    });
};