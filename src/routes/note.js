var express = require('express');
const router = express.Router();

const noteControllers = require('../app/controllers/NoteControllers');


router.get('/:slug', noteControllers.add_note)
router.get('/', noteControllers.index)

module.exports = router;