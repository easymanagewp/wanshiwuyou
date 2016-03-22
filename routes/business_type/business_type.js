var express = require('express');
var router = express.Router();

/* 获取业务分类列表 */
router.get('/business_type.do',require('./business_type_list'));

module.exports = router;