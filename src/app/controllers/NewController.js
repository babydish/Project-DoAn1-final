
class NewsController {
    show(req, res) {
        res.send('NEW DETAIL')
    }

    // [GET] /new
    index(req, res) {
        res.render('new')

    }
}

module.exports = new NewsController; // tao ra 1 doi tuong controllers va export ra ngoai . export bang gi thi require nhan cai do