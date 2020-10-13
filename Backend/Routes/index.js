const router = require('express')();
const chatController = require('../Controllers/chat');

router.get('/', chatController.chat);

module.exports = router;
