define(['jquery','utils','http','md5'],function($,utils,http,md5){
    var defaultOptions = {
        url : "",                                                               /* 登录地址 */
        md5 : true,                                                             /* 是否对密码进行md5加密*/
        loginNameKey : "loginName",                                         /* 用户名提交的key*/
        validateCodeKey : "code",                                           /* 验证码提交key*/
        passwordElement : ":input[type='password']",                            /* 密码元素 */
        successUrl : "",                                                             /* 登录成功跳转url */
        validateCode : true,
        hint : function(msg,element){                                               /* 信息提示方式 */
            utils.alert(msg);
            element.focus();
        }
    };

    var Login = function(options){};

    Login.prototype.init = function(options){
        var _login = this;
        this._options = $.extend({},defaultOptions,options);
        $('form').on('submit',function(){
          _login.action();
          return false;
        })
        return this;
    };

    Login.prototype.getLoginName = function(){
        return this.getLoginNameElement().val();
    };

    Login.prototype.getLoginNameElement = function(){
        return $(":input[name='"+this._options.loginNameKey+"']");
    };

    Login.prototype.getPassword = function(){
        return this.getPasswordElement().val();
    };

    Login.prototype.getPasswordElement = function(){
        return $(this._options.passwordElement);
    };



    Login.prototype.getValidateCode = function(){
        return this.getValidateCodeElement().val();
    };

    Login.prototype.getValidateCodeElement = function(){
        return $(":input[name='"+this._options.validateCodeKey+"']");
    };

    Login.prototype.action = function(){
       var params = {};
        var inthis = this;
       params[inthis._options.loginNameKey] = inthis.getLoginName();
       if(inthis._options.validateCode){
         params[inthis._options.validateCodeKey] = inthis.getValidateCode();
        }
       if(inthis._options.md5 && utils.strNotBlankOrNull(inthis.getPassword())){
           params["password"] = md5(inthis.getPassword());
       }else{
           params["password"] = inthis.getPassword();
       }

       if(utils.strIsBlankOrNull(params[inthis._options.loginNameKey])){
           inthis._options.hint("用户名不能为空",inthis.getLoginNameElement());
           return false;
       }

       if(utils.strIsBlankOrNull(params["password"])){
           inthis._options.hint("登录密码不能为空",inthis.getPasswordElement());
           return false;
       }

       if(inthis._options.validateCode && utils.strIsBlankOrNull(params[inthis._options.validateCodeKey])){
           inthis._options.hint("请填写验证码",inthis.getValidateCodeElement());
           return false;
       }

       http.Post(inthis._options.url).params(params).success(function(resp){
            if(http.ValidateResp.success(resp)){
                utils.next(inthis._options.successUrl);
            }else{
                inthis._options.hint(resp.status,inthis.getLoginNameElement())
            }
       }).error(function(){
           inthis._options.hint("登录失败，请检查网络是否连接",inthis.getLoginNameElement());
       }).go();
    };

    return {
        /* 初始化登录对象 */
        init : function(settings){
            return new Login().init(settings);
        },
        /* 验证用户是否登录 */
        $ValidateLogin : function(_ValidateUrl){
            if(!_ValidateUrl){
                _ValidateUrl = "/login/validate.do";
            }
            var _IsLogin = false;
            http.Get(_ValidateUrl).async(!1).success(function(resp){
                _IsLogin = resp;
            }).go();
            return _IsLogin;
        }
    };
});
