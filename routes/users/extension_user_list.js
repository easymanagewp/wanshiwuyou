var user_dao = require('../../dao/user');
var response = require('../../expand_models/response');

var extension_user_list = function(req,res,next){
    var page = req.query.page;
    var business_type = req.query.business_type_code;
    var params = {
        extension:!0
    };
    if(business_type){
        params.business_type = business_type;
    }
    user_dao.page(params,page,10,function(err,result){
        if(err){
            res.json(response.create(response.STATUS.FAIL,{},"获取推广信息失败！"));
        }else{
            res.json(response.create(response.STATUS.SUCCESS,result.rows));
        }
    });
};

module.exports = extension_user_list;