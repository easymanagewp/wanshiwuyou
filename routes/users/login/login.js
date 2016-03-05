var response = require('../../../expand_models/response'),
    uuid = require('node-uuid');
    $$MapCache = require('../../../expand_models/MapCache');
    user_dao = require('../../../dao/user');

/* 用户登录 */
module.exports = function(req,res,next){
  var login_name = req.body.login_name;
  var password = req.body.password;
  var _ValidateCode = req.body.validate_code;
  if(_ValidateCode.toUpperCase()!=req.session.validate_code.toUpperCase()){
    res.json(response.create(response.STATUS.FAIL,{},'验证码输入错误'));
    return;
  }

  user_dao.findByLoginNameAndPwd(login_name,password,function(err,doc){
    if(err || doc.length != 1){
      res.json(response.create(response.STATUS.FAIL,err,'用户名或密码错误'));
    }else{
      var usertoken = uuid.v4();
      $$MapCache.$AddCache(usertoken,"userInfo",doc[0]);
      var $Users = $$MapCache.$GetCacheScope("users");
      var userTokens = $Users[doc[0]._id];
      if(!userTokens){
        userTokens = [];
      }
      userTokens.push(usertoken);
      $$MapCache.$AddCache("users",doc[0]._id,userTokens);
      //res.setHeader("Set-Cookie", val)
      res.cookie('user_token',usertoken);
      res.json(response.create(response.STATUS.SUCCESS,{},'登录成功'));
    }
  });
};

