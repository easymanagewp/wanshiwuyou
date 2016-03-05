var extension_apply_dao = require('../../dao/extension_apply');
var user_dao = require('../../dao/user');
var response = require('../../expand_models/response');
var $$Cache = require('../../expand_models/MapCache');
var $$LibSolr = require('../../expand_models/LibSolr');

module.exports = function(req,res){
    var extension_apply = {};
    extension_apply.apply_time = new Date().getTime();
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,'userInfo');
    var user_id = _UserInfo._id;
    extension_apply.apply_user = user_id;

    // 更新用户信息
    user_dao.update({_id:user_id},{$set:{
        advertisement : req.body.advertisement,
        business : req.body.business,
        business_card : req.body.business_card,
        business_type : req.body.business_type,
        home_page : req.body.home_page
    }},{},function(err,result){

    });

    user_dao.findByIdAsync(user_id).then(function(_User){
        return $$LibSolr.updateAsync(_User)
    }).then(function(){
        return $$LibSolr.commit();
        console.info('用户信息更新失败');
    }).catch(function(){
        console.info('用户信息更新失败');
    })

    extension_apply_dao.save(extension_apply,function(extension_apply){
        res.json(response.create(response.STATUS.SUCCESS,{},'您的推广申请已经移交至系统管理员处，审核通过之后，将会通知您，请耐心等待！'));
    },function(err){
        res.json(response.create(response.STATUS.SUCCESS,{},'推广申请提交失败'));
    });
};