import P_BasePage from './P_BasePage';

export default class P_CurrentActivity extends P_BasePage {
  pageTitle = '#__Current_Activity_Text-Text';

  tableInProcess = '#__Table__In__Proccess';

  tableCompleted = '#__Table__Completed';

  tableErrored = '#__Table__Errored';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Current Activity');
    await this.expectTextOnPage(this.tableInProcess, 'In Process');
    await this.expectTextOnPage(this.tableCompleted, 'Completed');
    await this.expectTextOnPage(this.tableErrored, 'Errored');
  }
}
