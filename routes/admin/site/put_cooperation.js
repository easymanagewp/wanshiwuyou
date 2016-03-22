/**
 * Created by wangpeng on 16/3/6.
 */
var $$siteDao = require('../../../dao/site');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    var cooperation = req.body.cooperation;
    $$siteDao.updateCooperation(id,cooperation).then(function(){
        res.json(response.create(response.STATUS.SUCCESS,{},"修改成功"));
    }).catch(function(e){
        res.json(response.create(response.STATUS.FAIL,{},"修改失败"));
    });
};