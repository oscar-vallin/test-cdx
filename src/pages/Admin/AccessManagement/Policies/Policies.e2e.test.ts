import PuppetCDXApp from '../../../../teste2e/pages/PuppetCDXApp';
import PuppetAccessPolicies from '../../../../teste2e/pages/PuppetAccessPolicies';

jest.setTimeout(999999999);

describe('E2E - Access Policies Test', () => {
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Access Policies Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Go to Access Policies page', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Access Management', 'Policies');

    const accessPolicies = new PuppetAccessPolicies(cdxApp.page);
    await accessPolicies.expectSuperUserPolicy();
  });

  it('Click on Create Policy button', async () => {
    const accessPolicies = new PuppetAccessPolicies(cdxApp.page);

    await accessPolicies.expectSuperUserPolicy();
    await accessPolicies.clickOnCreatePolicy();
  });

  it('Create policy', async () => {
    const selector = '#__CDX_E2E_Policy';
    const accessPolicies = new PuppetAccessPolicies(cdxApp.page);

    await accessPolicies.createPolicy();
    await accessPolicies.expectTextOnPage(selector, 'CDX E2E Policy');
  });

  it.skip('Update policy', async () => {
    const selector = '#__CDX_E2E_Test';
    const accessPolicies = new PuppetAccessPolicies(cdxApp.page);

    await accessPolicies.updatePolicy();
    await accessPolicies.expectTextOnPage(selector, 'CDX E2E Test');
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
