import P_CDXApp from '../../teste2e/pages/P_CDXApp';
import P_ActivityOrgs from '../../teste2e/pages/P_ActivityOrgs';
import P_MainMenu from '../../teste2e/pages/P_MainMenu';
import P_Errors from '../../teste2e/pages/P_Errors';

const testConstants = {
  clientFile: 'K2UFKE-HealthyPet-UAT.txt',
  workStep: 'Processing',
  planSponsor: 'K2UFKE',
  vendor: 'HealthyPet',
};

describe('E2E - Errors Navigation Test', () => {
  let cdxApp: P_CDXApp;

  beforeAll(async () => {
    cdxApp = await P_CDXApp.startBrowser('E2E - Errors Navigation Test');
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

  it('Click on Errors', async () => {
    const mainMenu = new P_MainMenu(cdxApp.page);
    await mainMenu.clickErrors();
  });

  it('Should redirect to Erros Page', async () => {
    const fileStatus = new P_Errors(cdxApp.page);
    await fileStatus.expectOnPage();
  });

  it('Table Should have 1 row', async () => {
    const page = new P_Errors(cdxApp.page);
    await page.expectOnPage();
    await page.expectTableRecords('.ms-DetailsRow-fields', 1);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const page = new P_Errors(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput('#TableErrors__Card__Row__Input-Search', wrongValue, () =>
      page.expectTableRecords('.ms-DetailsRow-fields', 0)
    );
  });

  it('Should have 1 record when searching by Client File', async () => {
    const inputValue = testConstants.clientFile;
    const page = new P_Errors(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput('#TableErrors__Card__Row__Input-Search', inputValue, () =>
      page.expectTextOnFirstRow(inputValue, 0, 1)
    );
  });

  it('Should have 1 record when searching by Work Step', async () => {
    const inputValue = testConstants.workStep;
    const page = new P_Errors(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput('#TableErrors__Card__Row__Input-Search', inputValue, () =>
      page.expectTextOnFirstRow(inputValue, 0, 2)
    );
  });

  it('Should have 1 record when searching by Plan Sponsor', async () => {
    const inputValue = testConstants.planSponsor;
    const page = new P_Errors(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput('#TableErrors__Card__Row__Input-Search', inputValue, () =>
      page.expectTextOnFirstRow(inputValue, 0, 3)
    );
  });

  it('Should have 1 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const page = new P_Errors(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput('#TableErrors__Card__Row__Input-Search', inputValue, () =>
      page.expectTextOnFirstRow(inputValue, 0, 4)
    );
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
