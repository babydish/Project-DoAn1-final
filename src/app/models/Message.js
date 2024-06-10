const mongoose = require('mongoose');
const moment = require('moment-timezone');
const MessageSchema = new mongoose.Schema({
    message: { type: String },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: {
        type: Date,
        default: () => moment().tz('Asia/Ho_Chi_Minh').toDate()
    }

});

// Creating a model: we need to convert the schema into a Model.
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
