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

  
  When("user choose the movie and time {int} {int} on one seat {int} {int} and click booking button and button to get code", async function (one, two, row, chair) {
    await clickElement(this.page, `body main section:nth-child(${one}) div.movie-seances__hall ul li:nth-child(${two}) a`);
    await clickElement(this.page, `body main section div.buying-scheme div.buying-scheme__wrapper div:nth-child(${row}) span:nth-child(${chair}`);
    return await clickElement(this.page, "button.acceptin-button").clickElement(this.page, "button.acceptin-button");
  });

  When("user choose the next date movie and time {int} {int} on two seats {int} {int} {int} {int} and click booking button and button to get code", async function (one, two, row1, chair1, row2, chair2) {
    await clickElement(this.page, `a:nth-child(4)`);
    await clickElement(this.page, `body main section:nth-child(${one}) div.movie-seances__hall ul li:nth-child(${two}) a`);
    await clickElement(this.page, `body main section div.buying-scheme div.buying-scheme__wrapper div:nth-child(${row1}) span:nth-child(${chair1}`);
    await clickElement(this.page, `body main section div.buying-scheme div.buying-scheme__wrapper div:nth-child(${row2}) span:nth-child(${chair2}`);
    return await clickElement(this.page, "button.acceptin-button").clickElement(this.page, "button.acceptin-button");
  });
  
  Then("user get the code and text {string}", async function (string) {
    const actual = await getText(this.page, ".ticket__check-title");
    const expected = await string;
    expect(actual).contains(expected);
  });


  When("user choose the movie and time {int}", async function (one) {
    return await clickElement(this.page, `body main section:nth-child(${one}) div.movie-seances__hall ul li a`);
  });
  
  When("user choose taken chair", async function () {
    return await clickElement(this.page, ".buying-scheme__chair_taken");
  });
  
  Then("button 'Забронировать' is inactive", async function () {
    const actual = await this.page.$eval(".acceptin-button", (link) => link.getAttribute("disabled"));
    expect(actual).equal("true");
  });