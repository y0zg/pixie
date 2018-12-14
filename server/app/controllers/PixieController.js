const PixieService = require('../services/PixieService');

class PixieController {
  static async getAll(req, res) {
    try {
      const pixies = await PixieService.getAll();
      res.json({ pixies });
    } catch (error) {
      res.json({ error });
    }
  }

  static async getById(req, res) {
    try {
      const pixie = await PixieService.getById(req.params.id);
      res.json({ pixie });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }

  static async create(req, res) {
    try {
      const pixie = req.body;
      const newPixie = await PixieService.create(pixie);
      res.status(201).json({ pixie: newPixie });
    } catch (error) {
      res.json({ error });
    }
  }

  static async update(req, res) {
    try {
      const pixie = req.body;
      const updatedPixie = await PixieService.update(pixie);
      res.json(updatedPixie);
    } catch (error) {
      res.json({ error });
    }
  }

  static async delete(req, res) {
    try {
      await PixieService.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.json({ error });
    }
  }

  static async upload(req, res) {
    try {
      const result = await PixieService.pixelize(req.files.file.data, parseInt(req.body.size, 10));
      res.json({ pixels: result });
    } catch (error) {
      res.json({ error });
    }
  }

  static async scrape(req, res) {
    try {
      const scrapeResult = await PixieService.scrape(req.body.query, req.body.numRows);
      res.json({ pixels: scrapeResult });
    } catch (error) {
      res.json({ error });
    }
  }
}

module.exports = PixieController;
