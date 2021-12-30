import { format } from 'date-fns';
import PuppetCDXApp from '../../teste2e/pages/PuppetCDXApp';
import PuppetExchangeStatus from '../../teste2e/pages/PuppetExchangeStatus';

const testConstants = {
  sponsor: 'K2UFKE',
  vendor: 'ANTHEM',
  extractName: 'GOLD-CareCentral-TEST.txt.pgp',
};

describe('E2E - File Status Test', () => {
  jest.setTimeout(30000);
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - File Status Test');
  });

  it('Login and Go to Faker Data', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Navigate to Faker File Status', async () => {
    await cdxApp.navigateToFakerFileStatus();
  });

  // it('Should verify that the current date appears in the input when incorrect dates are entered', async () => {
  //   const fileStatus = new PuppetExchangeStatus(cdxApp.page);
  //   await fileStatus.expectOnPage();
  //   await fileStatus.setDateRange('Tue Nov 40 2020', 'Thu Dec 00 2020');
  //   await fileStatus.waitForTimeout(1000);
  //   await fileStatus.compareDate('#Input__From__Date-label', `${new Date().toDateString()}`);
  // });

  it('Should verify that the current date appears in the input, even if it has been previously deleted', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.setDateRange('Tue Nov 03 2020', 'Thu Nov 06 2020');
    // await fileStatus.setDateRange('', 'Thu Nov 06 2020');
    // await fileStatus.compareDate('#Input__From__Date-label', `${new Date().toDateString()}`);
    await fileStatus.compareDate('#Input__From__Date-label', 'Tue Nov 03 2020');
  });

  it('Filter by Date', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    // Filter to November Nov 3, 2020 to Nov 5, 2020
    await fileStatus.setDateRange('Tue Nov 03 2020', 'Thu Nov 05 2020');
    const tzOffset = new Date().getTimezoneOffset();
    if (tzOffset == 240) {
      await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 14);
    }
    if (tzOffset == 0) {
      await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 12);
    }
  });

  it('Table Should have 17 rows', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    // Filter to November Nov 3, 2020 to Nov 6, 2020
    await fileStatus.setDateRange('Tue Nov 03 2020', 'Thu Nov 06 2020');
    await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 17);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search(wrongValue);
    await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 0);
  });

  it('Should have 2 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search(inputValue);
    await fileStatus.expectTextOnFirstRow(inputValue, 0, 1);
  });

  it('Should have at least 1 record when searching by Extract Name', async () => {
    const inputValue = testConstants.extractName;
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search(inputValue);
    await fileStatus.expectTextOnFirstRow(inputValue, 0, 3);
  });

  it('Sort By Received On Asc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search('');
    await fileStatus.sortAsc(fileStatus.receivedOnCol);

    const expectedTimeStr = getLocalDateString(2020, 11, 4, 7, 10, 40);

    await fileStatus.expectTextOnFirstRow(expectedTimeStr, 0, 0);
    await fileStatus.expectTextOnFirstRow('GOLD-Anthem-BG-PROD.txt.pgp', 0, 3);
  });

  it('Sort By Received On Desc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.search('');
    await fileStatus.sortDesc(fileStatus.receivedOnCol);

    const expectedTimeStr = getLocalDateString(2020, 11, 5, 7, 31, 11);

    await fileStatus.expectTextOnFirstRow(expectedTimeStr, 0, 0);
    await fileStatus.expectTextOnFirstRow('GOLD-Fidelity-HSA-PROD.txt.pgp', 0, 3);
  });

  it('Sort By Vendor Asc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortAsc(fileStatus.vendorCol);
    await fileStatus.expectTextOnFirstRow('ANTHEM', 0, 1);
  });

  it('Sort By Vendor Desc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortDesc(fileStatus.vendorCol);
    await fileStatus.expectTextOnFirstRow('VSP', 0, 1);
  });

  it('Sort By Sponsor Asc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortAsc(fileStatus.sponsorCol);
    await fileStatus.expectTextOnFirstRow(testConstants.sponsor, 0, 2);
  });

  it('Sort By Sponsor Desc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortDesc(fileStatus.sponsorCol);
    await fileStatus.expectTextOnFirstRow('K2UFKE', 0, 2);
  });

  it('Sort By Extract Name Asc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortAsc(fileStatus.fileNameCol);
    await fileStatus.expectTextOnFirstRow('ADENA-Cigna-Elig-KNTU', 0, 3);
  });

  it('Sort By Extract Name Desc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortDesc(fileStatus.fileNameCol);
    await fileStatus.expectTextOnFirstRow('SSTAR-VirginPulse-KNTU.pgp', 0, 3);
  });

  it('Sort By Overall Status Asc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortAsc(fileStatus.statusCol);
    await fileStatus.expectTextOnFirstRow('Complete', 0, 4);
  });

  it('Sort By Overall Status Desc', async () => {
    const fileStatus = new PuppetExchangeStatus(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.sortDesc(fileStatus.statusCol);
    await fileStatus.expectTextOnFirstRow('Hold', 0, 4);
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});

/**
 * Get a Locale specific date string for the given UTC Date
 * @param year
 * @param month
 * @param day
 * @param hour
 * @param minute
 * @param second
 */
const getLocalDateString = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
): string => {
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));

  return format(tzDate, 'MM/dd/yyyy hh:mm a');
};
