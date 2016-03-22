var account_dao = require('../../../dao/account');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var account = req.body;
    account_dao.save(account,function(){
        res.json(response.create(response.STATUS.SUCCESS,{},"保存成功"));
    },function(){
        res.json(response.create(response.STATUS.FAIL,{},"保存失败"));
    });
};