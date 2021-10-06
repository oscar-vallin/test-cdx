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
}
