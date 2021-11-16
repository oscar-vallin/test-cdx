import PuppetExchangeStatus from './PuppetExchangeStatus';

export default class PuppetErrors extends PuppetExchangeStatus {
  pageTitle = '#__Text_Errors-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  startTmeCol = 'div[data-item-key="startTime"]';

  extractNameCol = 'div[data-item-key="inboundFilename"]';

  workStepCol = 'div[data-item-key="step"]';

  sponsorCol = 'div[data-item-key="planSponsorId"]';

  vendorCol = 'div[data-item-key="vendorId"]';

  messageCol = 'div[data-item-key="msg"]';

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
