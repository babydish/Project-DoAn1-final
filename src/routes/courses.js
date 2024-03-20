var express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CourseController');


router.get('/create', coursesController.create); // tinh chat cua route la match tu tren xuong match den dau thi dung o do
router.post('/store', coursesController.store);
router.get('/:slug', coursesController.show);
module.exports = router;