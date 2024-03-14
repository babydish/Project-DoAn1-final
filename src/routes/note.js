var express = require('express');
const router = express.Router();

const noteControllers = require('../app/controllers/NoteControllers');

router.use('/add_note', noteControllers.add_note)
router.use('/', noteControllers.index)

module.exports = router;