import P_CDXApp from '../../teste2e/pages/P_CDXApp';
import P_ExchangeStatus from '../../teste2e/pages/P_ExchangeStatus';

const testConstants = {
  sponsor: 'ADENA',
  vendor: 'ANTHEM',
  extractName: 'GOLD-CareCentral-TEST.txt.pgp',
};

describe('E2E - File Status Test', () => {
  let cdxApp: P_CDXApp;

  beforeAll(async () => {
    cdxApp = await P_CDXApp.startBrowser('E2E - File Status Test');
  });

  it('Login and Go to Faker Data', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.navigateToFakerFileStatus();
  });

  it('Table Should have 17 rows', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    // Filter to November Nov 3, 2020 to Nov 5, 2020
    await fileStatus.setDateRange('Tue Nov 03 2020', 'Thu Nov 05 2020');
    await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 17);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search(wrongValue);
    await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 0);
  });

  it('Should have 2 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search(inputValue);
    await fileStatus.expectTextOnFirstRow(inputValue, 0, 1);
  });

  it('Should have at least 1 record when searching by Extract Name', async () => {
    const inputValue = testConstants.extractName;
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search(inputValue);
    await fileStatus.expectTextOnFirstRow(inputValue, 0, 3);
  });

  it('Click on Received On to sort asc the table', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search('');
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
