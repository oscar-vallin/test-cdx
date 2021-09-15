import puppeteer from 'puppeteer';

describe.skip('LoginPage.js', () => {
  let browser;
  let page;
  const email = 'joe.admin@example.com';
  const password = 'changeBen21';

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('contains the CDX DASHBOARD text', async () => {
    await page.goto('http://localhost:3000');
    await page.screenshot({ path: 'example.png' });
    await page.waitForSelector('#PageLogin');
    const text = await page.$eval('#PageLogin', (e) => e.textContent);
    expect(text).toContain('CDX DASHBOARD');
  });

  it('contains the CDX DASHBOARD text', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#FormLogin__Card__Row__Column--label');
    const text = await page.$eval('#FormLogin__Card__Row__Column--label', (e) => e.textContent);
    expect(text).toContain('CDX DASHBOARD');
  });

  it('contains the CDX DASHBOARD text', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#FormLogin__Card__Row__Column--sublabel');
    const text = await page.$eval('#FormLogin__Card__Row__Column--sublabel', (e) => e.textContent);
    expect(text).toContain('Sign in to access your dashboard');
  });

  it('Should render Next Button', async () => {
    await page.goto('http://localhost:3000');
    const nextButton = await page.$eval('#FormLogin__Card__Row__Column__Button--Button', (e) => e.textContent);

    expect(nextButton).toContain('Next');
  });

  it('Should render Login Button', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#FormLogin__Card__Row__Input-Email');
    await page.type('#FormLogin__Card__Row__Input-Email', email);

    await page.click('#FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('#FormLogin__Card__Row__Input-Password');
    await page.type('#FormLogin__Card__Row__Input-Password', email);

    const loginButton = await page.$eval('#FormLogin__Card__Row__Column__Button--Button', (e) => e.textContent);

    expect(loginButton).toContain('Login');
  });

  it('Fill credentials form and login', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#FormLogin__Card__Row__Input-Email');
    await page.type('#FormLogin__Card__Row__Input-Email', email);

    await page.click('#FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('#FormLogin__Card__Row__Input-Password');
    await page.type('#FormLogin__Card__Row__Input-Password', password);

    await page.click('#FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('div[name="Exchange Statuses"]');
    const loginButton = await page.$eval('div[name="Exchange Statuses"]', (e) => e.textContent);

    expect(loginButton).toContain('Exchange Statuses');
  });

  afterAll(() => browser.close());
});