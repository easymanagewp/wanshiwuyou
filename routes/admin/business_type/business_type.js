var express = require('express');
var router = express.Router();

/* 获取业务分类列表 */
router.get('/business_type.html',require('./to_business_type'));
router.get('/business_type.do',require('./get_business_types'));
router.get('/business_type/:id.do',require('./get_business_type'));
router.post('/business_type.do',require('./post_business_type'));
router.put('/business_type/:id.do',require('./put_business_type'));
var del_business_type = require('./del_business_type');
router.delete('/business_type/:id.do',del_business_type.del);
router.delete('/business_type.do',del_business_type.batchDel);

module.exports = router;