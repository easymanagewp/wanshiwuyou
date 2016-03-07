var express = require('express');
var router = express.Router();

var site = require('./to_site');
/* 获取关于我们页面 */
router.get('/site/about.html',site.about);
/* 获取帮助页面 */
router.get('/site/help.html',site.help);
/* 获取使用方法页面 */
router.get('/site/use_method.html',site.useMethod);
/* 获取参股合作页面 */
router.get('/site/cooperation.html',site.cooperation);
/* 更新关于信息 */
router.put('/site/about/:id.do',require('./put_about'));
/* 更新帮助信息 */
router.put('/site/help/:id.do',require('./put_help'));
/* 更新使用方法信息 */
router.put('/site/use_method/:id.do',require('./put_use_method'));
/* 更新参股合作信息 */
router.put('/site/cooperation/:id.do',require('./put_cooperation'));

module.exports = router;