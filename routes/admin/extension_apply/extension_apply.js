var express = require('express');
var router = express.Router();

/* 获取业务分类列表 */
router.get('/extension_apply.html',require('./to_extension_apply'));
router.get('/extension_apply.do',require('./get_extension_applys'));
router.get('/extension_apply/:id.do',require('./get_extension_apply'));
router.put('/extension_apply/:id.do',require('./put_extension_apply'));

router.get('/extension_apply_history.html',require('./to_extension_apply_history'));
router.get('/extension_apply_history.do',require('./get_extension_applys_history'))

module.exports = router;