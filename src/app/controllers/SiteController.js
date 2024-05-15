const Profile = require('../models/Profile');
const sessions = require('../../services/session');
class SiteController {

    //[GET] /search
    search(req, res, next) {
        const name_user = req.query.search;

        Profile.findOne({ name: name_user })
            .then((user) => {
                res.json(user)

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
