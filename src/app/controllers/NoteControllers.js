
class NoteControllers {
    index(req, res) {
        res.render('notes');

    }
    add_note(req, res) {
        res.send('vao day lam gi');
    }
}

module.exports = new NoteControllers;