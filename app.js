const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://www.carnival.com/cruise-ships.aspx";

// Async function which scrapes the data
async function scrapeData() {
    try {
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const listItems = $('div.activity-result.ship-result')
        console.log(listItems.html())
    
        /*  listItems.each(function (idx, el) {
             // console.log($(el).text());
             // console.log($(el).children("div .text").html())
             console.log($(el).find('.text').children('a').html())
         });
  */



        listItems
            .each((idx, element) => {
                // console.log($(element).html())
                const readTime = $(element).find('div.text').html()
                console.log(readTime)
            });
    } catch (error) {
        console.log(error)
    }

}
// Invoke the above function
scrapeData();