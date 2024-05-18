const path = require('path')
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars'); // destructuring in js 
const { Server } = require("socket.io");
const { createServer } = require('node:http');
const app = express();
const server = require('http').createServer(app);
const io = new Server(server);
const connect_db = require('./config/db');
const port = process.env.PORT || 5000; // Sử dụng PORT được cung cấp hoặc mặc định là 5000

const { onConnected } = require('./services/socketsConnected')

app.use(session({
    secret: 'hta28102004##',
    resave: false,
    saveUninitialized: true

}));


app.use(cookieParser());
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


route(app);

io.on('connection', (socket) => onConnected(io, socket));
server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
