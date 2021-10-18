import P_CDXApp from '../../teste2e/pages/P_CDXApp';
import P_MainMenu from '../../teste2e/pages/P_MainMenu';
import P_Archives from '../../teste2e/pages/P_Archives';

const testConstants = {
  clientFile: 'ADENA-Cigna-Elig-TEST.txt',
  vendorFile: '2020-11-04-022911102con001',
  planSponsor: 'ADENA',
  vendor: 'Trustmark',
};

const inputSelector = '#TableArchive__Card__Row__Input-Search';

describe('E2E - Archives Navigation Test', () => {
  let cdxApp: P_CDXApp;

  beforeAll(async () => {
    cdxApp = await P_CDXApp.startBrowser('E2E - Archives Navigation Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();

    await loginPage.navigateToFakerFileStatus();
  });

  it('Click on Archives', async () => {
    const mainMenu = new P_MainMenu(cdxApp.page);
    await mainMenu.clickArchives();
  });

  it('Should redirect to Archives Page', async () => {
    const fileStatus = new P_Archives(cdxApp.page);
    await fileStatus.expectOnPage();
  });

  it('Table Should have 17 rows', async () => {
    const page = new P_Archives(cdxApp.page);
    await page.expectOnPage();
    await page.expectTableRecords('.ms-DetailsRow-fields', 17);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const page = new P_Archives(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput(inputSelector, wrongValue, () => page.expectTableRecords('.ms-DetailsRow-fields', 0));
  });

  it('Should have 1 record when searching by Client File', async () => {
    const inputValue = testConstants.clientFile;
    const page = new P_Archives(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput(inputSelector, inputValue, () => page.expectTextOnFirstRow(inputValue, 0, 3));
  });

  it('Should have 3 records when searching by Plan Sponsor', async () => {
    const inputValue = testConstants.planSponsor;
    const page = new P_Archives(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput(inputSelector, inputValue, () => page.expectTextOnFirstRow(inputValue, 0, 2));
  });

  it('Should have 1 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const page = new P_Archives(cdxApp.page);
    await page.expectOnPage();
    await page.expectInput(inputSelector, inputValue, () => page.expectTextOnFirstRow(inputValue, 0, 1));
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
