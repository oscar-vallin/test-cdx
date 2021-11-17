import PuppetExchangeStatus from './PuppetExchangeStatus';

export default class PuppetArchivesPage extends PuppetExchangeStatus {
  pageTitle = '#__Text_Archives-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  searchInput = '#TableArchive__Card__Row__Input-Search';

  recivedOnCol = 'div[data-item-key="timestamp"]';

  vendorCol = 'div[data-item-key="vendorId"]';

  sponsorCol = 'div[data-item-key="planSponsorId"]';

  clientFileCol = 'div[data-item-key="inboundFileName"]';

  vendorFileCol = 'div[data-item-key="vendorFileArchivePath"]';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Archives');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
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
}
