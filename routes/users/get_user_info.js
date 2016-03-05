var userDao = require('../../dao/user');
var response = require('../../expand_models/response');
var $$Cache = require('../../expand_models/MapCache');

module.exports = function(req,res,next){
    var userId = req.params.user_id;
    if(userId=='current'){
        var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,'userInfo');
        userId = _UserInfo._id;
    }
    userDao.findById(userId,function(err,userInfo){
        if(err){
            res.json(response.create(response.STATUS.FAIL,{},'获取用户信息失败'));
        }else{
            res.json(response.create(response.STATUS.SUCCESS,userInfo,"获取用户信息成功"));
        }
    })
};