var express = require('express');
var router = express.Router();

/* 获取业务分类列表 */
router.get('/notice.html',require('./to_notice'));
router.get('/notice.do',require('./get_notices'));
router.get('/notice/:id.do',require('./get_notice'));
router.post('/notice.do',require('./post_notice'));
router.put('/notice/:id.do',require('./put_notice'));
var del_notice = require('./del_notice');
router.delete('/notice/:id.do',del_notice.del);
router.delete('/notice.do',del_notice.batchDel);

module.exports = router;