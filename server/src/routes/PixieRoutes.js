const router = require('express').Router();
const PixieController = require('../controllers/PixieController');

router.get('/search/:query/:numRows/:page/:per_page', PixieController.search);
router.get('/', PixieController.getAll);
router.get('/:id', PixieController.getById);
router.post('/', PixieController.create);
router.put('/', PixieController.update);
router.post('/upload', PixieController.upload);
router.delete('/:id', PixieController.delete);
// router.post('/scrape', PixieController.scrape);

module.exports = router;
