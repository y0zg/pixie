const PixieService = require('../services/PixieService');

class PixieController {
  static getAll(req, res) {
    res.json({ message: 'hello from GET /api/pixies' })
  }

  static async getById(req, res) {
    try {
      const pixie = await PixieService.getById(req.params.id);
      console.log(pixie);
      res.json({ pixie });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }

    // res.json({
    //   message: `hello from GET /api/pixies/${req.params.id}`
    // });
  }

  static async create(req, res) {
    try {
      const pixie = req.body;
      const newPixie = await PixieService.create(pixie);
      res.status(201).json({ pixie: newPixie });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = PixieController;
