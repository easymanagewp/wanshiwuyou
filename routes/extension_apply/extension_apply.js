var express = require('express'),
    router = express.Router(),
    response = require('../../expand_models/response'),
    $ = require('../../expand_models/utils');

router.get("/apply.html",require('./to_extension_apply'));
router.post('/apply.do',require('./post_extension_apply'));

module.exports = router;