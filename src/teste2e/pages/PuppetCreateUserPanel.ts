import PuppetBasePage from './PuppetBasePage';
import PuppetDialogYesNo from "src/teste2e/pages/PuppetDialogYesNo";

export default class PuppetCreateUserPanel extends PuppetBasePage {
  private nextButton = '#__Next_Button';
  private prevButton = '#__Prev_Button';
  private submitButton = '#__Submit_Button';

  private messageField = '#__CreateUser_Error';

  private firstNameField = '#__userFirstNm';
  private lastNameField = '#__userLastNm';
  private emailField = '#__userEmail';
  private orgField = '#__userOrg';

  private accessGroupsListField = '#__Access_Groups_List';

  private sendActivationField = '#__userSendActivation';

  private firstNameSummaryField = '#__userFirstNm_summary';
  private lastNameSummaryField = '#__userLastNm_summary';
  private emailSummaryField = '#__userEmail_summary';
  private orgSummaryField = '#__userOrg_summary';
  private accessGroupsListReadOnly = '#__accessGroupsList_summary';

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

  async uncheckSendActivation() {
    await this.uncheckBox(this.sendActivationField);
  }

  async expectSummary(firstName: string, lastName: string, email: string, org: string, accessGroups: string) {
    await this.expectTextOnPage(this.firstNameSummaryField, firstName);
    await this.expectTextOnPage(this.lastNameSummaryField, lastName);
    await this.expectTextOnPage(this.emailSummaryField, email);
    await this.expectTextOnPage(this.orgSummaryField, org);
    await this.expectTextOnPage(this.accessGroupsListReadOnly, accessGroups);
  }

  async next() {
    await this.page.click(this.nextButton);
  }

  async prev() {
    await this.page.click(this.prevButton);
  }

  async submit() {
    await this.page.click(this.submitButton);
  }

  async expectFirstNameEmailError() {
    await this.expectTextOnPage(this.messageField, 'Please fill out all required* fields');

    await this.expectFieldError(this.firstNameField);
    await this.expectFieldError(this.emailField);
  }

  async expectSummaryFirstNameEmailError() {
    await this.expectTextOnPage(this.messageField, 'Please fill out all required* fields');

    await this.expectFieldError(this.firstNameSummaryField);
    await this.expectFieldError(this.emailSummaryField);
  }

  async closePanel() {
    await this.click(this.closePanelButton);
    await this.page.waitForTimeout(1000);
    await this.expectHidden();
  }

  async closePanelDismissDialog() {
    await this.click(this.closePanelButton);
    const dialog = new PuppetDialogYesNo(this.page);
    await dialog.expectVisible();
    await dialog.expectTitle('You have unsaved changes');
    await dialog.clickYes();
    await this.page.waitForTimeout(1000);
    await this.expectHidden();

  }

  async expectHidden() {
    await this.expectElementNotRendered(this.firstNameField);
    await this.expectElementNotRendered(this.lastNameField);
    await this.expectElementNotRendered(this.emailField);
    await this.expectElementNotRendered(this.orgField);
    await this.expectElementNotRendered(this.accessGroupsListField);

    await this.expectElementNotRendered(this.firstNameSummaryField);
    await this.expectElementNotRendered(this.lastNameSummaryField);
    await this.expectElementNotRendered(this.emailSummaryField);
    await this.expectElementNotRendered(this.orgSummaryField);
    await this.expectElementNotRendered(this.accessGroupsListReadOnly);
  }

}