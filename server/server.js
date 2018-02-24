require('./config/config.js');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT;
const publicPath = path.join(__dirname,'../public');
const http = require('http');
const {msgGen} = require('./utils/message');
const {isRealString} = require('./utils/mvalid');
const {msgLocGen} = require('./utils/message');
const {Users} = require('./utils/users');

var users = new Users();

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // middle ware

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    // console.log('disconnect from client');
    var user = users.rmUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage',msgGen('admin',`${user.name} has left`));
    }
  });

  socket.emit('newMessage', msgGen('admin', 'Welcome to vltechno-chat'));
  socket.broadcast.emit('newMessage', msgGen('admin', 'New user joined'));
  socket.on('join', (params, callback) => {
    if( !isRealString(params.name) || !isRealString(params.room) ) {
      return callback('Name and Room is not valid');
    }
    socket.join(params.room);
    users.rmUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', msgGen('admin', 'welcome on board'));
    socket.broadcast.to(params.room).emit('newMessage', msgGen('admin',
    `${params.name} has joined`));
    callback();
  });
  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg);
    io.emit('newMessage', msgGen(msg.from, msg.text));
    callback();
  });

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage', msgLocGen('admin', coords.lat , coords.long));
  });

});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
