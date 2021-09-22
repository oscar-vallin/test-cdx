import puppeteer from 'puppeteer';
// import { format, startOfTomorrow } from 'date-fns';

describe('TransmissionsPage.js', () => {
  const url = process.env.TEST_URL || process.env.REACT_TEST_URL;
  let browser;
  let page;
  const email = 'joe.admin@example.com';
  const password = 'changeBen21';
  // const formattedDate = format(startOfTomorrow(new Date()), 'MM/dd/yyyy');

  beforeAll(async () => {
    browser = await puppeteer.launch();
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

  it('Click Transmissions', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__MainMenu__MainMenu__Row-transmissions-4');
    await page.click('#__MainMenu__MainMenu__Row-transmissions-4');
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
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
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
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
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
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
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
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
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
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
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
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
      });
    });

    expect(result[0][4]).toEqual('OakSpruceSpecImplementation');
  });

  it('Read table first item', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column) => column.innerText);
      });
    });

    expect(result[0][0]).toContain('11/04/2020');
  });

  afterAll(() => browser.close());
});
