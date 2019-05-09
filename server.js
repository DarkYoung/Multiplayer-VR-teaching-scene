const app = require('./server.app'); //express服务器
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const host = '127.0.0.1';
const port = 3000;

io.on('connection', function (socket) {
  console.log('client ' + socket.id + ' connected');
  socket.on('player', function (data) {
    data.socketid = socket.id;
    socket.broadcast.emit('player', data);
  });
  socket.on('disconnect', function () {
    console.log('client ' + socket.id + ' disconnected');
    socket.broadcast.emit('offline', {
      socketid: socket.id
    });
  })
});

http.listen(port, function () {
  console.log('listening on ' + host + ':' + port);
});
