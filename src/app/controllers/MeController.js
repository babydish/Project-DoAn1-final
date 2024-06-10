const Me = require('../models/Profile');
const Course = require('../models/Courses');

class MeController {
    edited(req, res, next) {
        const courseData = {
            ...req.body,
            course_image: req.file ? req.file.filename : '', // Thêm tên tệp hình ảnh vào mảng

        };
        Course.updateOne({ _id: req.params.id }, courseData).lean()
            .then(() => {
                res.redirect('/store/id_delete')
            })
            .catch(err => {
                console.log('Chua update duoc anh: ', err)
            })


    }

    edit(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;
        Course.findById(req.params.id).lean()
            .then(information_id => {
                res.render('me/edit_course', { information_id })
            })


    }

    // [POST] /store/course/:id/delete_course
    delete_course(req, res, next) {
        const idCourseDelete = req.params.id
        // Xóa khóa học
        Course.deleteOne({ _id: req.params.id })
            .then(() => {

                // Cập nhật trường courses trong tài khoản người dùng
                return Me.findOneAndUpdate(
                    { _id: req.session.user._id }, // Tìm người dùng dựa trên _id
                    { $pull: { courses: idCourseDelete } }, // Loại bỏ khóa học khỏi danh sách courses
                    { new: true } // Trả về tài khoản người dùng đã được cập nhật
                );
            })
            .then(updatedUser => {
                // Chuyển hướng đến trang thông báo xóa thành công
                res.redirect('/store/id_delete');
            })
            .catch(err => {
                res.send(err);
            });
    }

    // [GET] /store/id_delete
    id_delete(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;

        Course.find({ owner_course: user._id }).lean()
            .then(course => {

                res.render('me/store_course', { course })
            })
    }


    stored_save(req, res, next) {
        const user = req.session.user;
        const courseData = {
            ...req.body,
            course_image: req.file ? [req.file.filename] : [], // Thêm tên tệp hình ảnh vào mảng
            owner_course: user._id // Giả định rằng thông tin người dùng đã được lưu trong session
        };

        const courses = new Course(courseData);
        courses.save()
            .then((course) => {

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
        Me.find({})
            .populate('courses')
            .lean()
            .then(me => {
                const user = req.session.user;
                res.locals.userData = user;
                res.render('me/store_profile', { me })
            })

    }
};

module.exports = new MeController();
