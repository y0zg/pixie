const router = require('express').Router();
const pixieController = require('../controllers/PixieController');

router.get('/', pixieController.getAll);
router.get('/:id', pixieController.getById);

module.exports = router;
