import P_CDXApp from '../../teste2e/pages/P_CDXApp';
import P_ActivityOrgs from '../../teste2e/pages/P_ActivityOrgs';
import P_ExchangeStatus from '../../teste2e/pages/P_ExchangeStatus';

const testConstants = {
  sponsor: 'ADENA',
  vendor: 'Anthem',
  extractName: 'GOLD-CareCentral-TEST.txt.pgp',
};

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

  it('Table Should have 17 rows', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 17);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput('#TableFileStatus__Card__Row__Input-Search', wrongValue, () =>
      fileStatus.expectTableRecords('.ms-DetailsRow-fields', 0)
    );
  });

  it('Should have at least 1 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput('#TableFileStatus__Card__Row__Input-Search', inputValue, () =>
      fileStatus.expectTextOnFirstRow(inputValue, 0, 1)
    );
  });

  it('Should have at least 1 record when searching by Sponsor', async () => {
    const inputValue = testConstants.sponsor;
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput('#TableFileStatus__Card__Row__Input-Search', inputValue, () =>
      fileStatus.expectTextOnFirstRow(inputValue, 0, 2)
    );
  });

  it('Should have at least 1 record when searching by Extract Name', async () => {
    const inputValue = testConstants.extractName;
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput('#TableFileStatus__Card__Row__Input-Search', inputValue, () =>
      fileStatus.expectTextOnFirstRow(inputValue, 0, 3)
    );
  });

  it('Click on Received On to sort asc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Received__On', 'Received On');
  });

  it('Check Received On is sort asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('11/04/2020 02:10 AM', 0, 0);
  });

  it('Click on Received On to sort desc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Received__On', 'Received On');
  });

  it('Check Received On is sort desc)', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('11/05/2020 02:31 AM', 0, 0);
  });

  it('Click on Vendor to sort asc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Vendor', 'Vendor');
  });

  it('Check Vendor is sort asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('Anthem', 0, 1);
  });

  it('Click on Vendor to sort desc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Vendor', 'Vendor');
  });

  it('Check Vendor is sort desc)', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('VirginPulse', 0, 1);
  });

  it('Click on Sponsor to sort asc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Sponsor', 'Sponsor');
  });

  it('Check Sponsor is sort asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow(testConstants.sponsor, 0, 2);
  });

  it('Click on Sponsor to sort desc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Sponsor', 'Sponsor');
  });

  it('Check Sponsor is sort desc)', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('SSTAR', 0, 2);
  });

  it('Click on Extract Name to sort asc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Extract__Name', 'Extract Name');
  });

  it('Check Extract Name is sort asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('ADENA-Cigna-Elig-KNTU', 0, 3);
  });

  it('Click on Extract Name to sort desc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Extract__Name', 'Extract Name');
  });

  it('Check Extract Name is sort desc)', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('SSTAR-VirginPulse-KNTU.pgp', 0, 3);
  });

  it('Click on Overall to sort asc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Overall', 'Overall');
  });

  it('Check Overall is sort asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('Complete', 0, 4);
  });

  it('Click on Overall to sort desc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.clickOnHeader('Overall', 'Overall');
  });

  it('Check Overall is sort desc)', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTextOnFirstRow('Quality Check Failed', 0, 4);
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
