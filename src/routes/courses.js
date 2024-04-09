var express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CourseController');


router.get('/create', coursesController.create); // tinh chat cua route la match tu tren xuong match den dau thi dung o do
router.post('/store', coursesController.store);
router.post('/:id', coursesController.delete);
router.get('/:id/edit', coursesController.edit);
router.post('/:id/edited', coursesController.update);
router.get('/', coursesController.index);
module.exports = router;