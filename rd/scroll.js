const puppeteer = require('puppeteer');

const query = 'selkirk rex';

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractItems() {
  const extractedElements = document.querySelectorAll('img.rg_ic.rg_i');
  const items = [];
  for (let element of extractedElements) {
    if (element.src) {
      items.push(element.src);
    }
  }
  return items;
}

async function scrapeInfiniteScrollItems(
  page,
  extractItems,
  itemTargetCount,
  scrollDelay = 1000,
) {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
    }
  } catch (e) { }
  return items;
}

(async () => {
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });

  // Navigate to the demo page.
  await page.goto(`https://www.google.com/search?&tbm=isch&q=${query}`);

  // Scroll and extract items from the page.
  const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

  // Save extracted items to a file.
  // fs.writeFileSync('./items.txt', items.join('\n') + '\n');

  console.log(items.length);

  for (let i = 0; i < items.length; i++) {
    await page.goto(items[i]);
    await page.waitFor(1000);
  }

  // Close the browser.
  await browser.close();
})();
