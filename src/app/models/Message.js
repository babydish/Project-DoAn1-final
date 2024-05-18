const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: { type: String },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: {
        type: Date,
        default: () => {
            const utcDate = new Date();
            const vietnamTimeString = utcDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            return new Date(vietnamTimeString);
        }
    },
});

// Creating a model: we need to convert the schema into a Model.
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
