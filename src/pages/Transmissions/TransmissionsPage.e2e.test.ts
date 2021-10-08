/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer';

describe('TransmissionsPage.js', () => {
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

  it('Click Transmissions', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__MainMenu__MainMenu__Row-transmissions-4');
    await page.click('#__MainMenu__MainMenu__Row-transmissions-4');
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

  it('Table Should have 2 rows', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(2);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    await page.waitForSelector('#TableTransmissions__Card__Row__Input-Search');
    await page.type('#TableTransmissions__Card__Row__Input-Search', 'WrongSearch');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(0);
  });

  it('Should have 2 records when searching by Plan Sponsor PZZA', async () => {
    const inputValue = await page.$eval('#TableTransmissions__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableTransmissions__Card__Row__Input-Search');
    await page.type('#TableTransmissions__Card__Row__Input-Search', 'PZZA');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(2);
  });

  it('Should have 1 record when searching by Vendor Disc', async () => {
    const inputValue = await page.$eval('#TableTransmissions__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableTransmissions__Card__Row__Input-Search');
    await page.type('#TableTransmissions__Card__Row__Input-Search', 'Disc');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][2]).toEqual('Disc');
  });

  it('Should have 1 record when searching by Vendor Oak', async () => {
    const inputValue = await page.$eval('#TableTransmissions__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableTransmissions__Card__Row__Input-Search');
    await page.type('#TableTransmissions__Card__Row__Input-Search', 'Oak');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][2]).toEqual('Oak');
  });

  it('Should have 1 record when searching by Spec DiscSpec', async () => {
    const inputValue = await page.$eval('#TableTransmissions__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableTransmissions__Card__Row__Input-Search');
    await page.type('#TableTransmissions__Card__Row__Input-Search', 'DiscSpec');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][3]).toEqual('DiscSpec');
  });

  it('Should have 1 record when searching by Spec OakSpruceSpec', async () => {
    const inputValue = await page.$eval('#TableTransmissions__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableTransmissions__Card__Row__Input-Search');
    await page.type('#TableTransmissions__Card__Row__Input-Search', 'OakSpruceSpec');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][3]).toEqual('OakSpruceSpec');
  });

  it('Should have 1 record when searching by Implementation DiscImplementation', async () => {
    const inputValue = await page.$eval('#TableTransmissions__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableTransmissions__Card__Row__Input-Search');
    await page.type('#TableTransmissions__Card__Row__Input-Search', 'DiscImplementation');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][4]).toEqual('DiscImplementation');
  });

  it('Should have 1 record when searching by Implementation OakSpruceSpecImplementation ', async () => {
    const inputValue = await page.$eval('#TableTransmissions__Card__Row__Input-Search', (el) => el.value);

    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await page.waitForSelector('#TableTransmissions__Card__Row__Input-Search');
    await page.type('#TableTransmissions__Card__Row__Input-Search', 'OakSpruceSpecImplementation');

    await page.waitForTimeout(1000);

    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][4]).toEqual('OakSpruceSpecImplementation');
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
