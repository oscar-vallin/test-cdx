import { ElementHandle, Page } from 'puppeteer';
import * as process from 'process';

// Base page for all puppeteer test pages
export default class P_BasePage {
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
    try {
      await this.waitForSelector(selector);
      const actualText = await page.$eval(selector, (e) => e.textContent);

      expect(actualText).toContain(expectedText);
    } catch (err) {
      throw Error(`Did not find element ${selector} within the time limit`);
    }
  }

  async waitForSelector(selector: string): Promise<ElementHandle | null> {
    try {
      return await this.page.waitForSelector(selector);
    } catch (err) {
      throw Error(`Did not find element ${selector} within the time limit`);
    }
  }

  async expectTextOnFirstRow(text: string, tableRow: number, tableCol: number) {
    await this.page.waitForTimeout(1000);
    const result = await this.page.$$eval('.ms-DetailsRow-fields', (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
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

  async inputValue(selector: string, value: string) {
    await this.clearField(selector);
    await this.page.type(selector, value);
  }

  async clearField(selector: string) {
    await this.page.waitForSelector(selector);
    const inputValue = await this.page.$eval(selector, (el) => el.value);
    await this.page.focus(selector);
    for (let i = 0; i < inputValue.length; i++) {
      await this.page.keyboard.press('Backspace');
    }
  }

  async inputBackspace(selector: string, counter: number) {
    await this.page.waitForSelector(selector);

    await this.page.focus(selector);
    for (let i = 0; i < counter; i++) {
      await this.page.keyboard.press('Backspace');
    }
  }

  async expectInput(selector: string, value: string, expectFunction: Function) {
    await this.inputValue(selector, value);
    await expectFunction();
  }
}
