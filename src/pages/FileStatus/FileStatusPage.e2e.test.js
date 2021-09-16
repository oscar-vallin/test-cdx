import puppeteer from 'puppeteer';

describe('FileStatusPage.js', () => {
  let browser;
  let page;
  const email = 'joe.admin@example.com';
  const password = 'changeBen21';

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: true });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
  });

  it('Login', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#__FormLogin__Card__Row__Input-Email');
    await page.type('#__FormLogin__Card__Row__Input-Email', email);

    await page.click('#__FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('#__FormLogin__Card__Row__Input-Password');
    await page.type('#__FormLogin__Card__Row__Input-Password', password);

    await page.click('#__FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('div[name="Exchange Statuses"]');
    const loginButton = await page.$eval('div[name="Exchange Statuses"]', (e) => e.textContent);

    expect(loginButton).toContain('Exchange Statuses');
  });

  it('Go to Exchage Status page', async () => {
    await page.waitForSelector('div[name="Exchange Statuses"]');
    await page.click('div[name="Exchange Statuses"]');
  });

  it('Table Should have 1 row', async () => {
    await page.waitForTimeout(3000);
    const result = await page.$$eval('.ms-DetailsList', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(1);
  });

  //   it('Read table first item', async () => {
  //     await page.waitForTimeout(1000);
  //     const result = await page.$$eval('.ms-DetailsList', (rows) => {
  //       return Array.from(rows, (row) => {
  //         const columns = row.querySelectorAll('.ms-DetailsList-contentWrapper');
  //         return Array.from(columns, (column) => column.innerText);
  //       });
  //     });

  //     expect(result[0][0]).toContain('09/17/2021');
  //   });

  //   it('Click on Receive On', async () => {
  //     await page.waitForSelector('#button__datetime');
  //     await page.click('#button__datetime');
  //   });

  //   it('Read table first item', async () => {
  //     await page.waitForTimeout(1000);
  //     const result = await page.$$eval('.ms-DetailsList', (rows) => {
  //       return Array.from(rows, (row) => {
  //         const columns = row.querySelectorAll('.ms-DetailsList-contentWrapper');
  //         return Array.from(columns, (column) => column.innerText);
  //       });
  //     });

  //     expect(result[0][0]).toContain('09/17/2021');
  //   });
  afterAll(() => browser.close());
});
