const router = require('express').Router();
const PixieController = require('../controllers/PixieController');

module.exports = function(io) {
  io.on('connect', socket => {
    console.log(`socket.io connection established with id ${socket.id}`);

    socket.on('hello', msg => {
      console.log(`client says ${msg}`);
    });

    socket.on('updatePixie', updatedPixie => {
      socket.broadcast.emit('updatePixie', updatedPixie);
    });

    socket.on('disconnect', reason => {
      console.log(`socket ${socket.id} disconnected due to: ${reason}`);
    });
  });

  router.get('/search/:query/:numRows/:page/:per_page', PixieController.search);
  router.get('/', PixieController.getAll);
  router.get('/:id', PixieController.getById);
  router.post('/', PixieController.create);
  router.put('/', PixieController.update);
  router.post('/upload', PixieController.upload);
  router.delete('/:id', PixieController.delete);
  // router.post('/scrape', PixieController.scrape);

  return router;
};
