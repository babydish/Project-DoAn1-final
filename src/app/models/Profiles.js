const mongoose = require('mongoose');


const Profile = new mongoose.Schema({
    name: { type: String },
    description: { type: String, maxLength: 600 },
    skill_want_to_learn: { type: String },
    skill: { type: String }
})

const Profiles = mongoose.model('Skill_Want_To_Learn', Profile);
module.exports = Profiles;