const Profile = require('../models/Profile')

class UserController {

    logout(req, res, next) {
        const user = req.session.user;
        req.session.destroy(error => {
            if (error) {
                console.error("Error destroying session:", error);
                res.status(500).send("Error destroying session");
            } else {
                Profile.findByIdAndUpdate(user._id, { is_online: 0 }).lean()
                    .then(() => {
                        res.redirect('/');
                    })

            }
        });
    }


    // [POST] /user/login
    logged(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;
        Profile.findByIdAndUpdate(user._id, { is_online: 1 }).lean()
            .then(() => {
                res.redirect('/');
            })
            .catch(error => {
                console.error(error);
                next(error);
            });

    }


    login(req, res, next) {
        res.render('user/login')
    }

}

module.exports = new UserController();
