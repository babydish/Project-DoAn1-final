const Profile = require('../app/models/Profile');

class CheckRegister {
    async checkRegister(req, res, next) {
        const username = req.body.name;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const email = req.body.email;

        // Regular expression to validate email
        var reg = /^\w+@\w+\.com$/i;
        const check_email = reg.test(email);

        let error_message = '';

        if (username.length < 8) {
            error_message += 'Tên đăng nhập phải có ít nhất 8 ký tự.<br>';
        }
        if (password !== confirmPassword) {
            error_message += 'Mật khẩu nhập lại không trùng khớp.<br>';
        }
        if (!check_email) {
            error_message += 'Email bạn nhập không hợp lệ.<br>';
        }

        try {
            const emailExists = await Profile.findOne({ email: email });
            if (emailExists) {
                error_message += 'Email đã được sử dụng.<br>';
            }
        } catch (error) {
            return res.status(500).send('Internal server error');
        }

        if (error_message !== '') {
            res.render('profile/upload', { error_message });
        } else {
            next();
        }
    }
}

module.exports = new CheckRegister();
