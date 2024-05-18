const Profile = require('../models/Profile');

class ProfileController {

    information(req, res, next) {
        Profile.findById(req.params.id)
            .populate('courses') // populate 'courses' field with the actual course documents
            .lean() // convert the Mongoose document to a plain JavaScript object
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
        profile.save()

            .then(() => {
                req.session.user = req.body;
                const user = req.session.user;
                res.locals.userData = user;
                res.redirect('/')



            })
            .catch(error => { res.send(error) })
    }


    // [GET] profile/show
    show(req, res, next) {
        const user = req.session.user;
        res.locals.userData = user;

        Profile.findById(user._id)
            .populate('courses') // populate 'courses' field with the actual course documents
            .lean() // convert the Mongoose document to a plain JavaScript object
            .then(informationCourse => {
                res.render('profile/show', { informationCourse })
            })
            .catch(next)
    }
}


module.exports = new ProfileController();