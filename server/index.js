const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const moment = require('moment');
const io = require('socket.io')(server);
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();
require('./src/Database');

const routes = require('./src/routes')(io);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`${moment().format()} - ${clientIp} - ${req.method} ${req.path}`);
  }
  next();
});
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const port = process.env.SERVER_PORT || 8080;
server.listen(port, () => console.log(`pixie server listening on port ${port}`));
