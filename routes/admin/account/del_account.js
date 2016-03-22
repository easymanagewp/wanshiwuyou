var account_dao = require('../../../dao/account');
var response = require('../../../expand_models/response');

var del = function(req,res){
    var id = req.params.id;
    account_dao.deleteById({_id:id},function(err){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"删除失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,{},"删除成功"));
       }
    });
};

var batchDel = function(req,res){
    var ids = req.body.ids;
    var strIds = ids.split(",");
    strIds.forEach(function(id){
        account_dao.deleteById({_id:id},function(err){});
    });
    res.json(response.create(response.STATUS.SUCCESS,{},"删除成功"));
};


exports.del = del;
exports.batchDel = batchDel;