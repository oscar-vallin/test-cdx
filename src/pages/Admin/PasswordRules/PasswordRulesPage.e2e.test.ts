import PuppetCDXApp from '../../../teste2e/pages/PuppetCDXApp';
import PuppetPasswordRules from '../../../teste2e/pages/PuppetPasswordRules';

describe('E2E - Password Rules Navigation Test', () => {
  let cdxApp: PuppetCDXApp;
  jest.setTimeout(60000);

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Password Rules Navigation Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Navigate to Password Rules', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Security', 'Password Rules');
  });

  it('Check for password rules form', async () => {
    const passwordRules = new PuppetPasswordRules(cdxApp.page);

    await passwordRules.waitForSelector('#__PasswordRules-Form');
  });

  it('Saves password rules sucessfully', async () => {
    const passwordRules = new PuppetPasswordRules(cdxApp.page);

    await passwordRules.fillCorrectInfo();
    await passwordRules.clickOnSave();
    await passwordRules.expectSuccessMessage();
  });

  it('Handles error while saving password rules', async () => {
    const passwordRules = new PuppetPasswordRules(cdxApp.page);

    await passwordRules.waitForTimeout(6000);

    await passwordRules.fillWrongInfo();

    await passwordRules.clickOnSave();
    await passwordRules.expectErrorMessage();
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
