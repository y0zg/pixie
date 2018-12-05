require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const Pixie = require('./../models/Pixie');
const Jimp = require('jimp');
const puppeteer = require('puppeteer');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb!');
});

const componentToHex = c => {
  var hex = c.toString(16);
  return hex.length == 1 ? `0${hex}` : hex;
}

const rgbToHex = (r, g, b) => {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (!matches || matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  static delete(id) {
    return Pixie.deleteOne({ _id: id });
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

    image.pixelate(pixelSize);

    const pixels = [];
    for (let row = 0; row < numRows; row++) {
      for (let column = 0; column < numRows; column++) {
        const rgb = Jimp.intToRGBA(image.getPixelColor(column * pixelSize + 1, row * pixelSize + 1));
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        pixels.push({ row, column, color: hex });
      }
    }

    return pixels;
  }



  static async scrape(query) {
    // const browser = await puppeteer.launch({
    //   headless: false,
    //   defaultViewport: { width: 1024, height: 768 }
    // });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?&tbm=isch&q=${query}`);
    const results = await page.evaluate(() => {
      const imageLinks = [];
      const elements = document.querySelectorAll('img.rg_ic.rg_i');
      for (const element of elements) {
        if (element.src) {
          imageLinks.push(element.src);
        }
      }

      return imageLinks;
    });

    const imageBuffer = decodeBase64Image(results[0]).data;
    const pixels = await PixieService.pixelize(imageBuffer, 40);
    browser.close();
    return pixels;
  }
}

module.exports = PixieService;
