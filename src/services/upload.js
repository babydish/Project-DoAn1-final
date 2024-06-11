const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }

})
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedTypes = ["image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            console.log('Only jpg, png, and .doc files are allowed');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2MB limit
    }
});


module.exports = upload