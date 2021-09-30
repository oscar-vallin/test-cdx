import P_BasePage from './P_BasePage';

export default class P_ExchangeStatus extends P_BasePage {
  pageTitle = '#__Text_File-Status-Text';

  secondaryTitle = '#__Text_Advanced-search-Text';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'File Status');
    await this.expectTextOnPage(this.secondaryTitle, '  — Advanced search');
  }
}
