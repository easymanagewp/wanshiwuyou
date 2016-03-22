var user_dao = require('../../../dao/user');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    user_dao.findById(id,function(err, user){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"获取数据失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,user,"数据获取成功"));
       }
    });
};