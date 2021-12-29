import PuppetBasePage from './PuppetBasePage';
import PuppetExchangeStatus from './PuppetExchangeStatus';
import PuppetActiveOrgs from './PuppetActiveOrgs';

// Puppeteer test page representing the Login page
export default class PuppetLoginPage extends PuppetBasePage {
  loginId = '#__FormLogin__Card__Row__Input-Email';

  loginPassword = '#__FormLogin__Card__Row__Input-Password';

  loginButton = '#__FormLogin__Card__Row__Column__Button--Button';

  errorContainer = '.ms-MessageBar-innerText';

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

  async typeEmail(email: string) {
    await this.page.type(this.loginId, email);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async waitForPasswordField() {
    await this.page.waitForSelector(this.loginPassword);
  }

  async typePassword(password: string) {
    await this.page.type(this.loginPassword, password);
  }

  async login(email: string, password: string) {
    const { page } = this;

    await this.typeEmail(email);

    await this.clickLoginButton();
    await this.waitForPasswordField();

    await this.typePassword(password);

    await this.clickLoginButton();

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

  async expectError(message: string) {
    await this.page.waitForSelector(this.errorContainer);
    const errorMessage = await this.page.$eval(this.errorContainer, (e) => e.textContent);

    expect(errorMessage).toEqual(message);
  }
}
