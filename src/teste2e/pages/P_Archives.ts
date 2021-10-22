import P_ExchangeStatus from './P_ExchangeStatus';

export default class P_Archives extends P_ExchangeStatus {
  pageTitle = '#__Text_Archives-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  searchInput = '#TableArchive__Card__Row__Input-Search';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Archives');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
  }
}
