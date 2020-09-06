const express = require('express');
const socketio = require('socket.io');
const morgan = require('morgan');
// const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');

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

const http = require('http').createServer(app);

const PORT = process.env.PORT || 1235;

http.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  const payload = {};

  if (req.query.error) payload.error = req.query.error;

  res.render('pages/index', { payload });
});

// ------------ Routes --------------
const room = require('./routes/room');

app.use('/room', room);

// ----------- Socketio -------------
const io = socketio(http);
const socketioHandler = require('./socketio/socketioHandler');

io.on('connection', socketioHandler);
