import PuppetBasePage from './PuppetBasePage';

export default class PuppetExchangeStatus extends PuppetBasePage {
  pageTitle = '#__Page_Title-Text';

  secondaryTitle = '#__Page_Title_SubTitle-Text';

  searchInput = '#TableFileStatus__Card__Row__Input-Search';

  fromDate = '#Input__From__Date-label';

  toDate = '#Input__To__Date-label';

  receivedOnCol = 'div[data-item-key="timestamp"]';

  vendorCol = 'div[data-item-key="vendorId"]';

  sponsorCol = 'div[data-item-key="planSponsorId"]';

  fileNameCol = 'div[data-item-key="inboundFilename"]';

  statusCol = 'div[data-item-key="packetStatus"]';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'File Status');
    await this.expectTextOnPage(this.secondaryTitle, 'Advanced search');
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

  async clickDateRange(selector: string) {
    const header = `${selector}`;
    await this.waitForSelector(header);
    await this.page.click(header);
    await this.page.waitForTimeout(1000);
  }

  async compareDate(selector: string, date: string) {
    await this.page.waitForTimeout(1000);
    await this.waitForSelector(selector);
    const inputDate = await this.page.$eval(selector, (e) => e.getAttribute('value'));
    expect(inputDate).toContain(date);
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
