var express = require('express');
var router = express.Router();

/* 获取业务分类列表 */
router.get('/account.html',require('./to_account'));
router.get('/account.do',require('./get_accounts'));
router.get('/account/:id.do',require('./get_account'));
router.post('/account.do',require('./post_account'));
router.put('/account/:id.do',require('./put_account'));
var del_account = require('./del_account');
router.delete('/account/:id.do',del_account.del);
router.delete('/account.do',del_account.batchDel);

module.exports = router;