const Course = require('../models/Courses');
const { multipleMongooseToObject, mongooseToObject } = require('../../ultill/mongoose');


class CoursesController {
    // [POST] /course/:id (update)
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body) // condition,object . _id: req.params.id : _id: database, req.params.name_route
            .then(() => res.redirect('/me/stored/courses')) // chuyển hướng về trang đc cấu hình. tính chất : Thêm trường Location vào response header của giao thức HTTP 


    }

    // [GET] /course/:_id/edit
    edit(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then(course => {
                res.render('course/edit', { course: mongooseToObject(course) })
            })




    }
    // [GET] /course/show
    show(req, res, next) {
        // course detail
        //   res.send('course detail ' + req.params.slug); // req.params.name (name is defined in router).with post method we can take data = req.body.name
        Course.findOne({ slug: req.params.slug })
            .then(course => {

                res.render('course/show', { course: mongooseToObject(course) });

            })
            .catch(next);
    };

    // [GET] /course/cr eate
    create(req, res, next) {
        res.render('course/create');
        // create a new course
    }

    // [POST] /course/store
    store(req, res, next) {
        // res.json(req.body);
        const course = new Course(req.body);

        // luu data vao database
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => { })
    }
    index(req, res, next) {
        res.render('course');
    }
}
module.exports = new CoursesController();