const { default: mongoose, mongo } = require("mongoose")

module.exports = {
    multipleMongooseToObject: function (mongooseArray) {
        return mongooseArray.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) { // dung trong truong hop chi co 1 document
        return mongoose ? mongoose.toObject() : mongoose;
    }
};

