var account_dao = require('../../../dao/account');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    account_dao.findById(id,function(err,account){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"获取数据失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,account,"数据获取成功"));
       }
    });
};