const PixieService = require('../services/PixieService');
const UnsplashService = require('../services/UnsplashService');

class PixieController {
  static async getAll(req, res) {
    try {
      const pixies = await PixieService.getAll();
      res.json({ pixies });
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  static async getById(req, res, next) {
    try {
      const pixie = await PixieService.getById(req.params.id);
      res.json({ pixie });
    } catch (error) {
      const { name, message, stack } = error;
      console.error(stack);
      next(error);
      res.json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const pixie = req.body;
      const newPixie = await PixieService.create(pixie);
      req.io.sockets.emit('createPixie', newPixie);
      res.status(201).json({ pixie: newPixie });
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const pixie = req.body;
      const updatedPixie = await PixieService.update(pixie);
      req.io.sockets.emit('updatePixie', req.body);
      res.json(updatedPixie);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await PixieService.delete(req.params.id);
      req.io.sockets.emit('deletePixie', req.params.id);
      res.status(204).end();
    } catch (error) {
      const { name, message, stack } = error;
      console.error(stack);
      res.status(410).send({ error: { name, message } });
    }
  }

  static async upload(req, res) {
    try {
      const result = await PixieService.pixelize(req.files.file.data, parseInt(req.body.size, 10));
      res.json({ pixels: result });
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  // static async scrape(req, res) {
  //   try {
  //     const scrapeResult = await PixieService.scrape(req.body.query, req.body.numRows);
  //     res.json({ pixels: scrapeResult });
  //   } catch (error) {
  //     res.json({ error: error.message });
  //   }
  // }

  static async search(req, res) {
    try {
      const searchResults = await UnsplashService.search(
        req.params.query,
        req.params.page,
        req.params.per_page
      );
      if (searchResults.data.results.length > 0) {
        const pixelizedResults = await Promise.all(
          searchResults.data.results.map(async result => {
            return await PixieService.pixelize(result.urls.regular, req.params.numRows);
          })
        );
        res.json({
          total: searchResults.data.total,
          totalPages: searchResults.data.total_pages,
          pixels: pixelizedResults,
        });
      } else {
        res.json({
          total: 0,
          totalPages: 0,
          pixels: [],
        });
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  }
}

module.exports = PixieController;
