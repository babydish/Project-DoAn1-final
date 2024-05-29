const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    course_name: { type: String, required: true },
    course_image: { type: [String] },
    description_course: { type: [String] },
    owner_course: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });



const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;