var userDao = require('../../../dao/user');
var response = require('../../../expand_models/response');
var $$LibSolr = require('../../../expand_models/LibSolr')

module.exports = function(req,res,next){
    var userId = req.body._id;
    var business_info = req.body;



    userDao.update({_id:userId},{$set:business_info}, {upsert : true},function(err,doc){
        if(err){
            res.json(response.create(response.STATUS.FAIL,{},'更新数据失败'));
        }else{
            userDao.findByIdAsync(userId).then(function(_User){
                return $$LibSolr.updateAsync(_User)
            }).then(function(){
                $$LibSolr.commit();
                res.json(response.create(response.STATUS.SUCCESS,{},'基本信息保存成功'));
            }).catch(function(){
                console.info('用户信息更新失败');
            });
        }
    })
};