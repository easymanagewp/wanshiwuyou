var userDao = require('../../../dao/user');
var response = require('../../../expand_models/response'),
    $$Utils = require('../../../expand_models/utils'),
    $$Validate = require('../Validate');

module.exports = function(req,res,next){
    var _UserInfo = req.body;

    // 登录名称必填
    if($$Utils.strIsBlank(_UserInfo.login_name)){
        res.json(response.create(response.STATUS.FAIL,{},'请填写您的登录名称，可以为邮箱，QQ，手机号码等'));
        return;
    }

    /**
     * 获取用户原本数据，去除重复信息之后，再进行修改验证
     */
    var userId = req.body._id;
    var _UpdateUserInfo = {};
    userDao.findByIdAsync(userId).then(function(user){
        user = user[0];
        if(_UserInfo.login_name != user.login_name){
            _UpdateUserInfo['login_name'] = _UserInfo.login_name;
        }

        if(_UserInfo.nickname != user.nickname){
            _UpdateUserInfo['nickname'] = _UserInfo.nickname;
        }
        return userDao.countAsync({login_name:_UpdateUserInfo.login_name});
    }).then(function(count){ // 验证登录名称
        if(count>0 && $$Utils.strIsNotBlank(_UpdateUserInfo.login_name)){
            throw new Error(1);
        }
        return userDao.updateAsync({_id:userId},{$set:_UpdateUserInfo}, {upsert : true});   // 更新用户基本信息
    }).then(function(){
        res.json(response.create(response.STATUS.SUCCESS,{},'基本信息保存成功'));
    }).catch(function(err){
        switch (err.message){
            case "1":
                res.json(response.create(response.STATUS.FAIL,{},'您的登录名称已被注册'));
                break;
            default :
                console.info(err);
                res.json(response.create(response.STATUS.FAIL,{},'未知异常，我们正在快马加鞭的处理，请稍后再进行尝试'));
        }
    });
};