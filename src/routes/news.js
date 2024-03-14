var express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewController');
const NewController = require('../app/controllers/NewController');

router.use('/:slug', NewController.show)
router.use('/', newsController.index)
module.exports = router;