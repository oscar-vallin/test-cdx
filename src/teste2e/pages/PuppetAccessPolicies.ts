import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
  pageTitle = '#__Page-Title';

  defaultPolicy = '#__CDX_Super_User_Policy';

  // async expectOnPage() {
  //   await this.expectTextOnPage(this.emptyState, 'No access specializations found');
  // }

  async expectSuperUserPolicy() {
    await this.expectTextOnPage(this.defaultPolicy, 'CDX Super User Policy');
  }

  async clickOnCreatePolicy() {
    const btnSelector = '#CreatePolicyButton';
    const panelSelector = '#CreatePoliciesPanel';

    await this.page.click(btnSelector);
    await this.expectTextOnPage(panelSelector, 'New access policy');
  }

  async clickOnPolicy(id: string, name) {
    const selector = `#__${id}`;
    await this.expectTextOnPage(selector, name);
    await this.page.click(selector);
  }

  async createPolicy() {
    const nameInputSelector = '#PolicyInput__Name';
    const createBtnSelector = '#__CreatePoliciesPanelId';

    await this.clickOnCreatePolicy();

    await this.page.waitForSelector(nameInputSelector);
    await this.inputValue(nameInputSelector, 'CDX E2E Policy');

    await this.page.click(createBtnSelector);
  }

  async updatePolicy() {
    const nameInputSelector = '#PolicyInput__Name';
    const createBtnSelector = '#__CreatePoliciesPanelId';

    await this.clickOnPolicy('CDX_E2E_Policy', 'CDX E2E Policy');

    await this.page.waitForSelector(nameInputSelector);

    await this.clearField(nameInputSelector);
    await this.inputValue(nameInputSelector, 'CDX E2E Test');

    await this.page.click(createBtnSelector);
  }
}
