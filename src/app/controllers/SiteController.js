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

        Profile.find().lean()
            .then((information) => {
                const userData = req.session.user;
                res.render('home', { information, userData });
            })
            .catch(err => {
                next(err);
            });

    }
}
module.exports = new SiteController();
