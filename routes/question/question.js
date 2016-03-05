var express = require('express'),
    router = express.Router();

router.post('/question.do',require('./post_question'));
router.get('/question/count.do',require('./get_question_count'))
router.get('/question.do',require('./get_questions'));
router.put('/question/dontAsk/:questionId.do',require('./put_dont_ask'));
router.get('/question/answers/:questionId.do',require('./get_answers'))

router.get('/my_question.html',function(req,res){
   res.render('question/my_question',{});
});

module.exports = router;