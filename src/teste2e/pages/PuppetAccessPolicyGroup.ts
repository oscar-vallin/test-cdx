import PuppetBasePage from './PuppetBasePage';

export default class PuppetAccessPolicyGroup extends PuppetBasePage {
  spanText = '#__containerSpanTitle';

  async expectSpanText() {
    await this.expectTextOnPage(this.spanText, 'Groups');
  }

  async clickOnCreateGroup() {
    const btnSelector = '#CreateGroupButton';
    const panelSelector = '#__createGroupPanel';

    await this.page.click(btnSelector);
    await this.expectTextOnPage(panelSelector, 'New Access Policy Group');
  }

  async createGroup() {
    const nameInputSelector = '#__groupInputName';
    const createBtnSelector = '#__CreateGroupPanelId';

    const tagPicker1 = '#__pickerPoliciesNotApply';
    // const tagPicker2 = '#__pickerPoliciesApply';
    // const tagPicker3 = '#__pickerPoliciesNotApplyTwo';
    const tagPicker4 = '#includeOrgsId';
    const tagPicker5 = '#excludeOrgsId';

    const checkBoxTempleteGroup = '#__checkBoxTemplateGroup';
    const checkBoxUseAsIs = '#__checkBoxUseAsIs';
    const checkBoxSuperPolicy = '#__checkBoxSuperPolicy';
    const checkBoxSpecialization = '#__checkBoxSpecialization';
    const checkBoxPolicies = '#__checkBoxPolicies';

    await this.clickOnCreateGroup();

    await this.page.waitForSelector(nameInputSelector);
    await this.inputValue(nameInputSelector, 'CDX E2E Group');

    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(checkBoxTempleteGroup);
    await this.page.click(checkBoxTempleteGroup);

    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(checkBoxUseAsIs);
    await this.page.click(checkBoxUseAsIs);

    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(checkBoxSuperPolicy);
    await this.page.click(checkBoxSuperPolicy);

    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(checkBoxSpecialization);
    await this.page.click(checkBoxSpecialization);

    await this.page.waitForSelector(tagPicker1);
    await this.inputValue(tagPicker1, 'CDX Global Vendors');

    // await this.page.waitForSelector(tagPicker2);
    // await this.inputValue(tagPicker2, 'CDX Global Vendors');

    // await this.page.waitForSelector(tagPicker3);
    // await this.inputValue(tagPicker3, 'CDX Global Vendors');

    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(checkBoxPolicies);
    await this.page.click(checkBoxPolicies);

    await this.page.waitForSelector(tagPicker4);
    await this.inputValue(tagPicker4, 'CDX Global Vendors');

    await this.page.waitForSelector(tagPicker5);
    await this.inputValue(tagPicker5, 'CDX Global Vendors');

    await this.page.click(createBtnSelector);
  }

  async clickOnGroup(specializationId: string, name: string) {
    const selector = `#__AccessManagement__Name_Field_${specializationId}`;
    await this.expectTextOnPage(selector, name);
    await this.page.click(selector);
  }

  async updateCheckBoxGroup() {
    await this.page.waitForTimeout(3000);
    const nameInputSelector = '#__groupInputName';
    const checkBoxTempleteGroup = '#__checkBoxTemplateGroup';
    const createBtnSelector = '#__CreateGroupPanelId';

    const tagPicker1 = '#__pickerPoliciesNotApply';
    const tagPicker4 = '#includeOrgsId';
    const tagPicker5 = '#excludeOrgsId';

    await this.clickOnGroup('2', 'CDX E2E Group');
    await this.page.waitForSelector(nameInputSelector);

    await this.clearField(nameInputSelector);
    await this.page.waitForTimeout(3000);
    await this.inputValue(nameInputSelector, 'CDX E2E Group Two Test');

    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(checkBoxTempleteGroup);
    await this.page.click(checkBoxTempleteGroup);

    await this.page.waitForSelector(tagPicker1);
    await this.inputValue(tagPicker1, 'CDX Global Vendors');

    await this.page.waitForSelector(tagPicker4);
    await this.inputValue(tagPicker4, 'CDX Global Vendors');

    await this.page.waitForSelector(tagPicker5);
    await this.inputValue(tagPicker5, 'CDX Global Vendors');

    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(createBtnSelector);
    await this.page.click(createBtnSelector);
  }

  async deleteGroup(deleteButtonIndex: string) {
    await this.page.waitForTimeout(3000);
    const deleteBtnSelector = `#__deleteGroup_${deleteButtonIndex}`;
    const optionYesDeleteBtnSelector = '#__optionYesDelete';

    await this.page.waitForSelector(deleteBtnSelector);
    await this.page.click(deleteBtnSelector);

    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(optionYesDeleteBtnSelector);
    await this.page.click(optionYesDeleteBtnSelector);
  }
}
