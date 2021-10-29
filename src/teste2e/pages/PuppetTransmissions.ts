import PuppetBasePage from './PuppetBasePage';

export default class PuppetTransmissions extends PuppetBasePage {
  pageTitle = '#__Text_Transmissions-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  searchInput = '#TableTransmissions__Card__Row__Input-Search';

  fromDate = '#Input__From__Date-label';

  toDate = '#Input__To__Date-label';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Transmissions');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
  }

  async setDateRange(dateFrom: string, dateTo: string) {
    await super.inputValue(this.fromDate, dateFrom);
    await super.inputValue(this.toDate, dateTo);
    await this.page.click(this.searchInput);
  }

  async search(searchText: string) {
    await this.inputValue(this.searchInput, searchText);
    await this.page.waitForTimeout(1000);
  }

  async clickOnHeader(id: string, btnName: string) {
    const selector = `#${id}`;
    await this.page.waitForTimeout(1000);
    await this.expectTextOnPage(selector, btnName);
    await this.page.click(selector);
  }
}
