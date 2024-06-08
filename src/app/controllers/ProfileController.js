const Profile = require('../models/Profile');

class ProfileController {

    //[GET] /profile/information/:id
    information(req, res, next) {
        Profile.findById(req.params.id)
            .populate('courses') // populate 'courses' field with the actual course documents
            .lean() // convert the Mongoose document to a plain JavaScript object
            .then(informationCourse => {
                const user = req.session.user;
                res.locals.userData = user;
                const numberCourse = informationCourse.courses.length;
                res.render('user/information', { informationCourse, numberCourse })
            })
            .catch(error => (res.send(error)))

    }

    // [POST] profile/:id/delete
    delete(req, res, next) {

        Profile.deleteOne({ _id: req.params.id })

            .then(() => { res.redirect('/store/information') })
            .catch(error => (res.send(error)))
    }



    // [POST] profile/:id/edited
    update(req, res, next) {
        const profileData = {
            ...req.body,
            avatar: req.file ? req.file.filename : '', // Thêm tên tệp hình ảnh vào mảng

        };

        Profile.updateOne({ _id: req.params.id }, profileData)
            .then(() => {
                res.redirect('/profile/show')
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

        const profileData = {
            ...req.body,
            avatar: req.file ? req.file.filename : '', // Thêm tên tệp hình ảnh vào mảng

        };


        console.log(profileData)
        const profile = new Profile(profileData);



        profile.save()

            .then(() => {
                Profile.findOne({ email: req.body.email }).lean()
                    .then((information) => {
                        console.log(information)
                        req.session.user = information;
                        const user = req.session.user;

                        res.locals.userData = information;
                        res.redirect('/')


                    })
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
                console.log(informationCourse)
                const numberCourse = informationCourse.courses.length;
                res.render('profile/show', { informationCourse, numberCourse })
            })
            .catch(next)
    }
}


module.exports = new ProfileController();