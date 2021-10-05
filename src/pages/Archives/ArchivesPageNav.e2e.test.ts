import P_CDXApp from '../../teste2e/pages/P_CDXApp';
import P_ActivityOrgs from '../../teste2e/pages/P_ActivityOrgs';
import P_MainMenu from '../../teste2e/pages/P_MainMenu';
import P_Archives from '../../teste2e/pages/P_Archives';

describe('E2E - Archives Navigation Test', () => {
  let cdxApp: P_CDXApp;

  beforeAll(async () => {
    cdxApp = await P_CDXApp.startBrowser();
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

  it('Click K2UIS Active Org (Known2U Implementation Services)', async () => {
    const activeOrgs = new P_ActivityOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('K2UIS', 'Known2U Implementation Services');
  });

  it('Navigate to Active Orgs', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Organizations', 'Active Orgs');
  });

  it('Check first Active Org (Farm Hop)', async () => {
    const activeOrgs = new P_ActivityOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.waitForSelector('a.FMHP');
  });

  it('Click on first Active Org (Farm Hop)', async () => {
    const activeOrgs = new P_ActivityOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('FMHP', 'Farm Hop');
  });

  it('Click on Archives', async () => {
    const mainMenu = new P_MainMenu(cdxApp.page);
    await mainMenu.clickArchives();
  });

  it('Should redirect to Archives Page', async () => {
    const fileStatus = new P_Archives(cdxApp.page);
    await fileStatus.expectOnPage();
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(() => cdxApp.closeBrowser());
});
