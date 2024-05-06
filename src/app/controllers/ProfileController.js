const Profile = require('../models/Profile');

class ProfileController {

    information(req, res, next) {
        Profile.findById(req.params.id).lean()
            .then(information => {
                const user = req.session.user;
                res.locals.userData = user;
                res.render('user/information', { information })
            })
            .catch(error => (res.send(error)))

    }

    // [POST] profile/:id/delete
    delete(req, res, next) {

        Profile.deleteOne({ _id: req.params.id })

            .then(() => { res.redirect('/store/information') })
            .catch(error => (res.send(error)))
    }



    // [POST] profile/update
    update(req, res, next) {



        Profile.updateOne({ _id: req.params.id }, req.body)

            .then(() => {
                res.redirect('/store/information')

            })
            .catch(next)
    }

    // [GET] profile/:slug/edit
    edit(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;
        Profile.findById(req.params.id).lean()
            .then(information_id => {
                res.render('profile/edit', { information_id })

            })

    }

    // [GET] /profile/create
    create(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;
        res.render('profile/upload')

    }

    // [POST] /profile/store
    store(req, res, next) {

        const profile = new Profile(req.body);
        console.log(profile);
        profile.save()
            .then(() => res.redirect('/'))
            .catch(error => { res.send(error) })
    }


    // [GET] profile/show
    show(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;



        Profile.findById(user._id).lean() // return plain JavaScript objects (POJOs) hàm .lean() trong Mongoose yêu cầu nó trả về các đối tượng JavaScript đơn giản (POJO) thay vì các tài liệu Mongoose đầy đủ khi truy vấn cơ sở dữ liệu.
            .then(information => {
                res.render('profile/show', { information })
            })
            .catch(next)

    }

}


module.exports = new ProfileController();