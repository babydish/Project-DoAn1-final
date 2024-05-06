// dinh tuyen 

const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const Auth = require('../services/auth')


router.get('/search', siteController.search)
router.get('/', siteController.index);

module.exports = router;

