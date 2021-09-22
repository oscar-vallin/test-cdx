import puppeteer from 'puppeteer';
import { format, startOfTomorrow } from 'date-fns';

describe('ArchivesPage.js', () => {
  let browser;
  let page;
  const email = 'joe.admin@example.com';
  const password = 'changeBen21';
  const formattedDate = format(startOfTomorrow(new Date()), 'MM/dd/yyyy');

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

  it('Click Archives', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__MainMenu__MainMenu__Row-archives-2');
    await page.click('#__MainMenu__MainMenu__Row-archives-2');
  });

  it('Table Should have 1 row', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(1);
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
    await page.type('#TableArchive__Card__Row__Input-Search', 'HealthyPet');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
      });
    });

    expect(result[0][1]).toEqual('HealthyPet');
  });

  it('Should have 1 record when searching by Plan Sponsor', async () => {
    const inputValue = await page.$eval('#TableArchive__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableArchive__Card__Row__Input-Search');
    await page.type('#TableArchive__Card__Row__Input-Search', 'K2UFKE');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
      });
    });

    expect(result[0][2]).toEqual('K2UFKE');
  });

  it('Should have 1 record when searching by Client File', async () => {
    const inputValue = await page.$eval('#TableArchive__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableArchive__Card__Row__Input-Search');
    await page.type('#TableArchive__Card__Row__Input-Search', 'K2UFKE-HealthyPet-UAT.txt');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
      });
    });

    expect(result[0][3]).toEqual('K2UFKE-HealthyPet-UAT.txt');
  });

  it('Should have 1 record when searching by Vendor File', async () => {
    const inputValue = await page.$eval('#TableArchive__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableArchive__Card__Row__Input-Search');
    await page.type('#TableArchive__Card__Row__Input-Search', 'HealthyPet');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
      });
    });

    expect(result[0][3]).toEqual('K2UFKE-HealthyPet-UAT.txt');
  });

  it('Read table first item', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
      });
    });

    expect(result[0][0]).toContain(formattedDate);
  });

  afterAll(() => browser.close());
});
