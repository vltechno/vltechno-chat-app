var socket = io();

function scrollToBot () {
  // selector
  var msg = jQuery('#msg-ol');
  var newMsg = msg.children('li:last-child'); // ???
  //height
  var clientHeight = msg.prop('clientHeight');
  var scrollTop = msg.prop('scrollTop');
  var scrollHeight = msg.prop('scrollHeight');
  var newMsgHeight = newMsg.innerHeight();
  var lastMsgHeight = newMsg.prev().innerHeight();
  if( clientHeight + scrollTop + newMsgHeight + lastMsgHeight>= scrollHeight) {
    msg.scrollTop(scrollHeight);
  }
}
socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected');
});

socket.on('newMessage', (msg) => {
  var formatedTime = moment(msg.createdAt).format('h:mm a');
  var tpl = jQuery('#msg-tpl').html();
  var html = Mustache.render(tpl,{
    text: msg.text
    ,from: msg.from
    ,createdAt: formatedTime
  });
  jQuery('#msg-ol').append(html);
  scrollToBot();
});

socket.on('newLocationMessage', function(msg){
  var formatedTime = moment(msg.createdAt).format('h:mm a');
  var tpl = jQuery('#msg-tpl-location').html();
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current Location</a>');
  li.text(`${msg.from} ${formatedTime}: `);
  a.attr('href', msg.url);
  var html = Mustache.render(tpl,{
    mlink: msg.url
    ,from: msg.from
    ,createdAt: formatedTime
  });
  jQuery('#msg-ol').append(html);
  // var formatedTime = moment(msg.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My current Location</a>');
	// li.text(`${msg.from} ${formatedTime}: `);
	// a.attr('href', msg.url);
	// li.append(a);
	// jQuery('#msg-ol').append(li);
  scrollToBot();
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
