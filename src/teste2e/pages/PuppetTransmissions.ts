import PuppetBasePage from './PuppetBasePage';

export default class PuppetTransmissions extends PuppetBasePage {
  pageTitle = '#__Text_Transmissions-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Transmissions');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
  }

  async clickOnHeader(id: string, btnName: string) {
    const selector = `#${id}`;
    await this.page.waitForTimeout(1000);
    await this.expectTextOnPage(selector, btnName);
    await this.page.click(selector);
  }
}
