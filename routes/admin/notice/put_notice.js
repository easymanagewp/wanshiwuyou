var $$noticeDao = require('../../../dao/notice');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    var notice = req.body;
    $$noticeDao.update({_id:id},{$set:notice},{},function(err){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"修改失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,{},"修改成功"));
       }
    });
};