const {Given, When, Then, Before, After, setDefaultTimeout} = require('cucumber');
const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;
const {clickElement, getText} = require("../../lib/commands.js");

setDefaultTimeout(30000);

Before(async function () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
    await this.page.goto('http://qamid.tmweb.ru/client/index.php');
})

After(async function () {
    if(this.browser) {
        await this.browser.close();
    }
});

Given("user is on page {string}", async function (string) {
    return await this.page.goto(`${string}`);
  });

  When("user choose the movie and time on tuday", async function () {
    await clickElement(this.page, "body main section:nth-child(1) div.movie-seances__hall ul li:nth-child(3) a");
    return await clickElement(this.page, "button.acceptin-button");
    });

  When("user choose seat on {int} row and {int} chair and click on Забронировать button", async function (row, chair) {
    await clickElement(this.page, `div:nth-child(${row}) > span:nth-child(${chair})`);
    return await clickElement(this.page, "button.acceptin-button");
    });

  Then("user get info about seats {string}", async function (string) {
    const actual = await getText(this.page, ".ticket__chairs");
    const expected = await string;
    expect(actual).contains(expected);
  });

  When("user choose next day, movie and time", async function () {
    await clickElement(this.page, "body > nav > a:nth-child(2)");
    await clickElement(this.page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(2) > a");
    return await clickElement(this.page, "button.acceptin-button");
    });

  When("user choose first seat on {int} row and {int} chair", async function (row1, chair1) {
    await clickElement(this.page, `div:nth-child(${row1}) > span:nth-child(${chair1})`);
    return await clickElement(this.page, "button.acceptin-button");
    });

  When("user choose second seat on {int} row and {int} chair and click on Забронировать button", async function (row2, chair2) {
    await clickElement(this.page, `div:nth-child(${row2}) > span:nth-child(${chair2})`);
    return await clickElement(this.page, "button.acceptin-button");
    });
  
  Then("user get text {string}", async function (string) {
    const actual = await getText(this.page, ".tichet__check");
    const expected = await string;
    expect(actual).contains(expected);
  });


  When("user choose taken chair", async function () {
    await clickElement(this.page, `body main section:nth-child(2) div.movie-seances__hall ul li a`);
    await clickElement(this.page, `.buying-scheme__chair_taken`);
    return await clickElement(this.page, "button.acceptin-button");
  });
  
  
  Then("button Забронировать is inactive", async function () {
    const actual = await this.page.$eval(".acceptin-button", (link) => link.getAttribute("disabled"));
    expect(actual).equal("true");
  });