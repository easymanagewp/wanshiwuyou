var $$TongZhiDao = require('../../dao/tongZhi'),
    $$Cache = require('../../expand_models/MapCache'),
    response = require('../../expand_models/response');

module.exports = function(req,res,next){
  var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,'userInfo');
  var user_id = _UserInfo._id;

  $$TongZhiDao.findAsync({isRead:false,userId:user_id}).then(function(tongZhis){
      res.json(response.create(response.STATUS.SUCCESS,tongZhis,"获取成功"));
  }).catch(function(){
      res.json(response.create(response.STATUS.FAIL,{},"获取失败"));
  });
};