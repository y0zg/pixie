const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
require('dotenv').config();

const port = process.env.SERVER_PORT || 8080;
server.listen(port, () => console.log(`pixie server listening on port ${port}`));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

io.on('connect', socket => {
  console.log(`socket.io connection established with id ${socket.id}`);

  socket.on('hello', msg => {
    console.log(`client says ${msg}`);
  });

  socket.on('disconnect', reason => {
    console.log(`socket ${socket.id} disconnected due to: ${reason}`);
  });
});
