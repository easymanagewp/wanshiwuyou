var business_type_dao = require('../../../dao/business_type');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    var business_type = req.body;
    business_type_dao.update({_id:id},{$set:business_type},{},function(err){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"修改失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,{},"修改成功"));
       }
    });
};