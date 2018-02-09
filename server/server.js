require('./config/config.js');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT;
const publicPath = path.join(__dirname,'../public');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath)); // middle ware

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('disconnect from client');
  });
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
