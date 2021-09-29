import puppeteer from 'puppeteer';

describe('E2E - Organization Navigation Test', () => {
  const url = process.env.TEST_URL || process.env.REACT_TEST_URL;
  let browser;
  let page;
  const k2uisSelector = 'a.K2UIS';
  const email = process.env.REACT_E2E_USER_CREDENTIALS_LOGIN;
  const password = process.env.REACT_E2E_PASS_CREDENTIALS_LOGIN;

  beforeAll(async () => {
    browser = await puppeteer.launch({
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

  it('Click on Organizations Nav button', async () => {
    await page.waitForTimeout(3000);
    await page.waitForSelector('div[name="Organizations"]');
    await page.click('div[name="Organizations"]');
  });

  it('Click on Active Orgs', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('div[name="Active Orgs"]');
    await page.click('div[name="Active Orgs"]');
  });

  it('Check first Active Org (ABC Co)', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][0]).toEqual('ABC Co');
  });

  it('Go to Exchange Status page', async () => {
    await page.waitForSelector('div[name="Exchange Statuses"]');
    await page.click('div[name="Exchange Statuses"]');
  });

  it('Should redirect to File Status page', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Text_File-Status-Text');
    const titleText = await page.$eval('#__Text_File-Status-Text', (e) => e.textContent);

    await page.waitForSelector('#__Text_Advanced-search-Text');
    const secondaryText = await page.$eval('#__Text_Advanced-search-Text', (e) => e.textContent);

    expect(titleText).toContain('File Status');
    expect(secondaryText).toContain('  — Advanced search');
  });

  it('Click on Admin', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__MainMenu__MainMenu__Row-admin-6');
    await page.click('#__MainMenu__MainMenu__Row-admin-6');
  });

  it('Click on Organizations Nav button', async () => {
    await page.waitForTimeout(3000);
    await page.waitForSelector('div[name="Organizations"]');
    await page.click('div[name="Organizations"]');
  });

  it('Click on Active Orgs', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('div[name="Active Orgs"]');
    await page.click('div[name="Active Orgs"]');
  });

  it('Check first Active Org (ABC Co)', async () => {
    await page.waitForTimeout(1000);
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][0]).toEqual('ABC Co');
  });

  it('Check Known2U Implementation Services', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector(k2uisSelector);
    const know2uText = await page.$eval(k2uisSelector, (e) => e.textContent);

    expect(know2uText).toEqual('Known2U Implementation Services');
    await page.click(k2uisSelector);
  });

  it('Verify on K2UIS Current Activity Page', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Current_Activity_Text-Text');
    const titleText = await page.$eval('#__Current_Activity_Text-Text', (e) => e.textContent);

    expect(titleText).toContain('Current Activity');
  });

  it('Check In Progress section', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Table__In__Proccess');
    const titleText = await page.$eval('#__Table__In__Proccess', (e) => e.textContent);

    expect(titleText).toContain('In Process');
  });

  it('Check Completed section', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Table__Completed');
    const titleText = await page.$eval('#__Table__Completed', (e) => e.textContent);

    expect(titleText).toContain('Completed');
  });

  it('Check Errored section', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Table__Errored');
    const titleText = await page.$eval('#__Table__Errored', (e) => e.textContent);

    expect(titleText).toContain('Errored');
  });

  it('Go back up to CDX Organization', async () => {
    await page.click('#__Organization__Button');
    await page.waitForSelector('#__Return__Organization');
    await page.click('#__Return__Organization');
  });

  it('Click on Organizations Nav button', async () => {
    await page.waitForTimeout(3000);
    await page.waitForSelector('div[name="Organizations"]');
    await page.click('div[name="Organizations"]');
  });

  it('Click on Active Orgs', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('div[name="Active Orgs"]');
    await page.click('div[name="Active Orgs"]');

    // Should be on Active Orgs pages
    await page.waitForSelector('#__Page-Title-Text');
    const titleText = await page.$eval('#__Page-Title-Text', (e) => e.textContent);
    expect(titleText).toEqual('Active orgs');
  });

  it('Click on first Active Org (ABC Co)', async () => {
    await page.waitForSelector('a.ABC');
    await page.click('a.ABC');
  });

  it('Should redirect to File Status Page', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Text_File-Status-Text');
    const titleText = await page.$eval('#__Text_File-Status-Text', (e) => e.textContent);

    expect(titleText).toContain('File Status');
  });

  afterAll(() => browser.close());
});
