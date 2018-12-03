// const PixieService = require('../services/PixieService');

class PixieController {
  static getAll(req, res) {
    res.json({ message: 'hello from GET /api/pixies' })
  }

  static getById(req, res) {
    res.json({
      message: `hello from GET /api/pixies/${req.params.id}`
    });
  }

  static create(req, res) {
    res.json({
      message: 'thanks for submitting the attached pixie',
      pixie: req.body
    })
  }
}

module.exports = PixieController;
