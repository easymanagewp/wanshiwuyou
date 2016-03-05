var express = require('express');
var router = express.Router();

/* 获取业务分类列表 */
router.get('/feedback.html',require('./to_feedback'));
router.get('/feedback.do',require('./get_feedbacks'));
router.get('/feedback/:id.do',require('./get_feedback'));
router.put('/feedback/:id.do',require('./put_feedback'));

module.exports = router;