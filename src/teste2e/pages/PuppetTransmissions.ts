import PuppetBasePage from './PuppetBasePage';

export default class PuppetTransmissions extends PuppetBasePage {
  pageTitle = '#__Page_Title-Text';

  secondaryTitle = '#__Page_Title_SubTitle-Text';

  searchInput = '#TableTransmissions__Card__Row__Input-Search';

  fromDate = '#Input__From__Date-label';

  toDate = '#Input__To__Date-label';

  deliveredOnCol = 'div[data-item-key="deliveredOn"]';

  sponsorCol = 'div[data-item-key="planSponsorId"]';

  vendorCol = 'div[data-item-key="vendorId"]';

  specCol = 'div[data-item-key="specId"]';

  implementacionCol = 'div[data-item-key="implementation"]';

  extractNameCol = 'div[data-item-key="inboundFilename"]';

  vendorFileCol = 'div[data-item-key="outboundFilename"]';

  outboundFileSizeCol = 'div[data-item-key="outboundFilesize"]';

  billingUnitCountCol = 'div[data-item-key="billingCount"]';

  totalRecordsCol = 'div[data-item-key="totalRecords"]';

  feedCol = 'div[data-item-key="extractType"]';

  versionCol = 'div[data-item-key="extractVersion"]';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Transmissions');
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

  async clickOnHeader(id: string, btnName: string) {
    const selector = `#${id}`;
    await this.page.waitForTimeout(1000);
    await this.expectTextOnPage(selector, btnName);
    await this.page.click(selector);
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
