var response = require('../../../expand_models/response'),
    utils = require('../../../expand_models/utils'),
    $$LibSolr = require('../../../expand_models/LibSolr'),
    user_dao = require('../../../dao/user'),
    $$Validate = require('../Validate');

module.exports = function(req,res,next){
    var _RegisterInfo = req.session.registerInfo = utils.extend(req.session.registerInfo,req.body)
    $$Validate.$BaseInfo(_RegisterInfo,req,res).then(function(){
        user_dao.saveAsync(_RegisterInfo).then(function(doc){
            $$LibSolr.addAsync([doc]).then(function(){  // 添加索引
                return $$LibSolr.commitAsync();
            }).then(function(){
                req.session.registerInfo = {};
                res.json(response.create(response.STATUS.SUCCESS,{},'注册成功！'));
            }).catch(function(err){ // 添加索引失败
                res.json(response.create(response.STATUS.SUCCESS,{},'注册成功,但是向用户信息库推送信息失败，可能导致短时间内您无法收到其他用户提问的问题推送！'));
            });
        }).catch(function(err){ // 保存用户失败
            res.json(response.create(response.STATUS.SUCCESS,err,'注册失败！'));
        })
    });
};