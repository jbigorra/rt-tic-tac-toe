const express = require('express');
const morgan = require('morgan');
// const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

const app = express();

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/views'))
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  // .use(helmet())
  .use(methodOverride('_method'))
  .use(cors())
  .use(morgan('common'));

const PORT = process.env.PORT || 1235;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

function Room (roomId, users = []) {
  this.id = roomId;
  this.users = users;
}

const roomRepository = {
  rooms: [new Room('asdfasd', ['Juancho', 'Ana'])],
  getRoom: function (roomId) {
    console.log(this.rooms);
    return this.rooms.find(r => r.id === roomId);
  },
  createRoom: function (roomId, username) {
    this.rooms.push(new Room(roomId, [username]));
    console.log(this.rooms);
  },
  addUserToRoom: function (roomId, username) {
    const room = this.getRoom(roomId);
    if (!room) throw new Error("Room doesn't exists");
    room.users.push(username);
    console.log(this.rooms);
  }
};

app.get('/', (req, res) => {
  const payload = {};

  if (req.query.error) payload.error = req.query.error;

  res.render('pages/index', { payload });
});

app.post('/room', (req, res) => {
  const roomId = uuid();
  roomRepository.createRoom(roomId, req.body.username);
  res.redirect(`/room/${roomId}`);
});

app.patch('/room', (req, res) => {
  try {
    const { roomId, username } = req.body;
    console.log(req.body);
    roomRepository.addUserToRoom(roomId, username);
    res.redirect(`/room/${roomId}`);
  } catch (e) {
    console.error(e.message);
  }
});

app.get('/room/:roomId', (req, res, next) => {
  const room = roomRepository.getRoom(req.params.roomId);
  res.render('pages/room', { room });
});
