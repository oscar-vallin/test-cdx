import { randomString } from "src/utils/testUtils";
import PuppetCDXApp from "src/teste2e/pages/PuppetCDXApp";
import PuppetActiveUsers from "src/teste2e/pages/PuppetActiveUsers";

const firstName = randomString(20);
const lastName = `Test-${randomString(20)}`;
const email = `${firstName}.${lastName}@known2u.com`;

describe('User Administration Testing', () => {

  let cdxApp: PuppetCDXApp;

  beforeAll(async () => {
    cdxApp = await PuppetCDXApp.startBrowser('E2E - User Settings Test');
  });

  it('Login', async () => {
    const loginPage = await cdxApp.toLoginPage();
    await loginPage.loginAsAdmin();
    await loginPage.expectOnActiveOrgsPage();
  });

  it('Go to Active Users Page', async () => {
    const menu = cdxApp.getAdminMenu();
    await menu.openMenu('Users', 'Active Users');
  });

  it('Test Required Fields', async () => {
    const page = new PuppetActiveUsers(cdxApp.page);
    await page.expectOnPage();
    const panel = await page.createUser();

    await panel.next();
    await panel.next();
    await panel.next();

    await panel.expectSummary('<empty>', '<empty>', '<empty>', 'Cloud Data eXchange', 'No Access Groups Assigned');

    await panel.submit();

    // Fields should be flagged as an error.
    await panel.expectSummaryFirstNameEmailError();
    await panel.prev();
    await panel.prev();
    await panel.prev();

    await panel.expectFirstNameEmailError();

    // assert the error message

    await panel.closePanel();
  });

  it('Create new user - Happy Path',async () => {
    const page = new PuppetActiveUsers(cdxApp.page);
    await page.expectOnPage();
    const panel = await page.createUser();

    await panel.setFirstName(firstName);
    await panel.setLastName(lastName);
    await panel.setEmail(email);
    await panel.next();

    await panel.checkAccessGroup(1);
    await panel.next();

    await panel.uncheckSendActivation();
    await panel.next();

    await panel.expectSummary(firstName, lastName, email, 'Cloud Data eXchange', 'Auditor');
    await panel.submit();

    // Panel should hide
    await panel.expectHidden();

    // Active Users page should refresh and new user should be there.
    await page.waitForTimeout(1000);
    await page.waitForSelector('.ms-DetailsRow-cell');
    await page.expectUser(firstName, lastName, email);
  });

  it('Open the Create Panel again, it should be blank', async () => {
    const page = new PuppetActiveUsers(cdxApp.page);
    await page.expectOnPage();

    // assertions are in here.
    const panel = await page.createUser();

    await panel.closePanel();
  });

  it('Logout', async () => {
    await cdxApp.logout();
  });

  afterAll(async () => {
    await cdxApp.closeBrowser();
  });
});