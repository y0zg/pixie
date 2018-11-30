const puppeteer = require('puppeteer');
const prompt = require('prompt');

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
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1024, height: 768 }
  });
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?&tbm=isch&q=${query}`);
  await autoScroll(page);
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

  browser.close();
  return results;
};

(async () => {
  prompt.start();
  await prompt.get(['search'], async (error, result) => {
    const urls = await scrapeImgUrls(result.search);
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1024, height: 768 }
    });

    const page = await browser.newPage();
    for (let i = 0; i < urls.length; i++) {
      await page.goto(urls[i]);
      await sleep(1000);
    }

    browser.close();
  });
})();
