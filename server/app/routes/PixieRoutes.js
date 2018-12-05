const router = require('express').Router();
const PixieController = require('../controllers/PixieController');

router.get('/', PixieController.getAll);
router.get('/:id', PixieController.getById);
router.post('/', PixieController.create);
router.put('/', PixieController.update);
router.post('/upload', PixieController.upload);
router.delete('/:id', PixieController.delete);
router.get('/scrape/:query', PixieController.scrape);

module.exports = router;
