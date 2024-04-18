// dinh tuyen 

const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/information/:id', userController.information)
router.get('/', userController.index);

module.exports = router;

