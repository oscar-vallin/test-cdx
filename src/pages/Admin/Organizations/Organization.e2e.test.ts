import PuppetCDXApp from '../../../teste2e/pages/PuppetCDXApp';
import PuppetActiveOrgs from '../../../teste2e/pages/PuppetActiveOrgs';
import PuppetExchangeStatus from '../../../teste2e/pages/PuppetExchangeStatus';
import PuppetCurrentActivity from '../../../teste2e/pages/PuppetCurrentActivity';
import PuppetMainMenu from '../../../teste2e/pages/PuppetMainMenu';

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

  it('Check first Active Org (ABC Co)', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.waitForSelector('a.ABC');
  });

  it('Go to Exchange Status page', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Exchange Statuses');

    const exchangeStatus = new PuppetExchangeStatus(cdxApp.page);
    await exchangeStatus.expectOnPage();
  });

  it('Click on Admin', async () => {
    const mainMenu = new PuppetMainMenu(cdxApp.page);
    await mainMenu.clickAdmin();
  });

  it('Navigate to Active Orgs', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Organizations', 'Active Orgs');
  });

  it('Check first Active Org (ABC Co)', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.waitForSelector('a.ABC');
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
    await cdxApp.returnToMyOrganization();
  });

  it('Click on Active Orgs', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Organizations', 'Active Orgs');
  });

  it('Click on first Active Org (ABC Co)', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('ABC', 'ABC Co');
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
