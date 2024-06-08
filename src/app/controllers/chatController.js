const Chat = require('../models/Message');
const Profile = require('../models/Profile')

class chatController {
    listMessenger(req, res, next) {
        const user = req.session.user;
        const displayedUsers = new Map();
        const sentUsers = new Map(); // Sử dụng Map để lưu trữ thông tin người nhận
        res.locals.userData = user;

        //  Tìm người dùng mà mình đã gửi tin nhắn
        Chat.find({ sender_id: user._id })
            .populate('receiver_id')
            .lean()
            .then((sentMessages) => {

                sentMessages.forEach((message) => {

                    if (message.receiver_id && message.receiver_id._id) {
                        sentUsers.set(message.receiver_id._id.toString(), message.receiver_id);

                    }
                });

                // Step 2: Find users that have sent messages to the current user
                Chat.find({ receiver_id: user._id })
                    .populate('sender_id')
                    .lean()
                    .then((receivedMessages) => {
                        receivedMessages.forEach((message) => {
                            if (message.sender_id && message.sender_id._id) {
                                const senderId = message.sender_id._id.toString();

                                // Check if the sender is not in the list of users that the current user has sent messages to
                                if (!sentUsers.has(senderId)) {
                                    if (!displayedUsers.has(senderId)) {
                                        displayedUsers.set(senderId, message.sender_id);
                                    }
                                }
                            }
                        });

                        const uniqueUsers = Array.from(displayedUsers.values());
                        const sentUserList = Array.from(sentUsers.values());


                        // Render both sentUsers and uniqueUsers
                        res.render('chat/listMessenger', { sentUsers: sentUserList, uniqueUsers });
                    })
                    .catch(next);
            })
            .catch(next);

    }


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

                            if (receiver_id.is_online == 1) {
                                var onlineUser = true;
                            }
                            res.render('chat/chat', { sender, receiver_id, messages, isOwnMessage, headerChat: true, onlineUser })

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
