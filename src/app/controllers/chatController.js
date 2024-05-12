const Chat = require('../models/Message');
const Profile = require('../models/Profile')

class chatController {
    fetchChat(req, res, next) {
        const sender_id = req.session.user._id;


        fetch('http://localhost:5000/chat/apiChat')
            .then(function (response) {
                return response.json()
            })
            .then(chat => {
                if (sender_id === chat.sender_id & receiver_id === chat.receiver_id) {
                    res.json(chat)

                }
                res.render('chat/historyChat', { chat })
            })
    }

    apiChat(req, res, next) {
        Chat.find().lean()
            .then((chat) => {
                res.json(chat);
            })
    }


    chat(req, res, next) {
        if (req.session.user) {
            const sender = req.session.user;
            let isOwnMessage = false;
            const receiver_id = req.params.id;
            res.locals.userData = sender;
            Chat.find({
                $or: [
                    { sender_id: sender._id, receiver_id: receiver_id },
                    { sender_id: receiver_id, receiver_id: sender._id }
                ]
            }).sort('createdAt').lean()
                .then(messages => {

                    messages.forEach(message => {
                        if (message.sender_id.toString() === sender._id.toString()) {
                            message.isOwnMessage = true;
                        }

                    });
                    res.render('chat/chat', { sender, receiver_id, messages, isOwnMessage })

                })
                .catch(err => {
                    console.log(err);
                })


        } else {
            res.send('<a href="/user/login">Login To Chat')

        }

    }
};

module.exports = new chatController();
