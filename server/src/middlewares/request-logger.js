const moment = require('moment');
require('dotenv').config();

module.exports = function requestLogger(req, res, next) {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`${moment().format()} - ${clientIp} - ${req.method} ${req.path}`);
  next();
};
