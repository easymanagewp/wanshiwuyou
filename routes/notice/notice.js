var express = require('express'),
    router = express.Router();

router.get('/notice/detail.html',require('./to_notice'));
router.get('/notice.do',require('./get_notices'));

module.exports = router;