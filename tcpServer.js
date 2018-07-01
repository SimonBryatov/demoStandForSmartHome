var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
    console.log("Started server at")
});

server.listen(3001);

server.on('connection',function(socket){
    socket.write('connected to the tcp server\r\n');
    console.log('num of connections on port 1337: ');
});