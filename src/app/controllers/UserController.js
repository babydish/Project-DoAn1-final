const User = require('../models/User');

class UserController {
    index(req, res, next) {
        User.find().lean()
            .then((information_user) => {
                res.json(information_user)
            })
            .catch(next); // Xử lý lỗi
    }
    information(req, res, next) {
        User.findById(req.params.id).lean()
            .then(information => {
                res.json(information)
            })
            .catch(error => (res.send(error)))

    }


}

module.exports = new UserController();
