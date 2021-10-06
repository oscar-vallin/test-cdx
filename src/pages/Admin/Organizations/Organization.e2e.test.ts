import P_CDXApp from '../../../teste2e/pages/P_CDXApp';
import P_ActivityOrgs from '../../../teste2e/pages/P_ActivityOrgs';
import P_ExchangeStatus from '../../../teste2e/pages/P_ExchangeStatus';
import P_CurrentActivity from '../../../teste2e/pages/P_CurrentActivity';
import P_MainMenu from '../../../teste2e/pages/P_MainMenu';

describe('E2E - Organization Navigation Test', () => {
  let cdxApp: P_CDXApp;

  beforeAll(async () => {
    cdxApp = await P_CDXApp.startBrowser('E2E - Organization Navigation Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Check first Active Org (ABC Co)', async () => {
    const activeOrgs = new P_ActivityOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.waitForSelector('a.ABC');
  });

  it('Go to Exchange Status page', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Exchange Statuses');

    const exchangeStatus = new P_ExchangeStatus(cdxApp.page);
    await exchangeStatus.expectOnPage();
  });

  it('Click on Admin', async () => {
    const mainMenu = new P_MainMenu(cdxApp.page);
    await mainMenu.clickAdmin();
  });

  it('Navigate to Active Orgs', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Organizations', 'Active Orgs');
  });

  it('Check first Active Org (ABC Co)', async () => {
    const activeOrgs = new P_ActivityOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.waitForSelector('a.ABC');
  });

  it('Check Known2U Implementation Services', async () => {
    const activeOrgs = new P_ActivityOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('K2UIS', 'Known2U Implementation Services');
  });

  it('Verify on K2UIS Current Activity Page', async () => {
    const currentActivity = new P_CurrentActivity(cdxApp.page);
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
    const activeOrgs = new P_ActivityOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('ABC', 'ABC Co');
  });

  it('Should redirect to File Status Page', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
