const Course = require('../models/Courses');
const Profile = require('../models/Profile');


class SiteController {


    //[GET] /search
    search(req, res, next) {
        const query = req.query.search;
        res.locals.userData = req.session.user;

        // Tìm kiếm người dùng
        Profile.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { current_skills: { $regex: query, $options: 'i' } },
                { skill_want_to_learn: { $regex: query, $options: 'i' } },
                { course_name: { $regex: query, $options: 'i' } },
            ]
        })
            .populate('courses')
            .lean()
            .then((resultSearch) => {
                if (resultSearch.length > 0) {
                    const numberResult = resultSearch.length


                    // Nếu tìm thấy người dùng, hiển thị thông tin của họ
                    res.render('user/resultSearch', { resultSearch, query, numberResult })
                } else {
                    // Nếu không tìm thấy người dùng, tìm kiếm khóa học
                    Course.find({

                        course_name: { $regex: query, $options: 'i' }
                    })
                        .populate('owner_course')
                        .lean()
                        .then((resultSearchCourses) => {
                            console.log(resultSearchCourses)
                            if (resultSearchCourses.length > 0) {
                                const numberResult = resultSearchCourses.length
                                res.render('user/resultSearch', { resultSearchCourses, query, numberResult })
                                // Nếu tìm thấy kỹ năng, hiển thị chúng

                            } else {
                                // Nếu không tìm thấy bất kỳ kết quả nào, hiển thị thông báo
                                res.send(`<h4> Không Tìm Thấy Kết Quả Cho: ${query} </h4> <br> <a href='/' style='text-decoration:none'>Về Trang Chủ</a>`)
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    index(req, res, next) {
        let check = false;

        Profile.find()
            .populate({
                path: 'courses',
                options: { limit: 2 } // Giới hạn số lượng khóa học
            })
            .lean()
            .then((information) => {


                const userData = req.session.user;

                if (userData !== undefined) {
                    information.forEach(infor => {

                        if (infor._id.toString() === userData._id.toString()) {
                            infor.check = true;
                        }
                    });
                }
                res.render('home', { information, userData, check });
            })
            .catch(err => {
                next(err);
            });

    }
}
module.exports = new SiteController();
