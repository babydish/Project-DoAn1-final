const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
    message: { type: String },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
});

// creating a model : we need convert to schema into a Model. (mongoose.model('modelName',Profile))

const MessageSchemas = mongoose.model('Message', MessageSchema)

module.exports = MessageSchemas;

