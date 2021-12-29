import PuppetCDXApp from '../../../../teste2e/pages/PuppetCDXApp';
import PuppetAccessPolicies from '../../../../teste2e/pages/PuppetAccessPolicies';

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

  // it('Load the available policy templates', async () => {
  //   const accessPolicies = new PuppetAccessPolicies(cdxApp.page);

  //   await accessPolicies.expectPolicyTemplates();
  // });

  it('Click on Create Policy button', async () => {
    const accessPolicies = new PuppetAccessPolicies(cdxApp.page);

    await accessPolicies.expectSuperUserPolicy();
    await accessPolicies.clickOnCreatePolicy();
  });

  describe('CRUD Operations', () => {
    it('Create policy', async () => {
      const selector = '#__CDX_E2E_Policy';
      const accessPolicies = new PuppetAccessPolicies(cdxApp.page);
      await accessPolicies.createPolicy();
      await accessPolicies.expectTextOnPage(selector, 'CDX E2E Policy');
    });

    it('Update policy', async () => {
      const selector = '#__CDX_E2E_Test';
      const accessPolicies = new PuppetAccessPolicies(cdxApp.page);
      await accessPolicies.updatePolicy('CDX_E2E_Policy');

      await accessPolicies.waitForTimeout(2000);
      await accessPolicies.expectTextOnPage(selector, 'CDX E2E Test');
    });

    it('Delete policy', async () => {
      const accessPolicies = new PuppetAccessPolicies(cdxApp.page);
      await accessPolicies.deletePolicy('CDX_E2E_Test');
    });

    it('Create policy from template', async () => {
      const selector = '#__CDX_E2E_Template';
      const accessPolicies = new PuppetAccessPolicies(cdxApp.page);

      await accessPolicies.createPolicyFromTemplate();
      await accessPolicies.expectTextOnPage(selector, 'CDX E2E Template');
    });
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
