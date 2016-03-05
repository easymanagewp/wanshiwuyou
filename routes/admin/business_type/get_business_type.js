var business_type_dao = require('../../../dao/business_type');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    business_type_dao.findById(id,function(err,business_type){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"获取数据失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,business_type,"数据获取成功"));
       }
    });
};