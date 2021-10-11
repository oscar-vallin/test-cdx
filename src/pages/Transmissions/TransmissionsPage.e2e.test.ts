import P_CDXApp from '../../teste2e/pages/P_CDXApp';
import P_ActivityOrgs from '../../teste2e/pages/P_ActivityOrgs';
import P_MainMenu from '../../teste2e/pages/P_MainMenu';
import P_Transmissions from '../../teste2e/pages/P_Transmissions';

const testConstants = {
  clientFile: 'K2UFKE-HealthyPet-UAT.txt',
  Spec: 'OakSpruceSpec',
  planSponsor: 'PZZA',
  vendor: 'Oak',
  implementation: 'DiscImplementation',
  vendorFile: 'K2UDEMO-MetLife-TEST-Warnings.xml',
  outbound: '45919',
};

const inputSelector = '#TableTransmissions__Card__Row__Input-Search';

describe('E2E - Transmissions Navigation Test', () => {
  let cdxApp: P_CDXApp;

  beforeAll(async () => {
    cdxApp = await P_CDXApp.startBrowser('E2E - Transmissions Navigation Test');
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

  it('Click on Transmissions', async () => {
    const mainMenu = new P_MainMenu(cdxApp.page);
    await mainMenu.clickTransmissions();
  });

  it('Should redirect to Transmissions Page', async () => {
    const fileStatus = new P_Transmissions(cdxApp.page);
    await fileStatus.expectOnPage();
  });

  it('Table Should have 2 rows', async () => {
    const fileStatus = new P_Transmissions(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectTableRecords('.ms-DetailsRow-fields', 2);
  });

  it('Should not have records when search input filled with wrong value', async () => {
    const wrongValue = 'WrongSearch';
    const fileStatus = new P_Transmissions(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput(inputSelector, wrongValue, () =>
      fileStatus.expectTableRecords('.ms-DetailsRow-fields', 0)
    );
  });

  it('Should have at least 1 record when searching by PlanSponsor', async () => {
    const inputValue = testConstants.planSponsor;
    const fileStatus = new P_Transmissions(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput(inputSelector, inputValue, () => fileStatus.expectTextOnFirstRow(inputValue, 0, 1));
  });

  it('Should have at least 1 record when searching by Vendor', async () => {
    const inputValue = testConstants.vendor;
    const fileStatus = new P_Transmissions(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput(inputSelector, inputValue, () => fileStatus.expectTextOnFirstRow(inputValue, 0, 2));
  });
  it('Should have at least 1 record when searching by Spec', async () => {
    const inputValue = testConstants.Spec;
    const fileStatus = new P_Transmissions(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput(inputSelector, inputValue, () => fileStatus.expectTextOnFirstRow(inputValue, 0, 3));
  });

  it('Should have at least 1 record when searching by Implementation', async () => {
    const inputValue = testConstants.implementation;
    const fileStatus = new P_Transmissions(cdxApp.page);
    await fileStatus.expectOnPage();
    await fileStatus.expectInput(inputSelector, inputValue, () => fileStatus.expectTextOnFirstRow(inputValue, 0, 4));
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
