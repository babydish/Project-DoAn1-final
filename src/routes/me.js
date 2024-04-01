var express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');


router.get('/stored/courses', meController.storedCourses); // tinh chat cua route la match tu tren xuong match den dau thi dung o do

module.exports = router;