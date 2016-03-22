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

module.exports = router;