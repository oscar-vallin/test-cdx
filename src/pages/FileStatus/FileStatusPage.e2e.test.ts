/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer';

describe('FileStatusPage.js', () => {
  const url = process.env.npm_config_url || process.env.REACT_TEMP_URL || process.env.REACT_TEST_URL;
  let browser;
  let page;
  const email = process.env.REACT_E2E_USER_CREDENTIALS_LOGIN;
  const password = process.env.REACT_E2E_PASS_CREDENTIALS_LOGIN;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: !(!!process.env.npm_config_headless || !!process.env.IS_HEADLESS),
      args: ['--no-sandbox'],
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
  });

  it('Login', async () => {
    await page.goto(url);
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

  it('Check first Active Org (ABC Co)', async () => {
    await page.waitForSelector('a.ABC');
  });

  it('Check first Active Org (ABC Co)', async () => {
    await page.waitForSelector('a.K2UIS');
    const selector = 'a.K2UIS';
    await page.waitForSelector(selector);
    const actualText = await page.$eval(selector, (e) => e.textContent);
    expect(actualText).toContain('Known2U Implementation Services');
    await page.click(selector);
  });

  it('Go to Exchage Status page', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('div[name="Organizations"]');
    await page.click('div[name="Organizations"]');
  });

  it('Go to Exchage Status page', async () => {
    await page.waitForSelector('div[name="Active Orgs"]');
    await page.click('div[name="Active Orgs"]');
  });

  it('Check first Active Org (Farm Hop)', async () => {
    await page.waitForSelector('a.FMHP');
  });

  it('Click on first Active Org (Farm Hop)', async () => {
    await page.waitForSelector('a.FMHP');
    await page.click('a.FMHP');
  });

  it('Select Nov 01, 2020 as Start Date', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#Input__From__Date-label');
    await page.click('#Input__From__Date-label');

    await page.waitForTimeout(1000);
    await page.click('.ms-DatePicker-prevYear');

    await page.waitForTimeout(1000);
    await page.click('.ms-DatePicker-monthOption[aria-label="November 2020"]');

    await page.waitForTimeout(1000);
    await page.click('.ms-DatePicker-day-button[aria-label="November 1, 2020"]');
  });

  it('Select Nov 30, 2020 as End Date', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#Input__To__Date-label');
    await page.click('#Input__To__Date-label');

    await page.waitForTimeout(1000);
    await page.click('.ms-DatePicker-prevYear');

    await page.waitForTimeout(1000);
    await page.click('.ms-DatePicker-monthOption[aria-label="November 2020"]');

    await page.waitForTimeout(1000);
    await page.click('.ms-DatePicker-day-button[aria-label="November 30, 2020"]');
  });

  it('Table Should have 17 rows', async () => {
    await page.waitForTimeout(3000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(17);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    await page.waitForSelector('#TableFileStatus__Card__Row__Input-Search');
    await page.type('#TableFileStatus__Card__Row__Input-Search', 'WrongSearch');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(0);
  });

  it('Should have 1 record when searching by Vendor', async () => {
    const inputValue = await page.$eval('#TableFileStatus__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableFileStatus__Card__Row__Input-Search');
    await page.type('#TableFileStatus__Card__Row__Input-Search', 'VSP');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][1]).toEqual('VSP');
  });

  it('Should have 1 record when searching by Sponsor', async () => {
    const inputValue = await page.$eval('#TableFileStatus__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableFileStatus__Card__Row__Input-Search');
    await page.type('#TableFileStatus__Card__Row__Input-Search', 'GOLD');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][2]).toEqual('GOLD');
  });

  it('Should have 1 record when searching by Extract Name', async () => {
    const inputValue = await page.$eval('#TableFileStatus__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableFileStatus__Card__Row__Input-Search');
    await page.type('#TableFileStatus__Card__Row__Input-Search', 'ADENA-Cigna-Elig-KNTU');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][3]).toEqual('ADENA-Cigna-Elig-KNTU');
  });

  it('Read table first item', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][0]).toContain('11/04/2020');
  });

  afterAll(() => browser.close());
});
