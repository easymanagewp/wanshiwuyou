var express = require('express');
var router = express.Router();

/* 获取业务分类列表 */
router.get('/user.html',require('./to_user'));
router.get('/user.do',require('./get_users'));
router.get('/user/:id.do',require('./get_user'));
router.delete('/user/:id.do',require('./del_user'));

module.exports = router;