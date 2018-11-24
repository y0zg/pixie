const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
require('dotenv').config();

const port = process.env.SERVER_PORT || 3001;
server.listen(port, () => console.log(`pixie server listening on port ${port}`));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

io.on('connection', socket => {
  console.log(`socket.io connection established with id ${socket.id}`);
});
