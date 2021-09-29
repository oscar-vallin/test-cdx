import puppeteer from 'puppeteer';

describe('DashboardPage.js', () => {
  const url = process.env.npm_config_url || process.env.REACT_TEMP_URL || process.env.REACT_TEST_URL;
  let browser;
  let page;
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

  afterAll(() => browser.close());
});
