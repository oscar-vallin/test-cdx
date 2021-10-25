import PuppetExchangeStatus from './PuppetExchangeStatus';

export default class PuppetArchivesPage extends PuppetExchangeStatus {
  pageTitle = '#__Text_Archives-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  searchInput = '#TableArchive__Card__Row__Input-Search';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Archives');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
  }
}
