import PuppetCDXApp from '../../../../teste2e/pages/PuppetCDXApp';
import PuppetAccessSpecialization from '../../../../teste2e/pages/PuppetAccessSpecialization';
import PuppetAdminMenu from '../../../../teste2e/pages/PuppetAdminMenu';

jest.setTimeout(999999999);

describe('E2E - Access Specialization Test', () => {
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Access Specialization Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Go to Access Specialization page', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Access Management', 'Specializations');

    const accessSpecialization = new PuppetAccessSpecialization(cdxApp.page);
    await accessSpecialization.expectEmptyState();
  });

  it('Click on Create Specialization button', async () => {
    const accessSpecialization = new PuppetAccessSpecialization(cdxApp.page);

    await accessSpecialization.expectEmptyState();
    await accessSpecialization.clickOnCreateSpecialization();
  });

  it('Create specialization', async () => {
    const selector = '#__AccessSpecialization__Name_Field_1';
    const accessSpecialization = new PuppetAccessSpecialization(cdxApp.page);

    await accessSpecialization.createSpecialization();

    await accessSpecialization.waitForTimeout(2000);
    await accessSpecialization.expectTextOnPage(selector, 'Test A');
  });

  it('Update specialization', async () => {
    const selector = '#__AccessSpecialization__Name_Field_1';
    const accessSpecialization = new PuppetAccessSpecialization(cdxApp.page);

    await accessSpecialization.updateSpecialization();

    await accessSpecialization.waitForTimeout(2000);
    await accessSpecialization.expectTextOnPage(selector, 'Test B');
  });

  it('Delete specialization', async () => {
    const accessSpecialization = new PuppetAccessSpecialization(cdxApp.page);
    await accessSpecialization.deleteSpecialization('1');
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
