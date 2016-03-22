var $$User = require('../../dao/user'),
    $$Utils = require('../../expand_models/utils'),
    response = require('../../expand_models/response');

module.exports = {
    $BaseInfo : function(_RegisterInfo,req,res,_InfoCount,messages){
        if(!_InfoCount){
            _InfoCount = 0;
        }
        if(!messages){
            messages = {};
        }
        messages = $$Utils.extend({
            _loginName : "您的登录名已经被注册"
        },messages);

        // 登录名称不能为空
        if($$Utils.strIsBlank(_RegisterInfo.login_name)){
            res.json(response.create(response.STATUS.FAIL,{},'请填写您的登录名称，可以为QQ/电话/邮箱等'));
            return;
        }

        return $$User.countAsync({login_name:_RegisterInfo.login_name}).then(function(count) { // 验证qq号码
            if (count > _InfoCount) {
                throw new Error(1);
            }
        }).catch(function(err){
            switch (err.message){
                case "1":
                    res.json(response.create(response.STATUS.FAIL,{},messages._loginName));
                    break;
                default :
                    res.json(response.create(response.STATUS.FAIL,{},'未知异常，我们正在快马加鞭的处理，请稍后再进行尝试'));
            }
        });
    }
}