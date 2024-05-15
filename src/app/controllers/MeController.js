const Me = require('../models/Profile');
const Course = require('../models/Courses');

class MeController {
    stored_save(req, res, next) {
        const user = req.session.user;
        const courses = new Course(req.body);
        courses.save()
            .then((course) => {
                // Tìm hồ sơ người dùng và thêm khóa học vào trường 'courses'
                return Me.findOneAndUpdate(
                    { email: user.email },
                    { $push: { courses: course._id } },
                    { new: true, useFindAndModify: false }
                );
            })
            .then((profile) => {
                if (profile) {

                    res.redirect('/profile/show');
                } else {
                    res.send('Không tìm thấy hồ sơ');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    stored_create(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;
        res.render('me/uploadCourse', { user })
    }

    stored_information(req, res, next) {
        Me.find({}).lean()
            .then(me => {
                const user = req.session.user;
                res.locals.userData = user;
                res.render('me/store_profile', { me })
            })

    }
};

module.exports = new MeController();
