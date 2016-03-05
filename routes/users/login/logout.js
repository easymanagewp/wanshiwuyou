var response = require('../../../expand_models/response'),
    $$Cache = require('../../../expand_models/MapCache');

module.exports = function(req,res,next){
    $$Cache.$RemoveCache(req.cookies.user_token,'userInfo')
    res.json(response.create(response.STATUS.SUCCESS,{},"退出登录"));
};