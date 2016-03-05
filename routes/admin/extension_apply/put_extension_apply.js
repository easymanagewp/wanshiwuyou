var extension_apply_dao = require('../../../dao/extension_apply');
var response = require('../../../expand_models/response');
var $$UserDao = require('../../../dao/user');
var $$Cache = require('../../../expand_models/MapCache');

module.exports = function(req,res){
    var id = req.params.id;

    // 审批结果
    var approve_result = Boolean(req.body.approve_result);
    // 审批意见
    var approve_content = req.body.approve_content;
    extension_apply_dao.update({_id:id},{$set:{
        approve_result:approve_result,
        approve_content:approve_content,
        approve_time : new Date().getTime()
    }},{},function(err){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"修改失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,{},"修改成功"));
       }
    });

    // 审批通过
    if(approve_result){
        extension_apply_dao.findByIdAsync(id).then(function(_ExtensionApply){
            _ExtensionApply = _ExtensionApply[0];
            return $$UserDao.findByIdAsync(_ExtensionApply.apply_user);
        }).then(function(_ApplyUser){
            _ApplyUser = _ApplyUser[0];
            return $$UserDao.updateAsync({_id:_ApplyUser._id},{$set:{extension:!0}});
        }).then(function(){
            // 发送站内信
            console.info('用户信息更新成功');
        }).catch(function(err){
            console.error('用户信息更新失败');
        })
    }
};