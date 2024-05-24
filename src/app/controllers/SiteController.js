const Profile = require('../models/Profile');


class SiteController {

    //[GET] /search
    //[GET] /search
    search(req, res, next) {
        const query = req.query.search;

        // Tìm kiếm người dùng
        Profile.find({ name: { $regex: query, $options: 'i' } })
            .populate('courses')
            .lean()
            .then((resultSearch) => {
                if (resultSearch.length > 0) {
                    const numberResult = resultSearch.length


                    // Nếu tìm thấy người dùng, hiển thị thông tin của họ
                    res.render('user/resultSearch', { resultSearch, query, numberResult })
                } else {
                    // Nếu không tìm thấy người dùng, tìm kiếm kỹ năng
                    Profile.find({ current_skills: { $regex: query, $options: 'i' } })
                        .lean()
                        .then((resultSearch) => {
                            if (resultSearch.length > 0) {
                                const numberResult = resultSearch.length
                                res.render('user/resultSearch', { resultSearch, query, numberResult })
                                // Nếu tìm thấy kỹ năng, hiển thị chúng

                            } else {
                                // Nếu không tìm thấy bất kỳ kết quả nào, hiển thị thông báo
                                res.send(`khong tim thay : ${query}`)
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

        Profile.find().lean()
            .then((information) => {
                const userData = req.session.user;
                if (userData) {
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
