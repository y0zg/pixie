const puppeteer = require('puppeteer');
const prompt = require('prompt');

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// const downloadAll = async () => {
//   const imgs = await scrapeImgUrls();

//   await Promise.all(imgs.map(async (file) => {
//     await downloadImg({
//       url: file,
//       dest: '../../../../Pictures/covers'
//     });
//   }));
//   console.log("Done.");
// };


scrapeImgUrls = async query => {
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

  // for (let i = 0; i < results.length; i++) {
  //   await page.goto(results[i]);
  //   await sleep(1000);
  // }

  browser.close();
  return results;
};

(async () => {
  prompt.start();
  await prompt.get(['search'], async (error, result) => {
    const urls = await scrapeImgUrls(result.search);
    // const urls = await scrapeImgUrls('cat');

    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1024, height: 768 }
    });
    const page = await browser.newPage();

    for (let i = 0; i < urls.length; i++) {
      await page.goto(urls[i]);
      await sleep(1000);
    }

    console.log(urls.length);

    // browser.close();
  });
})();



// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: { width: 1024, height: 768 }
//   });
//   const page = await browser.newPage();
//   const searchQuery = 'see food octopus';
//   await page.goto(`https://www.google.com/search?&tbm=isch&q=${searchQuery}`);
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

//   // for (let i = 0; i < results.length; i++) {
//   //   await page.goto(results[i]);
//   //   await sleep(1000);
//   // }
// })();













// const puppeteer = require('puppeteer');
// const prompt = require('prompt');

// const sleep = ms => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // const downloadAll = async () => {
// //   const imgs = await scrapeImgUrls();

// //   await Promise.all(imgs.map(async (file) => {
// //     await downloadImg({
// //       url: file,
// //       dest: '../../../../Pictures/covers'
// //     });
// //   }));
// //   console.log("Done.");
// // };


// scrapeImgUrls = async query => {
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

//   // for (let i = 0; i < results.length; i++) {
//   //   await page.goto(results[i]);
//   //   await sleep(1000);
//   // }

//   browser.close();
//   return results;
// };

// (async () => {
//   prompt.start();
//   await prompt.get(['search'], async (error, result) => {
//     const urls = await scrapeImgUrls(result.search);
//     // const urls = await scrapeImgUrls('cat');

//     const browser = await puppeteer.launch({
//       headless: false,
//       defaultViewport: { width: 1024, height: 768 }
//     });
//     const page = await browser.newPage();

//     for (let i = 0; i < urls.length; i++) {
//       await page.goto(urls[i]);
//       await sleep(1000);
//     }

//     console.log(urls.length);

//     // browser.close();
//   });
// })();














// // funny, try typing cat
// const puppeteer = require('puppeteer');
// const prompt = require('prompt');

// const sleep = ms => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // const downloadAll = async () => {
// //   const imgs = await scrapeImgUrls();

// //   await Promise.all(imgs.map(async (file) => {
// //     await downloadImg({
// //       url: file,
// //       dest: '../../../../Pictures/covers'
// //     });
// //   }));
// //   console.log("Done.");
// // };


// scrapeImgUrls = async query => {
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

//   // for (let i = 0; i < results.length; i++) {
//   //   await page.goto(results[i]);
//   //   await sleep(1000);
//   // }

//   browser.close();
//   return results;
// };

// (async () => {
//   prompt.start();
//   prompt.get(['search'], async (error, result) => {

//     const urls = await scrapeImgUrls(result);
//     // const urls = await scrapeImgUrls('cat');

//     const browser = await puppeteer.launch({
//       headless: false,
//       defaultViewport: { width: 1024, height: 768 }
//     });
//     const page = await browser.newPage();

//     for (let i = 0; i < urls.length; i++) {
//       await page.goto(urls[i]);
//       await sleep(1000);
//     }
//   });

//   // browser.close();
// })();



// // (async () => {
// //   const browser = await puppeteer.launch({
// //     headless: false,
// //     defaultViewport: { width: 1024, height: 768 }
// //   });
// //   const page = await browser.newPage();
// //   const searchQuery = 'see food octopus';
// //   await page.goto(`https://www.google.com/search?&tbm=isch&q=${searchQuery}`);
// //   const results = await page.evaluate(() => {
// //     const imageLinks = [];
// //     const elements = document.querySelectorAll('img.rg_ic.rg_i');

// //     for (const element of elements) {
// //       if (element.src) {
// //         imageLinks.push(element.src);
// //       }
// //     }

// //     return imageLinks;
// //   });

// //   // for (let i = 0; i < results.length; i++) {
// //   //   await page.goto(results[i]);
// //   //   await sleep(1000);
// //   // }
// // })();
