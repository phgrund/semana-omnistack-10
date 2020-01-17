const socketio = require('socket.io');

exports.setupWebSocket = (server) => {
  const io = socketio(server);

  io.on('connection', socket => {
    console.log(socket.handshake.query);
    console.log(socket.id);

    setTimeout(() => {
      console.log('teste')
      socket.emit('message', 'Hello Omnistack');
    }, 3000);
  })
}