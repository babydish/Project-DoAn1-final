

class UserController {

    logout(req, res, next) {
        req.session.destroy(error => {
            if (error) {
                console.error("Error destroying session:", error);
                res.status(500).send("Error destroying session");
            } else {
                res.redirect('/'); // Chuyển hướng người dùng sau khi session đã bị hủy
            }
        });
    }


    // [POST] /user/login
    logged(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;
        res.redirect('/');
    }


    login(req, res, next) {
        res.render('user/login')
    }

}

module.exports = new UserController();
