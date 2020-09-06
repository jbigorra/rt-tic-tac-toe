const router = require('express').Router();
const { v4: uuid } = require('uuid');

function Room (roomId, users = []) {
  this.id = roomId;
  this.users = users;
  this.toString = () => JSON.stringify(this);
}

function User (username, connected = false) {
  this.username = username;
  this.connected = connected;
}

const roomRepository = {
  rooms: [new Room('asdfasd', [new User('Juancho', true), new User('Ana', true)])],
  getRoom: function (roomId) {
    console.log(this.rooms);
    return this.rooms.find(r => r.id === roomId);
  },
  createRoom: function (roomId, username) {
    const user = new User(username, true);
    this.rooms.push(new Room(roomId, [user]));
    console.log(this.rooms);
  },
  addUserToRoom: function (roomId, username) {
    const room = this.getRoom(roomId);
    if (!room) throw new Error("Room doesn't exists");
    room.users.push(username);
    console.log(this.rooms);
  }
};

router.post('/', (req, res) => {
  const roomId = uuid();
  const username = req.body.username;
  roomRepository.createRoom(roomId, username);
  res.redirect(`/room/${roomId}?username=${username}`);
});

router.patch('/', (req, res) => {
  try {
    const { roomId, username } = req.body;
    console.log(req.body);
    roomRepository.addUserToRoom(roomId, username);
    res.redirect(`/room/${roomId}?username=${username}`);
  } catch (e) {
    console.error(e.message);
  }
});

router.get('/:roomId', (req, res, next) => {
  const room = roomRepository.getRoom(req.params.roomId);
  const username = req.params.username;
  res.render('pages/room', { room, playerId: username });
});

module.exports = router;
