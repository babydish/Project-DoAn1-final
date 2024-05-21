var express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');


router.get('/id_delete', meController.id_delete);
router.post('/course/:id/delete', meController.delete_course)
router.get('/create', meController.stored_create);
router.post('/stored_save', meController.stored_save);
router.get('/information', meController.stored_information); // tinh chat cua route la match tu tren xuong match den dau thi dung o do

module.exports = router;