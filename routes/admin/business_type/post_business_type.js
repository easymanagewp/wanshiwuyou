var business_type_dao = require('../../../dao/business_type');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var business_type = req.body;
    business_type_dao.save(business_type,function(){
        res.json(response.create(response.STATUS.SUCCESS,{},"保存成功"));
    },function(){
        res.json(response.create(response.STATUS.FAIL,{},"保存失败"));
    });
};