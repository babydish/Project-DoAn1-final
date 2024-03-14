

class SiteController {
    search(req, res) {
        res.render('search');
    }

    // [GET] /search
    index(req, res) {
        res.render('home');

    }
}

module.exports = new SiteController; // tao ra 1 doi tuong controllers va export ra ngoai . export bang gi thi require nhan cai do