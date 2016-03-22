var express = require('express'),
    router = express.Router();

router.get("/conversation/count.do",require('./get_conversations_count'));
router.get("/conversation/view.do",require('./get_conversations_view'));
router.get("/conversation/:question.do",require('./get_conversations'));
router.put("/conversation/read/:id.do",require('./put_conversation_read'))

module.exports = router;