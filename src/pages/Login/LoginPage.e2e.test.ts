import PuppetCDXApp from '../../teste2e/pages/PuppetCDXApp';

describe('Login Tests', () => {
  let cdxApp: PuppetCDXApp;

  const email = process.env.REACT_E2E_USER_CREDENTIALS_LOGIN || '';
  const wrongEmail = 'foo@bar.com';
  const wrongPassword = 'foobarpass';

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('Login Tests');
  });

  it('Assert Expected Text on Page', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.expectTextOnPage('#PageLogin', 'CDX DASHBOARD');
    await loginPage.expectTextOnPage('#__FormLogin__Card__Row__Column--label', 'CDX DASHBOARD');
    await loginPage.expectTextOnPage('#__FormLogin__Card__Row__Column--sublabel', 'Sign in to access your dashboard');
    await loginPage.expectTextOnPage('#__FormLogin__Card__Row__Column__Button--Button', 'Next');
  });

  it('Should render Login Button', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.typeEmail(email);
    await loginPage.clickLoginButton();
    await loginPage.waitForPasswordField();
    await loginPage.expectTextOnPage(loginPage.loginButton, 'Login');
  });

  it('Entering an invalid email', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.typeEmail(wrongEmail);

    await loginPage.clickLoginButton();

    await loginPage.expectError('Please provide a valid email address to proceed');
  });

  it('Entering a wrong password', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.typeEmail(email);
    await loginPage.clickLoginButton();
    await loginPage.waitForPasswordField();
    await loginPage.typePassword(wrongPassword);
    await loginPage.clickLoginButton();
    await loginPage.expectError('Invalid credentials');
  });

  it('Positive Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();

    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
