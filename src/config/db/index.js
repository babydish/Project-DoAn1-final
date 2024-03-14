const mongoose = require('mongoose')
const { use } = require('../../routes/news')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/SkillSwap_DEV', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect successfully');


    } catch (error) {
        console.log('error');
    }
}

module.exports = { connect }