var $$noticeDao = require('../../../dao/notice');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    $$noticeDao.findById(id,function(err,notice){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"获取数据失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,notice,"数据获取成功"));
       }
    });
};