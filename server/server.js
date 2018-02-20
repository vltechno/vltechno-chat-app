require('./config/config.js');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT;
const publicPath = path.join(__dirname,'../public');
const http = require('http');
const {msgGen} = require('./utils/message');
const {msgLocGen} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // middle ware

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('disconnect from client');
  });

  socket.emit('newMessage', msgGen('admin', 'Welcome to vltechno-chat'));
  socket.broadcast.emit('newMessage', msgGen('admin', 'New user joined'));

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
