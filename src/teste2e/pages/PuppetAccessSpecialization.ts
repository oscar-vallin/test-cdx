import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
  pageTitle = '#__Page_Title';

  emptyState = '#EmptyState';

  nameInput = '#__Specialization_Name';

  createBtnSelector = '#__CreateAccessSpecializationBtnId';

  // async expectOnPage() {
  //   await this.expectTextOnPage(this.emptyState, 'No access specializations found');
  // }

  async expectEmptyState() {
    await this.expectTextOnPage(this.emptyState, 'No access specializations found');
  }

  async clickOnCreateSpecialization() {
    const btnSelector = '#create-access-specialization';
    const panelSelector = '#create-specialization-panel';

    await this.page.click(btnSelector);
    await this.expectTextOnPage(panelSelector, 'New Access Specialization');
  }

  async createSpecialization() {
    await this.clickOnCreateSpecialization();

    await this.inputValue(this.nameInput, 'Test A');

    await this.page.click(this.createBtnSelector);
  }

  async clickOnSpecialization(specializationId: string, name: string) {
    const selector = `#__AccessSpecialization__Name_Field_${specializationId}`;
    await this.expectTextOnPage(selector, name);
    await this.page.click(selector);
  }

  async updateSpecialization() {
    await this.clickOnSpecialization('1', 'Test A');
    await this.inputValue(this.nameInput, 'Test B');

    await this.page.click(this.createBtnSelector);
  }

  async deleteSpecialization(id: string) {
    const deleteBtnSelector = `#DeleteBtn__${id}`;
    const confirmationSelector = '#ConfirmationBtn';

    await this.page.waitForTimeout(2000);
    await this.page.click(deleteBtnSelector);

    await this.page.waitForTimeout(2000);
    await this.page.click(confirmationSelector);
  }
}
