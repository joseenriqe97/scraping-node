const puppeteer = require('puppeteer');
const fs = require("fs");

async function initScraping() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://www.carnival.com/cruise-ships.aspx')

    const data = await page.evaluate(() => {
        root = Array.from(document.querySelectorAll("div .text"));
        cruisesInfo = root.map(r => {
            if (r.querySelector('ul li')) {
                return ({
                    'Name': r.querySelector('h2').textContent,
                    'Sail To': r.querySelector('ul li').textContent.replace("Sail To: ", ""),
                    'Sail From': r.querySelector('ul li').nextElementSibling.textContent.replace("Sail From: ", ""),
                    'Duration': r.querySelector('ul li').nextElementSibling.nextElementSibling.textContent.replace("Duration: ", "")
                })
            }
        });
        return cruisesInfo;


    });

    filterJson = JSON.stringify(data, (k, v) => Array.isArray(v)
        && !(v = v.filter(e => e)).length ? void 0 : v, 2)

    fs.writeFile("Cruises.json", filterJson, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      });

    await browser.close()
}


initScraping();