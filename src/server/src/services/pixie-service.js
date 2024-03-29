const Pixie = require('../models/pixie');
const Jimp = require('jimp');
// const puppeteer = require('puppeteer');

class PixieService {
  static create(pixie) {
    return new Pixie(pixie).save();
  }

  static getAll() {
    return Pixie.find({});
  }

  static async getById(id) {
    try {
      const response = await Pixie.findById(id);
      return response;
    } catch (err) {
      const error = new Error(`Unable to locate pixie with id ${id}`);
      error.name = 'Search Error';
      throw error;
    }
  }

  static update(pixie) {
    const id = pixie._id;
    delete pixie._id;
    return Pixie.findOneAndUpdate({ _id: id }, pixie);
  }

  static async delete(id) {
    const response = await Pixie.deleteOne({ _id: id });
    if (response.n === 0) {
      const error = new Error(`Unable to locate pixie with id ${id}`);
      error.name = 'Delete Failure';
      throw error;
    }

    return response;
  }

  static async pixelize(buffer, numRows) {
    const image = await Jimp.read(buffer);
    const width = image.getWidth();
    const height = image.getHeight();
    const cropSize = width > height ? height : width;
    image.cover(cropSize, cropSize, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
    const pixelSize = cropSize / numRows;
    image.pixelate(pixelSize);
    const pixels = [];
    for (let row = 0; row < numRows; row++) {
      for (let column = 0; column < numRows; column++) {
        const rgb = Jimp.intToRGBA(
          image.getPixelColor(column * pixelSize + 1, row * pixelSize + 1)
        );
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        pixels.push({ row, column, color: hex });
      }
    }

    return pixels;
  }

  /**
   * TODO: set up puppeteer scraper on production server. set up to auto disable if target's markup changes
   */
  // static async scrape(query, numRows) {
  //   // const browser = await puppeteer.launch({
  //   //   headless: false,
  //   //   defaultViewport: { width: 1024, height: 768 }
  //   // });
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(`https://www.google.com/search?&tbm=isch&q=${query}`);
  //   const results = await page.evaluate(() => {
  //     const imageLinks = [];
  //     const elements = document.querySelectorAll('img.rg_ic.rg_i');
  //     for (const element of elements) {
  //       if (element.src) {
  //         imageLinks.push(element.src);
  //       }
  //     }

  //     return imageLinks;
  //   });

  //   const imageBuffer = decodeBase64Image(results[0]).data;
  //   const pixels = await PixieService.pixelize(imageBuffer, numRows);
  //   browser.close();
  //   return pixels;
  // }
}

// function decodeBase64Image(dataString) {
//   var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
//     response = {};

//   if (!matches || matches.length !== 3) {
//     return new Error('Invalid input string');
//   }

//   response.type = matches[1];
//   response.data = new Buffer(matches[2], 'base64');

//   return response;
// }

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

module.exports = PixieService;
