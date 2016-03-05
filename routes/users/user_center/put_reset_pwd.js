var userDao = require('../../../dao/user');
var response = require('../../../expand_models/response');
var $$Cache = require('../../../expand_models/MapCache');

module.exports = function(req,res,next){
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,'userInfo');
    var user_id = _UserInfo._id;

    if(req.body.new_pwd != req.body.new_pwd_confirm){
        res.json(response.create(response.STATUS.FAIL,{},'两次密码输入不一致'));
    }else{
        userDao.findById(user_id,function(err,doc){
            if(err){
                res.json(response.create(response.STATUS.FAIL,{},'用户信息查找失败'));
            }else{
                if(doc.password != req.body.current_pwd){
                    res.json(response.create(response.STATUS.FAIL,{},'旧密码错误'));
                } else if(doc.password != req.body.new_pwd){
                    userDao.update({_id:user_id},{$set:{password:req.body.new_pwd}}, {upsert : true},function(err){
                        if(err){
                            res.json(response.create(response.STATUS.FAIL,{},'修改密码失败'));
                        }else{
                            res.json(response.create(response.STATUS.SUCCESS,{},'密码修改成功'));
                        }
                    })
                }else {
                    res.json(response.create(response.STATUS.FAIL, {}, '新密码和旧密码不能相同'));
                }
            }
        })
    }
};