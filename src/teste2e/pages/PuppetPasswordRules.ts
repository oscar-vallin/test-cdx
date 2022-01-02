import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
  pageTitle = '#__Page-Title';

  messageContainer = '.ms-MessageBar-innerText';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Password Rules');
  }

  async fillForm() {
    // const selector = `a.${orgId}`;
    // await this.expectTextOnPage(selector, orgName);
    // await this.page.click(selector);
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
}
