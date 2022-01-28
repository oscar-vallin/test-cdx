import PuppetBasePage from './PuppetBasePage';
import PuppetExchangeStatus from './PuppetExchangeStatus';

// Represents the Dashboard page
export default class PuppetDashboardPage extends PuppetBasePage {
  transmissionBillingUnits = '#__Transmissions__Billing_Units';

  failedFilesBillingUnits = '#__Failed__Files__Billing_Units';

  errorsByVendor = '#__Table_Errors_Vendor';

  errorsByFile = '#__Table_Errors_Files';

  errorsByPlanSponsor = '#__Table_Errors_PlanSponsor';

  transmissionsByVendor = '#__Table_Transmissions_Vendor';

  transmissionsByVendorTableRows = '#__Table_Transmissions_Vendor .ms-List-cell';

  transmissionsByFiles = '#__Table_Transmissions_Files';

  transmissionsByPlanSponsor = '#__Table_Transmissions_PlanSponsor';

  buttonYesterday = '#__Button-yesterday';

  buttonMonth = '#__Button-thisMonth';

  buttonLastMonth = '#__Button-lastMonth';

  buttonCustom = '#__Button-custom';

  customFromDate = '#Input__From__Date-label';

  customToDate = '#Input__To__Date-label';

  async expectOnPage() {
    await this.page.waitForSelector(this.transmissionBillingUnits);
    await this.page.waitForSelector(this.failedFilesBillingUnits);
    await this.page.waitForSelector(this.transmissionsByVendor);
  }

  async expectTransmissionBillingUnits(text: string) {
    await this.expectTextOnPage(this.transmissionBillingUnits, text);
  }

  async expectFailedFilesBillingUnits(text: string) {
    await this.expectTextOnPage(this.failedFilesBillingUnits, text);
  }

  async expectTransmissionsByVendorCount(count: number) {
    await this.page.waitForSelector(this.transmissionsByVendor);
    const result = await this.page.$$eval(this.transmissionsByVendorTableRows, (rows) => {
      return rows.length;
    });

    expect(result).toEqual(count);
  }

  async expectNoTransmissionsByVendor() {
    await this.expectTextOnPage(this.transmissionsByVendor, 'Transmissions / BUs by VendorNone');
  }

  async expectNoErrorsByVendor() {
    await this.expectTextOnPage(this.errorsByVendor, 'Failed Files by VendorNone');
  }

  async expectNoTransmissionsByPlanSponsor() {
    await this.expectTextOnPage(this.transmissionsByPlanSponsor, 'Transmissions / BUs by Plan SponsorNone');
  }

  async expectNoErrorsByPlanSponsor() {
    await this.expectTextOnPage(this.errorsByPlanSponsor, 'Failed Files by Plan SponsorNone');
  }

  async expectNoTransmissionsByFile() {
    await this.expectTextOnPage(this.transmissionsByFiles, 'Transmissions / BUs by FilesNone');
  }

  async expectNoErrorsByFile() {
    await this.expectTextOnPage(this.errorsByFile, 'Failed Files by FilesNone');
  }

  async expectCountsByPlanSponsorNotRendered() {
    await super.expectElementNotRendered(this.transmissionsByPlanSponsor);
    await super.expectElementNotRendered(this.errorsByPlanSponsor);
  }

  async expectCountsByFileNotRendered() {
    await super.expectElementNotRendered(this.transmissionsByFiles);
    await super.expectElementNotRendered(this.errorsByFile);
  }

  async getFirstTransmissionByVendorCell(): Promise<string> {
    return this.getFirstTableCell(this.transmissionsByVendor);
  }

  async clickFirstVendorTransmission(): Promise<PuppetExchangeStatus> {
    await this.page.waitForSelector(this.transmissionsByVendor);
    await this.page.click(`${this.transmissionsByVendorTableRows} a`);
    const page = new PuppetExchangeStatus(this.page);
    await page.expectOnPage();
    return page;
  }

  async getFirstTransmissionByFileCell(): Promise<string> {
    return this.getFirstTableCell(this.transmissionsByFiles);
  }

  async getFirstTransmissionByPlanSponsorCell(): Promise<string> {
    return this.getFirstTableCell(this.transmissionsByPlanSponsor);
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

  async clickCustomFilter() {
    await this.page.waitForSelector(this.buttonCustom);
    await this.page.click(this.buttonCustom);

    await this.page.waitForSelector('#Input__From__Date-label');
    await this.page.waitForSelector('#Input__To__Date-label');
  }

  async setCustomDateRange(fromDate: string, toDate: string) {
    await this.clickCustomFilter();
    await super.inputValue(this.customFromDate, fromDate);
    await super.inputValue(this.customToDate, toDate);

    // Wait for the first row to show up
    await this.waitForSelector(`${this.transmissionsByVendor} div.ms-DetailsRow-cell`);
  }
}
