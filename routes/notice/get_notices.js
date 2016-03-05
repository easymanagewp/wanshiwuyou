var $$NoticeDao = require('../../dao/notice'),
    response = require('../../expand_models/response');

module.exports = function(req,res,next){
  var page = 1;
  $$NoticeDao.page({},page,10,function(err,result){
    if(err){
      res.json(response.create(response.STATUS.FAIL,{},"获取公告信息失败！"));
    }else{
      res.json(response.create(response.STATUS.SUCCESS,result.rows));
    }
  });
};