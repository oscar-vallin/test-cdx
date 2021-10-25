import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
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
