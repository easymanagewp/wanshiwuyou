var express = require('express'),
    router = express.Router();

router.get('/feedback.html',require('./to_feedback'));
router.post('/feedback.do',require('./post_feedback'));

module.exports = router;