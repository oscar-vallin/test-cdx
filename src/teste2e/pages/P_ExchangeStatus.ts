import P_BasePage from './P_BasePage';

export default class P_ExchangeStatus extends P_BasePage {
  pageTitle = '#__Text_File-Status-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  searchInput = '#TableFileStatus__Card__Row__Input-Search';

  fromDate = '#Input__From__Date-label';

  toDate = '#Input__To__Date-label';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'File Status');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
  }

  async clickOnHeader(id: string, btnName: string) {
    const selector = `#${id}`;
    await this.page.waitForTimeout(1000);
    await this.expectTextOnPage(selector, btnName);
    await this.page.click(selector);
  }

  async setDateRange(dateFrom: string, dateTo: string) {
    await super.inputValue(this.fromDate, dateFrom);
    await super.inputValue(this.toDate, dateTo);
  }

  async search(searchText: string) {
    await this.inputValue(this.searchInput, searchText);
    await this.page.waitForTimeout(1000);
  }
}
