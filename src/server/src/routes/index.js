const router = require('express').Router();
const pixieRoutes = require('./pixie-routes');

router.use('/pixies', pixieRoutes);

module.exports = router;
