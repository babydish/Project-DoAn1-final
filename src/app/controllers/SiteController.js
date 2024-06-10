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
    userClassification(req, res, next) {
        let check = false;

        const userData = req.session.user;
        if (userData) {

            Profile.findOne({ _id: userData._id })
                .populate({
                    path: 'courses'
                })
                .lean()
                .then((profile) => {


                    const current_skills = profile.current_skills;
                    const skill_want_to_learn = profile.skill_want_to_learn;
                    Profile.find({
                        $or: [
                            { current_skills: { $regex: `(${current_skills}|${skill_want_to_learn})`, $options: 'i' } },
                            { skill_want_to_learn: { $regex: `(${current_skills}|${skill_want_to_learn})`, $options: 'i' } },
                            { course_name: { $regex: `(${current_skills}|${skill_want_to_learn})`, $options: 'i' } }
                        ]

                    })
                        .populate('courses')
                        .lean()
                        .then(recommendCourses => {
                            recommendCourses.forEach(infor => {

                                if (infor._id.toString() === userData._id.toString()) {
                                    infor.check = true;
                                }
                            });

                            res.render('homeLogged', { recommendCourses, userData, check })
                        })
                })

        }

    }
    index(req, res, next) {
        let check = false;
        const userData = req.session.user;
        const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
        const limit = 5; // Số lượng người dùng hiển thị mỗi trang
        const skip = (page - 1) * limit; // Số lượng người dùng bỏ qua

        Profile.find()
            .populate({
                path: 'courses',
                options: { limit: 2 } // Giới hạn số lượng khóa học
            })
            .skip(skip)
            .limit(limit)
            .lean()
            .then((information) => {
                Profile.countDocuments().then(total => {
                    const totalPages = Math.ceil(total / limit);
                    let pages = [];
                    for (let i = 1; i <= totalPages; i++) {
                        pages.push({
                            number: i,
                            isCurrentPage: i === page
                        });
                    }

                    let hasNoCourses = false;

                    information.forEach(infor => {
                        if (userData !== undefined) {
                            if (infor._id.toString() === userData._id.toString()) {
                                infor.check = true;
                            }
                        }
                        infor.hasNoCourses = infor.courses.length === 0; // check số lượng khóa học của mỗi người để ghi chú những ai chưa có khóa học

                    });

                    const hasPreviousPage = page > 1;
                    const hasNextPage = page < totalPages;
                    const previousPage = page - 1;
                    const nextPage = page + 1;

                    res.render('home', {
                        information,
                        userData,
                        check,
                        hasNoCourses,
                        totalPages,
                        currentPage: page,
                        pages,
                        hasPreviousPage,
                        hasNextPage,
                        previousPage,
                        nextPage
                    });
                });
            })
            .catch(err => {
                next(err);
            });
    }


}
module.exports = new SiteController();
