var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(3002, () => console.log('pixie listening on port 3002'));
