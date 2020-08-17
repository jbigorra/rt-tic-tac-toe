const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();

app
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, '/src/views'))
  .use(helmet())
  .use(cors())
  .use(morgan('common'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/room', (req, res) => {
  res.render('pages/room');
});
