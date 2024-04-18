const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/SkillSwap_DEV');
        console.log('connected successfully');
    }
    catch (error) {

        console.log('error');
    }
}

module.exports = { connect };