import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
  pageTitle = '#__Page_Title';

  messageContainer = '.ms-MessageBar-innerText';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Password Rules');
  }

  async fillCorrectInfo() {
    await this.inputValue('#__inputMustMinLength', '2');
    await this.inputValue('#__inputMustMaxLength', '10');
    await this.inputValue('#__inputMustVariations', '3');
    await this.inputValue('#__inputSomeDigit', '2');
    await this.inputValue('#__inputAutoUnlock', '120');
  }

  async fillWrongInfo() {
    await this.inputValue('#__inputMustMinLength', '256');
  }

  async clickOnSave() {
    const btnSelector = '#__PasswordRules-Save';

    await this.page.click(btnSelector);
  }

  async expectSuccessMessage() {
    await this.page.waitForSelector(this.messageContainer);
    const errorMessage = await this.page.$eval(this.messageContainer, (e) => e.textContent);

    expect(errorMessage).toEqual('Password rules updated successfully');
  }

  async expectErrorMessage() {
    await this.page.waitForSelector(this.messageContainer);
    const errorMessage = await this.page.$eval(this.messageContainer, (e) => e.textContent);

    expect(errorMessage).toEqual('Please correct the highlighted errors');
  }
}
