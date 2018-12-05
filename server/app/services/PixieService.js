require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const Pixie = require('./../models/Pixie');
const Jimp = require('jimp');
const db = mongoose.connection;

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

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

  static async pixelize(buffer, numRows) {
    const image = await Jimp.read(buffer);
    image.rgba(false);
    const width = image.getWidth();
    const height = image.getHeight();
    const cropSize = width > height ? height : width;
    image.crop(0, 0, cropSize, cropSize);

    const pixelSize = Math.floor(cropSize / numRows);
    image.crop(0, 0, pixelSize * numRows, pixelSize * numRows);

    // image.resize(size, size);
    // console.log(`width: ${width}, height: ${height}`);
    image.pixelate(pixelSize);

    const pixels = [];
    for (let row = 0; row < numRows; row++) {
      for (let column = 0; column < numRows; column++) {
        const rgb = Jimp.intToRGBA(image.getPixelColor(column * pixelSize + 1, row * pixelSize + 1));
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        pixels.push({ row, column, color: hex });
      }
    }

    image.write(`${__dirname}/blah.png`);
    return pixels;
  }
}

module.exports = PixieService;
