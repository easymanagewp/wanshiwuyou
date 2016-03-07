var extension_apply_dao = require('../../../dao/extension_apply');
var response = require('../../../expand_models/response');
var $$UserDao = require('../../../dao/user');
var $$Cache = require('../../../expand_models/MapCache');
var $$TongZhi = require('../../../dao/tongZhi');

module.exports = function(req,res){
    var id = req.params.id;

    // 审批结果
    var approve_result = req.body.approve_result;
    if(approve_result=="true"){
        approve_result = true;
    }else{
        approve_result = false;
    }
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
        var _ApplyUserInfo = null;
        extension_apply_dao.findByIdAsync(id).then(function(_ExtensionApply){
            _ExtensionApply = _ExtensionApply[0];
            return $$UserDao.findByIdAsync(_ExtensionApply.apply_user);
        }).then(function(_ApplyUser){
            _ApplyUserInfo = _ApplyUser = _ApplyUser[0];
            return $$UserDao.updateAsync({_id:_ApplyUser._id},{$set:{extension:!0}});
        }).then(function(){
            // 发送站内信
            $$TongZhi.send("尊敬的用户,您的推广申请已经审核通过",_ApplyUserInfo._id)
            console.info('用户信息更新成功');
        }).catch(function(err){
            console.error('用户信息更新失败');
        })
    }else{
        extension_apply_dao.findByIdAsync(id).then(function(_ExtensionApply){
            $$TongZhi.send("尊敬的用户,您的推广申请未通过审核:"+((approve_content=="undefined" || approve_content==undefined) ? "":approve_content),_ExtensionApply[0].apply_user);
        })
    }
};