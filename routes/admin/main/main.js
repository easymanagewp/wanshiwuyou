var express = require('express');
var router = express.Router();

router.get('/main.html',require('./to_main'));
router.get('/main/head_menu.do',require('./get_head_menu'));

module.exports = router;