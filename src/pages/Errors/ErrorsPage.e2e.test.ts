import PuppetCDXApp from '../../teste2e/pages/PuppetCDXApp';
import PuppetActiveOrgs from '../../teste2e/pages/PuppetActiveOrgs';
import PuppetMainMenu from '../../teste2e/pages/PuppetMainMenu';
import PuppetErrors from '../../teste2e/pages/PuppetErrors';

const testConstants = {
  clientFile: 'FMHP-CIGNA-PROD.xml.pgp',
  workStep: 'Transform',
  planSponsor: 'FMHP',
  vendor: 'CARECENTRAL',
};

describe('E2E - Errors Navigation Test', () => {
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Errors Navigation Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Click K2UIS Active Org (Known2U Implementation Services)', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('K2UIS', 'Known2U Implementation Services');
  });

  it('Navigate to Active Orgs', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Organizations', 'Active Orgs');
  });

  it('Click on first Active Org (Farm Hop)', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('FMHP', 'Farm Hop');
  });

  it('Click on Errors', async () => {
    const mainMenu = new PuppetMainMenu(cdxApp.page);
    await mainMenu.clickErrors();
  });

  it('Should redirect to Errors Page', async () => {
    const fileStatus = new PuppetErrors(cdxApp.page);
    await fileStatus.expectOnPage();
  });

  it('Table Should have 6 rows', async () => {
    const page = new PuppetErrors(cdxApp.page);
    await page.setDateRange('Sun Aug 15 2021', 'Wed Sep 15 2021');
    await page.expectOnPage();
    await page.expectTableRecords('.ms-DetailsRow-fields', 6);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const page = new PuppetErrors(cdxApp.page);
    await page.expectOnPage();
    await page.search(wrongValue);
    await page.expectTableRecords('.ms-DetailsRow-fields', 0);
  });

  it('Should have 1 record when searching by Client File', async () => {
    const inputValue = testConstants.clientFile;
    const page = new PuppetErrors(cdxApp.page);
    await page.expectOnPage();
    await page.search(inputValue);
    await page.expectTextOnFirstRow(inputValue, 0, 1);
  });

  it('Should have 1 record when searching by Work Step', async () => {
    const inputValue = testConstants.workStep;
    const page = new PuppetErrors(cdxApp.page);
    await page.expectOnPage();
    await page.search(inputValue);
    await page.expectTextOnFirstRow(inputValue, 0, 2);
  });

  it('Should have 6 records when searching by Plan Sponsor', async () => {
    const inputValue = testConstants.planSponsor;
    const page = new PuppetErrors(cdxApp.page);
    await page.expectOnPage();
    await page.search(inputValue);
    await page.expectTextOnFirstRow(inputValue, 0, 3);
  });

  it('Should have 1 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const page = new PuppetErrors(cdxApp.page);
    await page.expectOnPage();
    await page.search(inputValue);
    await page.expectTextOnFirstRow(inputValue, 0, 4);
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
