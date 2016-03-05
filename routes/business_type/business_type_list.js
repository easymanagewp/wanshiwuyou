var business_type_dao = require('../../dao/business_type');
var response = require('../../expand_models/response');

var find_business_type_list = function(req,res,next){
    business_type_dao.find({},function(err,business_types){
        if(err){
            console.error(err);
            res.json(response.create(response.STATUS.FAIL,{},"获取业务分类信息失败！"));
        }else{
            res.json(response.create(response.STATUS.SUCCESS,business_types));
        }
    })
}

module.exports = find_business_type_list;