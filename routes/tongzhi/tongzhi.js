var express = require('express'),
    router = express.Router();

router.get('/tongzhi.do',require('./get_tongzhis'));
router.put('/tongzhi/:id.do',require('./put_tongzhi'))

module.exports = router;