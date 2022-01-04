import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveUsers extends PuppetBasePage {
  pageTitle = '#__Page-Title-Text';

  createUserButton = '#__Create_User';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Active Users');
  }

  // async clickOnUser(orgId: string, orgName: string) {
  //   const selector = `a.${orgId}`;
  //   await this.expectTextOnPage(selector, orgName);
  //   await this.page.click(selector);
  // }

  async createUser() {}
}
