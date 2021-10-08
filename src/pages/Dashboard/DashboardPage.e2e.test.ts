import puppeteer from 'puppeteer';

describe('DashboardPage.js', () => {
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

  it('Click Exchage Status', async () => {
    await page.waitForSelector('div[name="Exchange Statuses"]');
    await page.click('div[name="Exchange Statuses"]');
  });

  it('Click Dashboard', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__MainMenu__MainMenu__Row-dashboard-0');
    await page.click('#__MainMenu__MainMenu__Row-dashboard-0');
  });

  it('Verify number of Transmissions matches the correct value', async () => {
    await page.waitForTimeout(2000);
    await page.waitForSelector('#__Transmissions__Billing_Units');
    const transmissionValue = await page.$eval('#__Transmissions__Billing_Units', (e) => e.textContent);

    expect(transmissionValue).toContain('Transmissions  (Billing Units.)7/6979');
  });

  it('Verify number of Failed Files  matches the correct value', async () => {
    await page.waitForTimeout(2000);
    await page.waitForSelector('#__Failed__Files__Billing_Units');
    const transmissionValue = await page.$eval('#__Failed__Files__Billing_Units', (e) => e.textContent);

    expect(transmissionValue).toContain('Failed Files  (Billing Units.)0/6979');
  });

  it('Check count items in transmission vendor table', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('#__Table_Transmissions_Vendor', (rows) => {
      return rows.length;
    });

    expect(result).toEqual(1);
  });

  it('Check first item in transmission vendor table', async () => {
    const result = await page.$$eval('#__Table_Transmissions_Vendor', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][0]).toEqual('BenefitResourceInc');
  });

  it('Click on first element in transmission table', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Table_Transmissions_Vendor');
    await page.click('#__Table_Transmissions_Vendor div.ms-Grid-row a');
  });

  it('Check url with filter=BenefitResourceInc ans file-status page', async () => {
    expect(page.url()).toContain('/file-status?filter=BenefitResource');
  });

  it('Return to Dashboard', async () => {
    await page.goto(url);
    await page.waitForTimeout(3000);
  });

  it('Check first item in transmission files table', async () => {
    await page.waitForSelector('#__Table_Transmissions_Files');
    const result = await page.$$eval('#__Table_Transmissions_Files', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][0]).toEqual('BBC-BCBS-PROD');
  });

  // it('Login', async () => {
  //   await page.waitForTimeout(1000);
  //   await page.waitForSelector('#__Table_Transmissions_Files');
  //   const a = await page.$x('//*[@id="__Table_Transmissions_Files"]/button');
  //   await a[0].click();
  // });

  it('Click in Yesterday filter', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Button-yesterday');
    await page.click('#__Button-yesterday');
  });

  it('Check url with date=yesterday', async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('?date=yesterday');
  });

  it('Check no results with Yesterday filter', async () => {
    await page.waitForTimeout(1000);
    const noResults = await page.$eval('#__Table_Transmissions_Vendor', (e) => e.textContent);

    expect(noResults).toEqual('No data available');
  });

  it('Click on This Month filter ', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Button-thisMonth');
    await page.click('#__Button-thisMonth');
  });

  it('Check url with date=thisMonth', async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('?date=thisMonth');
  });

  it('Check results in table with this month filter', async () => {
    const result = await page.$$eval('#__Table_Transmissions_Vendor', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][0]).toEqual('BenefitResourceInc');
  });

  it('Click on Last Month filter', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Button-lastMonth');
    await page.click('#__Button-lastMonth');
  });

  it('Check url with date=lastMonth', async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('?date=lastMonth');
  });

  it('Check results in table with last month filter', async () => {
    const result = await page.$$eval('#__Table_Transmissions_Vendor', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][0]).toEqual('BCBSofMA');
  });

  afterAll(() => browser.close());
});
