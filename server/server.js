const express = require('express');
const app = express();
const server = require('http').Server(app);
const routes = require('./app/routes');
const bodyParser = require('body-parser');
const moment = require('moment');
const io = require('socket.io')(server);
const path = require('path');
require('dotenv').config();

app.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`${moment().format()} - ${req.method} ${req.path} - ${clientIp}`);
  next();
});
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
app.use('/api', routes);

const port = process.env.SERVER_PORT || 8080;
server.listen(port, () => console.log(`pixie server listening on port ${port}`));

// TODO: move this out of here
io.on('connect', socket => {
  console.log(`socket.io connection established with id ${socket.id}`);

  socket.on('hello', msg => {
    console.log(`client says ${msg}`);
  });

  socket.on('disconnect', reason => {
    console.log(`socket ${socket.id} disconnected due to: ${reason}`);
  });
});
