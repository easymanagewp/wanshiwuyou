var $$noticeDao = require('../../../dao/notice');
var response = require('../../../expand_models/response');

var del = function(req,res){
    var id = req.params.id;
    $$noticeDao.deleteById({_id:id},function(err){
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
        $$noticeDao.deleteById({_id:id},function(err){});
    });
    res.json(response.create(response.STATUS.SUCCESS,{},"删除成功"));
};


exports.del = del;
exports.batchDel = batchDel;