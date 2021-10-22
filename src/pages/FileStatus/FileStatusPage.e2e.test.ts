import P_CDXApp from '../../teste2e/pages/P_CDXApp';
import P_ExchangeStatus from '../../teste2e/pages/P_ExchangeStatus';

const testConstants = {
  sponsor: 'K2UFKE',
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
    await cdxApp.navigateToFakerFileStatus();
  });

  it('Filter by Date', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    // Filter to November Nov 3, 2020 to Nov 5, 2020
    await fileStatus.setDateRange('Tue Nov 03 2020', 'Thu Nov 05 2020');
    await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 14);
  });

  it('Table Should have 17 rows', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    // Filter to November Nov 3, 2020 to Nov 6, 2020
    await fileStatus.setDateRange('Tue Nov 03 2020', 'Thu Nov 06 2020');
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

  it('Sort By Received On Asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search('');
    await fileStatus.sortAsc(fileStatus.receivedOnCol);
    await fileStatus.expectTextOnFirstRow('11/04/2020 02:10 AM', 0, 0);
  });

  it('Sort By Received On Desc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search('');
    await fileStatus.sortDesc(fileStatus.receivedOnCol);
    await fileStatus.expectTextOnFirstRow('11/05/2020 02:31 AM', 0, 0);
  });

  it('Sort By Vendor Asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortAsc(fileStatus.vendorCol);
    await fileStatus.expectTextOnFirstRow('ANTHEM', 0, 1);
  });

  it('Sort By Vendor Desc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortDesc(fileStatus.vendorCol);
    await fileStatus.expectTextOnFirstRow('VSP', 0, 1);
  });

  it('Sort By Sponsor Asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortAsc(fileStatus.sponsorCol);
    await fileStatus.expectTextOnFirstRow(testConstants.sponsor, 0, 2);
  });

  it('Sort By Sponsor Desc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortDesc(fileStatus.sponsorCol);
    await fileStatus.expectTextOnFirstRow('K2UFKE', 0, 2);
  });

  it('Sort By Extract Name Asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortAsc(fileStatus.fileNameCol);
    await fileStatus.expectTextOnFirstRow('ADENA-Cigna-Elig-KNTU', 0, 3);
  });

  it('Sort By Extract Name Desc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortDesc(fileStatus.fileNameCol);
    await fileStatus.expectTextOnFirstRow('SSTAR-VirginPulse-KNTU.pgp', 0, 3);
  });

  it('Sort By Overall Status Asc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortAsc(fileStatus.statusCol);
    await fileStatus.expectTextOnFirstRow('Complete', 0, 4);
  });

  it('Sort By Overall Status Desc', async () => {
    const fileStatus = new P_ExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortDesc(fileStatus.statusCol);
    await fileStatus.expectTextOnFirstRow('Quality Check Failed', 0, 4);
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
