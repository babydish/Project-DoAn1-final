const Profile = require('../models/Profiles');
const { multipleMongooseToObject, mongooseToObject } = require('../../ultill/mongoose');




class ProfileController {
    index(req, res, next) {
        Profile.find({})
            .then(skill_want_to_learns => {

                // yourskills = yourskills.map(yourskill => yourskill.toObject())
                res.render('profile', {
                    skill_want_to_learns: multipleMongooseToObject(skill_want_to_learns)

                })
            })
            .catch(error => {
                // Xử lý lỗi ở đây
                next(error); // Chuyển lỗi đến middleware xử lý lỗi tiếp theo
            });


    }
}

module.exports = new ProfileController();