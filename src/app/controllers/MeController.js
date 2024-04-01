const Course = require('../models/Courses');
const { multipleMongooseToObject, mongooseToObject } = require('../../ultill/mongoose');


class MeController {
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('me/stored-course', { courses: multipleMongooseToObject(courses) });

            })
            .catch(next)

    }
}
module.exports = new MeController();