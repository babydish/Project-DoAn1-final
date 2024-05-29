const mongoose = require('mongoose');


const Profile = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    skill_want_to_learn: { type: String, required: true },
    current_skills: { type: String, required: true },
    course_name: { type: String, default: true },
    course_image: { type: String, default: 'Chưa Có Khóa Học' },
    description_course: { type: String, default: 'Chưa Có Khóa Học' },
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

