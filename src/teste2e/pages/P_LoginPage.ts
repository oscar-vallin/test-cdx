import P_BasePage from './P_BasePage';
import P_ExchangeStatus from './P_ExchangeStatus';
import P_ActivityOrgs from './P_ActivityOrgs';

// Puppeteer test page representing the Login page
export default class P_LoginPage extends P_BasePage {
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

  async expectOnExchangeStatusPage(): Promise<P_ExchangeStatus> {
    const exchangeStatusPage = new P_ExchangeStatus(this.page);
    await exchangeStatusPage.expectOnPage();
    return exchangeStatusPage;
  }

  async expectOnActiveOrgsPage(): Promise<P_ActivityOrgs> {
    const activeOrgsPage = new P_ActivityOrgs(this.page);
    await activeOrgsPage.expectOnPage();
    return activeOrgsPage;
  }
}
