import PuppetBasePage from './PuppetBasePage';

export default class PuppetUpdateUserPanel extends PuppetBasePage {
  private saveButton = '#__User_Save_Button';

  private messageField = '#__UpdateUser_Msg';

  private firstNameField = '#__userFirstNm';

  private lastNameField = '#__userLastNm';

  private emailField = '#__userEmail';

  private orgField = '#__userOrg';

  private lastLoginField = '#__userLastLogin';

  private accessGroupsListField = '#__Access_Groups_List';

  private closePanelButton = 'button.ms-Panel-closeButton';

  async expectPanelShows(firstName: string, lastName: string, email: string) {
    await this.expectFormFieldValue(this.firstNameField, firstName);
    await this.expectFormFieldValue(this.lastNameField, lastName);
    await this.expectFormFieldValue(this.emailField, email);

    await this.expectFieldRequired(this.firstNameField);
    await this.expectFieldRequired(this.emailField);
    await this.expectFieldRequired(this.orgField);
  }

  async setFirstName(value: string) {
    await this.inputValue(this.firstNameField, value);
  }

  async setLastName(value: string) {
    await this.inputValue(this.lastNameField, value);
  }

  async setEmail(value: string) {
    await this.inputValue(this.emailField, value);
  }

  async checkAccessGroup(index: number) {
    const field = `${this.accessGroupsListField} div:nth-child(${index}) input[type="checkbox"]`;
    await this.checkBox(field);
  }

  async save() {
    await this.page.click(this.saveButton);
  }

  async expectMessage(message: string) {
    await this.expectTextOnPage(this.messageField, message);
  }

  async expectFirstNameEmailError() {
    await this.expectFieldError(this.firstNameField);
    await this.expectFieldError(this.emailField);
  }

  async closePanel() {
    await this.click(this.closePanelButton);
    await this.page.waitForTimeout(1000);
    await this.expectHidden();
  }

  async expectHidden() {
    await this.expectElementNotRendered(this.firstNameField);
    await this.expectElementNotRendered(this.lastNameField);
    await this.expectElementNotRendered(this.emailField);
    await this.expectElementNotRendered(this.orgField);

    await this.expectElementNotRendered(this.accessGroupsListField);
  }
}
