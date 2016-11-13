var path = require('path');
var socketio = require('socket.io');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

var io = socketio(server);


app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//socket server as event emitter in order to listen
// to new connections
io.on('connection', function (socket) {

    console.log('A new client has connected!');
    console.log(socket.id);

    socket.on('disconnect', function(){
    	console.log('you have been disconnected');
        console.log(socket.id);
    })

    socket.on('draw',function(start,end,color){
      socket.broadcast.emit('broadcast_event',start,end,color)
    })

});



server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});
