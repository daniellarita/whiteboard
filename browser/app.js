var socket = io(window.location.origin);
console.log(window.location.origin)

whiteboard.on('draw', function(start, end, color){
	console.log(start, end, color);
	socket.emit('draw',start,end,color)
})

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
		console.log(io.sockets)
});

socket.on('disconnect', function () {
    socket.emit('user disconnected');
  });

socket.on('broadcast_event', function(start,end,color){
	window.whiteboard.draw(start,end,color)
})
