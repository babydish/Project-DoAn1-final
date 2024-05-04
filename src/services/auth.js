const sessions = require('../services/session');
const Profile = require('../app/models/Profile');

class Auth {


    checkLogged(req, res, next) {

        const { email, password } = req.body;
        Profile.findOne({ email: email, password: password })
            .then(user => {
                if (user) {

                    req.session.user = user;
                    next();
                } else {
                    res.status(401).send("Invalid email or password");
                }
            })
            .catch(err => {
                next(err);
            });

    }

}

module.exports = new Auth();

