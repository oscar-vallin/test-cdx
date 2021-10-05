import P_BasePage from './P_BasePage';

export default class P_Errors extends P_BasePage {
  pageTitle = '#__Text_Errors-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Errors');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
  }

  async clickOnHeader(id: string, btnName: string) {
    const selector = `#${id}`;
    await this.page.waitForTimeout(1000);
    await this.expectTextOnPage(selector, btnName);
    await this.page.click(selector);
  }
}
