const { clickElement, getText } = require("./lib/commands.js");


let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

  test("Booking one seat on today", async () => {
    await clickElement(page, "body main section:nth-child(1) div.movie-seances__hall ul li:nth-child(3) a");
    await clickElement(page, "body main section div.buying-scheme div.buying-scheme__wrapper div:nth-child(2) span:nth-child(2)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Электронный билет");
    
  });

  test("Booking two seat on next day", async () => {
    await clickElement(page, "a:nth-child(4)");
    await clickElement(page, "body main section:nth-child(1) div.movie-seances__hall ul li:nth-child(3) a");
    await clickElement(page, "body main section div.buying-scheme div.buying-scheme__wrapper div:nth-child(8) span:nth-child(6)");
    await clickElement(page, "body main section div.buying-scheme div.buying-scheme__wrapper div:nth-child(8) span:nth-child(7)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Электронный билет");
      
  });

test("Book taken chair", async () => {
  await clickElement(page, "body main section:nth-child(2) div.movie-seances__hall ul li a");
  await clickElement(page, ".buying-scheme__chair_taken");
  const actual = await page.$eval(".acceptin-button", (link) => link.getAttribute("disabled"));
  expect(actual).toEqual("true");
});

