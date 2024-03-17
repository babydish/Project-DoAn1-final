
class NoteControllers {
    index(req, res) {
        res.render('notes');

    }
    add_note(req, res) {
        res.send('hello')
    }
}

module.exports = new NoteControllers;