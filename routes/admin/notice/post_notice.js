var $$noticeDao = require('../../../dao/notice');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var notice = req.body;
    $$noticeDao.save(notice,function(){
        res.json(response.create(response.STATUS.SUCCESS,{},"保存成功"));
    },function(){
        res.json(response.create(response.STATUS.FAIL,{},"保存失败"));
    });
};