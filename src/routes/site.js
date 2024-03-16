var express = require('express');
const router = express.Router();

const newsSiteControllers = require('../app/controllers/SiteControllers');


router.get('/search', newsSiteControllers.search)
router.get('/', newsSiteControllers.index)
module.exports = router;