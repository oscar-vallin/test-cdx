import { format } from 'date-fns';
import PuppetCDXApp from '../../teste2e/pages/PuppetCDXApp';
import PuppetMainMenu from '../../teste2e/pages/PuppetMainMenu';
import PuppetArchivesPage from '../../teste2e/pages/PuppetArchivesPage';

const testConstants = {
  clientFile: 'ADENA-Cigna-Elig-TEST.txt',
  vendorFile: '2020-11-04-022911102con001',
  planSponsor: 'K2UKFE',
  vendor: 'TRUSTMARK',
};

const inputSelector = '#TableArchive__Card__Row__Input-Search';

describe('E2E - Archives Navigation Test', () => {
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Archives Navigation Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();

    await cdxApp.navigateToFakerFileStatus();
  });

  it('Click on Archives', async () => {
    const mainMenu = new PuppetMainMenu(cdxApp.page);
    await mainMenu.clickArchives();
  });

  it('Should redirect to Archives Page', async () => {
    const page = new PuppetArchivesPage(cdxApp.page);
    await page.expectOnPage();
    // Filter to November Nov 3, 2020 to Nov 5, 2020
    await page.setDateRange('Tue Nov 03 2020', 'Thu Nov 05 2020');
    const tzOffset = new Date().getTimezoneOffset();
    if (tzOffset == 240) {
      await page.expectTableRecords('.ms-DetailsRow-fields', 14);
    }
    if (tzOffset == 0) {
      await page.expectTableRecords('.ms-DetailsRow-fields', 12);
    }
  });

  it('Table Should have 17 rows', async () => {
    const page = new PuppetArchivesPage(cdxApp.page);
    await page.expectOnPage();
    // Filter to November Nov 3, 2020 to Nov 6, 2020
    await page.setDateRange('Tue Nov 03 2020', 'Thu Nov 06 2020');
    await page.expectTableRecords('.ms-DetailsRow-fields', 17);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const page = new PuppetArchivesPage(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput(inputSelector, wrongValue, () => page.expectTableRecords('.ms-DetailsRow-fields', 0));
  });

  it('Should have 1 record when searching by Client File', async () => {
    const inputValue = testConstants.clientFile;
    const page = new PuppetArchivesPage(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput(inputSelector, inputValue, () => page.expectTextOnFirstRow(inputValue, 0, 3));
  });

  it('Should have 1 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const page = new PuppetArchivesPage(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput(inputSelector, inputValue, () => page.expectTextOnFirstRow(inputValue, 0, 1));
  });

  it('Sort By Received On Asc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.search('');
    await archives.sortAsc(archives.recivedOnCol);

    const expectedTimeStr = getLocalDateString(2020, 11, 4, 7, 10, 40); // 2020, 11, 4, 2, 10, 0

    await archives.expectTextOnFirstRow(expectedTimeStr, 0, 0);
    await archives.expectTextOnFirstRow('K2UFKE', 0, 2);
  });

  it('Sort By Received On Desc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.search('');
    await archives.sortDesc(archives.recivedOnCol);
    const expectedTimeStr = getLocalDateString(2020, 11, 5, 7, 31, 11); // 2020, 11, 5, 2, 31, 0

    await archives.expectTextOnFirstRow(expectedTimeStr, 0, 0);
    await archives.expectTextOnFirstRow('K2UFKE', 0, 2);
  });

  //--------------------------------------------------------------------

  it('Sort By Vendor Asc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.sortAsc(archives.vendorCol);
    await archives.expectTextOnFirstRow('ANTHEM', 0, 1);
  });

  it('Sort By Vendor Desc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.sortDesc(archives.vendorCol);
    await archives.expectTextOnFirstRow('VSP', 0, 1);
  });

  //--------------------------------------------------------------------

  it('Sort By Sponsor Asc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.sortAsc(archives.sponsorCol);
    await archives.expectTextOnFirstRow('K2UFKE', 0, 2);
  });

  it('Sort By Sponsor Desc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.sortDesc(archives.sponsorCol);
    await archives.expectTextOnFirstRow('K2UFKE', 0, 2);
  });

  //--------------------------------------------------------------------

  it('Sort By Client File Asc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.sortAsc(archives.clientFileCol);
    await archives.expectTextOnFirstRow('ADENA-Cigna-Elig-KNTU.zip', 0, 3);
  });

  it('Sort By Client File Desc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.sortDesc(archives.clientFileCol);
    await archives.expectTextOnFirstRow('SSTAR-VirginPulse-KNTU.txt.zip', 0, 3);
  });

  //--------------------------------------------------------------------

  it('Sort By Vendor File Asc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.sortAsc(archives.vendorFileCol);
    await archives.expectTextOnFirstRow('', 0, 4);
  });

  it('Sort By Vendor File Desc', async () => {
    const archives = new PuppetArchivesPage(cdxApp.page);
    await archives.expectOnPage();
    await archives.sortDesc(archives.vendorFileCol);
    await archives.expectTextOnFirstRow('g8005568.zip', 0, 4);
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
