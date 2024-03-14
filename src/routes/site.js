var express = require('express');
const router = express.Router();

const newsSiteControllers = require('../app/controllers/SiteControllers');


router.use('/search', newsSiteControllers.search)
router.use('/', newsSiteControllers.index)
module.exports = router;