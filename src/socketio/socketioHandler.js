module.exports = socketioHandler;

function socketioHandler (socket) {
  console.log('a client connected');

  socket.on('player-joined-room', (room) => {
    console.log(room);
  });
};
