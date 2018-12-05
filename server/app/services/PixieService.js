require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const Pixie = require('./../models/Pixie');
const Jimp = require('jimp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb!');
});

class PixieService {
  static create(pixie) {
    return new Pixie(pixie).save();
  }

  static getAll() {
    return Pixie.find({});
  }

  static getById(id) {
    return Pixie.findById(id);
  }

  static update(pixie) {
    const id = pixie._id;
    delete pixie._id;
    return Pixie.findOneAndUpdate({ _id: id }, pixie);
  }

  static async pixelize(buffer) {
    const image = await Jimp.read(buffer);
    image.write(`${__dirname}/blah.png`);
    return image.hash();
  }
}

module.exports = PixieService;
