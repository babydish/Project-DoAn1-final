const siteRouter = require('./site');
const profileRouter = require('./profile');
const meRouter = require('./me');
const userRouter = require('./user');
const chatRouter = require('./chat');


function route(app) {
    app.use('/', siteRouter);
    app.use('/profile', profileRouter);
    app.use('/store', meRouter);
    app.use('/user', userRouter);
    app.use('/chat', chatRouter);

}

module.exports = route;
