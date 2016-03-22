var userDao = require('../../../dao/user');
var response = require('../../../expand_models/response');

module.exports = function(req,res,next){
    var userId = req.body._id;
    var my_info = req.body;

    userDao.update({_id:userId},{$set:my_info}, {upsert : true},function(err,doc){
        if(err){
            res.json(response.create(response.STATUS.FAIL,{},'更新数据失败'));
        }else{
            res.json(response.create(response.STATUS.SUCCESS,{},'基本信息保存成功'));
        }
    })
};