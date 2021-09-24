import puppeteer from 'puppeteer';

describe('E2E - Organization Navigation Test', () => {
  const url = process.env.TEST_URL || process.env.REACT_TEST_URL;
  let browser;
  let page;
  const email = process.env.REACT_E2E_USER_CREDENTIALS_LOGIN;
  const password = process.env.REACT_E2E_PASS_CREDENTIALS_LOGIN;

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

  it('Go to Exchage Status page', async () => {
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
    await page.waitForSelector('#__ActiveOrg__Name_Field_5');
    const know2uText = await page.$eval('#__ActiveOrg__Name_Field_5', (e) => e.textContent);

    expect(know2uText).toEqual('Known2U Implementation Services');
  });

  it('Verify on K2UIS File Status Page', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__ActiveOrg__Name_Field_5');
    const know2uText = await page.$eval('#__ActiveOrg__Name_Field_5', (e) => e.textContent);

    expect(know2uText).toEqual('Known2U Implementation Services');
  });

  it('Click on first Active Org (ABC Co)', async () => {
    await page.waitForSelector('#__ActiveOrg__Name_Field_5');
    await page.click('#__ActiveOrg__Name_Field_5');
  });

  it('Should redirect to Current Activity', async () => {
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

  it('Check In Progress section', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Table__Completed');
    const titleText = await page.$eval('#__Table__Completed', (e) => e.textContent);

    expect(titleText).toContain('Completed');
  });

  it('Check In Progress section', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Table__Errored');
    const titleText = await page.$eval('#__Table__Errored', (e) => e.textContent);

    expect(titleText).toContain('Errored');
  });

  afterAll(() => browser.close());
});
