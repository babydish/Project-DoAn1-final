const Profile = require('../models/Profile');
const sessions = require('../../services/session');
class SiteController {

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
