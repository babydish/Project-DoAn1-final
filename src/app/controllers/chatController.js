const Chat = require('../models/Message');
const Profile = require('../models/Profile')

class chatController {
    chat(req, res, next) {
        if (req.session.user) {
            const sender = req.session.user;


            const receiver_id = req.params.id;
            res.locals.userData = sender;
            res.render('chat/chat', { sender, receiver_id })
        } else {
            res.send('<a href="/">Login To Chat')

        }

    }



};

module.exports = new chatController();
