var socket = io();
socket.on('connect', function() {
  console.log('connected to server');
  socket.emit('createMessage', {
    from: 'Vinh Le'
    ,text: 'Hello world'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected');
});

socket.on('newMessage', (msg) => {
	console.log('newMessage', msg);
});
