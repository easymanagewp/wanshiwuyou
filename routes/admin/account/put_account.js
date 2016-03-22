var account_dao = require('../../../dao/account');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    var account = req.body;
    account_dao.update({_id:id},{$set:account},{},function(err){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"修改失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,{},"修改成功"));
       }
    });
};