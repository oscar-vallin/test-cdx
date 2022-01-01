import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
  pageTitle = '#__Page-Title';

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
}
