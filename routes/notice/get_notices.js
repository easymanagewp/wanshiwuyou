var $$NoticeDao = require('../../dao/notice'),
    response = require('../../expand_models/response');

module.exports = function(req,res,next){
  var page = 1;
  $$NoticeDao.page({},page,10,function(err,result){
    if(err){
      res.json(response.create(response.STATUS.FAIL,{},"��ȡ������Ϣʧ�ܣ�"));
    }else{
      res.json(response.create(response.STATUS.SUCCESS,result.rows));
    }
  });
};