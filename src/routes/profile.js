// dinh tuyen 

const express = require('express');
const router = express.Router();
const profileController = require('../app/controllers/ProfileController');
const checkRegister = require('../services/checkRegister');
const upload = require('../services/upload')

router.get('/create', profileController.create);
router.post('/store', upload.single('avatar'), profileController.store);
router.get('/information/:id', profileController.information)
router.post('/:id/delete', profileController.delete)

router.get('/:id/edit', profileController.edit);
router.post('/:id/edited', upload.single('avatar'), profileController.update);

router.get('/show', profileController.show);



module.exports = router;

