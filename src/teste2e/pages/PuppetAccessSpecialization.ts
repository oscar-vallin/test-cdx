import PuppetBasePage from './PuppetBasePage';

export default class PuppetActiveOrgs extends PuppetBasePage {
  pageTitle = '#__Page-Title';

  emptyState = '#EmptyState';

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
    const nameInputSelector = '#specialization-name';
    const createBtnSelector = '#__CreateAccessSpecializationBtnId';

    await this.clickOnCreateSpecialization();

    await this.page.waitForSelector(nameInputSelector);
    await this.inputValue(nameInputSelector, 'Test A');

    await this.page.click(createBtnSelector);
  }

  async clickOnSpecialization(specializationId: string, name: string) {
    const selector = `#__AccessSpecialization__Name_Field_${specializationId}`;
    await this.expectTextOnPage(selector, name);
    await this.page.click(selector);
  }

  async updateSpecialization() {
    const nameInputSelector = '#specialization-name';
    const createBtnSelector = '#__CreateAccessSpecializationBtnId';

    await this.clickOnSpecialization('1', 'Test A');

    await this.page.waitForSelector(nameInputSelector);

    await this.clearField(nameInputSelector);
    await this.inputValue(nameInputSelector, 'Test B');

    await this.page.click(createBtnSelector);
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
