var user_dao = require('../../../dao/user');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    user_dao.page({},parseInt(req.query.request_page),parseInt(req.query.page_size),function(err, result){
        if(err){
            res.json(response.create(response.STATUS.FAIL,{},"获取数据失败"));
        }else{
            res.json(response.create(response.STATUS.SUCCESS,result,"数据获取成功"));
        }
    });
};