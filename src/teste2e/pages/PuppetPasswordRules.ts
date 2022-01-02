import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
  pageTitle = '#__Page-Title';

  messageContainer = '.ms-MessageBar-innerText';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Password Rules');
  }

  async fillCorrectInfo() {
    await this.inputValue('#__inputMustDigit', '2');
  }

  async fillWrongInfo() {
    await this.inputValue('#__inputMustDigit', '-1');
  }

  async clickOnSave() {
    const btnSelector = '#__PasswordRules-Save';

    await this.page.click(btnSelector);
  }

  async expectSuccessMessage() {
    await this.page.waitForSelector(this.messageContainer);
    const errorMessage = await this.page.$eval(this.messageContainer, (e) => e.textContent);

    expect(errorMessage).toEqual('Password rules updated sucessfully');
  }

  async expectErrorMessage() {
    await this.page.waitForSelector(this.messageContainer);
    const errorMessage = await this.page.$eval(this.messageContainer, (e) => e.textContent);

    expect(errorMessage).toEqual('An error occurred while updating the password rules. Please, try again.');
  }
}
