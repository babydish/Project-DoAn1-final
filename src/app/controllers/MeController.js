const Me = require('../models/Profile');

class MeController {

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
