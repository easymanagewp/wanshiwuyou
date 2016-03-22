/**
 * Created by wangpeng on 16/3/6.
 */
var $$siteDao = require('../../../dao/site');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    var useMethod = req.body.useMethod;
    $$siteDao.updateUseMethod(id,useMethod).then(function(){
        res.json(response.create(response.STATUS.SUCCESS,{},"修改成功"));
    }).catch(function(e){
        res.json(response.create(response.STATUS.FAIL,{},"修改失败"));
    });
};