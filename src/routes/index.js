const siteRouter = require('./site');
const profileRouter = require('./profile');
const meRouter = require('./me');
const userRouter = require('./user')
const Auth = require('../services/auth')




function route(app) {
    app.use('/', siteRouter);
    app.use('/profile', profileRouter);
    app.use('/store', meRouter);
    app.use('/user', userRouter)


}

module.exports = route;
