const Chat = require('../models/Message');
const Profile = require('../models/Profile')

class chatController {

    searchMessage(req, res, next) {
        const sender = req.session.user;
        const keyword = req.query;
        let isOwnMessage = false;
        const receiver_id = req.session.receiver_id;

        Chat.find({
            $or: [
                { sender_id: sender._id, receiver_id: receiver_id },
                { sender_id: receiver_id, receiver_id: sender._id }
            ],
            message: { $regex: keyword.search, $options: 'i' }
        }).sort('createdAt').lean()
            .then(messages => {


                if (messages.length > 0) {

                    const numberResult = messages.length;
                    messages.forEach(message => {
                        if (message.sender_id.toString() === sender._id.toString()) {
                            message.isOwnMessage = true;
                        }
                        message.timestamp = new Date(message.timestamp).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

                    });
                    Profile.findById(receiver_id).lean()
                        .then(receiver_id => {
                            res.render('chat/resultSearch', { sender, receiver_id, messages, isOwnMessage, numberResult, headerChat: true, keyword })

                        })
                } else {
                    res.send('khong tim thay doan chat');
                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    chat(req, res, next) {
        if (req.session.user) {
            const sender = req.session.user;
            let isOwnMessage = false;
            const receiver_id = req.params.id;
            req.session.receiver_id = receiver_id;
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
                        message.timestamp = new Date(message.timestamp).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

                    });
                    Profile.findById(receiver_id).lean()
                        .then(receiver_id => {
                            res.render('chat/chat', { sender, receiver_id, messages, isOwnMessage, headerChat: true })

                        })
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
