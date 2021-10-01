import P_BasePage from './P_BasePage';

export default class P_ExchangeStatus extends P_BasePage {
  pageTitle = '#__Text_File-Status-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  receivedOn = '#datetime';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'File Status');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
  }

  async clickOnHeader(id: string, btnName: string) {
    const selector = `${id}`;
    await this.expectTextOnPage(selector, btnName);
    await this.page.click(selector);
  }

  async clickReceivedOn() {
    const itm = await this.waitForSelector(this.receivedOn);
    itm?.click();
  }
}
