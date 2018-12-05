const router = require('express').Router();
const pixieRoutes = require('./PixieRoutes');

router.use('/pixies', pixieRoutes);

module.exports = router;
