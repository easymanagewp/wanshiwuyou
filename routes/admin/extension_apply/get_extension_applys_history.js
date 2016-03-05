var extension_apply_dao = require('../../../dao/extension_apply');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    extension_apply_dao.page({approve_time:{$ne:null}},parseInt(req.query.request_page),parseInt(req.query.page_size),function(err, result){
        if(err){
            console.info(err);
            res.json(response.create(response.STATUS.FAIL,{},"获取数据失败"));
        }else{
            res.json(response.create(response.STATUS.SUCCESS,result,"数据获取成功"));
        }
    });
};