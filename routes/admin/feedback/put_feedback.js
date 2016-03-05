var $$feedbackDao = require('../../../dao/feedback');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    $$feedbackDao.processAsync(id).then(function(){
        res.json(response.create(response.STATUS.SUCCESS,{},"反馈状态已经变更为已处理"));
    }).catch(function(){
        res.json(response.create(response.STATUS.FAIL,{},"反馈状态变更失败"));
    })
};