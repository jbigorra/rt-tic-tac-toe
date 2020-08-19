const express = require('express');
const morgan = require('morgan');
// const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const { v4: uuid } = require('uuid');

const app = express();

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/views'))
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  // .use(helmet())
  .use(cors())
  .use(morgan('common'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

function Room (roomId, users = []) {
  this.id = roomId;
  this.users = users;
}

const roomRepository = {
  rooms: [],
  getRoom: function (roomId) {
    return this.rooms.find(r => r.id === roomId);
  },
  createRoom: function (roomId, username) {
    this.rooms.push(new Room(roomId, username));
  },
  addUserToRoom: function (roomId, username) {
    const room = this.getRoom(roomId);
    if (!room) throw new Error("Room doesn't exists");
    room.users.push(username);
  }
};

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.post('/room', (req, res) => {
  const roomId = uuid();
  roomRepository.createRoom(roomId, req.body.username);
  res.redirect(`/room/${roomId}`);
});

app.patch('/room', (req, res) => {

});

app.get('/room/:roomId', (req, res) => {
  res.render('pages/room', { roomId: req.params.roomId });
});
