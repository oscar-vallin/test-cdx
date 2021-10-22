import P_BasePage from './P_BasePage';

export default class P_ExchangeStatus extends P_BasePage {
  pageTitle = '#__Text_File-Status-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  searchInput = '#TableFileStatus__Card__Row__Input-Search';

  fromDate = '#Input__From__Date-label';

  toDate = '#Input__To__Date-label';

  receivedOnCol = 'div[data-item-key="timestamp"]';

  vendorCol = 'div[data-item-key="vendorId"]';

  sponsorCol = 'div[data-item-key="planSponsorId"]';

  fileNameCol = 'div[data-item-key="inboundFilename"]';

  statusCol = 'div[data-item-key="stepStatus"]';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'File Status');
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

  async sortAsc(selector: string) {
    await this.waitForSelector(selector);
    if (!(await this.isSortedAsc(selector))) {
      await this.clickHeader(selector);
    }
  }

  async sortDesc(selector: string) {
    if (!(await this.isSortedDesc(selector))) {
      await this.clickHeader(selector);
    }
  }

  async clickHeader(selector: string) {
    const header = `${selector} .ms-DetailsHeader-cellName`;
    await this.waitForSelector(header);
    await this.page.click(header);
    await this.page.waitForTimeout(1000);
  }

  async isSortedAsc(selector: string): Promise<boolean> {
    try {
      const icon = await this.page.$(`${selector} i[data-icon-name="SortUp"]`);
      return icon != undefined;
    } catch (err) {
      return false;
    }
  }

  async isSortedDesc(selector: string): Promise<boolean> {
    try {
      const icon = await this.page.$(`${selector} i[data-icon-name="SortDown"]`);
      return icon != undefined;
    } catch (err) {
      return false;
    }
  }
}
