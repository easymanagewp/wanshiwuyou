var $$feedbackDao = require('../../../dao/feedback');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    $$feedbackDao.page({},parseInt(req.query.request_page),parseInt(req.query.page_size),function(err, result){
        if(err){
            res.json(response.create(response.STATUS.FAIL,{},"获取数据失败"));
        }else{
            res.json(response.create(response.STATUS.SUCCESS,result,"数据获取成功"));
        }
    });
};