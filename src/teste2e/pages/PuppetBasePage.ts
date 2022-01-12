import { ElementHandle, Page } from 'puppeteer';
import * as process from 'process';

// Base page for all puppeteer test pages
export default class PuppetBasePage {
  topMessageBar = '#__Top_Message';

  url: string;

  browser: any;

  page: Page;

  adminEmail: string;

  adminPassword: string;

  constructor(page: Page) {
    this.url = process.env.npm_config_url || process.env.REACT_TEMP_URL || process.env.REACT_TEST_URL || '';
    this.adminEmail = process.env.REACT_E2E_USER_CREDENTIALS_LOGIN || '';
    this.adminPassword = process.env.REACT_E2E_PASS_CREDENTIALS_LOGIN || '';
    this.page = page;
  }

  async expectTextOnPage(selector: string, expectedText: string) {
    const { page } = this;
    await this.waitForSelector(selector).catch(() => {
      throw Error(`Did not find element ${selector} within the time limit`);
    });
    const actualText = await page.$eval(selector, (e) => e.textContent);

    expect(actualText).toContain(expectedText);
  }

  async expectFormFieldValue(selector: string, expectedText: string) {
    const { page } = this;
    await this.waitForSelector(selector).catch(() => {
      throw Error(`Did not find input element ${selector} within the time limit`);
    });
    const actualText = await page.$eval(selector, (e) => e['value']);

    expect(actualText).toEqual(expectedText);
  }

  async expectFieldRequired(selector: string) {
    await this.waitForSelector(`${selector}_lbl-Required-Text`).catch(() => {
      console.log(`Field ${selector} was not flagged as required`);
    });
  }

  async expectFieldError(selector: string) {
    await this.waitForSelector(`${selector}_lbl-Error-Icon`).catch(() => {
      console.log(`Field ${selector} was not flagged with an error`);
    });
  }

  async expectElementNotRendered(selector: string) {
    const { page } = this;
    return page.waitForSelector(selector, { hidden: true, timeout: 5000 }).catch(() => {
      // This is good
      console.error(`Element ${selector} was rendered when it was expected not to`);
    });
  }

  async waitForSelector(selector: string): Promise<ElementHandle | null> {
    return await this.page
      .waitForSelector(selector, {
        visible: true,
        hidden: false,
      })
      .catch(() => {
        console.error(`Did not find element ${selector} within the time limit`);
        return null;
      });
  }

  async expectTextOnFirstRow(text: string, tableRow: number, tableCol: number) {
    await this.page.waitForTimeout(1000);
    const result = await this.page
      .$$eval('.ms-DetailsRow-fields', (rows) => {
        return Array.from(rows, (row: any) => {
          const columns = row.querySelectorAll('.ms-DetailsRow-cell');
          return Array.from(columns, (column: any) => column.innerText);
        });
      })
      .catch(() => {
        throw Error(`Did not find "${text} on Row [${tableRow}] Column [${tableCol}]`);
      });
    expect(result[tableRow][tableCol]).toContain(text);
  }

  async expectTableRecords(selector: string, numRecords: number) {
    await this.page.waitForTimeout(1000);

    const result = await this.page.$$eval(selector, (rows) => {
      return rows.length;
    });

    expect(result).toEqual(numRecords);
  }

  async expectToasterPopup(message: string) {
    await this.page.waitForTimeout(1000);
    await this.expectTextOnPage(this.topMessageBar, message);
    // // wait for this to go away
    // await this.page.waitForTimeout(2000);
    // await this.expectElementNotRendered(this.messageBar);
  }

  async waitForTimeout(miliseconds: number) {
    await this.page.waitForTimeout(miliseconds);
  }

  async inputValue(selector: string, value: string) {
    await this.clearField(selector);
    await this.page.type(selector, value);
  }

  async clearField(selector: string) {
    await this.waitForSelector(selector);
    const inputValue = await this.page.$eval(selector, (el) => (<HTMLInputElement>el).value);
    await this.page.focus(selector);
    for (let i = 0; i < inputValue.length; i++) {
      await this.page.keyboard.press('Backspace');
    }
  }

  async inputBackspace(selector: string, counter: number) {
    await this.waitForSelector(selector);

    await this.page.focus(selector);
    for (let i = 0; i < counter; i++) {
      await this.page.keyboard.press('Backspace');
    }
  }

  async expectInput(selector: string, value: string, expectFunction: Function) {
    await this.inputValue(selector, value);
    await expectFunction();
  }

  async click(selector: string) {
    await this.waitForSelector(selector);
    await this.page.click(selector);
  }

  async isChecked(selector: string): Promise<boolean> {
    await this.waitForSelector(selector);
    const checked = await this.page.$eval(selector, (el) => (<HTMLInputElement>el).checked);
    return checked ?? false;
  }

  async checkBox(selector: string) {
    const checked = await this.isChecked(selector);
    if (!checked) {
      await this.click(selector);
    }
  }

  async uncheckBox(selector: string) {
    const checked = await this.isChecked(selector);
    if (checked) {
      await this.click(selector);
    }
  }

  async clickOnCreateGroup() {
    const btnSelector = '#CreateGroupButton';
    const panelSelector = '#__createGroupPanel';

    await this.page.click(btnSelector);
    await this.expectTextOnPage(panelSelector, 'New Access Policy Group');
  }

  async createGroupTempleteCancel() {
    const nameInputSelector = '#__groupInputName';
    const createBtnSelector = '#__CreateGroupPanelId';

    const tagPicker1 = '#__pickerPoliciesNotApply';
    // const tagPicker2 = '#__pickerPoliciesApply';
    // const tagPicker3 = '#__pickerPoliciesNotApplyTwo';
    const tagPicker4 = '#includeOrgsId';
    const tagPicker5 = '#excludeOrgsId';

    const checkBoxTempleteGroup = '#__checkBoxTemplateGroup';
    const checkBoxUseAsIs = '#__checkBoxUseAsIs';
    const checkBoxSuperPolicy = '#__checkBoxPolicies_1';
    const checkBoxSpecialization = '#__checkBoxPolicies_2';
    const checkBoxPoliciesApplies = '#__checkBoxPoliciesApplies';
    const checkBoxPolicies = '#__checkBoxIncludeAllSubOrgs';

    await this.clickOnCreateGroup();

    await this.page.waitForSelector(nameInputSelector);
    await this.inputValue(nameInputSelector, 'CDX E2E Group');

    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(checkBoxSuperPolicy);
    await this.page.click(checkBoxSuperPolicy);

    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(checkBoxSpecialization);
    await this.page.click(checkBoxSpecialization);

    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(checkBoxPoliciesApplies);
    await this.page.click(checkBoxPoliciesApplies);

    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(checkBoxPolicies);
    await this.page.click(checkBoxPolicies);

    await this.page.click(createBtnSelector);
  }

  async clickOnGroup(specializationId: string, name: string) {
    const selector = `#__AccessManagement__Name_Field_${specializationId}`;
    await this.expectTextOnPage(selector, name);
    await this.page.click(selector);
  }
}
