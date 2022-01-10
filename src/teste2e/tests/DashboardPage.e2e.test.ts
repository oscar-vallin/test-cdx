import PuppetCDXApp from 'src/teste2e/pages/PuppetCDXApp';
import PuppetDashboardPage from 'src/teste2e/pages/PuppetDashboardPage';
import PuppetActiveOrgs from 'src/teste2e/pages/PuppetActiveOrgs';

describe('E2E Dashboard test', () => {
  jest.setTimeout(30000);
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Dashboard Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Navigate to K2UIS', async () => {
    const activeOrgs = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('K2UIS', 'Known2U Implementation Services');
  });

  it('Click Dashboard', async () => {
    const mainMenu = cdxApp.getMainMenu();
    await mainMenu.clickDashboard();
  });

  it('Verify headers matches the expected values', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.expectOnPage();
    // By Default this company will have a bunch of empty tables for today's date
    await page.expectNoTransmissionsByVendor();
    await page.expectNoTransmissionsByPlanSponsor();
    await page.expectNoErrorsByVendor();
    await page.expectNoErrorsByPlanSponsor();

    await page.expectCountsByFileNotRendered();

    await page.setCustomDateRange('Wed Aug 11 2021', 'Wed Sep 15 2021');

    await page.expectTransmissionBillingUnits('Transmissions  (Billing Units.)116/116');
    await page.expectFailedFilesBillingUnits('Failed Files  (Billing Units.)13/116');
  });

  it('Check count items in transmission vendor table', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.expectTransmissionsByVendorCount(10);
  });

  it('Check first item in transmission vendor table', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    const firstCell = await page.getFirstTransmissionByVendorCell();

    expect(firstCell).toEqual('ANTHEM');
  });

  it('Click on first element in transmission table', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    // await page.clickFirstVendorTransmission();
  });

  // it('Check url with filter=BenefitResourceInc ans file-status page', async () => {
  //   const url = cdxApp.page.url();
  //   expect(url).toContain('/file-status?');
  //   expect(url).toContain('filter=BenefitResource');
  //   expect(url).toContain('orgSid=');
  // });
  //
  // it('Return to Dashboard', async () => {
  //   await cdxApp.getMainMenu().clickDashboard();
  //   await cdxApp.page.waitForTimeout(1000);
  // });

  it('Check first item in transmission plan sponsors table', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    const firstCell = await page.getFirstTransmissionByPlanSponsorCell();

    expect(firstCell).toEqual('PW');
  });

  it('Click in Yesterday filter', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.clickYesterdayFilter();
    expect(cdxApp.page.url()).toContain('?date=yesterday');
    await page.expectNoTransmissionsByVendor();
    await page.expectNoTransmissionsByPlanSponsor();
    await page.expectNoErrorsByVendor();
    await page.expectNoErrorsByPlanSponsor();

    await page.expectCountsByFileNotRendered();
  });

  it('Click on This Month filter ', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.clickMonthFilter();
    expect(cdxApp.page.url()).toContain('?date=thisMonth');
    await page.expectNoTransmissionsByVendor();
    await page.expectNoTransmissionsByPlanSponsor();
    await page.expectNoErrorsByVendor();
    await page.expectNoErrorsByPlanSponsor();

    await page.expectCountsByFileNotRendered();
  });

  it('Click on Last Month filter', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.clickLastMonthFilter();
    expect(cdxApp.page.url()).toContain('?date=lastMonth');
  });

  it('Click on Custom filter', async () => {
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.clickCustomFilter();

    expect(cdxApp.page.url()).toContain('?startDate=');
    expect(cdxApp.page.url()).toContain('&endDate=');
  });

  it('Navigate to Farm Hop', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Organizations', 'Active Orgs');
    const activeOrgsPage = new PuppetActiveOrgs(cdxApp.page);
    await activeOrgsPage.clickOnOrg('FMHP', 'Farm Hop');
  });

  it('Navigate to the Farm Hop Dashboard', async () => {
    const mainMenu = cdxApp.getMainMenu();
    await mainMenu.clickDashboard();
    const page = new PuppetDashboardPage(cdxApp.page);
    await page.expectOnPage();

    // By Default this company will have a bunch of empty tables for today's date
    await page.expectNoTransmissionsByVendor();
    await page.expectNoTransmissionsByFile();
    await page.expectNoErrorsByVendor();
    await page.expectNoErrorsByFile();

    await page.expectCountsByPlanSponsorNotRendered();

    await page.setCustomDateRange('Wed Aug 11 2021', 'Wed Sep 15 2021');

    await page.expectTransmissionBillingUnits('Transmissions  (Billing Units.)35/35');
    await page.expectFailedFilesBillingUnits('Failed Files  (Billing Units.)6/35');
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
