/**
 * 登录页面
 * @type {*|exports|module.exports}
 */

var express = require('express');
var router = express.Router();
var $$Account = require('../../../dao/account');
var $$Response = require('../../../expand_models/response');
var uuid = require('node-uuid');

/**
 * 跳转登录页面
 */
router.get('/login.html',function(req,res){
    res.render('admin/login/login');
});

/**
 * 用户登录
 */
router.post('/login.do',function(req,res){
    var _LoginName = req.body.login_name;
    var _Password = req.body.password;

    $$Account.findByLoginNameAndPwd(_LoginName,_Password,function(err,doc){
        if(err || doc.length != 1){
            res.json($$Response.create($$Response.STATUS.FAIL,err,'用户名或密码错误'));
        }else{
            var usertoken = uuid.v4();
            $$MapCache.$AddCache(usertoken,"accountInfo",doc[0]);
            var $Users = $$MapCache.$GetCacheScope("accounts");
            var userTokens = $Users[doc[0]._id];
            if(!userTokens){
                userTokens = [];
            }
            userTokens.push(usertoken);
            $$MapCache.$AddCache("accounts",doc[0]._id,userTokens);
            //res.setHeader("Set-Cookie", val)
            res.cookie('account_token',usertoken);
            res.json($$Response.create($$Response.STATUS.SUCCESS,{},'登录成功'));
        }
    });
});

module.exports = router;