var express = require('express');
const router = express.Router();
const chatController = require('../app/controllers/chatController');
const upload = require('../services/upload');

router.get('/listMessenger', chatController.listMessenger)
router.get('/searchMessage', chatController.searchMessage)
router.post('/upload', upload.single('file'), chatController.uploadFile); // New route for file upload

router.get('/:id', chatController.chat); // tinh chat cua route la match tu tren xuong match den dau thi dung o do

module.exports = router;