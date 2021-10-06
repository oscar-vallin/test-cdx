/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer';
import { format, startOfTomorrow } from 'date-fns';

describe('ArchivesPage.js', () => {
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

  it('Go to Exchage Status page', async () => {
    await page.waitForSelector('div[name="Exchange Statuses"]');
    await page.click('div[name="Exchange Statuses"]');
  });

  it('Click Archives', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__MainMenu__MainMenu__Row-archives-2');
    await page.click('#__MainMenu__MainMenu__Row-archives-2');
  });

  it('Table Should have 17 rows', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(17);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    await page.waitForSelector('#TableArchive__Card__Row__Input-Search');
    await page.type('#TableArchive__Card__Row__Input-Search', 'WrongSearch');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(0);
  });

  it('Should have 1 record when searching by Vendor', async () => {
    const inputValue = await page.$eval('#TableArchive__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableArchive__Card__Row__Input-Search');
    await page.type('#TableArchive__Card__Row__Input-Search', 'VSP');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][1]).toEqual('VSP');
  });

  it('Should have 1 record when searching by Plan Sponsor', async () => {
    const inputValue = await page.$eval('#TableArchive__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableArchive__Card__Row__Input-Search');
    await page.type('#TableArchive__Card__Row__Input-Search', 'GOLD');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][2]).toEqual('GOLD');
  });

  it('Should have 1 record when searching by Client File', async () => {
    const inputValue = await page.$eval('#TableArchive__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableArchive__Card__Row__Input-Search');
    await page.type('#TableArchive__Card__Row__Input-Search', 'GOLD-VSP-PROD.txt.pgp');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][3]).toEqual('GOLD-VSP-PROD.txt.pgp');
  });

  it('Should have 1 record when searching by Vendor File', async () => {
    const inputValue = await page.$eval('#TableArchive__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableArchive__Card__Row__Input-Search');
    await page.type('#TableArchive__Card__Row__Input-Search', '2020-11-04-023459270g7dk01');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][4]).toEqual('2020-11-04-023459270g7dk01');
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
