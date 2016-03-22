var user_dao = require('../../../dao/user');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    user_dao.updateAsync({_id:id},{$set:{isDel:true}},{}).then(function(){
        res.json(response.create(response.STATUS.SUCCESS,{},"删除用户成功"));
    }).catch(function(){
        res.json(response.create(response.STATUS.FAIL,{},"删除用户失败"));
    });
};