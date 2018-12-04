require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const Pixie = require('./../models/Pixie');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb!');
});

class PixieService {
  static create(pixie) {
    return new Pixie(pixie).save();
  }

  static getById(id) {
    return Pixie.findById(id);
  }

  static update(pixie) {
    const id = pixie._id;
    delete pixie._id;
    return Pixie.findOneAndUpdate({ _id: id }, pixie);
  }
}

module.exports = PixieService;
