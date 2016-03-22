var response = require('../../../expand_models/response'),
    $$Validate = require('../Validate');

module.exports = function(req,res,next){
    var _RegisterInfo = req.session.registerInfo = req.body;
    $$Validate.$BaseInfo(_RegisterInfo,req,res).then(function(){
        if(parseInt(req.session.registerInfo.login_name)==0){
            req.session.registerInfo.login_name = req.session.registerInfo.qq;
        }else if(parseInt(req.session.registerInfo.login_name)==1){
            req.session.registerInfo.login_name = req.session.registerInfo.phone;
        }else if(parseInt(req.session.registerInfo.login_name)==2){
            req.session.registerInfo.login_name = req.session.registerInfo.email;
        }
        res.json(response.create(response.STATUS.SUCCESS,{},'保存成功！'));
    });
};