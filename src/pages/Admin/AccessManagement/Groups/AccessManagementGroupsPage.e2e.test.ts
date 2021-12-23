import PuppetCDXApp from '../../../../teste2e/pages/PuppetCDXApp';
import PuppetAccessPolicyGroup from '../../../../teste2e/pages/PuppetAccessPolicyGroup';

jest.setTimeout(10000);

describe('E2E - Access Policy Group Test', () => {
  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - Access Policy Group Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Go to Access Groups page', async () => {
    const adminMenu = cdxApp.getAdminMenu();
    await adminMenu.openMenu('Access Management', 'Groups');

    const accessCreateGroup = new PuppetAccessPolicyGroup(cdxApp.page);
    await accessCreateGroup.expectSpanText();
  });

  it('Click on Create Group button', async () => {
    const accessCreateGroup = new PuppetAccessPolicyGroup(cdxApp.page);

    await accessCreateGroup.expectSpanText();
    await accessCreateGroup.clickOnCreateGroup();
  });

  it('Create Group with template Cancel', async () => {
    const selector = '#__AccessManagement__Name_Field_2';
    const accessCreateGroup = new PuppetAccessPolicyGroup(cdxApp.page);
    const templeteCheckMark = 'i[data-icon-name="Cancel"]';

    await accessCreateGroup.createGroupTempleteCancel();
    const actualText = await cdxApp.page.$eval(templeteCheckMark, (e) => e.getAttribute('data-icon-name'));
    expect(actualText).toEqual('Cancel');
    await accessCreateGroup.expectTextOnPage(selector, 'CDX E2E Group');
  });

  it('Delete Group with template Cancel', async () => {
    const selector = '#__AccessManagement__Name_Field_1';
    const accessCreateGroup = new PuppetAccessPolicyGroup(cdxApp.page);

    await accessCreateGroup.expectSpanText();
    await accessCreateGroup.deleteGroup('2');
    await accessCreateGroup.expectTextOnPage(selector, 'CDX Super User Group');
  });

  it('Create Group with template CheckMark', async () => {
    const selector = '#__AccessManagement__Name_Field_2';
    const accessCreateGroup = new PuppetAccessPolicyGroup(cdxApp.page);
    const templeteCheckMark = 'i[data-icon-name="CheckMark"]';

    await accessCreateGroup.createGroup();
    const actualText = await cdxApp.page.$eval(templeteCheckMark, (e) => e.getAttribute('data-icon-name'));
    expect(actualText).toEqual('CheckMark');
    await accessCreateGroup.expectTextOnPage(selector, 'CDX E2E Group');
  });

  it('Update Group', async () => {
    const selector = '#__AccessManagement__Name_Field_2';
    const accessCreateGroup = new PuppetAccessPolicyGroup(cdxApp.page);
    const templeteCheckMark = 'i[data-icon-name="Cancel"]';

    await accessCreateGroup.updateCheckBoxGroup();
    const actualText = await cdxApp.page.$eval(templeteCheckMark, (e) => e.getAttribute('data-icon-name'));
    expect(actualText).toEqual('Cancel');
    await accessCreateGroup.expectTextOnPage(selector, 'CDX E2E Group');
  });

  it('Delete Group', async () => {
    const selector = '#__AccessManagement__Name_Field_1';
    const accessCreateGroup = new PuppetAccessPolicyGroup(cdxApp.page);

    await accessCreateGroup.expectSpanText();
    await accessCreateGroup.deleteGroup('2');
    await accessCreateGroup.expectTextOnPage(selector, 'CDX Super User Group');
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});
