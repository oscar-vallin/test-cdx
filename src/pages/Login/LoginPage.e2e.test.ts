import puppeteer from 'puppeteer';

describe('LoginPage.js', () => {
  const url = process.env.TEST_URL || process.env.REACT_TEST_URL;
  let browser;
  let page;
  const email = process.env.REACT_E2E_USER_CREDENTIALS_LOGIN;
  const password = process.env.REACT_E2E_PASS_CREDENTIALS_LOGIN;
  const wrongEmail = 'foo@bar.com';
  const wrongPassword = 'foobarpass';
  let isLogout = false;
  let assert: string;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterEach(async () => {
    if (isLogout) {
      await page.on('request', (request: any) => {
        assert = JSON.parse(request._postData)?.operationName;
      });
      expect(['CurrentOrgNav', 'UserTheme', 'NavigateToNewDomain'].includes(assert)).toBeFalsy();
    }
  });

  it('contains the CDX DASHBOARD text', async () => {
    await page.goto(url);
    await page.waitForSelector('#PageLogin');
    const text = await page.$eval('#PageLogin', (e) => e.textContent);
    expect(text).toContain('CDX DASHBOARD');
  });

  it('contains the CDX DASHBOARD text', async () => {
    await page.waitForSelector('#__FormLogin__Card__Row__Column--label');
    const text = await page.$eval('#__FormLogin__Card__Row__Column--label', (e) => e.textContent);
    expect(text).toContain('CDX DASHBOARD');
  });

  it('contains the CDX DASHBOARD text', async () => {
    await page.waitForSelector('#__FormLogin__Card__Row__Column--sublabel');
    const text = await page.$eval('#__FormLogin__Card__Row__Column--sublabel', (e) => e.textContent);
    expect(text).toContain('Sign in to access your dashboard');
  });

  it('Should render Next Button', async () => {
    const nextButton = await page.$eval('#__FormLogin__Card__Row__Column__Button--Button', (e) => e.textContent);

    expect(nextButton).toContain('Next');
  });

  it('Should render Login Button', async () => {
    await page.waitForSelector('#__FormLogin__Card__Row__Input-Email');
    await page.type('#__FormLogin__Card__Row__Input-Email', email);

    await page.click('#__FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('#__FormLogin__Card__Row__Input-Password');
    await page.type('#__FormLogin__Card__Row__Input-Password', email);

    const loginButton = await page.$eval('#__FormLogin__Card__Row__Column__Button--Button', (e) => e.textContent);

    expect(loginButton).toContain('Login');
  });

  it('Should render error message when email is not valid', async () => {
    await page.goto(url);
    await page.waitForSelector('#__FormLogin__Card__Row__Input-Email');
    await page.type('#__FormLogin__Card__Row__Input-Email', wrongEmail);

    await page.click('#__FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('.ms-MessageBar-innerText');
    const errorMessage = await page.$eval('.ms-MessageBar-innerText', (e) => e.textContent);

    expect(errorMessage).toEqual('Please provide a valid email address to proceed');
  });

  it('Should render error message when password is not valid', async () => {
    await page.goto(url);
    await page.waitForSelector('#__FormLogin__Card__Row__Input-Email');
    await page.type('#__FormLogin__Card__Row__Input-Email', email);

    await page.click('#__FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('#__FormLogin__Card__Row__Input-Password');
    await page.type('#__FormLogin__Card__Row__Input-Password', wrongPassword);

    await page.click('#__FormLogin__Card__Row__Column__Button--Button');

    await page.waitForSelector('.ms-MessageBar-innerText');
    const errorMessage = await page.$eval('.ms-MessageBar-innerText', (e) => e.textContent);

    expect(errorMessage).toEqual('Invalid credentials');
  });

  it('Fill credentials form and login', async () => {
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

  it('Logout and check requests', async () => {
    isLogout = true;
    await page.waitForSelector('#__UserToken');
    await page.click('#__UserToken');

    await page.waitForTimeout(1000);

    await page.waitForSelector('#__Logout_button');
    await page.click('#__Logout_button');
  });

  it('check login page', async () => {
    await page.waitForTimeout(3000);
    await page.waitForSelector('#PageLogin');
    const text = await page.$eval('#PageLogin', (e) => e.textContent);
    expect(text).toContain('CDX DASHBOARD');
  });

  afterAll(() => browser.close());
});
