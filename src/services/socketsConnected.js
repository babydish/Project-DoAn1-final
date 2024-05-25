const Message = require('../app/models/Message');
let socketsConnected = new Set();
let users = {};

function onConnected(io, socket) {
    socketsConnected.add(socket.id);
    io.emit('clients-total', socketsConnected.size)
    socket.on('disconnect', () => {
        socketsConnected.delete(socket.id)
        io.emit('clients-total', socketsConnected.size)
    });
    socket.on('chat', userId => {
        users[userId] = socket.id;

    })
    socket.on('logout', userId => {
        delete users[userId];
    })

    socket.on('message', (data) => {

        const receiver_socket_id = users[data.receiver_id];
        console.log(receiver_socket_id);
        const message = new Message(data);
        message.save();
        io.to(receiver_socket_id).emit('receiveMessage', data);

    })
}

module.exports = { onConnected };