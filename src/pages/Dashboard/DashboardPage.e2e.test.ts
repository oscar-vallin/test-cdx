import PuppetCDXApp from '../../teste2e/pages/PuppetCDXApp';
import PuppetDashboardPage from '../../teste2e/pages/PuppetDashboardPage';

describe('E2E Dashboard test', () => {
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Dashboard Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
  });

  it('Click Exchange Status', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Exchange Statuses');
  });

  it('Click Dashboard', async () => {
    const mainMenu = cdxApp.getMainMenu();
    await mainMenu.clickDashboard();
  });

  it('Verify number of Transmissions matches the correct value', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.expectOnPage();
    await cdxApp.page.waitForTimeout(1000);
    await page.expectTransmissionBillingUnits('Transmissions  (Billing Units.)7/6979');
  });

  it('Verify number of Failed Files  matches the correct value', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.expectFailedFilesBillingUnits('Failed Files  (Billing Units.)0/6979');
  });

  it('Check count items in transmission vendor table', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.expectTransmissionsByVendorCount(6);
  });

  it('Check first item in transmission vendor table', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    const firstCell = await page.getFirstTransmissionByVendorCell();

    expect(firstCell).toEqual('BenefitResourceInc');
  });

  it('Click on first element in transmission table', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.clickFirstVendorTransmission();
  });

  it('Check url with filter=BenefitResourceInc ans file-status page', async () => {
    const url = cdxApp.page.url();
    expect(url).toContain('/file-status?');
    expect(url).toContain('filter=BenefitResource');
    expect(url).toContain('orgSid=');
  });

  it('Return to Dashboard', async () => {
    await cdxApp.getMainMenu().clickDashboard();
    await cdxApp.page.waitForTimeout(1000);
  });

  it('Check first item in transmission files table', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    const firstCell = await page.getFirstTransmissionByFileCell();

    expect(firstCell).toEqual('BBC-BCBS-PROD');
  });

  it('Click in Yesterday filter', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.clickYesterdayFilter();
    expect(cdxApp.page.url()).toContain('?date=yesterday');
  });

  it('Check no results with Yesterday filter', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.expectNoTransmissionsByVendor();
  });

  it('Click on This Month filter ', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.clickMonthFilter();
    expect(cdxApp.page.url()).toContain('?date=thisMonth');
  });

  it('Check results in table with this month filter', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    const firstCell = await page.getFirstTransmissionByVendorCell();

    expect(firstCell).toEqual('BenefitResourceInc');
  });

  it('Click on Last Month filter', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.clickLastMonthFilter();
    expect(cdxApp.page.url()).toContain('?date=lastMonth');
  });

  it('Check results in table with last month filter', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    const firstCell = await page.getFirstTransmissionByVendorCell();

    expect(firstCell).toEqual('BCBSofMA');
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
