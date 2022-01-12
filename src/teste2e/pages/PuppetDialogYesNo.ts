import PuppetBasePage from 'src/teste2e/pages/PuppetBasePage';

export default class PuppetDialogYesNo extends PuppetBasePage {
  container = '.dialog-yes-no';

  header = '.dialog-yes-no .ms-Dialog-header';

  buttonYes = '#__optionDialogYes';

  buttonNo = '#__optionDialogNo';

  async expectVisible() {
    await this.waitForSelector(this.container);
  }

  async expectTitle(title: string) {
    await this.expectTextOnPage(this.header, title);
  }

  async clickYes() {
    await this.click(this.buttonYes);
  }

  async clickNo() {
    await this.click(this.buttonNo);
  }
}
