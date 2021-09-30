import P_BasePage from './P_BasePage';

export default class P_ActivityOrgs extends P_BasePage {
  pageTitle = '#__Page-Title-Text';

  async expectOnPage() {
    await this.expectTextOnPage(this.pageTitle, 'Active orgs');
  }

  async clickOnOrg(orgId: string, orgName: string) {
    const selector = `a.${orgId}`;
    await this.expectTextOnPage(selector, orgName);
    await this.page.click(selector);
  }
}
