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

  static async upload(req, res) {
    const result = await PixieService.pixelize(req.files.file.data);
    res.json({ hello: result });
  }
}

module.exports = PixieController;
