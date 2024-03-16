const mongoose = require('mongoose');

const YourSkill = new mongoose.Schema({
    name: { type: String },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});



const YourSkills = mongoose.model('YourSkill', YourSkill);

module.exports = YourSkills;
