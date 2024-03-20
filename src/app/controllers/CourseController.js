const Course = require('../models/Courses');
const { multipleMongooseToObject, mongooseToObject } = require('../../ultill/mongoose');


class CoursesController {
    show(req, res, next) {
        //   res.send('course detail ' + req.params.slug); // req.params.name (name is defined in router).with post method we can take data = req.body.name
        Course.findOne({ slug: req.params.slug })
            .then(course => {

                res.render('course/show', { course: mongooseToObject(course) });

            })
            .catch(next);
    };
    create(req, res, next) {
        res.send('course create');
    }
}
module.exports = new CoursesController();