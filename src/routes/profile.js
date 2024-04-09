var express = require('express');
const router = express.Router();

const profileControllers = require('../app/controllers/ProfileController');


router.get('/', profileControllers.index)
module.exports = router;




