const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.listen(process.env.SERVER_PORT,
  () => console.log(`hello from port ${process.env.SERVER_PORT}`)
);
