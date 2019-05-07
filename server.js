const app = require('./app');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', function (socket) {
  console.log('client ' + socket.id + ' connected');
  socket.on('disconnect', function () {
    console.log('client ' + socket.id + ' disconnected');
  })
});

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

http.listen(3000, function () {
  console.log('listening on *:3000');
});
