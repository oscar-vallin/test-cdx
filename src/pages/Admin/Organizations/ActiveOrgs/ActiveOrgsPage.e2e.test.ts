import puppeteer from 'puppeteer';

describe('AcriveOrgsPage.js', () => {
  const url = process.env.TEST_URL || process.env.REACT_TEST_URL;
  let browser;
  let page;
  const email = 'joe.admin@example.com';
  const password = 'changeBen21';

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
    const result = await page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });

    expect(result[0][0]).toEqual('ABC Co');
  });

  it('Click on first Active Org (ABC Co)', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__ActiveOrg__Name_Field_1');
    const loginButton = await page.$eval('#__ActiveOrg__Name_Field_1', (e) => e.getAttribute('href'));
    expect(loginButton).toContain('orgSid');
  });

  it('Click on first Active Org (ABC Co)', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__ActiveOrg__Name_Field_1');
    await page.click('#__ActiveOrg__Name_Field_1');
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

  // -----------------------------

  it('Click on Admin', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__MainMenu__MainMenu__Row-admin-6');
    await page.click('#__MainMenu__MainMenu__Row-admin-6');
  });

  it('Click on Organization', async () => {
    await page.waitForTimeout(2000);
    await page.waitForSelector('#__Organization__Button');
    await page.click('#__Organization__Button');
  });

  it('Click on Return to my Organization', async () => {
    await page.waitForTimeout(2000);
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
  });

  it('Click on first Active Org (ABC Co)', async () => {
    await page.waitForSelector('#__ActiveOrg__Name_Field_2');
    await page.click('#__ActiveOrg__Name_Field_2');
  });

  it('Should redirect to File Status page', async () => {
    await page.waitForTimeout(1000);
    await page.waitForSelector('#__Current_Activity_Text-Text');
    const titleText = await page.$eval('#__Current_Activity_Text-Text', (e) => e.textContent);

    expect(titleText).toContain('Current Activit');
  });

  afterAll(() => browser.close());
});
