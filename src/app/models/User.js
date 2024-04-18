const mongoose = require('mongoose');


const User = new mongoose.Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String },
    current_skills: { type: [String] }, // Sử dụng kiểu Array để lưu mảng các kỹ năng
    desired_skills: { type: [String] },
    role: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    sender: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });




// creating a model : we need convert to schema into a Model. (mongoose.model('modelName',User))
// const Users = mongoose.model('User', User);
// module.exports = Users;
