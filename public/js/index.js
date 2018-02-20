var socket = io();
socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected');
});

socket.on('newMessage', (msg) => {
	console.log('newMessage', msg);
	var li = jQuery('<li></li>');
	li.text(`${msg.from}:${msg.text}`);
	jQuery('#msg-ol').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Hai'
// 	,text: 'hi'
// }, function(msg) {
// 	console.log(msg);
// });

socket.on('newLocationMessage', function(msg){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current Location</a>');
	li.text(`${msg.from}: `);
	a.attr('href', msg.url);
	li.append(a);
	jQuery('#msg-ol').append(li);
});

jQuery('#msg-form').on('submit', function(events) {
	events.preventDefault();
  var msgTextBox = jQuery('[name=msg]');
	socket.emit('createMessage',
  {
		from: 'User'
		,text: msgTextBox.val()
  }
  ,function() {
		msgTextBox.val('');
	});
});

var lcBtn = jQuery('#send-location');
lcBtn.on('click', function() {
	if(!navigator.geolocation) {
		return alert('Geolocation not support by your browser');
	}

  lcBtn.attr('disabled', 'disabled').text('sending location...');
	navigator.geolocation.getCurrentPosition(
		function(pst){
      lcBtn.removeAttr('disabled').text('send location');
			socket.emit('createLocationMessage', {
				 lat  : pst.coords.latitude
				,long : pst.coords.longitude
			});
		},
		function() {
      lcBtn.removeAttr('disabled').text('send location');
			alert('Unable detect location');
		}
	);
});
