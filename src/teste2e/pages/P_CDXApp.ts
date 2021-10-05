import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import P_LoginPage from './P_LoginPage';
import P_AdminMenu from './P_AdminMenu';
import P_MainMenu from './P_MainMenu';

// Starting point for all scripted Puppeteer tests

export default class P_CDXApp {
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

  async toLoginPage(): Promise<P_LoginPage> {
    const loginPage = new P_LoginPage(this.page);
    await loginPage.visit();
    return loginPage;
  }

  async logout(): Promise<P_LoginPage> {
    const { page } = this;
    await page.waitForTimeout(1000);
    const menu = await this.waitForSelector(this.profileMenu);
    await menu?.click();
    // Breathe
    await page.waitForTimeout(1000);
    const logOut = await page.waitForSelector(this.logoutButton);
    await logOut?.click();

    const loginPage = new P_LoginPage(page);
    await loginPage.expectOnPage();
    return loginPage;
  }

  async returnToMyOrganization() {
    await this.page.waitForTimeout(3000);
    const menuButton = await this.waitForSelector('#__Organization__Button');
    menuButton?.click();
    await this.page.waitForTimeout(1000);
    const returnButton = await this.waitForSelector('#__Return__Organization');
    returnButton?.click();
  }

  getAdminMenu(): P_AdminMenu {
    return new P_AdminMenu(this.page);
  }

  getMainMenu(): P_MainMenu {
    return new P_MainMenu(this.page);
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

  static async startBrowser(testTitle: string): Promise<P_CDXApp> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1080 });

    return new P_CDXApp(browser, page, testTitle);
  }
}
