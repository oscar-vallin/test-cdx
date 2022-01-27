import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
  pageTitle = '#__Page_Title';

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

  async clickOnPolicy(id: string) {
    const selector = `#__${id}`;

    await this.page.waitForSelector(selector);

    await this.page.click(selector);
  }

  async clickOnPolicyTemplate() {
    //const nameInputSelector = '#PolicyInput__Name';

    await this.page.waitForTimeout(2000);

    const dropdownBtnSelector = '#CreatePolicyButton + .ms-Button';
    const dropdownItemSelector = '#PolicyTemplate__3';

    await this.page.click(dropdownBtnSelector);
    await this.page.waitForTimeout(2000);

    await this.page.waitForSelector(dropdownItemSelector);

    await this.page.click(dropdownItemSelector);
  }

  async expectPolicyTemplates() {
    await this.page.waitForTimeout(2000);

    const dropdownBtnSelector = '#CreatePolicyButton + .ms-Button';
    const dropdownItemSelector = '#PolicyTemplate__3';

    await this.page.waitForSelector(dropdownBtnSelector);
    await this.page.click(dropdownBtnSelector);

    await this.page.waitForSelector(dropdownItemSelector);
    await this.expectTextOnPage(dropdownItemSelector, 'Exchange Administrator');
  }

  async createPolicy() {
    const nameInputSelector = '#PolicyInput__Name';
    const createBtnSelector = '#__CreatePoliciesPanelId';

    await this.clickOnCreatePolicy();

    await this.page.waitForSelector(nameInputSelector);
    await this.inputValue(nameInputSelector, 'CDX E2E Policy');

    await this.page.click(createBtnSelector);
  }

  async createPolicyFromTemplate() {
    const nameInputSelector = '#PolicyInput__Name';
    const createBtnSelector = '#__CreatePoliciesPanelId';

    await this.clickOnPolicyTemplate();

    await this.page.waitForTimeout(2000);

    await this.page.waitForSelector(nameInputSelector);
    await this.inputValue(nameInputSelector, 'CDX E2E Template');

    await this.page.click(createBtnSelector);
  }

  async updatePolicy(id: string) {
    const nameInputSelector = '#PolicyInput__Name';
    const createBtnSelector = '#__CreatePoliciesPanelId';

    await this.clickOnPolicy(id);

    await this.page.waitForSelector(nameInputSelector);

    await this.clearField(nameInputSelector);
    await this.inputValue(nameInputSelector, 'CDX E2E Test');

    await this.page.click(createBtnSelector);
  }

  async deletePolicy(id: string) {
    const deleteBtnSelector = `#DeleteBtn__${id}`;
    const confirmationSelector = '#ConfirmationBtn';

    await this.page.waitForTimeout(2000);
    await this.page.click(deleteBtnSelector);

    await this.page.waitForTimeout(2000);
    await this.page.click(confirmationSelector);
  }
}
