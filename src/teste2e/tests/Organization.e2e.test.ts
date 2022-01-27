import PuppetCDXApp from 'src/teste2e/pages/PuppetCDXApp';
import PuppetActiveOrgs from 'src/teste2e/pages/PuppetActiveOrgs';
import PuppetExchangeStatus from 'src/teste2e/pages/PuppetExchangeStatus';
import PuppetCurrentActivity from 'src/teste2e/pages/PuppetCurrentActivity';

describe('E2E - Organization Navigation Test', () => {
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Organization Navigation Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Check first Active Org (K2UIS)', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.waitForSelector('a.K2UIS');
  });

  it('Navigate to Active Orgs', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Organizations', 'Active Orgs');
  });

  it('Check first Active Org (CDX Global Vendors)', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.waitForSelector('a.CDXGVENDOR');
  });

  it('Check Known2U Implementation Services', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('K2UIS', 'Known2U Implementation Services');
  });

  it('Verify on K2UIS Current Activity Page', async () => {
    const currentActivity = new PuppetCurrentActivity(cdxApp.page);
    await currentActivity.expectOnPage();
  });

  it('Go back up to CDX Organization', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Navigate To...', 'Return to my organization');
  });

  it('Click on Active Orgs', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Organizations', 'Active Orgs');
  });

  it('Click on K2U Faker Data', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('K2UFKE', 'K2U Faker Data');
  });

  it('Should redirect to File Status Page', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
