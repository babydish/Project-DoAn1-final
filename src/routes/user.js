// dinh tuyen 

const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const Auth = require('../services/auth')

router.get('/logout', userController.logout)
router.get('/login', userController.login)
router.post('/logged', Auth.checkLogged, userController.logged)


module.exports = router;

