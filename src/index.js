const path = require('path')
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars'); // destructuring in js 
const { Server } = require("socket.io");
const { createServer } = require('node:http');
const app = express();
const Message = require('./app/models/Message');

const server = createServer(app);
const io = new Server(server);
const userNamespace = io.of('/user-namespace');
const connect_db = require('./config/db');

app.use(session({
    secret: 'your-secret-key',
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


let socketsConnected = new Set();
let users = {};

io.on('connection', onConnected)
// socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
// });

function onConnected(socket) {


    socketsConnected.add(socket.id);
    io.emit('clients-total', socketsConnected.size)
    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id)
        socketsConnected.delete(socket.id)
        io.emit('clients-total', socketsConnected.size)
    });
    socket.on('chat', userId => {
        users[userId] = socket.id;
        console.log(users[userId]);

    })
    socket.on('logout', userId => {
        console.log(userId);
        delete users[userId];
    })

    socket.on('message', (data) => {

        const receiver_socket_id = users[data.receiver_id];
        const message = new Message(data);
        message.save();
        io.to(receiver_socket_id).emit('receiveMessage', data);
    })

}

server.listen(5000, () => {
    console.log('server running at http://localhost:5000');
});


