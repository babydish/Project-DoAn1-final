const mongoose = require('mongoose');


const Profile = new mongoose.Schema({


    email: { type: String },
    name: { type: String },
    password: { type: String },
    skill_want_to_learn: { type: String },
    current_skills: { type: String },
    avatar: { type: String },
    role: { type: String },

}, { timestamps: true });



// creating a model : we need convert to schema into a Model. (mongoose.model('modelName',Profile))
const Profiles = mongoose.model('User', Profile);
module.exports = Profiles;
