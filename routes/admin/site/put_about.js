var $$siteDao = require('../../../dao/site');
var response = require('../../../expand_models/response');

module.exports = function(req,res){
    var id = req.params.id;
    var about = req.body.about;
    $$siteDao.updateAbout(id,about).then(function(){
        res.json(response.create(response.STATUS.SUCCESS,{},"修改成功"));
    }).catch(function(e){
        res.json(response.create(response.STATUS.FAIL,{},"修改失败"));
    });
};