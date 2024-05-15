const mongoose = require('mongoose');


const Profile = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String },
    skill_want_to_learn: { type: String },
    current_skills: { type: String },
    course_image: { type: String },
    description_course: { type: String },
    avatar: { type: String },
    is_online: {
        type: String,
        default: '0'
    },
    role: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]


}, { timestamps: true });


// creating a model : we need convert to schema into a Model. (mongoose.model('modelName',Profile))
const Profiles = mongoose.model('User', Profile);
module.exports = Profiles;

