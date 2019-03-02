const express = require('express');
const app = express();
const io = require('socket.io')();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

require('./src/Database');
const requestLogger = require('./src/middlewares/request-logger');
const routes = require('./src/routes');

app.use(bodyParser.json());
app.use(fileUpload());

app.use(requestLogger);
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', routes);
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  res.json({ error: { name, message } });
});

const port = process.env.SERVER_PORT || 8080;
const server = app.listen(port, () => console.log(`server listening on port ${port}`));
io.attach(server);

// TODO: get rid of this as soon as possible!!!
io.on('connect', socket => {
  socket.on('updatePixie', pixie => socket.broadcast.emit('updatePixie', pixie));
});
