var response = require('../../../expand_models/response'),
    utils = require('../../../expand_models/utils');

module.exports = function(req,res,next){
    req.session.registerInfo = utils.extend(req.session.registerInfo,req.body);
    res.json(response.create(response.STATUS.SUCCESS,{},'保存成功！'));
};