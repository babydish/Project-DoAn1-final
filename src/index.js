const path = require('path')
const express = require('express');
const { engine } = require('express-handlebars'); // destructuring in js 
const app = express();
const port = 3000;
const dt = require('./routes/myfirstmodule.js');

var morgan = require('morgan');
const { log } = require('console');


//http logger
app.use(morgan('combined'))

// template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'))


app.get('/time', (req, res) => {
    const currentDate = dt.myDate();
    res.send(`<h1 style= "color:red">Hello World! The current date and time is: ${currentDate} </h1?`);
});


app.get('/', (req, res) => {
    res.render('home'); //render home thi se dua home vao body
});

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`);
});
