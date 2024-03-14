const path = require('path')
const express = require('express');
const { engine } = require('express-handlebars'); // destructuring in js 
const app = express();
const port = 3000;


const route = require('./routes');

var morgan = require('morgan');


app.use(express.urlencoded({ // body-parser ; middleware ; get data from client
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

route(app);


app.listen(port, () => {

    console.log(`Example app listening on port ${port}`);
});
