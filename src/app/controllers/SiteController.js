const Profile = require('../models/Profile');



class SiteController {
    index(req, res, next) {
        Profile.find().lean()
            .then((information) => {
                res.render('home', { information })
            })


    }
}

module.exports = new SiteController();