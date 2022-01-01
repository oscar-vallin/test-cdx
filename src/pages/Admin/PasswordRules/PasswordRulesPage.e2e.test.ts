import PuppetCDXApp from '../../../teste2e/pages/PuppetCDXApp';
import PuppetPasswordRules from '../../../teste2e/pages/PuppetPasswordRules';

describe('E2E - Password Rules Navigation Test', () => {
  let cdxApp: PuppetCDXApp;

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
    const activeOrgs = new PuppetPasswordRules(cdxApp.page);

    await activeOrgs.waitForSelector('#__PasswordRules-Form');
  });

  it('Click on the save button', async () => {
    const accessPolicies = new PuppetPasswordRules(cdxApp.page);

    await accessPolicies.clickOnSave();
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
