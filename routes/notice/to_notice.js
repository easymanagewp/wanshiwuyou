var $$NoticeDao = require('../../dao/notice');

module.exports = function(req,res){
  var id = req.query.id;

  $$NoticeDao.findByIdAsync(id).then(function(notice){
      res.render('notice/notice_detail',{notice:notice[0]});
  }).catch(function(){
      res.render('notice/notice_detail',{notice:{
        title : '您所访问的公告信息不存在或者已经被删除',
        content : '您所访问的公告信息不存在或者已经被删除'
      }});
  });
};