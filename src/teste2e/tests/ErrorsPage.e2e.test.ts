import { format } from 'date-fns';
import PuppetCDXApp from 'src/teste2e/pages/PuppetCDXApp';
import PuppetActiveOrgs from 'src/teste2e/pages/PuppetActiveOrgs';
import PuppetMainMenu from 'src/teste2e/pages/PuppetMainMenu';
import PuppetErrors from 'src/teste2e/pages/PuppetErrors';

const testConstants = {
  clientFile: 'FMHP-CIGNA-PROD.xml.pgp',
  workStep: 'Transform',
  planSponsor: 'FMHP',
  vendor: 'CARECENTRAL',
};

describe('E2E - Errors Navigation Test', () => {
  jest.setTimeout(60000);
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
    const errorPage = new PuppetErrors(cdxApp.page);
    await errorPage.expectOnPage();
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

  it('Sort By Start Time Asc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.search('');
    await errors.sortAsc(errors.startTmeCol);

    const expectedTimeStr = getLocalDateString(2021, 8, 16, 22, 17, 0);

    await errors.expectTextOnFirstRow(expectedTimeStr, 0, 0);
    await errors.expectTextOnFirstRow('EnqueueExtract', 0, 2);
  });

  it('Sort By Start Time Desc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.search('');
    await errors.sortDesc(errors.startTmeCol);

    const expectedTimeStr = getLocalDateString(2021, 9, 8, 9, 49, 0);

    await errors.expectTextOnFirstRow(expectedTimeStr, 0, 0);
    await errors.expectTextOnFirstRow('Transform', 0, 2);
  });

  //--------------------------------------------------------------------

  it('Sort By Extract Name Asc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortAsc(errors.extractNameCol);
    await errors.expectTextOnFirstRow('FMHP-CARECENTRAL-PROD.xml.pgp', 0, 1);
  });

  it('Sort By Extract Name Desc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortDesc(errors.extractNameCol);
    await errors.expectTextOnFirstRow('FMHP-VIRGINPULSE-PROD.xml.pgp', 0, 1);
  });

  //--------------------------------------------------------------------

  it('Sort By Work Step Asc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortAsc(errors.workStepCol);
    await errors.expectTextOnFirstRow('EnqueueExtract', 0, 2);
  });

  it('Sort By Work Step Desc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortDesc(errors.workStepCol);
    await errors.expectTextOnFirstRow('TransmitFile', 0, 2);
  });

  //--------------------------------------------------------------------

  it('Sort By Sponsor Asc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortAsc(errors.sponsorCol);
    await errors.expectTextOnFirstRow('FMHP', 0, 3);
  });

  it('Sort By Sponsor Desc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortDesc(errors.sponsorCol);
    await errors.expectTextOnFirstRow('FMHP', 0, 3);
  });

  //--------------------------------------------------------------------

  it('Sort By Vendor Asc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortAsc(errors.vendorCol);
    await errors.expectTextOnFirstRow('CARECENTRAL', 0, 4);
  });

  it('Sort By Vendor Desc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortDesc(errors.vendorCol);
    await errors.expectTextOnFirstRow('VIRGINPULSE', 0, 4);
  });

  //--------------------------------------------------------------------

  it('Sort By Message Asc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortAsc(errors.messageCol);
    await errors.expectTextOnFirstRow('', 0, 5);
  });

  it('Sort By Message Desc', async () => {
    const errors = new PuppetErrors(cdxApp.page);
    await errors.expectOnPage();
    await errors.sortDesc(errors.messageCol);
    await errors.expectTextOnFirstRow('Transport Error', 0, 5);
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

  return format(tzDate, 'MM/dd/yyyy');
};
