import { format } from 'date-fns';
import PuppetCDXApp from '../../teste2e/pages/PuppetCDXApp';
import PuppetMainMenu from '../../teste2e/pages/PuppetMainMenu';
import PuppetTransmissions from '../../teste2e/pages/PuppetTransmissions';

const testConstants = {
  clientFile: 'K2UFKE-HealthyPet-UAT.txt',
  Spec: 'OakSpruceSpec',
  planSponsor: 'K2U',
  vendor: 'CIGNA',
  implementation: 'DiscImplementation',
  vendorFile: 'K2UDEMO-MetLife-TEST-Warnings.xml',
  outbound: '45919',
};

describe('E2E - Transmissions Navigation Test', () => {
  jest.setTimeout(10000);

  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Transmissions Navigation Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Navigate to Faker Org', async () => {
    await cdxApp.navigateToFakerFileStatus();
  });

  it('Click on Transmissions', async () => {
    const mainMenu = new PuppetMainMenu(cdxApp.page);
    await mainMenu.clickTransmissions();
  });

  it('Should redirect to Transmissions Page', async () => {
    const page = new PuppetTransmissions(cdxApp.page);
    await page.expectOnPage();
  });

  it('Table Should have 2 rows', async () => {
    const page = new PuppetTransmissions(cdxApp.page);
    await page.expectOnPage();
    // Filter to November Nov 3, 2020 to Nov 6, 2020
    await page.setDateRange('Tue Nov 03 2020', 'Thu Nov 06 2020');
    await page.expectTableRecords('.ms-DetailsRow-fields', 2);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const page = new PuppetTransmissions(cdxApp.page);
    await page.expectOnPage();
    await page.search(wrongValue);
    await page.expectTableRecords('.ms-DetailsRow-fields', 0);
  });

  it('Should have at least 1 record when searching by PlanSponsor', async () => {
    const inputValue = testConstants.planSponsor;
    const page = new PuppetTransmissions(cdxApp.page);
    await page.expectOnPage();
    await page.search(inputValue);
    await page.expectTextOnFirstRow(inputValue, 0, 1);
  });

  it('Should have at least 1 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const page = new PuppetTransmissions(cdxApp.page);
    await page.expectOnPage();
    await page.search(inputValue);
    await page.expectTextOnFirstRow(inputValue, 0, 2);
  });
  it('Should have at least 1 record when searching by Spec', async () => {
    const inputValue = testConstants.Spec;
    const page = new PuppetTransmissions(cdxApp.page);
    await page.expectOnPage();
    await page.search(inputValue);
    await page.expectTextOnFirstRow(inputValue, 0, 3);
  });

  it('Should have at least 1 record when searching by Implementation', async () => {
    const inputValue = testConstants.implementation;
    const page = new PuppetTransmissions(cdxApp.page);
    await page.expectOnPage();
    await page.search(inputValue);
    await page.expectTextOnFirstRow(inputValue, 0, 4);
  });

  it('Sort By Delivered On Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.search('');
    // Filter to November Jan 1, 2017 to Nov 16, 2021
    await transmissions.setDateRange('Sun Jan 01 2017', 'Tue Nov 16 2021');
    await transmissions.sortAsc(transmissions.deliveredOnCol);

    const expectedTimeStr = getLocalDateString(2019, 12, 4, 8, 12, 0);

    await transmissions.expectTextOnFirstRow(expectedTimeStr, 0, 0);
    await transmissions.expectTextOnFirstRow('ABC', 0, 3);
  });

  it('Sort By Delivered On Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.search('');
    // Filter to November Jan 1, 2017 to Nov 16, 2021
    // await transmissions.setDateRange('Sun Jan 01 2017', 'Tue Nov 16 2021');
    await transmissions.sortDesc(transmissions.deliveredOnCol);

    const expectedTimeStr = getLocalDateString(2020, 11, 4, 22, 32, 0);

    await transmissions.expectTextOnFirstRow(expectedTimeStr, 0, 0);
    await transmissions.expectTextOnFirstRow('OakSpruceSpec', 0, 3);
  });

  //--------------------------------------------------------------------

  it('Sort By Sponsor Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.sponsorCol);
    await transmissions.expectTextOnFirstRow('K2UFKE', 0, 1);
  });

  it('Sort By Sponsor Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.sponsorCol);
    await transmissions.expectTextOnFirstRow('K2UFKE', 0, 1);
  });

  //---------------------------------------------------------------------

  it('Sort By Vendor Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.vendorCol);
    await transmissions.expectTextOnFirstRow('CIGNA', 0, 2);
  });

  it('Sort By Vendor Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.vendorCol);
    await transmissions.expectTextOnFirstRow('TRUSTMARK', 0, 2);
  });

  //---------------------------------------------------------------------

  it('Sort By Spec Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.specCol);
    await transmissions.expectTextOnFirstRow('ABC', 0, 3);
  });

  it('Sort By Spec Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.specCol);
    await transmissions.expectTextOnFirstRow('OakSpruceSpec', 0, 3);
  });

  //---------------------------------------------------------------------

  it('Sort By Implementacion Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.implementacionCol);
    await transmissions.expectTextOnFirstRow('ABCImpl', 0, 4);
  });

  it('Sort By Implementacion Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.implementacionCol);
    await transmissions.expectTextOnFirstRow('OakSpruceSpecImplementation', 0, 4);
  });

  //---------------------------------------------------------------------

  it('Sort By Extract Name Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.extractNameCol);
    await transmissions.expectTextOnFirstRow('K2UDEMO-2019.xml', 0, 5);
  });

  it('Sort By Extract Name Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.extractNameCol);
    await transmissions.expectTextOnFirstRow('K2UDEMO-MetLife-TEST-Warnings.xml', 0, 5);
  });

  //---------------------------------------------------------------------

  it('Sort By Vendor File Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.vendorFileCol);
    await transmissions.expectTextOnFirstRow('K2UDEMO-2019-12282020085407.txt', 0, 6);
  });

  it('Sort By Vendor File Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.vendorFileCol);
    await transmissions.expectTextOnFirstRow('K2UDEMO-MetLife-12282020085407.txt', 0, 6);
  });

  //---------------------------------------------------------------------

  it('Sort By Outbound File Size Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.outboundFileSizeCol);
    await transmissions.expectTextOnFirstRow('45919', 0, 7);
  });

  it('Sort By Outbound File Size Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.outboundFileSizeCol);
    await transmissions.expectTextOnFirstRow('120209', 0, 7);
  });

  //---------------------------------------------------------------------

  it('Sort By Billing Unit Count Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.billingUnitCountCol);
    await transmissions.expectTextOnFirstRow('62', 0, 8);
  });

  it('Sort By Billing Unit Count Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.billingUnitCountCol);
    await transmissions.expectTextOnFirstRow('95', 0, 8);
  });

  //---------------------------------------------------------------------

  it('Sort By Total Records Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.totalRecordsCol);
    await transmissions.expectTextOnFirstRow('132', 0, 9);
  });

  it('Sort By Total Records Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.totalRecordsCol);
    await transmissions.expectTextOnFirstRow('162', 0, 9);
  });

  //---------------------------------------------------------------------

  it('Sort By Feed Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.feedCol);
    await transmissions.expectTextOnFirstRow('Enrollment', 0, 10);
  });

  it('Sort By Feed Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.feedCol);
    await transmissions.expectTextOnFirstRow('Enrollment', 0, 10);
  });

  //---------------------------------------------------------------------

  it('Sort By Version Asc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortAsc(transmissions.versionCol);
    await transmissions.expectTextOnFirstRow('1.0.0.2020092018', 0, 11);
  });

  it('Sort By Version Desc', async () => {
    const transmissions = new PuppetTransmissions(cdxApp.page);
    await transmissions.expectOnPage();
    await transmissions.sortDesc(transmissions.versionCol);
    await transmissions.expectTextOnFirstRow('1.0.1.2020092818', 0, 11);
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
