const newRouter = require('./news');
const siteRouter = require('./site');
const noteRouter = require('./note');
const profileRouter = require('./profile');
function route(app) {
    app.use('/note', noteRouter);
    app.use('/news', newRouter);
    /* app.get('/news', (req, res) => {

        res.render('new')
    }); */
    app.use('/', siteRouter)

    /*app.get('/', (req, res) => { // req = request , res= respond ,req chứa thông liên quan yêu cầu gửi đi
        res.render('home'); //render home thi se dua home vao body
    }); */
    app.use('/profile', profileRouter)





}

module.exports = route;
