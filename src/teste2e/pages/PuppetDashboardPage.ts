import { ElementHandle } from 'puppeteer';
import PuppetBasePage from './PuppetBasePage';
import PuppetTransmissions from './PuppetTransmissions';
import PuppetExchangeStatus from './PuppetExchangeStatus';

// Represents the Dashboard page
export default class PuppetDashboardPage extends PuppetBasePage {
  transmissionBillingUnits = '#__Transmissions__Billing_Units';

  failedFilesBillingUnits = '#__Failed__Files__Billing_Units';

  transmissionsByVendorTable = '#__Table_Transmissions_Vendor';

  transmissionsByVendorTableRows = '#__Table_Transmissions_Vendor .ms-List-cell';

  transmissionsByFilesTable = '#__Table_Transmissions_Files';

  buttonYesterday = '#__Button-yesterday';

  buttonMonth = '#__Button-thisMonth';

  buttonLastMonth = '#__Button-lastMonth';

  async expectOnPage() {
    await this.page.waitForSelector(this.transmissionBillingUnits);
    await this.page.waitForSelector(this.failedFilesBillingUnits);
    await this.page.waitForSelector(this.transmissionsByVendorTable);
  }

  async expectTransmissionBillingUnits(text: string) {
    await this.expectTextOnPage(this.transmissionBillingUnits, text);
  }

  async expectFailedFilesBillingUnits(text: string) {
    await this.expectTextOnPage(this.failedFilesBillingUnits, text);
  }

  async expectTransmissionsByVendorCount(count: number) {
    await this.page.waitForSelector(this.transmissionsByVendorTable);
    const result = await this.page.$$eval(this.transmissionsByVendorTableRows, (rows) => {
      return rows.length;
    });

    expect(result).toEqual(count);
  }

  async expectNoTransmissionsByVendor() {
    await this.expectTextOnPage(this.transmissionsByVendorTable, 'No data');
  }

  async getFirstTransmissionByVendorCell(): Promise<string> {
    return this.getFirstTableCell(this.transmissionsByVendorTable);
  }

  async clickFirstVendorTransmission(): Promise<PuppetExchangeStatus> {
    await this.page.waitForSelector(this.transmissionsByVendorTable);
    await this.page.click(`${this.transmissionsByVendorTableRows} a`);
    const page = new PuppetExchangeStatus(this.page);
    await page.expectOnPage();
    return page;
  }

  async getFirstTransmissionByFileCell(): Promise<string> {
    return this.getFirstTableCell(this.transmissionsByFilesTable);
  }

  async getFirstTableCell(selector: string): Promise<string> {
    await this.page.waitForSelector(selector);
    const result = await this.page.$$eval(selector, (rows) => {
      return Array.from(rows, (row: any) => {
        const columns = row.querySelectorAll('.ms-DetailsRow-cell');
        return Array.from(columns, (column: any) => column.innerText);
      });
    });
    return result[0][0];
  }

  async clickYesterdayFilter() {
    await this.page.waitForSelector(this.buttonYesterday);
    await this.page.click(this.buttonYesterday);
  }

  async clickMonthFilter() {
    await this.page.waitForSelector(this.buttonMonth);
    await this.page.click(this.buttonMonth);
  }

  async clickLastMonthFilter() {
    await this.page.waitForSelector(this.buttonLastMonth);
    await this.page.click(this.buttonLastMonth);
  }
}
