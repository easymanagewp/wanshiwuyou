var extension_apply_dao = require('../../../dao/extension_apply');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    extension_apply_dao.findById(id,function(err, extension_apply){
       if(err){
           res.json(response.create(response.STATUS.FAIL,{},"获取数据失败"));
       }else{
           res.json(response.create(response.STATUS.SUCCESS,extension_apply,"数据获取成功"));
       }
    });
};