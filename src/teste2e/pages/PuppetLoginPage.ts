import PuppetBasePage from './PuppetBasePage';
import PuppetExchangeStatus from './PuppetExchangeStatus';
import PuppetActiveOrgs from './PuppetActiveOrgs';

jest.setTimeout(999999999);

// Puppeteer test page representing the Login page
export default class PuppetLoginPage extends PuppetBasePage {
  loginId = '#__FormLogin__Card__Row__Input-Email';

  loginPassword = '#__FormLogin__Card__Row__Input-Password';

  loginButton = '#__FormLogin__Card__Row__Column__Button--Button';

  async expectOnPage() {
    await this.page.waitForSelector(this.loginId);
  }

  async visit() {
    const { page } = this;
    await page.goto(this.url);
    await page.waitForSelector(this.loginId);
  }

  async loginAsAdmin() {
    const { page } = this;

    await page.waitForTimeout(1000);
    await page.waitForSelector(this.loginId);
    await page.type(this.loginId, this.adminEmail);

    await page.click(this.loginButton);

    await page.waitForSelector(this.loginPassword);
    await page.type(this.loginPassword, this.adminPassword);

    await page.click(this.loginButton);

    await page.waitForTimeout(1000);
  }

  async login(email: string, password: string) {
    const { page } = this;

    await page.type(this.loginId, email);

    await page.click(this.loginButton);

    await page.waitForSelector(this.loginPassword);
    await page.type(this.loginPassword, password);

    await page.click(this.loginButton);

    await page.waitForSelector(this.loginButton, { hidden: true });
  }

  async expectOnExchangeStatusPage(): Promise<PuppetExchangeStatus> {
    const exchangeStatusPage = new PuppetExchangeStatus(this.page);
    await exchangeStatusPage.expectOnPage();
    return exchangeStatusPage;
  }

  async expectOnActiveOrgsPage(): Promise<PuppetActiveOrgs> {
    const activeOrgsPage = new PuppetActiveOrgs(this.page);
    await activeOrgsPage.expectOnPage();
    return activeOrgsPage;
  }
}
