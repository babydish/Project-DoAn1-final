const path = require('path')
const express = require('express');
const { engine } = require('express-handlebars'); // destructuring in js 
const app = express();
const cors = require("cors");
const port = 5000;
const connect_db = require('./config/db');


// connect db
connect_db.connect();

const route = require('./routes');
var morgan = require('morgan');
// const db = require('./config/db');

// // connect db
// db.connect();


app.use(express.urlencoded({ // body-parser ; middleware ; get data from client luu vao body
    extended: true
}));
app.use(express.json()); // get date from js
app.use(express.static(path.join(__dirname, 'public')));

//http logger
app.use(morgan('combined'))

// template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'))

// cors

route(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


