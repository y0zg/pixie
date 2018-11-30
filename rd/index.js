const puppeteer = require('puppeteer');
const prompt = require('prompt');
const fs = require('fs');

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const autoScroll = async page => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const distance = 100;
      let totalHeight = 0;
      let timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

const scrapeImgUrls = async query => {
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   defaultViewport: { width: 1024, height: 768 }
  // });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?&tbm=isch&q=${query}`);
  await autoScroll(page);
  const results = await page.evaluate(() => {
    const imageLinks = [];
    const elements = document.querySelectorAll('img.rg_ic.rg_i');
    for (const element of elements) {
      if (element.dataset.src) {
        imageLinks.push('bloop' + element.dataset.src);
      } else if (element.src) {
        imageLinks.push(element.src);
      } else if (element.src === null) {
        imageLinks.push('nuuuuuuuuuuul');
      }
    }

    return imageLinks;
  });

  browser.close();
  return results;
};

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (!matches || matches.length !== 3) {
    // return new Error('Invalid input string');
    return null;
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

// var imageBuffer = decodeBase64Image(data);
// console.log(imageBuffer);

(async () => {
  prompt.start();
  await prompt.get(['search'], async (error, result) => {
    const urls = await scrapeImgUrls(result.search);
    // const browser = await puppeteer.launch({
    //   headless: false,
    //   defaultViewport: { width: 1024, height: 768 }
    // });

    // const page = await browser.newPage();

    for (let i = 0; i < urls.length; i++) {
      console.log(`${typeof urls[i]}: ${urls[i]}`);

      const imageBuffer = decodeBase64Image(urls[i]);
      if (imageBuffer) {
        // console.log(imageBuffer);
        await fs.writeFile(`${__dirname}/images/${i}.jpg`, imageBuffer.data, error => console.error(error));
      }


      // console.log(urls[i]);
      // await page.goto(urls[0]);
      // await sleep(10000);
    }

    // browser.close();
  });
})();
