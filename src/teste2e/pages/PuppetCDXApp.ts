import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import PuppetLoginPage from './PuppetLoginPage';
import PuppetAdminMenu from './PuppetAdminMenu';
import PuppetMainMenu from './PuppetMainMenu';
import PuppetExchangeStatus from './PuppetExchangeStatus';
import PuppetActiveOrgs from './PuppetActiveOrgs';

// Starting point for all scripted Puppeteer tests

export default class PuppetCDXApp {
  profileMenu = '#__UserToken';

  logoutButton = '#__Logout_button';

  testTitle: string;

  page: Page;

  browser: Browser;

  constructor(browser: Browser, page: Page, testTitle: string) {
    this.browser = browser;
    this.page = page;
    this.testTitle = testTitle;
  }

  async toLoginPage(): Promise<PuppetLoginPage> {
    const loginPage = new PuppetLoginPage(this.page);
    await loginPage.visit();
    return loginPage;
  }

  async logout(): Promise<PuppetLoginPage> {
    const { page } = this;
    await page.waitForTimeout(1000);
    const menu = await this.waitForSelector(this.profileMenu);
    await menu?.click();
    // Breathe
    await page.waitForTimeout(1000);
    const logOut = await page.waitForSelector(this.logoutButton);
    await logOut?.click();

    const loginPage = new PuppetLoginPage(page);
    await loginPage.expectOnPage();
    return loginPage;
  }

  async navigateToFakerFileStatus(): Promise<PuppetExchangeStatus> {
    const activeOrgs = new PuppetActiveOrgs(this.page);
    await activeOrgs.expectOnPage();
    await activeOrgs.clickOnOrg('K2UFKE', 'K2U Faker Data');
    const fileStatus = new PuppetExchangeStatus(this.page);
    await fileStatus.expectOnPage();
    return fileStatus;
  }

  async returnToMyOrganization() {
    await this.getAdminMenu().returnToMyOrg();
  }

  getAdminMenu(): PuppetAdminMenu {
    return new PuppetAdminMenu(this.page);
  }

  getMainMenu(): PuppetMainMenu {
    return new PuppetMainMenu(this.page);
  }

  async waitForSelector(selector: string): Promise<ElementHandle | null> {
    try {
      return await this.page.waitForSelector(selector);
    } catch (err) {
      throw Error(`Did not find element ${selector} within the time limit`);
    }
  }

  async screenshot() {
    await this.page.screenshot({ path: `test-results/ss-${this.testTitle}.png`, type: 'png' });
  }

  async closeBrowser() {
    await this.page.close();
    await this.browser.close();
  }

  static async startBrowser(testTitle: string): Promise<PuppetCDXApp> {
    const browser = await puppeteer.launch({
      headless: !(!!process.env.npm_config_headless || !!process.env.IS_HEADLESS),
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1080 });

    jest.setTimeout(30000);

    return new PuppetCDXApp(browser, page, testTitle);
  }
}
