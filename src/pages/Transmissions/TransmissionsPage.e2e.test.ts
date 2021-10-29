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

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
