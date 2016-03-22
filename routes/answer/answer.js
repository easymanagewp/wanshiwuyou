var express = require('express');
var router = express.Router();

router.get('/answer/answer.do',require('./get_answers'));
router.get('/answer/count.do',require('./get_answer_count'));
router.put('/answer/dontAsk/:answerId.do',require('./put_dont_ask'))

router.get("/answer.html",function(req,res){
   res.render('answer/my_answer');
});
/* 获取业务分类列表 */


module.exports = router;