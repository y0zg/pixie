const router = require('express').Router();
const pixieRoutes = require('./PixieRoutes');

module.exports = function(io) {
  router.use('/pixies', pixieRoutes(io));
  return router;
};
