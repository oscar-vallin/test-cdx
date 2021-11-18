import PuppetBasePage from './PuppetBasePage';

export default class PuppetCurrentActivity extends PuppetBasePage {
  pageTitle = '#__Current_Activity_Text-Text';

  tableInProcess = '#__Table__In__Process';

  tableCompleted = '#__Table__Completed';

  tableErrored = '#__Table__Errored';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Current Activity');
    await this.expectTextOnPage(this.tableInProcess, 'In Process');
    await this.expectTextOnPage(this.tableCompleted, 'Completed');
    await this.expectTextOnPage(this.tableErrored, 'Errored');
  }
}
