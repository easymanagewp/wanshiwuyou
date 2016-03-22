var $$NoticeDao = require('../../dao/notice');

module.exports = function(req,res){
  var id = req.query.id;

  $$NoticeDao.findByIdAsync(id).then(function(notice){
      res.render('notice/notice_detail',{notice:notice[0]});
  }).catch(function(){
      res.render('notice/notice_detail',{notice:{
        title : '�������ʵĹ�����Ϣ�����ڻ����Ѿ���ɾ��',
        content : '�������ʵĹ�����Ϣ�����ڻ����Ѿ���ɾ��'
      }});
  });
};